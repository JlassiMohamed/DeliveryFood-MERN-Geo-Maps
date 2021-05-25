import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../JS/actions/restaurant";
import RestaurantCard from "../RestaurantCard/RestaurantCard";
import { makeStyles } from "@material-ui/core/styles";
const Filter = () => {
  const useStyles = makeStyles((theme) => ({
    input: {
      marginLeft: "23%",
      width: 700,
      height: "15%",
    },
  }));
  const classes = useStyles();
  const [address, setAdress] = useState("");
  const restaurantList = useSelector(
    (state) => state.restaurantReducer.restaurantList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (address) {
      dispatch(getRestaurants());
    }
  }, [dispatch, address]);

  return (
    <div className={classes.input}>
      <span>Enter your address and select the nearby restaurant</span>
      <input
        value={address}
        onChange={(e) => setAdress(e.target.value)}
        placeholder="enter your adress"
        style={{ width: "400px" }}
      />
      {address ? (
        <div>
          {restaurantList
            .filter((el) =>
              el.address.toLowerCase().includes(address.toLowerCase())
            )
            .map((el) => (
              <RestaurantCard restaurant={el} key={el._id} />
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default Filter;
