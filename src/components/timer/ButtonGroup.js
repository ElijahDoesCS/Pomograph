import React, { useState } from "react";
import { useTheme } from "../../contexts/Theme";

function ButtonGroup({ handleButtonClick }) {
  const [selectedButton, setSelectedButton] = useState(1);
  const { theme, themeStyles } = useTheme(); // Get the changeTheme function from the context

  return (
    <div
      className="bg-red-300 shadow-sm w-full h-12 flex items-center justify-evenly rounded-md text-white"
      style={{ backgroundColor: themeStyles[theme].buttonGroup }}
    >
      <button
        className={`text-md p-1 px-2 rounded-lg ${
          selectedButton === 1 ? "bg-red-500" : ""
        }`}
        onClick={() => {
          handleButtonClick(1);
          setSelectedButton(1);
        }}
        style={
          selectedButton === 1
            ? {
                backgroundColor: themeStyles[theme].themeButtonm,
                fontStyle: "italic",
              }
            : {}
        }
      >
        Work.
      </button>
      <button
        className={`text-md p-1 px-2 rounded-lg shadow-sm ${
          selectedButton === 2 ? "bg-red-500" : ""
        }`}
        style={
          selectedButton === 2
            ? {
                backgroundColor: themeStyles[theme].themeButton,
                fontStyle: "italic",
              }
            : {}
        }
        onClick={() => {
          handleButtonClick(2);
          setSelectedButton(2);
        }}
      >
        Coffee.
      </button>
      <button
        className={`text-md p-1 px-2 rounded-lg ${
          selectedButton === 3 ? "bg-red-500" : ""
        }`}
        style={
          selectedButton === 3
            ? {
                backgroundColor: themeStyles[theme].themeButton,
                fontStyle: "italic",
              }
            : {}
        }
        onClick={() => {
          handleButtonClick(3);
          setSelectedButton(3);
        }}
      >
        Chill.
      </button>
    </div>
  );
}

export default ButtonGroup;
