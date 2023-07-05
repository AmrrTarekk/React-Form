import React from "react";
import { Link } from "react-router-dom";

function Linkpage() {
  return (
    <section>
      <h1>Links</h1>
      <h1>Public</h1>
      <Link to={"/login"}>Login</Link>
      <Link to={"/register"}>Register</Link>

      <h1>Private</h1>
      <Link to={"/"}>Home</Link>
      <Link to={"/editor"}>Editor</Link>
      <Link to={"/admin"}>Admin</Link>
    </section>
  );
}

export default Linkpage;
