import React from "react";
import { Link } from "react-router-dom";

function SimpleBackBtn() {
  return (
    <>
      <button className="chow-btn-outline">
        <Link to="/">Back</Link>
      </button>
    </>
  );
}

export default SimpleBackBtn;
