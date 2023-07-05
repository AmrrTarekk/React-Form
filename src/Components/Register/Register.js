import React, { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

// Must start with lowercase of uppercase and be followed by 3 to 23 characters that can be lower
// or upper case or digits or hyphens or underscore
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
// Must have at least one lowercase, one uppercase, one digit, and on special character and its
// length is between 8 to 24 characters.
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const PHONE_REGEX = /^01[0125][0-9]{8}$/;
const REGESTER_URL = "/register";
// fen l endpoint w fen l register fel url ???????

const obj = {
  name: "Ahmed Abd Al-Muti",
  email: "ahmedeemutti@gmail.com",
  password: "Qweqwe123@",
  rePassword: "Qweqwe123@",
  phone: "01010700700",
};

const Register = () => {
  const { baseURL } = useAuth();

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [num, setNum] = useState();
  const [validNum, setValidNum] = useState(false);
  const [numFocus, setNumFocus] = useState(false);

  const [errMsg, setErrMsg] = useState();
  const [success, setSuccess] = useState(false);

  const [isload, setIsLoad] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    const result = PHONE_REGEX.test(num);
    setValidNum(result);
  }, [num]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd, email, num]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoad(true);
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const { data } = await axios.post(`${baseURL}auth/signup`, {
        name: user,
        email,
        password: pwd,
        rePassword: matchPwd,
        phone: num,
      });
      console.log(data.token);
      console.log(data);
      // setSuccess(true);
      navigate("/login");
      // clear input fields lw ana 7atet value fel inputs bs ana msh 7atet
      setEmail("");
      setUser("");
      setPwd("");
      setMatchPwd("");
      setNum("");
    } catch (err) {
      console.log(err);
      if (err?.response) {
        setErrMsg(err.response.data.message);
      } else if (err?.message) {
        setErrMsg(err.message);
      } else {
        setErrMsg(err);
      }
      errRef.current.focus();
    }
    setIsLoad(false);
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offScreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <span className={validEmail ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validEmail || !email ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          ref={userRef}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p
          id="emailnote"
          className={!validEmail && emailFocus ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Please enter your valid emial.
        </p>
        <label htmlFor="username">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters. <br />
          Must begin with a letter. <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>
        <label htmlFor="password">
          Password
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          required
          onChange={(e) => setPwd(e.target.value)}
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special character:{" "}
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
        <label htmlFor="confirm_pwd">
          Confirm Password:
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="confirm_pwd"
          required
          onChange={(e) => setMatchPwd(e.target.value)}
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first pawssword input field.
        </p>
        <label htmlFor="phone-number">
          {" "}
          Phone Number:
          <span className={validNum ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validNum || !num ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="phone-number"
          required
          autoComplete="off"
          onChange={(e) => setNum(e.target.value)}
          aria-invalid={validNum ? "false" : "true"}
          aria-describedby="phnumnote"
          onFocus={() => setNumFocus(true)}
          onBlur={() => setNumFocus(false)}
        />
        <p className={!validNum && numFocus ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          Please enter your number!
        </p>

        {!isload ? (
          <button
            disabled={
              !validName || !validPwd || !validMatch || !validEmail
                ? true
                : false
            }
          >
            Sign Up
          </button>
        ) : (
          <button
            disabled={
              !validName || !validPwd || !validMatch || !validEmail
                ? true
                : false
            }
          >
            <FontAwesomeIcon icon={faSpinner} spin />
          </button>
        )}

        <p>
          Already registed?
          <br />
          <span className="line">
            {/* router link here to sign in */}
            <Link to="/login"> Sign In</Link>
          </span>
        </p>
      </form>
    </section>
  );
};

export default Register;
