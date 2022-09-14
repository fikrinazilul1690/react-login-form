import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("login") || false)
  );
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist") || false)
  );

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
