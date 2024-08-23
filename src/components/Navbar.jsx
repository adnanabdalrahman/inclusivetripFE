import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);
  // console.log("Navbar.jsx: userInfo: ", userInfo);
  document.querySelector("html").setAttribute("data-theme", "light");
  return (
    <header className=" bg-white p-4">
      <div className="container mx-auto flex items-center justify-between">
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
        <nav>
          <ul className="flex space-x-4 font-semibold items-center">
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
                    Login
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
                    Sign Up
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
