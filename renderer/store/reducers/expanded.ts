import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isExpanded: false,
};

const expandedSlice = createSlice({
  name: "expanded",
  initialState,
  reducers: {
    toggleExpanded: (state, action: PayloadAction<boolean>) => {
      state.isExpanded = action.payload;
      return state;
    },
  },
});

export const { toggleExpanded } = expandedSlice.actions;
export default expandedSlice.reducer;
