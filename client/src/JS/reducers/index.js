import { combineReducers } from "redux";
import userReducer from "./user";
import restaurantReducer from "./restaurant";
import itemReducer from "./item";
import editReducer from "./edit";
import cartReducer from "./cart";
import orderReducer from "./order";
const rootReducer = combineReducers({
  userReducer,
  restaurantReducer,
  itemReducer,
  editReducer,
  cartReducer,
  orderReducer,
});
export default rootReducer;
