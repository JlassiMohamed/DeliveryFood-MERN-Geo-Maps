import {
  TOGGLE_ORDER,
  TOGGLE_SELLER,
} from "../actionTypes/edit";

const initialState = {
  edit: false,
};

const editReducer = (state = initialState, { type }) => {
  switch (type) {
    case TOGGLE_ORDER:
      return { ...state, edit: false };
    case TOGGLE_SELLER:
      return { ...state, edit: true };
    default:
      return state;
  }
};
export default editReducer;
