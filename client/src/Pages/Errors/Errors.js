import React from "react";
import error from "../../assets/error.jpg";
const Errors = ({ history }) => {
  return (
    <div>
      <img src={error} alt="errors" />
      <br />
      <button
        style={{
          color: "white",
          backgroundColor: "Highlight",
          marginTop: "2%",
        }}
        onClick={() => history.goBack()}
      >
        Go Back
      </button>
    </div>
  );
};

export default Errors;
