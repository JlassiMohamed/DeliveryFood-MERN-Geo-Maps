import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurant } from "../../JS/actions/restaurant";
import { Link } from "react-router-dom";
import ItemCard from "../../Components/ItemCard/ItemCard";
import AddItem from "../../Components/AddItem/AddItem";

const Restaurant = ({ match }) => {
  const { restaurantId } = match.params;
  const restaurant = useSelector((state) => state.restaurantReducer.restaurant);
  const edit = useSelector((state) => state.editReducer.edit);
  const {
    name,
    imageUrl,
    email,
    phone,
    address,
    tags,
    minOrderAmount,
    items,
  } = restaurant;
  let itemList = items === undefined ? [] : items;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!edit) {//?????????????????????????
      dispatch(getRestaurant(restaurantId));
    }
  }, [dispatch, restaurantId, edit]); // [dispatch, restaurantId, items] !!!!!!!!!!!!!!!!!!!!
  return (
    <div>
      <hr />
      <img src={imageUrl} alt="resto" style={{ width: "400px" }} />
      <p>{name}</p>
      <p>{email}</p>
      <p>{phone}</p>
      <p>{address}</p>
      <p>{tags}</p>
      <p>{minOrderAmount} DT</p>
      {edit ? (
        <button>
          <Link to="/setting">setting</Link>
        </button>
      ) : null}
      <hr />
      <div>
        <h4>List Of Items:</h4>
        {itemList.length > 0 ? (
          items.map((el) => <ItemCard item={el} key={el._id} />)
        ) : (
          <div>
            <span>OPENING SOON,</span>
            <p>
              Sorry customers, There's no item available yet, come back later!
            </p>
          </div>
        )}
        {edit ? <AddItem /> : null}
      </div>
    </div>
  );
};

export default Restaurant;
// add
