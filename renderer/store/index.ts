import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import filterReducer from "./reducers/filter";
import expandedReducer from "./reducers/expanded";
import modalsReducer from "./reducers/modals";
import resourceUrlsReducer from "./reducers/resourceUrls";
import selectedItemsReducer from "./reducers/selectedItems";
import userReducer from "./reducers/user";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const rootReducer = combineReducers({
  filter: filterReducer,
  expanded: expandedReducer,
  modals: modalsReducer,
  resourceUrls: resourceUrlsReducer,
  selectedItems: selectedItemsReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
