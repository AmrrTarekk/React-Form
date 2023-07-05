import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState();
  const { baseURL } = useAuth();
  const [isloading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // It used to use cancellation tokens,,, it's to cancel the request.

    const getUsers = async () => {
      try {
        const { data } = await axios.get(`${baseURL}users`);
        console.log(data);
        isMounted && setUsers(data.users);
      } catch (err) {
        console.error(err, "asdhashdksjda");
        // if the token expired and also the refresh token expired then it will redirect it to login page
        navigate("/login", { state: { from: location }, replace: true });
      }
      setIsLoading(false);
    };
    getUsers();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {isloading ? (
        <h1>"loading"</h1>
      ) : (
        <>
          {users?.length ? (
            <ul>
              {users.map((user, index) => (
                <li key={index}>{user?.name}</li>
              ))}
            </ul>
          ) : (
            <p>No Users to display.</p>
          )}
        </>
      )}
    </article>
  );
};
export default Users;
