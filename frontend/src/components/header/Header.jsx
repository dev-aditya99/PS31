import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";
import { useAuthContext } from "../../context/AuthContext";
import { useMainContext } from "../../context/MainContext";

const MenuIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);
const XIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
  </svg>
);

const Header = () => {
  // contexts
  const { authUser } = useAuthContext();
  const { currentPath, setCurrentPath } = useMainContext();

  // states
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  // useEffects
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  // functions
  const scroollHandler = () => {
    if (window.scrollY > 50) {
      document.querySelector("header").classList.add("shadow-lg");
      document.querySelector("header").classList.add("border-gray-200");
      document.querySelector("header").classList.remove("border-transparent");
    } else {
      document.querySelector("header").classList.remove("shadow-lg");
      document.querySelector("header").classList.remove("border-gray-200");
      document.querySelector("header").classList.add("border-transparent");
    }
  };

  window.addEventListener("scroll", scroollHandler);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setCurrentPath("/auth/login");
    window.location.href = "/auth/login";
  };

  return (
    <header className="md:mt-3 mt-2 w-[98%] max-w-[1280px] m-auto bg-[#f9fafb]/[0.85] backdrop-blur-md  border border-transparent rounded-xl flex justify-between items-center p-4 sticky md:top-3 top-2 z-50 transition-shadow duration-200">
      <Link to="/" className="text-2xl font-bold text-gray-800">
        LearnX Pro
      </Link>

      <nav className="flex justify-between items-center">
        {/* Navbar for large devices */}
        <div className="hidden md:flex items-center space-x-8 text-gray-600">
          {!authUser && (
            <NavLink
              to="/"
              className={`text-gray-600 hover:text-blue-600 transition-colors`}
            >
              Home
            </NavLink>
          )}

          <NavLink
            to="/student/dashboard"
            className={`text-gray-600 hover:text-blue-600 transition-colors`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/student/career"
            className={`text-gray-600 hover:text-blue-600 transition-colors`}
          >
            Careers
          </NavLink>
        </div>

        {/* login and register links  */}
        {!authUser ? (
          <div className="hidden md:block ml-4 border-l border-gray-500">
            <Link
              to="/auth/login"
              className="px-4 py-2 text-gray-700 hover:text-blue-600"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
            >
              Register
            </Link>
          </div>
        ) : (
          <button
            className="px-4 py-2 text-gray-700 hover:text-blue-600"
            onClick={logoutHandler}
          >
            Logout
          </button>
        )}
        {/* Navbar for small devices */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isOpen ? (
              <XIcon className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Menu for small devices */}
        <div
          className={`md:hidden absolute left-0 top-[70px] w-full bg-white border rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-4 pt-2 pb-3 space-y-2">
            <NavLink
              to="/"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-100"
            >
              Home
            </NavLink>
            <NavLink
              to="/student/dashboard"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-100"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/student/career"
              onClick={closeMenu}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-black hover:bg-gray-100"
            >
              Careers
            </NavLink>
          </div>

          {/* login and register links */}
          {!authUser && (
            <div className="px-4 py-3 border-t border-gray-200 space-y-2">
              <Link
                to="/auth/register"
                onClick={closeMenu}
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
              >
                Register
              </Link>
              <Link
                to="/auth/login"
                onClick={closeMenu}
                className="block w-full text-center mt-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
