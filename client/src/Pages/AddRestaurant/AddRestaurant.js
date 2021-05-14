import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRestaurant, editRestaurant } from "../../JS/actions/restaurant";
// import { toggleSeller } from "../../JS/actions/edit";

const AddRestaurant = ({ history }) => {
  const [restaurant, setRestaurant] = useState({});
  // console.log(restaurant);
  const restaurantToEdit = useSelector(
    (state) => state.restaurantReducer.restaurant
  );
  const edit = useSelector((state) => state.editReducer.edit);
  // console.log(edit)

  useEffect(() => {
    !edit ? setRestaurant({}) : setRestaurant(restaurantToEdit);
  }, [edit, restaurantToEdit]);

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  const handleData = () => {
    if (edit) {
      dispatch(editRestaurant(restaurantToEdit._id, restaurant, history));
    } else {
      dispatch(addRestaurant(restaurant, history));
      // dispatch(toggleSeller()); // !!!! no need, and second dispatch may cause problems
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <label> Restaurant Name</label>
      <input
        name="name"
        value={restaurant.name}
        onChange={handleChange}
        placeholder="enter your name"
        style={{ width: "400px" }}
      />
      <label>Restaurant Email</label>
      <input
        name="email"
        value={restaurant.email}
        onChange={handleChange}
        placeholder="register your email"
        style={{ width: "400px" }}
      />
      <label>Restaurant Phone</label>
      <input
        name="phone"
        value={restaurant.phone}
        onChange={handleChange}
        placeholder="enter your contact phone"
        style={{ width: "400px" }}
      />
      <label>Restaurant address</label>
      <input
        name="address"
        value={restaurant.address}
        onChange={handleChange}
        placeholder="enter the address of your restaurant"
        style={{ width: "400px" }}
      />
      <label>image Url</label>
      <input
        name="imageUrl"
        value={restaurant.imageUrl}
        onChange={handleChange}
        placeholder="type the image Url"
        style={{ width: "400px" }}
      />
      <label>tags</label>
      <input
        name="tags"
        value={restaurant.tags}
        onChange={handleChange}
        placeholder="discribe your restaurant"
        style={{ width: "400px" }}
      />
      <label>min Order Amount</label>
      <input
        name="minOrderAmount"
        value={restaurant.minOrderAmount}
        onChange={handleChange}
        placeholder="type the min Order Amount"
        style={{ width: "400px" }}
      />
      <button onClick={handleData} style={{ margin: "20px" }}>
        {edit ? "Save" : "Add"}
      </button>
    </div>
  );
};

export default AddRestaurant;

//  what can be happened if we rafresh addRestaurant page after signingup and without completing to fill the form of adding our restaurant?