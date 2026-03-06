import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavLinkClass = ({ isActive }) =>
  isActive
    ? "text-purple-700 font-semibold"
    : "text-gray-700 hover:text-purple-600 transition";

export default function Navbar() {
  return (
    <nav className="bg-white ring-1 ring-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-3xl font-bold text-purple-700">
              Athenora <span className="text-yellow-400"> Academy</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-700 font-semibold text-xl"
                  : "text-gray-700 hover:text-purple-600 transition text-xl"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-700 font-semibold text-xl"
                  : "text-gray-700 hover:text-purple-600 transition text-xl"
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-700 font-semibold text-xl"
                  : "text-gray-700 hover:text-purple-600 transition text-xl"
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-700 font-semibold text-xl"
                  : "text-gray-700 hover:text-purple-600 transition text-xl"
              }
            >
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
