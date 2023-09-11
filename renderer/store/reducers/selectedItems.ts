import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SelectedItemsState {
  selectedIds: number[];
}

const initialState: SelectedItemsState = {
  selectedIds: [],
};

const selectedItemsSlice = createSlice({
  name: "selectedItems",
  initialState,
  reducers: {
    toggleItemId: (state, action: PayloadAction<number>) => {
      const itemId = action.payload;
      if (state.selectedIds.includes(itemId)) {
        state.selectedIds = state.selectedIds.filter((id) => id !== itemId);
      } else {
        state.selectedIds.push(itemId);
      }
    },
    clearSelectedItems: (state) => {
      state.selectedIds = [];
    },
  },
});

export const { toggleItemId, clearSelectedItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
