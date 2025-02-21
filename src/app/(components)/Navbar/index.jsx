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
  const { searchQuery, setSearchQuery } = useAppContext();

  const [openDetails, setOpenDetails] = useState(false);

  const handleText = (text) => {
    setSearchQuery(text);
  };

  const showDetails = () => {
    setOpenDetails(!openDetails);
  };
  return (
    <div className="flex flex-row justify-between items-center w-full mb-7 p-1 bg-slate-400">
      <h1 className=" text-xl sm:text-3xl">employeMS</h1>
      <div className="relative">
        <input
          placeholder="Search here..."
          value={searchQuery}
          type="text"
          onChange={(e) => handleText(e.target.value)}
          className="pl-10 pr-4 py-2  text-black w-5 sm:w-50 md:w-80 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
          <FaRegBell />
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className=" hidden sm:flex justify-between items-center gap-5">
        <div className=" md:flex justify-between items-center gap-5">
          <ModeToggle />
          {/* <div>
            <button onClick={() => setIsClick(!isClick)}>
              <FiSun className="cursor-pointer text-gray-500" size={24} />
            </button>
          </div> */}
        </div>
      </div>

      <div className="relative w-16 h-16">
        {/* Avatar Image */}
        <Image
          src={avater}
          className="w-full h-full object-cover rounded-full bg-white cursor-pointer"
          alt="User Avatar"
          onClick={showDetails}
        />

        {/* Dropdown Icon */}
        <div
          className="absolute bg-gray-300 w-4 h-4 rounded-full bottom-1 right-0 flex justify-center items-center cursor-pointer"
          onClick={showDetails}
        >
          <MdOutlineArrowDropDown size={20} />
        </div>

        {/* Dropdown Menu */}
        {openDetails && (
          <div className="absolute md:ml-[-65px] top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
            <div className="space-y-2 py-2">
              <p className="text-gray-700 font-medium hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">
                My Profile
              </p>
              <p className="text-gray-700 font-medium hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">
                Settings
              </p>
              <p className="text-gray-700 font-medium hover:bg-gray-100 px-4 py-2 rounded cursor-pointer">
                Privacy
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
