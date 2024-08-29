import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

function User() {
  const { userInfo } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: "",
  });
  const [profilePhoto, setProfilePhoto] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log("User data fetched:", response.data);
        setUserData(response.data);

        const profilePhotoUrl = response.data.profilePhoto;
        setProfilePhoto(profilePhotoUrl);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Fehler beim Laden der Benutzerdaten.");
      }
    };

    fetchUserData();
  }, []);

  const onDrop = async (acceptedFiles) => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);

    try {
      const response = await axios.post(
        `${API_URL}/profilePhotos/${userData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setProfilePhoto(response.data.profilePhoto);
      console.log("Profilfoto erfolgreich hochgeladen:", response.data);
    } catch (error) {
      console.error("Fehler beim Hochladen des Profilfotos:", error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <ToastContainer />
      <div className="flex flex-row md:flex-col items-top justify-center p-4">
        <div className="container mx-auto w-full min-h bg-[#C1DCDC] rounded-[24px] relative">
          <div className="flex flex-col justify-start p-8">
            <div className="flex justify-between items-center">
              <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                Profil {userData.firstName} {userData.lastName}
              </h1>
              {profilePhoto ? (
                <div className="flex items-center justify-end w-1/3 md:w-1/4">
                  <img
                    src={profilePhoto}
                    alt="Profilfoto"
                    className="w-[223px] h-[285px] object-cover rounded-[24px]"
                  />
                </div>
              ) : (
                <div
                  {...getRootProps()}
                  className="flex items-center justify-center w-1/3 md:w-1/4 border-dashed border-2 border-gray-400 rounded-[24px] cursor-pointer"
                >
                  <input {...getInputProps()} name="file" />
                  <p>Profilfoto hochladen</p>
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-start ml-8 mt-[-24]">
              <div className="flex flex-col items-center text-center p-4 font-poppins font-medium text-[32px] text-[#1E1E1E]">
                <div className="text-[32px]">25</div>
                <div className="text-[18px] leading-[27px] mt-2 ml-8">
                  Bewertungen
                </div>
              </div>

              <div className="w-[64px] border border-[#1E1E1E] rotate-90"></div>

              <div className="flex flex-col items-center text-center p-4 font-poppins font-medium text-[32px] leading-[48px] text-[#1E1E1E]">
                <div className="text-[32px] leading-[48px]">Mitglied seit</div>
                <div className="text-[18px] leading-[27px] mt-2">Datum</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start p-16 gap-12 rounded-t-lg">
          <form>
            <div className="flex flex-row gap-4">
              <div className="flex-1 p-4">
                <div className="flex flex-col items-start gap-2 w-[487px] h-[50px]">
                  <label
                    htmlFor="username"
                    className="w-full h-[22px] text-[20px] font-bold leading-[140%] text-[#1E1E1E]"
                  >
                    Persönliche Daten
                  </label>
                </div>

                <div className="flex flex-col items-start gap-2 w-[487px] h-[70px]">
                  <label
                    htmlFor="firstname"
                    className="w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]"
                  >
                    Vorname
                  </label>
                  <input
                    className="flex items-center px-4 py-3 w-[487px] min-w-[240px] h-[40px] bg-white border border-[#D9D9D9] rounded-lg"
                    type="text"
                    value={userData.firstName}
                    readOnly
                  />
                </div>

                <div className="flex flex-col items-start gap-2 w-[487px] h-[70px]">
                  <label
                    htmlFor="lastname"
                    className="mt-6 w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]"
                  >
                    Nachname
                  </label>
                  <input
                    className="flex items-center px-4 py-3 w-[487px] min-w-[240px] h-[40px] bg-white border border-[#D9D9D9] rounded-lg"
                    type="text"
                    value={userData.lastName}
                    readOnly
                  />
                </div>

                <div className="flex flex-col items-start gap-2 w-[487px] h-[70px]">
                  <label
                    htmlFor="email"
                    className="mt-6 w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]"
                  >
                    Email
                  </label>
                  <input
                    className="flex items-center px-4 py-3 w-[487px] min-w-[240px] h-[40px] bg-white border border-[#D9D9D9] rounded-lg"
                    type="email"
                    value={userData.email}
                    readOnly
                  />
                </div>
              </div>

              <div className="flex-1 p-0 ml-16  mt-0">
                <div className="mt-6 flex flex-col items-start gap-2 w-[487px] h-[50px]">
                  <label
                    htmlFor="username"
                    className="w-full h-[22px] text-[20px] font-bold leading-[140%] text-[#1E1E1E]"
                  >
                    Kategorien
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox"
                    />
                    <span className="text-[16px] font-normal leading-[140%] text-[#1E1E1E]">
                      Rollstuhlfahrer
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer ">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox  "
                    />
                    <span className="text-[16px] m  font-normal leading-[140%] text-[#1E1E1E]">
                      Kinderfreundlich
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer ">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox  "
                    />
                    <span className="text-[16px] font-normal leading-[140%] text-[#1E1E1E]">
                      Blind
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer ">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox  "
                    />
                    <span className="text-[16px] font-normal leading-[140%] text-[#1E1E1E]">
                      Taubstum
                    </span>
                  </label>
                </div>

                <div className="form-control">
                  <label className="label cursor-pointer ">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox  "
                    />
                    <span className="text-[16px] font-normal leading-[140%] text-[#1E1E1E]">
                      Mehrsprachig
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="ml-4 mt-32 flex justify-center items-center px-4 py-3 w-[487px] h-[40px] bg-[#FFD700] border border-[#2C2C2C] rounded-lg">
              <button type="submit">bearbeiten</button>
            </div>
          </form>
        </div>

        <div>
          <h1 className="font-poppins font-bold text-[18px] text-center pt-12 mt-12 text-[#000000]">
            Deine Bewertungen
          </h1>

          {/* erster Blockeintrag*/}

          <div className="container mx-auto w-full bg-[#C1DCDC] rounded-[24px] mt-8">
            <div className="w-full text-left p-8">
              <div className="flex items-center justify-between">
                <h1 className=" font-poppins font-bold text-[18px] text-[#000000]">
                  {" "}
                  Deine Bewertung vom 08.08.2024
                </h1>

                <div className="space-x-1 rating">
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-[#FFD700]"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-[#FFD700]"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-[#FFD700]"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-[#FFD700]"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-[#FFD700]"
                  />
                </div>
              </div>
              <p className="mt-4 font-poppins font-medium text-[rgba(30,30,30,0.5)] text-left">
                Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Jorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis. Class aptent taciti sociosqu
                ad litora torquent per conubia nostra, per inceptos
              </p>

              {/* Button ädern und löschen */}

              <button
                className="btn bg-[#FFD700]  border-black  w-36 p-2 h-12 min-h-2 m-2 justify-center float-right"
                onClick={() => handleRateClick(place)}
              >
                ändern
              </button>

              <button
                className="btn bg-[#FFD700] border-black w-36 p-2 h-12 min-h-2 m-2 justify-center float-right"
                onClick={() => handleRateClick(place)}
              >
                löschen
              </button>
            </div>
          </div>
          {/* zweiter Blockeintrag*/}

          <div className=" container mx-auto w-full  bg-[#C1DCDC] rounded-[24px] mt-16 mb-16">
            <div className="w-full text-left p-8">
              <div className="flex items-center justify-between">
                <h1 className=" font-poppins font-bold text-[18px] text-[#000000]">
                  {" "}
                  Deine Bewertung vom 08.06.2024
                </h1>

                <div className="space-x-1 rating">
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-[#FFD700]"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-[#FFD700]"
                    defaultChecked
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-[#FFD700]"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-[#FFD700]"
                  />
                  <input
                    type="radio"
                    name="rating-1"
                    className="mask mask-star bg-[#FFD700]"
                  />
                </div>
              </div>
              <p className="mt-4 font-poppins font-medium text-[rgba(30,30,30,0.5)] text-left">
                Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                vulputate libero et velit interdum, ac aliquet odio mattis.
                Class aptent taciti sociosqu ad litora torquent per conubia
                nostra, per inceptos himenaeos. Jorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nunc vulputate libero et velit
                interdum, ac aliquet odio mattis. Class aptent taciti sociosqu
                ad litora torquent per conubia nostra, per inceptos
              </p>

              {/* Button ädern und löschen */}

              <button
                className="btn bg-[#FFD700]  border-black  w-36 p-2 h-12 min-h-2 m-2 justify-center float-right"
                onClick={() => handleRateClick(place)}
              >
                ändern
              </button>

              <button
                className="btn bg-[#FFD700] border-black w-36 p-2 h-12 min-h-2 m-2 justify-center float-right"
                onClick={() => handleRateClick(place)}
              >
                löschen
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
