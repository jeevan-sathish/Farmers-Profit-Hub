import { configureStore } from "@reduxjs/toolkit";
import { authSignupApi } from "../features/auth/authSignupApi";

export const Store = configureStore({
  reducer: {
    [authSignupApi.reducerPath]: authSignupApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authSignupApi.middleware),
});
