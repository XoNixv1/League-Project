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

export const fetchChamps = createAsyncThunk(
  "champs/FetchChamps",
  async (url: string) => {
    const { request } = useHttp();
    return await request(url);
  }
);

//// DATA PREPARATION

const prepareChampData = (data: Record<string, Champion>) => {
  const preparedData: Champion[] = Object.values(data.data).map(
    (champ: Champion) => ({
      id: champ.id,
      key: champ.key,
      name: champ.name,
      tags: champ.tags,
      title: champ.title,
      lore: champ.lore,
      info: champ.info,
      stats: champ.stats,
      passive: champ.passive,
      spells: champ.spells.map((spell: Champion["spells"][number]) => ({
        id: spell.id,
        name: spell.name,
        description: spell.description,
        tooltip: spell.tooltip,
        maxrank: spell.maxrank,
        cooldown: spell.cooldown,
        cooldownBurn: spell.cooldownBurn,
        cost: spell.cost,
        costBurn: spell.costBurn,
        costType: spell.costType,
        maxammo: spell.maxammo,
        range: spell.range,
        rangeBurn: spell.rangeBurn,
        resource: spell.resource,
      })),
      skins: champ.skins.map((skin: Champion["skins"][number]) => ({
        id: skin.id,
        name: skin.name,
        num: skin.num,
      })),
    })
  );

  return preparedData;
};

//// CHAMP REDUCER

const chapmsSlice = createSlice({
  name: "champs",
  initialState,
  reducers: {
    clearChampData(state) {
      state.entities = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChamps.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchChamps.fulfilled, (state, action) => {
        const preparedData = prepareChampData(action.payload);
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

export const { clearChampData } = actions;
export default reducer;
