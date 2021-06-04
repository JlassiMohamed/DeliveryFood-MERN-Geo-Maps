import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Errors from "../../Components/Errors/Errors";

import { register, videErrors } from "../../JS/actions/user";

import "./SignUp.css";

const SignUp = ({ history }) => {
  const [user, setuser] = useState({});
  const errors = useSelector((state) => state.userReducer.errors);
  const dispatch = useDispatch();
  console.log(user);
  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    return () => {
      dispatch(videErrors());
    };
  }, [dispatch]);

  return (
    <div>
      {errors.length > 0 ? errors.map((el) => <Errors error={el} />) : null}
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <h1>Create Account</h1>
          <div className="social-container">
            <a className="social" href="/">
              <i className="fab fa-facebook-f" />
            </a>
            <a className="social" href="/">
              <i className="fab fa-google-plus-g" />
            </a>
            <a className="social" href="/">
              <i className="fab fa-linkedin-in" />
            </a>
          </div>

          <span>or use your email for registration</span>
          <h6>Name</h6>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter a valid Name"
          />
          <input
            type="text"
            name="lastName"
            onChange={handleChange}
            placeholder="Enter a valid LastName"
          />
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Enter a valid email address"
          />
          <input
            type="text"
            name="phone"
            placeholder="Enter phone"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter password"
          />
          <label for="pet-select">Role:</label>
          <select name="role" id="pet-select" onChange={handleChange}>
            <option value="">--Please choose an option--</option>
            <option value="user">user</option>
            <option value="seller">seller</option>
          </select>
          <br />
          <button
            type="submit"
            className="btn btn-blue text-center"
            onClick={() => dispatch(register(user, history))}
          >
            SignUp
          </button>
        </div>

        <div
          className="form-container sign-in-container"
          style={{ height: "100%" }}
        >
          <h2 className="signup">Sign Up</h2>
          <input
            className="mb4"
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Enter a valid Name"
          />
          <input
            className="mb4"
            type="text"
            name="lastName"
            onChange={handleChange}
            placeholder="Enter a valid LastName"
          />
          <input
            className="mb4"
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Enter a valid email address"
          />
          <input
            className="mb4"
            type="text"
            name="phone"
            placeholder="Enter phone"
            onChange={handleChange}
          />
          <input
            className="mb4"
            type="text"
            name="address"
            placeholder="Enter address"
            onChange={handleChange}
          />
          <input
            className="mb4"
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter password"
          />

          <label for="pet-select">Role:</label>
          <select name="role" id="pet-select" onChange={handleChange}>
            <option value="">--Please choose an option--</option>
            <option value="user">user</option>
            <option value="seller">seller</option>
          </select>

          <button
            type="submit"
            className="btn btn-blue text-center"
            onClick={() => dispatch(register(user, history))}
          >
            SignUp
          </button>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>

            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <hr />
              <h5>Enter your personal details and start journey with us</h5>
              <Link to="/signin">
                <a className="btn btn-blue text-center" href="/">
                  SignIn
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
