import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LOGIN_URL = "/auth";
const obj = {
  email: "ahmedmutti@gmail.com",
  password: "Ahmed@123",
};
const Login = () => {
  const { auth, setAuth, baseURL } = useAuth();

  // console.log(baseURL);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoad(true);
    console.log(user, pwd);
    try {
      const { data } = await axios.post(`${baseURL}auth/signin`, {
        email: user,
        password: pwd,
      });
      console.log(JSON.stringify(data));
      // localStorage.setItem("reactToken", JSON.stringify(data.token));
      const accessToken = data?.token;
      const roles = data?.user.role;
      setAuth({ user, pwd, roles, accessToken });
      // setAuth({ data });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (!err?.response) {
        // if there is no response at all but we got an error
        setErrMsg("No Server Response!");
      } else if (err?.response.data.errors) {
        setErrMsg(err.response.data.errors.msg);
      } else if (err?.response.data.message) {
        setErrMsg(err.response.data.message);
        console.log(errMsg);
      }
      errRef.current.focus();
      setIsLoad(false);
    }
  };
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          required
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          value={pwd}
          onChange={(event) => setPwd(event.target.value)}
        />
        {!isLoad ? (
          <button disabled={!pwd || !user ? true : false}>Sign In</button>
        ) : (
          <button disabled={!pwd || !user ? true : false}>
            <FontAwesomeIcon icon={faSpinner} spin />
          </button>
        )}
      </form>
      <p>
        Need an account?
        <br />
        <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;
