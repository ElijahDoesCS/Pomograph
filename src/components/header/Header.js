import React from "react";
import { useTheme } from "../../contexts/Theme";

export default function Header() {
  const { theme, themeStyles } = useTheme();

  return (
    <>
      <div
        className="flex align-middle justify-end w-full p-2 pr-4 shadow-sm opacity-1"
        style={{ backgroundColor: themeStyles[theme].bannerColor }}
      >
        <div
          className="flex text-white rounded-sm pl-2 pr-2 p-1 text-sm"
          style={{ backgroundColor: themeStyles[theme].loginButton }}
        >
          <svg
            class="h-6 w-6 pr-2 text-white"
            width="4"
            height="4"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <circle cx="12" cy="7" r="4" />{" "}
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
          <div>Login</div>
        </div>
      </div>
    </>
  );
}
