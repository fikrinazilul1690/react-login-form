import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../api/axios";
import useInput from "../hooks/useInput";
import useToggle from "../hooks/useToggle";

import jwtDecode from "jwt-decode";
const LOGIN_URL = "/auth/login";

const Login = () => {
  const { setAuth } = useAuth();
  const [check, toggleCheck] = useToggle("persist", false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();
  const errRef = useRef();

  const [email, resetEmail, emailAttr] = useInput("email", "");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      const accessToken = response?.data?.access_token;
      const decode = accessToken ? jwtDecode(accessToken) : undefined;
      setAuth({ user: decode?.sub.data });
      resetEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        console.log(err.response.data.error);
        const { password, email } = err.response.data.error;
        if (!!email && !!!password) {
          setErrMsg(email[0]);
        } else if (!!password && !!!email) {
          setErrMsg(password[0]);
        } else {
          setErrMsg("Missing Email and Password");
        }
      } else if (err.response?.status === 401) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type={"text"}
          id="email"
          ref={emailRef}
          autoComplete="off"
          {...emailAttr}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type={"password"}
          id="password"
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
          required
        />
        <button>Sign In</button>
        <div className="persistCheck">
          <input
            type={"checkbox"}
            id="persist"
            onChange={toggleCheck}
            checked={check}
          />
          <label htmlFor="persist">Trust This Device</label>
        </div>
      </form>
      <p>
        Need an Account?
        <br />
        <span>
          {/*put router link here */}
          <Link to={"/register"}>Sign Up</Link>
        </span>
      </p>
    </section>
  );
};

export default Login;
