import { RootState } from "../../store";
import { createSelector } from "@reduxjs/toolkit";

const selectChampions = (state: RootState) => state.champsReducer.entities;

export const selectChampionList = createSelector(selectChampions, (entities) =>
  Object.values(entities)
);

export const selectChampionById = createSelector(
  (state: RootState) => state.champsReducer.entities,
  (state: RootState, champId: string | undefined) => champId,
  (entities, champId) => (champId ? entities[champId] : undefined)
);
