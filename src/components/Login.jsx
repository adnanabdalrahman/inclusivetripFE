import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function Login() {
  const { login, userInfo } = useContext(AuthContext);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  function handleChange(e) {
    setError(false);
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  }

  function handleLogin() {
    if (!loginData.email || !loginData.password) {
      setError(true);
      return;
    }
    // console.log(loginData.email, loginData.password);
    login(loginData);
  }

  return (
    <div className="min-h-screen text-lg">
      {userInfo ? (
        <Navigate to="/" />
      ) : (
        <div className=" max-w-[50rem] m-auto flex flex-col gap-6 items-center py-32 mt-16 bg-[#C1DCDC] rounded-[24px] ">
                <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input name="email" onChange={handleChange} type="text" className="grow" placeholder="Email" value={loginData.email} />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input name="password" onChange={handleChange} type="password" className="grow" value={loginData.password} />
          </label>
          <button onClick={handleLogin} className="btn bg-[#FFD700] boarder-black border-black px-8 font-normal  ">   
           
            Login
          </button>

<a
              href="#"
              className="w-[170px] h-[26px] text-[16px] font-normal leading-[140%] underline text-[#1E1E1E]"
            >
              Passwort vergessen?
            </a>

            <a
              href="signup"
              className="w-[170px] h-[26px] text-[16px] font-normal leading-[140%] underline text-[#1E1E1E]"
            >
              Noch keinen Account?
            </a>

          {error && (
            <div role="alert" className="alert alert-warning">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>All fields are required</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
