import { configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import modalsReducer from "./reducers/modals";
import resourceUrlsReducer from "./reducers/resourceUrls";
import selectedItemsReducer from "./reducers/selectedItems";

export const store = configureStore({
  reducer: {
    modals: modalsReducer,
    resourceUrls: resourceUrlsReducer,
    selectedItems: selectedItemsReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
