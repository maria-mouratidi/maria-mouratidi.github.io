import React from "react";
import { FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { useTheme } from "../ThemeContext";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className={`
        p-2 rounded-lg transition-all duration-300 hover:scale-110
        ${theme === "light"
          ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
          : "text-gray-400 hover:text-white hover:bg-white/[0.06]"
        }
      `}
    >
      {theme === "light"
        ? <FaMoon className="w-4 h-4" />
        : <MdSunny className="w-4 h-4" />
      }
    </button>
  );
}
