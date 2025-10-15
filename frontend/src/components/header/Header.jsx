import React from "react";
import { Link } from "react-router-dom";
import { RiMenu2Line } from "react-icons/ri";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 flex justify-between items-center p-4 sticky top-0 z-50 shadow-sm">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          LearnX Pro
        </Link>

      <nav className="flex justify-between items-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 text-gray-600">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/student/dashboard"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            to="/student/career"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Careers
          </Link>
        </div>

        <div className="hidden md:block ml-4 border-l border-gray-500">
          <Link
            to="/login"
            className="px-4 py-2 text-gray-700 hover:text-blue-600"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Button (optional, for display) */}
        <div className="md:hidden">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none duration-200">
            <RiMenu2Line className="w-6 h-6"/>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;