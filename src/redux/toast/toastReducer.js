import ToastActionTypes from "./toast.types";
import { removeToast } from "./toast.utils";

const toastReducer = (state = [], action) => {
  switch (action.type) {
    case ToastActionTypes.ADD_TOAST:
      return [action.payload, ...state];
    case ToastActionTypes.REMOVE_TOAST:
      return removeToast(state, action.payload);
    default:
      return state;
  }
};

export default toastReducer;
