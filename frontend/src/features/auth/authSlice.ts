import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
interface AuthState {
  user: User | null;
  fph_access_token: string | null;
  fph_refresh_token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  fph_access_token: null,
  fph_refresh_token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        fph_access_token: string;
        fph_refresh_token: string;
      }>,
    ) => {
      state.user = action.payload.user;
      state.fph_access_token = action.payload.fph_access_token;
      state.fph_refresh_token = action.payload.fph_refresh_token;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.fph_access_token = null;
      state.fph_refresh_token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
