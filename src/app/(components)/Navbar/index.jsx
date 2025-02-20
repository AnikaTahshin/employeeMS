"use client";

import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { useAppContext } from "../../../../context/context";
import avater from "../../../../public/images/avater2.png";
import Image from "next/image";

const Navbar = () => {
  const {
    isClick,
    setIsClick,
    isSidebarOpen,
    setIsSidebarOpen,
    searchQuery, 
    setSearchQuery 
  } = useAppContext();

  console.log("watching from navbar", searchQuery);
  const handleText = (text) => {
    setSearchQuery(text)

  };
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full mb-7 p-3 bg-slate-400">
      <h1>Logo text</h1>
      <div className="relative">
        <input
          placeholder="Search here..."
          value={searchQuery}
          type="text"
          onChange={(e) => handleText(e.target.value)}
          className="pl-10 pr-4 py-2  text-black w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
          <FaRegBell />
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex justify-between items-center gap-5">
        <div className=" md:flex justify-between items-center gap-5">
          <div>
            <button>
              <FiSun className="cursor-pointer text-gray-500" size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="w-16 h-16">
        <Image
          src={avater}
          className="w-full h-full object-cover rounded-full bg-white"
          alt=""
        />
      </div>
    </div>
  );
};

export default Navbar;
