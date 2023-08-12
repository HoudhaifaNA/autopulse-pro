import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  value: {
    areWeDone: string;
  };
};

const INITIAL_STATE: InitialState = {
  value: {
    areWeDone: "No",
  },
};

const counter = createSlice({
  name: "counter",
  initialState: INITIAL_STATE,
  reducers: {
    setDone: (state, action: PayloadAction<string>) => {
      state.value.areWeDone = action.payload;
    },
  },
});

export const { setDone } = counter.actions;
export default counter.reducer;
