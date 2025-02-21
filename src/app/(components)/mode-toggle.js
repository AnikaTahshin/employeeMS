"use client";

import * as React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "next-themes";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <FiSun className="cursor-pointer text-gray-500" size={24} />
      ) : (
        <FiMoon className="cursor-pointer text-gray-500" size={24} />
      )}
    </button>
  );
}