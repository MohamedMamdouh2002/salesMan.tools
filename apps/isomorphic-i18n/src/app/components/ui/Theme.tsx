"use client"

import { useEffect, useState } from "react"
import { FaMoon } from "react-icons/fa"
import { BsSunFill } from "react-icons/bs"

const Theme: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) {
        return storedTheme === "dark";
      }
    }
    return true; 
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className={`relative 4xl:w-16 4xl:h-16 w-10 h-10 justify-center flex items-center ${
        darkMode ? "bg-black" : "bg-white border border-greenColor"
      } cursor-pointer rounded-full transition-colors duration-300`}
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? (
        <BsSunFill className="text-greenColor text-lg 4xl:text-3xl" />
      ) : (
        <FaMoon className="text-greenColor text-lg 4xl:text-3xl" />
      )}
    </div>
  );
};

export default Theme;
