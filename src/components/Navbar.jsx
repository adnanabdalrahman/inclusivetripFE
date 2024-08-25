import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { UserIcon, Bars3Icon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);
  // console.log("Navbar.jsx: userInfo: ", userInfo);
  document.querySelector("html").setAttribute("data-theme", "light");
  return (
    <header className="h-[126px] bg-white z-10">
      <div className="container mx-auto flex items-center justify-center h-full px-4 lg:px-8">
        <div className="flex items-center">
          <NavLink to="/" href="index.html">
            <img className="w-[206px] h-[44px]" src="./images/Logo.png" alt="Logo" />
         
          </NavLink>
        </div>
        {userInfo && (
          <div>
            <p className="text-2xl">Welcome, {userInfo.firstName}</p>
          </div>
        )}
        <nav className="flex flex-grow justify-between items-center">
          <div className="flex space-x-8 ml-8">
              <Link to="/" className="text-black">Home</Link>
              <Link to="/map" className="text-black">Karte</Link>
              <Link to="/create" className="text-black">Create</Link>
              <Link to="/user" className="text-black">User</Link>
                <Link to="/ratings" className="text-black">Ratings</Link>
             </div>
          <ul className="flex space-x-6">
            {userInfo && (
              <li>
                <NavLink to="myposts" className={({ isActive }) =>
                  (isActive ? "underline text-2xl hover:underline" : "text-2xl hover:underline")}>
                  My Posts
                </NavLink>
              </li>
            )}

            {!userInfo && (
              <>
                <li>
                  <NavLink
                    to="login"
                    className={({ isActive }) =>
                      isActive
                        ? "text-slate-200 text-2xl hover:underline hover:underline-offset-4"
                        : " text-2xl hover:underline hover:underline-offset-4"
                    }>
                    <UserIcon className="w-6 h-6 mr-2" />
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="signup"
                    className={({ isActive }) =>
                      isActive
                        ? "text-slate-200 text-2xl hover:underline hover:underline-offset-4"
                        : " text-2xl hover:underline hover:underline-offset-4"
                    }>
                    <Bars3Icon className="w-6 h-6" />
                  </NavLink>
                </li>
              </>
            )}
            {userInfo && (
              <button onClick={logout} className="text-2xl hover:underline">
                Logout
              </button>
            )}
          </ul>
         
        </nav>
      </div>
    </header>
  );
}
