// This hook is to attach the interceptors the axios private instance.
import axios, { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import { useEffect } from "react";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    // Here we check if there isn't a request which means in the start, so we sent the accessToken with the request
    // it might be the prev access token or the one we got after refresh
    // but this the INITIAL REQUEST we know that headers not set.

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        // this occurs when our access token is expired
        const prevRequest = error?.config; // we got the prevRequest from axios by config property.
        // 403 if the request is forbedden due to an expired accToken
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccesToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccesToken}`;
          return axiosPrivate(prevRequest);
          // Here we updated the request with the refresh token so we should have new Access Token
          // and making the request AGIAN
        }
        return Promise.reject(error);
      }
    );
    // cleanup
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
