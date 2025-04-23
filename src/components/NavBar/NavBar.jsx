import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { FaCode, FaBars, FaTimes, FaSun, FaMoon, FaGithub } from "react-icons/fa";
import { ThemeContext } from "../../App";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${
      isScrolled 
        ? isDarkMode 
            ? "bg-zinc-900/95 shadow-lg backdrop-blur-sm" 
            : "bg-white/95 shadow-lg backdrop-blur-sm"
        : isDarkMode
            ? "bg-zinc-900"
            : "bg-white"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex items-center">
          <FaCode className="text-blue-500 text-2xl mr-2" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-600 bg-clip-text text-transparent">
            The Algo Show
          </h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <div className="flex space-x-6 mr-6">
            <NavLink
              to="/"
              className={({ isActive }) => 
                isActive 
                  ? "text-blue-400 font-semibold relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-blue-400 after:left-0 after:-bottom-1" 
                  : `${isDarkMode ? "text-gray-300" : "text-gray-600"} hover:text-${isDarkMode ? "white" : "black"} transition-colors duration-200 relative hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-400 hover:after:left-0 hover:after:-bottom-1`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => 
                isActive 
                  ? "text-blue-400 font-semibold relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-blue-400 after:left-0 after:-bottom-1" 
                  : `${isDarkMode ? "text-gray-300" : "text-gray-600"} hover:text-${isDarkMode ? "white" : "black"} transition-colors duration-200 relative hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-400 hover:after:left-0 hover:after:-bottom-1`
              }
            >
              Contact
            </NavLink>
            <NavLink
              to="/review"
              className={({ isActive }) => 
                isActive 
                  ? "text-blue-400 font-semibold relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-blue-400 after:left-0 after:-bottom-1" 
                  : `${isDarkMode ? "text-gray-300" : "text-gray-600"} hover:text-${isDarkMode ? "white" : "black"} transition-colors duration-200 relative hover:after:content-[''] hover:after:absolute hover:after:w-full hover:after:h-0.5 hover:after:bg-blue-400 hover:after:left-0 hover:after:-bottom-1`
              }
            >
              Review
            </NavLink>
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle button */}
            <button 
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? "bg-zinc-800 hover:bg-zinc-700" : "bg-gray-200 hover:bg-gray-300"} transition-colors duration-300 text-gray-300`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
            </button>
            
            {/* GitHub link */}
            <a 
              href="https://github.com/jatinjaglan347" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${isDarkMode ? "bg-zinc-800 hover:bg-zinc-700" : "bg-gray-200 hover:bg-gray-300"} transition-colors duration-300 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
              aria-label="GitHub Repository"
            >
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Mobile: Menu and Action Buttons */}
        <div className="md:hidden flex items-center space-x-3">
          {/* Theme toggle button (mobile) */}
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${isDarkMode ? "bg-zinc-800" : "bg-gray-200"} ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-600" />}
          </button>
          
          {/* Menu button */}
          <button 
            className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} focus:outline-none`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isDarkMode ? "bg-zinc-800" : "bg-gray-100"} transition-all duration-300 overflow-hidden ${
        isMenuOpen ? "max-h-64 py-4" : "max-h-0"
      }`}>
        <div className="flex flex-col space-y-4 px-4">
          <NavLink
            to="/"
            className={({ isActive }) => 
              isActive ? "text-blue-400 font-medium" : isDarkMode ? "text-gray-300" : "text-gray-700"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => 
              isActive ? "text-blue-400 font-medium" : isDarkMode ? "text-gray-300" : "text-gray-700"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/review"
            className={({ isActive }) => 
              isActive ? "text-blue-400 font-medium" : isDarkMode ? "text-gray-300" : "text-gray-700"
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Review
          </NavLink>
          
          {/* GitHub link (mobile) */}
          <a 
            href="https://github.com/jatinjaglan347" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`${isDarkMode ? "text-gray-300" : "text-gray-700"} flex items-center gap-2`}
            onClick={() => setIsMenuOpen(false)}
          >
            <FaGithub /> GitHub
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
