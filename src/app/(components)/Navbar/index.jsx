"use client"

import React from "react";
import { MdMenu } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { FiSun } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full mb-7">
      
      <div className="flex justify-between items-center gap-5">
        <button className="px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100">
          <MdMenu />
        </button>
      </div>

      <div className="relative">
        <input
          type="search"
          placeholder="Search here..."
          className="pl-10 pr-4 py-2 w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
        <FaRegBell />

        </div>
      </div>

      {/* RIGHT SIDE */}

     <div className="flex justify-between items-center gap-5">
     <div className="hidden md:flex justify-between items-center gap-5">
        <div>
            <button>
            <FiSun className="cursor-pointer text-gray-500" size={24} />

            </button>
        </div>
        </div>
     </div>


    </div>

  );
};

export default Navbar;
