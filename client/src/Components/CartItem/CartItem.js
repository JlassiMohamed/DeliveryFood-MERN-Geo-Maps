import React from "react";
import "./CartItem.css";

const CartItem = ({ product, qtyChangeHandler, removeHandler }) => {
  const { productId, name, imageUrl, price, quantity } = product;

  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={imageUrl} alt={name} style={{ width: "100px" }} />
      </div>
      <p className="cartItem__name">{name}</p>
      <p className="cartitem__price">${price}</p>
      <select
        value={quantity}
        onChange={(e) => qtyChangeHandler(productId, e.target.value)}
        className="cartItem__select"
      >
        {[...Array(10).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>
      <button
        className="cartItem__deleteBtn"
        onClick={() => removeHandler(productId)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;
