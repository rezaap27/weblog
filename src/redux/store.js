import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import postReducer from "./features/postSlice";
import storageSession from "redux-persist/es/storage/session";
import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducers = combineReducers({
  userState: userReducer,
  updatePost: postReducer,
});
const persistConfig = {
  key: "root",

  storage: storageSession,
  whitelist: [, "updatePost", "userState"],
};
const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});
