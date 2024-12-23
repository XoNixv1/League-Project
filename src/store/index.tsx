import { configureStore } from "@reduxjs/toolkit";
import champsReducer from "../components/champsList/ChampSlice";

const store = configureStore({
  reducer: { champsReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
