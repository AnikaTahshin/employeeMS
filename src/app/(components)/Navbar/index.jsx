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
    <div className="flex flex-row justify-between items-center w-full mb-7 p-2 md:p-4 bg-slate-400">
      <h1 className=" text-base md:text-3xl font-semibold">employeMS</h1>
      <div className="relative flex-1 mx-2 md:mx-4">
        <input
          placeholder="Search here..."
          value={searchQuery}
          type="text"
          onChange={(e) => handleText(e.target.value)}
          className="pl-10 pr-4 py-1 md:py-2 text-black w-full max-w-[300px] text-sm md:text-base border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaRegBell className="text-sm md:text-base" />
        </div>
      </div>

      {/* RIGHT SIDE */}

      <div className="flex items-center gap-2 md:gap-5">
        <div className="hidden sm:block">
          <ModeToggle />
          {/* <div>
            <button onClick={() => setIsClick(!isClick)}>
              <FiSun className="cursor-pointer text-gray-500" size={24} />
            </button>
          </div> */}
        </div>
      </div>

      <div className="relative">
        {/* Avatar Image */}

        <div className="w-8 h-8 md:w-12 md:h-12">
          <Image
            src={avater}
            className="w-full h-full object-cover rounded-full bg-white cursor-pointer"
            alt="User Avatar"
            onClick={showDetails}
          />
          {/* Dropdown Icon */}
          <div
            className="absolute bg-gray-300 w-3 h-3 md:w-4 md:h-4 rounded-full bottom-0 right-0 flex justify-center items-center cursor-pointer"
            onClick={showDetails}
          >
            <MdOutlineArrowDropDown size={16} />
          </div>
        </div>

        {/* Dropdown Menu */}
        {openDetails && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 z-50">
            <div className="space-y-1 py-2">
              <p className="text-sm md:text-base text-gray-700 font-medium hover:bg-gray-100 px-4 py-2 cursor-pointer">
                My Profile
              </p>
              <p className="text-sm md:text-base text-gray-700 font-medium hover:bg-gray-100 px-4 py-2 cursor-pointer">
                Settings
              </p>
              <p className="text-sm md:text-base text-gray-700 font-medium hover:bg-gray-100 px-4 py-2 cursor-pointer">
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
