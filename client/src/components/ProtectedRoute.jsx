/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./Loader.jsx";

export default function ProtectedRoute({ admin, children }) {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) return <Loader />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (admin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
