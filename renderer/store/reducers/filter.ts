import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFilterOpen: false,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    toggleFilter: (state, action: PayloadAction<boolean>) => {
      state.isFilterOpen = action.payload;
      return state;
    },
  },
});

export const { toggleFilter } = filterSlice.actions;
export default filterSlice.reducer;
