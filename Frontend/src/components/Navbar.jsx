import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/");
  };

  const linkBase =
    "text-sm md:text-base font-medium text-gray-300 hover:text-white transition";

  return (
    <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        {/* Brand */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-red-600 to-amber-400 flex items-center justify-center text-xs font-extrabold text-white shadow-lg">
            BM
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            Bookmate
          </span>
        </button>

        {/* Links */}
        <div className="flex items-center gap-5 md:gap-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-white" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? "text-white" : ""}`
            }
          >
            Events
          </NavLink>
          {token && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? "text-white" : ""}`
              }
            >
              Profile
            </NavLink>
          )}
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          {!token ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? "text-white" : ""}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-500 transition"
              >
                Sign up
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="rounded-full border border-slate-600 px-4 py-1.5 text-sm font-semibold text-gray-200 hover:bg-slate-800 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

