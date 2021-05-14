import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { postCart } from "../../JS/actions/cart";
import { deleteItem } from "../../JS/actions/item";
import AddItem from "../AddItem/AddItem";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  const { _id, imageUrl, title, description, tags, price, restaurant } = item;
  // console.log(item);
  const dispatch = useDispatch();
  const edit = useSelector((state) => state.editReducer.edit);
  const isAuth = useSelector((state) => state.userReducer.isAuth);
  const addToCartHandler = () => {
    let product = {
      productId: _id,
      restaurantId: restaurant,
      name: title,
      imageUrl,
      price,
      // quantity: 1,
    };
    dispatch(postCart(product));
    alert("item added to cart");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "40px",
        flexWrap: "wrap",
      }}
    >
      <img src={imageUrl} alt="item" style={{ width: "100px" }} />
      <p>{title}</p>
      <p>{description}</p>
      <p>{tags}</p>
      <p>{price} dt</p>
      {!edit && isAuth ? (
        <button onClick={addToCartHandler}>Add To Cart</button>
      ) : !edit && !isAuth ? (
        <button>
          <Link to="/signin">Add To Cart</Link>
        </button>
      ) : (
        <div>
          <AddItem id={_id} />
          <button onClick={() => dispatch(deleteItem(item._id))}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default ItemCard;
// edit
