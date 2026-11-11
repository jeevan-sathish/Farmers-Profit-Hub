import { configureStore } from "@reduxjs/toolkit";
import { messageApi } from "../demo/demoApi";
export const Store = configureStore({
  reducer: {
    [messageApi.reducerPath]: messageApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(messageApi.middleware),
});
