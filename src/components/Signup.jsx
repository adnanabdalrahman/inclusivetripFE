import { useContext, useState } from "react";

import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function SignupForm() {
  const { signup, userInfo } = useContext(AuthContext);
  const [error, setError] = useState(false);

  const [signupData, setSignupData] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  function handleSubmit(e) {
    e.preventDefault();

    if (!signupData.email || !signupData.password || !signupData.firstName || !signupData.lastName) {
      setError(true);
      return;
    }

    // console.log(signupData);
    signup(signupData);
  }

  function handleChange(e) {
    e.preventDefault();
    setError(false);
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }
  return (
    <>
      {userInfo ? (
        <Navigate to="/" />
      ) : (
        <div>
          <div className="text-3xl">
            <form action="submit" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3 items-center justify-center min-h-screen max-w-[20rem]  m-auto">
                <p>Register new account</p>

                <label className="input input-bordered flex items-center gap-2 w-full">
                  Email
                  <input onChange={handleChange} value={signupData.email} type="text" name="email"
                    className="grow" placeholder="email" />
                </label>

                <label className="input input-bordered flex items-center gap-2 w-full">
                  Username
                  <input onChange={handleChange} value={signupData.username} type="text"
                    name="username" className="grow" placeholder="username" />
                </label>

                <label className="input input-bordered flex items-center gap-2 w-full">
                  Password
                  <input onChange={handleChange} value={signupData.password}
                    type="password" name="password" className="grow"
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 w-full">
                  First Name
                  <input onChange={handleChange} value={signupData.firstName} type="text" name="firstName"
                    className="grow" placeholder="First Name" />
                </label>

                <label onChange={handleChange} value={signupData.lastName}
                  className="input input-bordered flex items-center gap-2 w-full">
                  Last Name
                  <input type="text" name="lastName" className="grow" placeholder="Last Name" />
                </label>

                <button type="submit" className="btn btn-outline">
                  Signup
                </button>
                {error && (
                  <div role="alert" className="alert alert-warning text-base ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current " fill="none" viewBox="0 0 24 24">
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
            </form>
          </div>
        </div>
      )}
    </>
  );
}
