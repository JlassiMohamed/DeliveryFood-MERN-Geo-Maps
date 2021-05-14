import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../Components/CartItem/CartItem";
import { deleteItemCart, getCart, postCart } from "../../JS/actions/cart";
import { checkout } from "../../JS/actions/order";
import "./Cart.css";

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);
  const cart = useSelector((state) => state.cartReducer.cart);

  let userId = user === null ? null : user._id;
  let active = cart.active === undefined ? null : cart.active;
  let products = cart.products === undefined ? [] : cart.products;

  const qtyChangeHandler = (productId, quantity) => {
    dispatch(postCart({ productId, quantity }));
  };

  const removeFromCartHandler = (productId) => {
    dispatch(deleteItemCart(productId));
  };

  const getCartCount = () => {
    return products.reduce(
      (quantity, product) => Number(product.quantity) + quantity,
      0
    );
  };

  const getCartSubTotal = () => {
    return products
      .reduce((price, product) => price + product.price * product.quantity, 0)
      .toFixed(2);
  };

  const [order, setOrder] = useState({});
  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const [place, setPlace] = useState(false);
  const handleCheckout = () => {
    if (place === false && products.length !== 0) {
      setPlace(true);
    } else if (place === true) {
      dispatch(checkout(userId, history));
      dispatch(getCart());
    }
  };

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          {products.length === 0 || !active ? (
            <div>
              Your Cart Is Empty! <Link to="/">GO BACK</Link>
            </div>
          ) : (
            products.map((product) => (
              <CartItem
                key={product._id}
                product={product}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
          {place ? (
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label>Current address</label>
              <input
                name="address"
                value={order.address}
                onChange={handleChange}
                placeholder="enter your current address"
                style={{ width: "200px" }}
              />
              <label>Current phone</label>
              <input
                name="phone"
                value={order.phone}
                onChange={handleChange}
                placeholder="enter your current mobile number"
                style={{ width: "200px" }}
              />
            </form>
          ) : null}
        </div>
        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({active ? getCartCount() : 0}) items</p>
            <p>TOTAL Price: {active ? getCartSubTotal() : 0} DT</p>
          </div>
          <div>
            <button onClick={handleCheckout}>
              {!place ? "Proceed To Checkout" : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
