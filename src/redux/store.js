import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import releaseReducer from "./releases/releaseReducer";
import playlistReducer from "./playlist/playlistReducer";
import previewReducer from "./preview/previewReducer";
import toastReducer from "./toast/toastReducer";

const reducer = combineReducers({
  releaseList: releaseReducer,
  playlist: playlistReducer,
  toast: toastReducer,
  preview: previewReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
