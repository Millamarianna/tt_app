import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuthentication = () => {
  const { isLoggedIn, auth } = useAuth();
  console.log("requireauth:" + JSON.stringify(auth));

  return isLoggedIn && auth.first_name ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuthentication;