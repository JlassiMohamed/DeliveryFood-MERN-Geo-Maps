import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurants } from "../../JS/actions/restaurant";
import RestaurantCard from "../../Components/RestaurantCard/RestaurantCard";

const Landpage = () => {
  const [address, setAdress] = useState("");
  // const load = useSelector((state) => state.restaurantReducer.load);
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
    <div>
      <br />
      <h6>
        Enter your address to show the list of the nearby restaurant from you
      </h6>
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

export default Landpage;
