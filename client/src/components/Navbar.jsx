import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl">My App</div>
        <div className="relative">
          <button
            onClick={toggleProfileDropdown}
            className="flex items-center text-white focus:outline-none"
          >
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 15v5a7 7 0 0 0 14 0v-5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z"
                />
              </svg>
            </div>
          </button>
          {isProfileOpen && (
            <div className="absolute flex flex-col right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <Link className="px-4 py-2 hover:bg-blue-100" to="/user/profile">
                Profile
              </Link>

              <Link className="px-4 py-2 hover:bg-blue-100" to="/">
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
