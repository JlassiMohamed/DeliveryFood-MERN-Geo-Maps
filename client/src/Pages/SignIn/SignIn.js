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
    /* <div className="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
      {errors.length > 0 ? errors.map((el) => <Errors error={el} />) : null}
      <div className="card card0 border-0">
        <div className="row d-flex">
          <div className="col-lg-6">
            <div className="card1 border-0 px-4 py-1">
              <img
                src="https://i.imgur.com/uNGdWHi.png"
                className="image"
                alt="signin img"
              />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card2 card border-0 px-4 py-5 mt-3 ">
              <div className="row mb-4 px-3">
                <h6 className="mb-0 mr-4 mt-2">Sign in with</h6>
                <div className="facebook text-center mr-3">
                  <i className="fab fa-facebook-f"></i>
                </div>
                <div className="twitter text-center mr-3">
                  <i className="fab fa-twitter"></i>
                </div>
                <div className="linkedin text-center mr-3">
                  <i className="fab fa-linkedin"></i>
                </div>
              </div>
              <div className="row px-3 mb-4">
                <div className="line" />
                <small className="or text-center">Or</small>
                <div className="line" />
              </div>

              <div className="row px-3">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm">Email Address</h6>
                </label>
                <input
                  className="mb-4"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter a valid email address"
                />
              </div>
              <div className="row px-3">
                <label className="mb-1">
                  <h6 className="mb-0 text-sm">Password</h6>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                />
              </div>
              <div className="row mb-3 px-3">
                <button
                  type="submit"
                  className="btn btn-blue text-center"
                  onClick={() => dispatch(login(user, history))}
                >
                  SignIn
                </button>
              </div>
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
    </div>*/
    <div>
      {errors.length > 0 ? errors.map((el) => <Errors error={el} />) : null}
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <h1>Create Account</h1>
          <div className="social-container">
            <a className="social">
              <i className="fab fa-facebook-f" />
            </a>
            <a className="social">
              <i className="fab fa-google-plus-g" />
            </a>
            <a className="social">
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
            type="lastName"
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
            <a className="social">
              <i className="fab fa-facebook-f" />
            </a>
            <a className="social">
              <i className="fab fa-google-plus-g" />
            </a>
            <a className="social">
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

      <footer>
        <p>
          Created with <i className="fa fa-heart" /> by
          <a target="_blank" href="https://florin-pop.com">
            Florin Pop
          </a>
          - Read how I created this and how you can join the challenge
          <a
            target="_blank"
            href="https://www.florin-pop.com/blog/2019/03/double-slider-sign-in-up-form/"
          >
            here
          </a>
        </p>
      </footer>
    </div>
  );
};

export default SignIn;
