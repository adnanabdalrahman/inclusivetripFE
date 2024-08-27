import { useContext, useState, useCallback } from "react";
// import { useDropzone } from 'react-dropzone';
import { AuthContext } from "./AuthContext";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignupForm() {
  const { signup, userInfo, uploadProfilePhoto } = useContext(AuthContext);
  const [error, setError] = useState(false);
  // const [profilePhoto, setProfilePhoto] = useState(null);

  const [signupData, setSignupData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: ""
  });

  // const onDrop = useCallback((acceptedFiles) => {
  //   setProfilePhoto(acceptedFiles[0]);
  // }, []);

  // const { getRootProps, getInputProps } = useDropzone({ onDrop });

  function handleSubmit(e) {
    e.preventDefault();

    if (!signupData.email || !signupData.password || !signupData.firstName || !signupData.lastName) {
      setError(true);
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwörter stimmen nicht überein!");
      return;
    }

    if (signupData.password.length < 8) {
      toast.error("Passwort muss mindestens 8 Zeichen lang sein!");
      return;
    }

    // signup(signupData).then(() => {
    //   if (profilePhoto) {
    //     uploadProfilePhoto(profilePhoto).then(() => {
         
    //     });
    //   }
    // });
  }

  function handleChange(e) {
    e.preventDefault();
    setError(false);
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }

  return (
    <>
      <ToastContainer />
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
                
              </div>
            </div>
          </div>

          <div className="text-3xl">
            <form action="submit" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3 min-h-screen max-w-[20rem]  m-auto">
                <label className="input input-bordered flex items-center gap-2 w-full">
                
                  <input onChange={handleChange} value={signupData.email} type="text" name="email"
                    className="grow" placeholder="Email" />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  
                  <input onChange={handleChange} value={signupData.firstName} type="text" name="firstName"
                    className="grow" placeholder="Vorname" />
                </label>

                <label onChange={handleChange} value={signupData.lastName}
                  className="input input-bordered flex items-center gap-2 w-full">
                  
                  <input type="text" name="lastName" className="grow" placeholder="Nachname" />
                </label>
               <label className="input input-bordered flex items-center gap-2 w-full">
                  
                  <input onChange={handleChange} value={signupData.password}
                    type="password" name="password" className="grow" placeholder="Passwort"
                  />
                </label>

                <label className="input input-bordered flex items-center gap-2 w-full">
                  
                  <input onChange={handleChange} value={signupData.confirmPassword}
                    type="password" name="confirmPassword" className="grow" placeholder="Passwort bestätigen"
                  />
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