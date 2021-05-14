import {
  TOGGLE_ORDER,
  TOGGLE_SELLER,
} from "../actionTypes/edit";

export const toggleOrder = () => {
  return {
    type: TOGGLE_ORDER,
  };
};

export const toggleSeller = () => {
  return {
    type: TOGGLE_SELLER,
  };
};

