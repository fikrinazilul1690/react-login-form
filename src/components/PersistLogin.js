import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const logout = useLogout();
  const { auth, persist, isLoggedIn, setIsLoggedIn } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        persist ? await refresh() : await logout();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
        isMounted && !persist && setIsLoggedIn(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(auth);
    console.log(`at: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  useEffect(() => {
    console.log(`isLoggedIn: ${isLoggedIn}`);
  }, [isLoggedIn]);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );
};

export default PersistLogin;
