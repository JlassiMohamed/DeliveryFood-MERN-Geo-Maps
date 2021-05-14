import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <hr />
      <div>
        <span>food for business: </span>
        <button>
          <Link to="/addrestaurant">Get Started</Link>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
