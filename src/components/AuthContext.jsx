import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

// import { dummyRoster } from "../../utils/temporaryPokemons";
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
    console.log("AuthContext.jsx: token: ", token);
    console.log(shouldFetch);
    if (token) {
      axios.get(authMeUrl, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: true,
      })
        .then((res) => {
          console.log("recieved data ", res.data);
          setUserInfo(res.data);
          navigate('/');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [shouldFetch]);

  useEffect(() => {
    console.log("shouldFetch changed:", shouldFetch);
    // Any other logic you want to execute when shouldFetch changes
  }, [shouldFetch]);


  function login(loginData) {
    axios
      .post(loginUrl, loginData, {
        withCredentials: true,
      })
      .then((res) => {
        // setUserInfo(res.data.user);
        setShouldFetch(true);
      })
      .catch((err) => {
        console.log(err);
        Cookies.remove('token');
        setUserInfo(null);
      });
  }



  function logout() {
    console.log("AuthContext - logout");
    Cookies.remove('token', { path: '/' });
    Cookies.remove('userData');
    setUserInfo(null);
    navigate('/login');
  }

  function signup(userData) {
    // console.log("AuthContext - logout");
    console.log(userData);
    axios
      .post(signupUrl, userData)
      .then((res) => {
        // console.log("Cookies after signup:", document.cookie);
        // console.log(res.data);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        setUserInfo(null);
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
      }}>
      {children}
    </AuthContext.Provider>
  );
};
