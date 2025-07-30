import { configureStore } from "@reduxjs/toolkit";
import { allApi } from "../../entities/allApi";

export let store = configureStore({
  reducer: {
    [allApi.reducerPath]: allApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(allApi.middleware),
});
