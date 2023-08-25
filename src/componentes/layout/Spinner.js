import React from "react";
import "./Spinner.css"

const Spinner = () => {
  return (
    <div className="loading-screen">
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Spinner;
