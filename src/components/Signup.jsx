import { useContext, useState } from "react";

import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";

export default function SignupForm() {
  const { signup, userInfo } = useContext(AuthContext);
  const [error, setError] = useState(false);

  const [signupData, setSignupData] = useState({
    email: "",
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

          <div className="flex flex-col md:flex-row items-top p-4">
            <div className="flex flex-col md:flex-row">

            </div>
            <div className="container mx-auto w-full  bg-[#C1DCDC] rounded-[24px] relative">

              <div className="flex flex-col md:flex-row w-full p-8">
                <div className="flex flex-col w-full md:w-2/3 text-left">
                  <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                    Registrierung
                  </h1>
                  <div className="mt-4 text-[#1E1E1E] font-poppins font-medium text-[32px] leading-[48px]">
                    Lege dir ein Profil an, um <br />Bewertungen abgeben zu können
                  </div>
                </div>
                <div className="flex items-center justify-end w-full md:w-1/3 mt-8 md:mt-0">
                  <div className="w-[223px] h-[285px] bg-[#E6E6F0] rounded-[24px]">
                    <label className="flex space-x-1 items-center justify-center p-4 bg-[#4E4958] text-white rounded-lg cursor-pointer">
                      <span>Foto hochladen</span>
                      <input type="file" className="hidden" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="text-3xl">
            <form action="submit" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3 min-h-screen max-w-[20rem]  m-auto">


                <label className="input input-bordered flex items-center gap-2 w-full">
                  Email
                  <input onChange={handleChange} value={signupData.email} type="text" name="email"
                    className="grow" placeholder="email" />
                </label>

                {/* <label className="input input-bordered flex items-center gap-2 w-full">
                  User Name
                  <input onChange={handleChange} value={signupData.username} type="text"
                    name="username" className="grow" placeholder="username" />
                </label> */}

                <label className="input input-bordered flex items-center gap-2 w-full">
                  Passwort
                  <input onChange={handleChange} value={signupData.password}
                    type="password" name="password" className="grow"
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 w-full">
                  Vorname
                  <input onChange={handleChange} value={signupData.firstName} type="text" name="firstName"
                    className="grow" placeholder="First Name" />
                </label>

                <label onChange={handleChange} value={signupData.lastName}
                  className="input input-bordered flex items-center gap-2 w-full">
                  Nachname
                  <input type="text" name="lastName" className="grow" placeholder="Last Name" />
                </label>

                <button type="submit" className="btn btn-outline bg-[#FFD700] boarder-black ">
                  speichern
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
