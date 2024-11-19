import React from "react";
import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get current year

  return (
    <footer className="bg-zinc-900 text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Left Side: Created by */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">
            Created by{" "}
            <a href="https://www.linkedin.com/in/jatin-jaglan/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
              Jatin Jaglan
            </a>
          </p>
        </div>

        {/* Center: Copyright */}
        <div className="text-center mb-4 md:mb-0">
          <p className="text-sm">
            &copy; {currentYear} All Rights Reserved
          </p>
        </div>

        {/* Right Side: Social Media Icons */}
        <div className="flex space-x-6 justify-center">
          <a href="https://www.linkedin.com/in/jatinjaglan/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-xl hover:text-blue-500" />
          </a>
          <a href="https://github.com/jatinjaglan347" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-xl hover:text-gray-400" />
          </a>
          <a href="https://www.instagram.com/jatinjaglan347/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-xl hover:text-pink-500" />
          </a>
          <a href="https://twitter.com/jatin_jaglan347" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-xl hover:text-blue-400" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
