import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  let loggedInUser = null;

  try {
    loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  } catch (error) {
    console.error("Error parsing loggedInUser:", error);
  }

  return loggedInUser && loggedInUser.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
