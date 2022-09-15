import axios from "../api/axios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await axios.post("/auth/revoke", null, {
        withCredentials: true,
      });
      setAuth({});
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
