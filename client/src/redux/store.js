import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi";

// eslint-disable-next-line no-unused-vars
export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on