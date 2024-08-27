import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

  const loginUrl = `${API_URL}/auth/signin`;
  const signupUrl = `${API_URL}/auth/register`;
  const authMeUrl = `${API_URL}/auth/me`;

  const [userInfo, setUserInfo] = useState(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      axios.get(authMeUrl, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then((res) => {
          setUserInfo(res.data);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [shouldFetch]);

  function login(loginData) {
    axios
      .post(loginUrl, loginData, {
        withCredentials: true,
      })
      .then((res) => {
        setShouldFetch(prev => !prev);
      })
      .catch((err) => {
        console.log(err);
        Cookies.remove('token');
        setUserInfo(null);
      });
  }



  function logout() {
    Cookies.remove('token', { path: '/' });
    Cookies.remove('userData');
    setUserInfo(null);
    navigate('/login');
  }

  function signup(userData) {
    axios
      .post(signupUrl, userData)
      .then((res) => {
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        setUserInfo(null);
      });
  }

  function uploadProfilePhoto(file) {
    const formData = new FormData();
    formData.append('profilePhoto', file);

    return axios.post(uploadPhotoUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        userInfo,
        setUserInfo,
        login,
        logout,
        signup,
        uploadProfilePhoto,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
