import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlice.js";
import cartReducer from "./features/cartSlice.js";

import { productApi } from "./api/productsApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";

// eslint-disable-next-line no-unused-vars
const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      authApi.middleware,
      userApi.middleware
    ),
});
// The store now has redux-thunk added and the Redux DevTools Extension is turned on

export default store;
