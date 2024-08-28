import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext';

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

function User() {
  const { userInfo } = useContext(AuthContext);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    profilePhoto: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve the token from cookies
        const token = Cookies.get('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          withCredentials: true
        });
        console.log('User data fetched:', response.data); // log fetch daten
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error); // Log fehler
        toast.error("Fehler beim Laden der Benutzerdaten.");
      }
    };

    fetchUserData();
  }, []);

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
              {userData.profilePhoto && (
                <div className="flex items-center justify-end w-1/3 md:w-1/4">
                  <img
                    src={userData.profilePhoto}
                    alt="Profilfoto"
                    className="w-[223px] h-[285px] object-cover rounded-[24px]"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-start ml-8 mt-[-24]">
              <div className="flex flex-col items-center text-center p-4 font-poppins font-medium text-[32px] text-[#1E1E1E]">
                <div className="text-[32px]">
                  25
                </div>
                <div className="text-[18px] leading-[27px] mt-2 ml-8">
                  Bewertungen
                </div>
              </div>

              <div className="w-[64px] border border-[#1E1E1E] rotate-90"></div>

              <div className="flex flex-col items-center text-center p-4 font-poppins font-medium text-[32px] leading-[48px] text-[#1E1E1E]">
                <div className="text-[32px] leading-[48px]">
                  Mitglied seit
                </div>
                <div className="text-[18px] leading-[27px] mt-2">
                  Datum
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start p-16 gap-12 rounded-t-lg">
          <form>
            <div className="flex flex-row gap-4">
              <div className="flex-1 p-4">
                <div className="flex flex-col items-start gap-2 w-[487px] h-[50px]">
                  <label htmlFor="username" className="w-full h-[22px] text-[20px] font-bold leading-[140%] text-[#1E1E1E]">
                    Persönliche Daten
                  </label>
                </div>

                <div className="flex flex-col items-start gap-2 w-[487px] h-[70px]">
                  <label htmlFor="firstname" className="w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]">
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
                  <label htmlFor="lastname" className="mt-6 w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]">
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
                  <label htmlFor="email" className="mt-6 w-full h-[22px] text-[16px] font-normal leading-[140%] text-[#1E1E1E]">
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;