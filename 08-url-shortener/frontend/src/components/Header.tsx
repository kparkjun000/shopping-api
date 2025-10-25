import React from "react";
import { Link } from "react-router-dom";
import { LinkIcon } from "@heroicons/react/24/outline";

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <LinkIcon className="h-8 w-8 text-primary-600" />
            <Link to="/" className="ml-2 text-2xl font-bold text-gray-900">
              URL Shortener
            </Link>
          </div>
          <nav className="flex space-x-8">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
