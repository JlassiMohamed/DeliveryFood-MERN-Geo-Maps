import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, videErrors } from "../../JS/actions/user";
import Errors from "../../Components/Errors/Errors";
import "../SignUp/SignUp.css";

const SignIn = ({ history }) => {
  const [user, setuser] = useState({});
  const dispatch = useDispatch();
  const errors = useSelector((state) => state.userReducer.errors);

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
        </div>
        <div
          className="form-container sign-in-container"
          style={{ height: "100%" }}
        >
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

          <h1 className="signup">Sign In</h1>
          <hr />
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Enter a valid email address"
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Enter password"
          />
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
              <p>Enter your personal details and start journey with us</p>
              <button
                type="submit"
                className="btn btn-blue text-center"
                onClick={() => dispatch(login(user, history))}
              >
                SignIn
              </button>
              <div className="row mb-4 px-3">
                <small className="font-weight-bold">
                  Don't have an account?
                  <a className="text-danger" href="/">
                    <Link to="/signup">Register</Link>
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
