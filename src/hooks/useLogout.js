import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      setAuth({});
      await axios.post("/auth/revoke", null, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
