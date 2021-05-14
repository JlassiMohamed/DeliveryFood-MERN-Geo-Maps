import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../JS/actions/user";
import "./Navbar.css";

const Navbar = () => {
  const user = useSelector((state) => state.userReducer.user);
  const restaurant = useSelector((state) => state.restaurantReducer.restaurant);
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const edit = useSelector((state) => state.editReducer.edit);
  const cart = useSelector((state) => state.cartReducer.cart);
  // console.log(user);
  // console.log(user.restaurant);

  let active = cart.active === undefined ? null : cart.active;
  const dispatch = useDispatch();
  const getCartCount = () => {
    let products = cart.products === undefined ? [] : cart.products;
    return products.reduce(
      (quantity, product) => Number(product.quantity) + quantity,
      0
    );
  };

  return (
    <header>
      <Link to="/">
        <h2>DeliFood</h2>
      </Link>
      {isAuth && edit ? (
        <div className="welcome">
          <span className="seller">{restaurant.name}</span>
          <a className="btn-area" href="/">
            <Link to={`/orders/${user.restaurant}`}>Orders</Link>
          </a>
          <a className="btn-area" href="/">
            <Link to={`/seller/dashboard/${user.restaurant}`}>Dashboard</Link>
          </a>
          <a className="btn-area" href="/">
            <Link to={`/profile`}>Profile</Link>
          </a>
          <a href="/" className="btn-area">
            <Link to="/signin" onClick={() => dispatch(logout())}>
              Logout
            </Link>
          </a>
        </div>
      ) : isAuth && !edit ? (
        <div className="welcome">
          Hi, {user.name}
          <a className="btn-area" href="/">
            <Link to="/myorders">Orders</Link>
          </a>
          <a className="btn-area" href="/">
            <Link to="/cart" className="cart__link">
              <i className="fas fa-shopping-cart"></i>
              <span>
                Cart
                <span className="cartlogo__badge">
                  {active ? getCartCount() : 0}
                </span>
              </span>
            </Link>
          </a>
          <a className="btn-area" href="/">
            <Link to={`/profile`}>Profile</Link>
          </a>
          <a href="/" className="btn-area">
            <Link to="/signin" onClick={() => dispatch(logout())}>
              Logout
            </Link>
          </a>
        </div>
      ) : (
        <div className="btns">
          <a href="/" className="btn-area">
            <Link to="/signup">SignUp</Link>
          </a>

          <a href="/" className="btn-area">
            <Link to="/signin">SignIn</Link>
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
