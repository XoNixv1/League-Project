import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";
import useHttp from "../../hooks/https";
import { Champion, ChampionState } from "./champTypes";

const champsAdapter = createEntityAdapter<Champion>();

const initialState: ChampionState = champsAdapter.getInitialState({
  loading: false,
  error: "",
});

export const fetchChamps = createAsyncThunk("champs/FetchChamps", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/data");
});

const chapmsSlice = createSlice({
  name: "champs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChamps.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchChamps.fulfilled, (state, action) => {
        champsAdapter.setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(fetchChamps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

const { actions, reducer } = chapmsSlice;

export default reducer;
