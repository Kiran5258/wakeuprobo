import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./users/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const root = combineReducers({
  user: userReducer,
});
const persist = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persist, root);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
