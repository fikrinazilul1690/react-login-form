import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const logout = useLogout();
  const { auth } = useAuth();
  const [persist] = useLocalStorage("persist", false);

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        persist ? await refresh() : await logout();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  // Delete on prod
  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(auth.user);
    console.log(`at: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
