import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UnAuthorized = () => {
  const navigate = useNavigate();

  // take the user back one page of the history
  const goBack = () => navigate(-1);

  return (
    <section>
      <h1>UnAuthorized</h1>
      <br />
      <div className="flexGrow">
        <button onClick={goBack}>Go Back</button>
      </div>
      <Link to="/">Home</Link>
    </section>
  );
};

export default UnAuthorized;
