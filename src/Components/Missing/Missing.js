import React from "react";
import { Link } from "react-router-dom";

function Missing() {
  return (
    <section>
      <h1>
        Nothing here go back to <Link to={"/"}>Home</Link>
      </h1>
    </section>
  );
}

export default Missing;
