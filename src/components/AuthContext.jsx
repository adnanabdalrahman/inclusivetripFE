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

    if (token) {
      axios
        .get(authMeUrl, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log("AuthContext.jsx: res.data: ", res.data);
          setUserInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [shouldFetch]);

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
        console.log(res.data);
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        setUserInfo(null);
      });
  }

  function login(loginData) {
    // console.log({ login, password });
    axios
      .post(loginUrl, loginData, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        // console.log("Cookies after signup:", document.cookie);
        // setUserInfo(res.data.user);
        setShouldFetch(true);
        console.log(shouldFetch);
      })
      .catch((err) => {
        console.log(err);
        Cookies.remove('token');
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
