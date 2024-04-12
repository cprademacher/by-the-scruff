import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home2 from "./pages/Home2.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import SingleProduct from "./pages/SingleProduct.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/user/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import UpdateProfile from "./pages/user/UpdateProfile.jsx";
import UploadAvatar from "./pages/user/UploadAvatar.jsx";
import UpdatePassword from "./pages/user/UpdatePassword.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Shipping from "./pages/Shipping.jsx";
import ConfirmOrder from "./pages/ConfirmOrder.jsx";
import PaymentMethod from "./pages/PaymentMethod.jsx";
import MyOrders from "./pages/order/MyOrders.jsx";
import OrderDetails from "./pages/order/OrderDetails.jsx";
import Invoice from "./pages/invoice/Invoice.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import ListProducts from "./pages/admin/ListProducts.jsx";
import NewProduct from "./pages/admin/NewProduct.jsx";
import UpdateProduct from "./pages/admin/UpdateProduct.jsx";
import UploadImages from "./pages/admin/UploadImages.jsx";
import ListOrders from "./pages/admin/ListOrders.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong Page!</h1>,
    children: [
      {
        index: true,
        element: <Home2 />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:id",
        element: <SingleProduct />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/me/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/me/update_profile",
        element: (
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/me/upload_avatar",
        element: (
          <ProtectedRoute>
            <UploadAvatar />
          </ProtectedRoute>
        ),
      },
      {
        path: "/me/update_password",
        element: (
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/password/forgot",
        element: <ForgotPassword />,
      },
      {
        path: "/password/reset/:token",
        element: <ResetPassword />,
      },
      {
        path: "/shipping",
        element: (
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        ),
      },
      {
        path: "/confirm_order",
        element: (
          <ProtectedRoute>
            <ConfirmOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "/payment_method",
        element: (
          <ProtectedRoute>
            <PaymentMethod />
          </ProtectedRoute>
        ),
      },
      {
        path: "/me/orders",
        element: (
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: "/me/order/:id",
        element: (
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/invoice/order/:id",
        element: (
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/dashboard",
        element: (
          <ProtectedRoute admin={true}>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/products",
        element: (
          <ProtectedRoute admin={true}>
            <ListProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/product/new",
        element: (
          <ProtectedRoute admin={true}>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/products/:id",
        element: (
          <ProtectedRoute admin={true}>
            <UpdateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/products/:id/upload_images",
        element: (
          <ProtectedRoute admin={true}>
            <UploadImages />
          </ProtectedRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <ProtectedRoute admin={true}>
            <ListOrders />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
