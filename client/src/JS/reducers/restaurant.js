import {
  FAIL_RESTAURANTS,
  GET_RESTAURANT,
  GET_RESTAURANTS,
  LOAD_RESTAURANTS,
} from "../actionTypes/restaurant";

const initialState = {
  restaurantList: [],
  errors: null,
  load: false,
  restaurant: {},
};

const restaurantReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_RESTAURANTS:
      return { ...state, load: true };
    case GET_RESTAURANTS:
      return { ...state, load: false, restaurantList: payload.restaurants };
    case GET_RESTAURANT:
      return { ...state, load: false, restaurant: payload.restaurant };
    case FAIL_RESTAURANTS:
      return { ...state, load: false, errors: payload };
    default:
      return state;
  }
};

export default restaurantReducer;