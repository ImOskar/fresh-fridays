import ToastActionTypes from "./toast.types";
import { createToast } from "./toast.utils";

export const addToast = (toast) => ({
  type: ToastActionTypes.ADD_TOAST,
  payload: toast,
});

export const removeToast = (id) => ({
  type: ToastActionTypes.REMOVE_TOAST,
  payload: id,
});

export const showToastWithTimeout = (message) => (dispatch) => {
  let toast = createToast(message);
  dispatch(addToast(toast));
  setTimeout(() => {
    dispatch(removeToast(toast.id));
  }, 3000);
};
