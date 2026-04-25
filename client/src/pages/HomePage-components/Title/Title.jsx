import React from "react";
import "./Title.css";

const Title = ({ subtitle, head }) => {
  return (
    <>
      <div className="title container">
        <p className="q">{subtitle}</p>
        <h1 className="w">{head}</h1>
      </div>
    </>
  );
};

export default Title;
