import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FetchUserData } from "./FetchUserData";
import { ProfilePhotoUpload } from "./ProfilePhotoUpload";
import { UserProfileForm } from "./UserProfileForm";

function User() {
  const [userData, setUserData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: "",
  });
  const [profilePhoto, setProfilePhoto] = useState("");

  return (
    <>
      <div>
        <ToastContainer />
        <FetchUserData
          setUserData={setUserData}
          setProfilePhoto={setProfilePhoto}
        />
        <div className="flex flex-row md:flex-col items-top justify-center p-4">
          <div className="container mx-auto w-full min-h bg-[#C1DCDC] rounded-[24px] relative">
            <div className="flex flex-col justify-start p-8">
              <div className="flex justify-between items-center">
                <h1 className="font-poppins font-extrabold text-3xl md:text-5xl lg:text-6xl leading-tight text-black">
                  Profil {userData.firstName} {userData.lastName}
                </h1>
                <ProfilePhotoUpload
                  userData={userData}
                  profilePhoto={profilePhoto}
                  setProfilePhoto={setProfilePhoto}
                />
              </div>

              <div className="flex flex-col md:flex-row items-center justify-start ml-8 mt-[-24px]">
                <UserProfileForm
                  userData={userData}
                  setUserData={setUserData}
                />
              </div>
            </div>
          </div>
        </div>
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
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Jorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nunc vulputate libero et velit interdum, ac
              aliquet odio mattis. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos
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
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Jorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nunc vulputate libero et velit interdum, ac
              aliquet odio mattis. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos
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
    </>
  );
}

export default User;
