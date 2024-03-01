import { configureStore } from "@reduxjs/toolkit";
import { productApi } from "./api/productsApi";
import { authApi } from "./api/authApi";

// eslint-disable-next-line no-unused-vars
const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware, authApi.middleware),
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

export default store;
