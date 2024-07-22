import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddModalPayload, ModalTypes, ModalsState } from "types";
import uid from "utils/uniqid";

const initialState: ModalsState = {
  modalsList: [],
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    addModal: (state, action: PayloadAction<AddModalPayload>) => {
      const modalId = uid();
      const newModal: ModalTypes = { ...action.payload, id: modalId };
      state.modalsList.push(newModal);
    },

    removeModal: (state, action: PayloadAction<string>) => {
      state.modalsList = state.modalsList.filter((modal) => modal.id !== action.payload);
    },
  },
});

export const { addModal, removeModal } = modalsSlice.actions;
export default modalsSlice.reducer;
