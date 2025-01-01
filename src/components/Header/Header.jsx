import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-bold text-pink-800">TravelBooking</div>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-700 hover:text-pink-800">Home</a>
              <a href="#" className="text-gray-700 hover:text-pink-800">About Us</a>
              <a href="#" className="text-gray-700 hover:text-pink-800">Agents</a>
              <a href="#" className="text-gray-700 hover:text-pink-800">Blog</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-800"
              />
            </div>
            <button className="px-4 py-2 text-pink-800 hover:text-pink-900">Sign In / Sign Up</button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;