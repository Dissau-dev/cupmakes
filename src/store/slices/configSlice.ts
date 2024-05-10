import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../root";

interface InitialState {
  paper_dimension: 48 | 80;
}

const initialState: InitialState = {
  paper_dimension: 48,
};

const configSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setPaperDimension(state, action) {
      state.paper_dimension = action.payload;
    },
  },
});

export const { setPaperDimension } = configSlice.actions;

export const configReducer = configSlice.reducer;

//Selectors
export const selectConfigs = (state: RootState) => state.config;
