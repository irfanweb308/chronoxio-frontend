import React from 'react';
import { Link } from 'react-router';

const PublicNavBar = () => {
  return (
    <nav className="flex justify-between items-center p-4 border border-base-100 bg-gray-200">
       
      <div className="text-2xl font-bold text-blue-600">
        <span className="animated-rgb-text font-bold text-3xl">Chronoxio</span>
      </div>

       
      <div className="space-x-6 flex items-center">
        <Link to="/services" className="text-gray-600 hover:text-blue-600">
          Services
        </Link>
        <Link to="/contact-us" className="text-gray-600 hover:text-blue-600">
          Contact Us
        </Link>

        <Link
          to="/login"
          className="px-4 py-2 rounded text-blue-600 border border-blue-600 hover:bg-blue-50"
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default PublicNavBar;