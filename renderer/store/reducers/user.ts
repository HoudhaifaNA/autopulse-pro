import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserSettings {
  name: string | null;
  inactiveTimeThreshold: number;
  defaultBlur: boolean;
}
interface UpdateSettingsPayload {
  inactiveTimeThreshold: number;
  defaultBlur: boolean;
}

interface userState {
  user: UserSettings;
}

const TEN_MINUTES = 10;

const initialState: userState = {
  user: { name: null, inactiveTimeThreshold: TEN_MINUTES, defaultBlur: true },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<string | null>) => {
      state.user.name = action.payload;
    },
    updateSettings: (state, action: PayloadAction<UpdateSettingsPayload>) => {
      state.user.inactiveTimeThreshold = action.payload.inactiveTimeThreshold;
      state.user.defaultBlur = action.payload.defaultBlur;
    },
  },
});

export const { setUser, updateSettings } = userSlice.actions;
export default userSlice.reducer;
