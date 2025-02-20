"use client";

import * as React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useAppContext } from "../../../context/context";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const { isClick, setIsClick } = useAppContext();

  const handleDarkMode = () => {
    setIsClick(!isClick);
    setTheme(isClick ? "dark" : "light"); // Switch theme properly
  };

  return (
    <button onClick={handleDarkMode}>
      {isClick ? (
        <FiSun className="cursor-pointer text-gray-500" size={24} />
      ) : (
        <FiMoon className="cursor-pointer text-gray-500" size={24} />
      )}
    </button>
  );
}
