import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
  const { auth, isLoggedIn } = useAuth();
  const location = useLocation();

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    !isLoggedIn && <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
