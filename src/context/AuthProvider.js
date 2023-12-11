import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({
  auth: {},
  setAuth: () => {},
});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const updateAuthFromCookie = async () => {
      const jwtCookie = document.cookie.split("; ").find((row) => row.startsWith("jwt="));
      console.log("AuthProvider, cookie:" + jwtCookie + " auth:" + auth);

      if (jwtCookie) {
        const jwtToken = jwtCookie.split("=")[1];

        const response = await fetch("https://damp-basin-12729-bd0230035c83.herokuapp.com/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          console.log("Authprovider, getuserdata, if response ok:" + JSON.stringify(userData));
          userData["token"] = jwtToken;
          setAuth((prevAuth) => {
            console.log("Authprovider, getuserdata, if response ok, auth:" + JSON.stringify(prevAuth));
            return userData;});
        }
      }
    };

    updateAuthFromCookie();
  }, []); 

  return <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
  </AuthContext.Provider>
}

export default AuthContext;
