import React from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter, FaHeart } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-t from-black to-zinc-900 text-gray-300 py-8 border-t border-zinc-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left Side: Created by */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <p className="text-sm flex items-center justify-center md:justify-start">
            Created with <FaHeart className="text-red-500 mx-1 animate-pulse" /> by{" "}
            <a 
              href="https://www.linkedin.com/in/jatin-jaglan/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-1 text-blue-400 hover:text-blue-300 transition-colors duration-300 underline decoration-dotted underline-offset-2"
            >
              Jatin Jaglan
            </a>
          </p>
        </div>

        {/* Center: Copyright */}
        <div className="text-center mb-6 md:mb-0">
          <p className="text-sm">
            &copy; {currentYear} The Algo Show. All Rights Reserved
          </p>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="flex space-x-6 justify-center">
          <a 
            href="https://www.linkedin.com/in/jatinjaglan/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform duration-200"
          >
            <FaLinkedin className="text-xl hover:text-blue-400 transition-colors duration-300" />
          </a>
          <a 
            href="https://github.com/jatinjaglan347" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform duration-200"
          >
            <FaGithub className="text-xl hover:text-gray-400 transition-colors duration-300" />
          </a>
          <a 
            href="https://www.instagram.com/jatinjaglan347/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform duration-200"
          >
            <FaInstagram className="text-xl hover:text-pink-400 transition-colors duration-300" />
          </a>
          <a 
            href="https://twitter.com/jatin_jaglan347" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transform hover:scale-110 transition-transform duration-200"
          >
            <FaTwitter className="text-xl hover:text-blue-400 transition-colors duration-300" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
