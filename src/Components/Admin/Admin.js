import React from "react";
import { Link } from "react-router-dom";
import Users from "../Users/Users";

function Admin() {
  return (
    <section>
      <h1>Admin</h1>
      <br />
      <Users />
      <br />
      <div className="flexGrow">
        <Link to={"/"}>Go Home</Link>
      </div>
    </section>
  );
}

export default Admin;
