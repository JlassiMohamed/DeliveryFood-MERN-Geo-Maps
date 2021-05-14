import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const {
    _id,
    name,
    email,
    phone,
    address,
    tags,
    minOrderAmount,
    imageUrl,
  } = restaurant;
  const edit = useSelector((state) => state.editReducer.edit);
  return (
    <div>
      <img src={imageUrl} alt="resto" style={{ width: "500px" }} />
      <p>{name}</p>
      <p>{email}</p>
      <p>{phone}</p>
      <p>{address}</p>
      <p>{tags}</p>
      <p>{minOrderAmount} DT</p>
      {!edit ? (
        <button>
          <Link to={`order/${_id}`}>Order Online</Link>
        </button>
      ) : null}
    </div>
  );
};

export default RestaurantCard;
