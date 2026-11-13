import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import authReducer from "../features/auth/authSlice";

export const Store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
