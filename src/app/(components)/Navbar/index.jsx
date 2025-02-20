"use client";

import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { useAppContext } from "../../../../context/context";
import avater from "../../../../public/images/avater2.png";
import Image from "next/image";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { ModeToggle } from "../mode-toggle";

const Navbar = () => {
  const {
    isClick,
    setIsClick,
    isSidebarOpen,
    setIsSidebarOpen,
    searchQuery,
    setSearchQuery,
  } = useAppContext();

  const handleText = (text) => {
    setSearchQuery(text);
  };

  const showDetails = () => {};
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
          <ModeToggle />
          {/* <div>
            <button onClick={() => setIsClick(!isClick)}>
              <FiSun className="cursor-pointer text-gray-500" size={24} />
            </button>
          </div> */}
        </div>
      </div>

      <div className="w-16 h-16 relative">
        <Image
          src={avater}
          className="w-full h-full object-cover rounded-full bg-white cursor-pointer"
          alt=""
          onClick={showDetails}
        />

        <div className="absolute bg-gray-300 w-4 h-4 rounded-lg bottom-1 right-0">
        <div className="flex justify-center items-center" >
          <button >
            
            <MdOutlineArrowDropDown size={20} />
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
