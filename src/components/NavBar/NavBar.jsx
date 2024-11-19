import React from "react";
import { NavLink } from "react-router-dom"; // Import NavLink from react-router-dom

const NavBar = () => {
  return (
    <nav className="bg-zinc-900 p-4 shadow-md fixed top-0 left-0 w-full z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Website Name */}
        <h1 className="text-2xl font-bold text-gray-300">The Algo Show</h1>

        {/* Navigation Links */}
        <div className="space-x-4">
          <NavLink
            to="/"
            className="text-gray-300 hover:text-white"
            activeClassName="text-white font-bold" // Highlight active link
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className="text-gray-300 hover:text-white"
            activeClassName="text-white font-bold"
          >
            Contact
          </NavLink>
          <NavLink
            to="/review"
            className="text-gray-300 hover:text-white"
            activeClassName="text-white font-bold"
          >
            Review
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
