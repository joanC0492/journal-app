import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IauthState } from "@/app/auth/domain";

const initialState: IauthState = {
  status: "checking",
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IauthState>) => {
      // La asignacion masiva solo funciona con el assign
      state = Object.assign(state, { ...action.payload });
    },
    logout: (state, action: PayloadAction<IauthState>) => {
      // La asignacion masiva solo funciona con el assign
      state = Object.assign(state, { ...action.payload });
    },
    checkingCredentials: (state, action: PayloadAction<IauthState>) => {
      state.status = action.payload.status;
      console.log("checking...");
    },
  },
});
// Action creators are generated for each case reducer function
export const { login, logout, checkingCredentials } = authSlice.actions;

