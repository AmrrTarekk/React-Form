import React from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth, baseURL } = useAuth();
  const refresh = async () => {
    const { data } = await axios.get(`${baseURL}refresh`, {
      withCredentials: true,
    });

    // accessToken we get back from endpoint after our RefreshToken is verified,
    // then we should get a new Access Token
    setAuth((prev) => {
      console.log(JSON.stringify(prev));
      console.log(data.accessToken);

      // returning the previous state of data and overwriting the access token with the new access token
      return { ...prev, token: data.accessToken };
    });

    // return is required to return the new access token so we can use it with our request
    // We call refresh function when our initial request fails when our access token is expired
    // then it will refresh to get a new token and we will retry the request
    return newAccesToken;
  };

  return refresh;
};

export default useRefreshToken;
