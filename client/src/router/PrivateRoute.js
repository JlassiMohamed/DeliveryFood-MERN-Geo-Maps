import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  // console.log(token);
  if (token) {
    return <Route component={Component} {...rest} />;
  }
  return <Redirect to="/signin" />;
};

export default PrivateRoute;
