import {
  FAIL_ITEMS,
  GET_ITEM,
  GET_ITEMS,
  LOAD_ITEMS,
} from "../actionTypes/item";

const initialState = {
  itemList: [],
  errors: null,
  load: false,
  item: {},
};

const itemReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_ITEMS:
      return { ...state, load: true };
    case GET_ITEMS:
      return { ...state, load: false, itemList: payload.items };
    case GET_ITEM:
      return { ...state, load: false, item: payload.item };
    case FAIL_ITEMS:
      return { ...state, load: false, errors: payload };
    default:
      return state;
  }
};

export default itemReducer;
