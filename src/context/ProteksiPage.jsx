import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const loggedInUser = (() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("loggedInUser")) || {};
      } catch (error) {
        console.error("Error parsing loggedInUser:", error);
        return {};
      }
    }
    return {};
  })();

  return loggedInUser?.token ? <Outlet /> : <Navigate to="/#/login" />;
};

export default ProtectedRoute;
