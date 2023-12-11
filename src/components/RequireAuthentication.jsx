import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuthentication = () => {
  const { auth } = useAuth();
  const isLoggedIn = () => {
    const jwtCookie = document.cookie.split("; ").find((row) => row.startsWith("jwt="));
    if (jwtCookie && jwtCookie.split("=")[1] !== undefined && jwtCookie.split("=")[1] !== ""){
        return true;
    }
    return false;
    }
  console.log("requireauth:" + JSON.stringify(auth));

  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuthentication;