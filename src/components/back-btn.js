import React from "react";
import { Link } from "react-router-dom";


export function LeftBackArrow() {
  return (
    <>
      <Link to="/">
        <i
          className="fa fa-chevron-left back-nav"
        ></i>
      </Link>
    </>
  );
}


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
