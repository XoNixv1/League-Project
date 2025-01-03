import { configureStore } from "@reduxjs/toolkit";
import champsReducer from "../components/champsList/ChampSlice";

const store = configureStore({
  reducer: { champsReducer },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
