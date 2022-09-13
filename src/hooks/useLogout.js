import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const logout = async () => {
    try {
      await axiosPrivate
        .patch("/auth/revoke", null, {
          withCredentials: true,
        })
        .then(() => {
          setAuth({});
        });
    } catch (err) {
      console.log(err);
    }
  };

  return logout;
};

export default useLogout;
