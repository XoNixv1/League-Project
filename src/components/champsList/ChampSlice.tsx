import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEntityAdapter } from "@reduxjs/toolkit";
import useHttp from "../../hooks/https";
import { Champion, ChampionState } from "./champTypes";

const champsAdapter = createEntityAdapter<Champion>();

const initialState: ChampionState = champsAdapter.getInitialState({
  loading: false,
  error: "",
});

//// FETCH

export const fetchChamps = createAsyncThunk("champs/FetchChamps", async () => {
  const { request } = useHttp();
  return await request("http://localhost:3001/data");
});

//// DATA PREPARATION

const prepareChampionsData = (data: Record<string, Champion>) => {
  const preparedData: Record<string, Champion> = Object.entries(data).reduce(
    (acc, [key, champ]) => {
      acc[key] = {
        id: champ.id,
        key: champ.key,
        name: champ.name,
        title: champ.title,
        info: champ.info,
        image: champ.image,
        skins: champ.skins.map((skin: Champion["skins"][number]) => ({
          id: skin.id,
          name: skin.name,
          num: skin.num,
        })),
        lore: champ.lore,
        tags: champ.tags,
        stats: champ.stats,
        spells: champ.spells.map((spell: Champion["spells"][number]) => ({
          id: spell.id,
          name: spell.name,
          resource: spell.resource,
          description: spell.description,
          tooltip: spell.tooltip,
          maxrank: spell.maxrank,
          coldown: spell.coldown,
          cooldownBurn: spell.cooldownBurn,
          cost: spell.cost,
          costBurn: spell.costBurn,
          costType: spell.costType,
          maxammo: spell.maxammo,
          range: spell.range,
          rangeBurn: spell.rangeBurn,
        })),
        passive: champ.passive,
      };
      return acc;
    },
    {} as Record<string, Champion>
  );
  return preparedData;
};

//// CHAMP REDUCER

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
        const preparedData = prepareChampionsData(action.payload);
        champsAdapter.setAll(state, preparedData);
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
