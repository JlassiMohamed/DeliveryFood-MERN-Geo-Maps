import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteItemCart, getCart, postCart } from "../../JS/actions/cart";
import { checkout } from "../../JS/actions/order";
import { editUser } from "../../JS/actions/user";
import CartItem from "../../Components/CartItem/CartItem";
import { Card } from "react-bootstrap";
import "./Cart.css";

const Cart = ({ history }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userReducer.user);
  const cart = useSelector((state) => state.cartReducer.cart);

  let phone = user === null ? null : user.phone;
  let address = user === null ? null : user.address;
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

  const [details, setDetails] = useState({ phone, address });
  useEffect(() => {
    setDetails({ phone, address });
  }, [phone, address]);
  console.log(details);
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
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
  const [save, setSave] = useState(false);
  const handleData = (e) => {
    e.preventDefault();
    dispatch(editUser(details));
    setSave(true);
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
          <br />
          {place ? (
            <div>
              {!save ? (
                <p>
                  Please, make sure your current address for delivery is
                  updated! Otherwise change it and click to save.
                </p>
              ) : null}
              <Card className="card2" border="dark" style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Text>
                    <label>Current address:</label>
                    {!save ? (
                      <input
                        name="address"
                        value={details.address}
                        onChange={handleChange}
                        placeholder="enter your current address"
                        style={{ width: "200px" }}
                      />
                    ) : (
                      <p>{details.address}</p>
                    )}
                    <label>Current phone:</label>
                    {!save ? (
                      <input
                        name="phone"
                        value={details.phone}
                        onChange={handleChange}
                        placeholder="enter your current mobile number"
                        style={{ width: "200px" }}
                      />
                    ) : (
                      <p>{details.phone}</p>
                    )}
                    {!save ? (
                      <button className="button" onClick={handleData}>
                        save
                      </button>
                    ) : (
                      // <button onClick={() => setSave(false)}>Edit</button>
                      <i class="far fa-edit" onClick={() => setSave(false)}></i>
                    )}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
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
