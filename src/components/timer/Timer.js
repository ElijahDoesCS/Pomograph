import React, { useState, useEffect } from "react";
import ButtonGroup  from "./ButtonGroup";
import { useTheme, Themes } from "../../contexts/Theme";

export default function Timer() {
  const { changeTheme, theme, themeStyles } = useTheme(); // Get the changeTheme function from the context
  const [time, setTime] = useState(60 * 50); // State to hold the current time in seconds
  const [isRunning, setIsRunning] = useState(false); // State to track whether the timer is running or paused

  const handleClick = () => {
    if (isRunning) {
      handleStart();
    } else {
      handleStop();
    }
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  useEffect(() => {
    let intervalId;

    // Start the timer when isRunning becomes true
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0)); // Decrement time by 1 second
      }, 1000); // Run every second
    } else {
      clearInterval(intervalId); // Stop the timer if isRunning is false
    }

    // Cleanup function to clear interval when component unmounts or when isRunning changes
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleButtonClick = (buttonIndex) => {
    console.log("activated");

    setIsRunning(false);
    if (buttonIndex === 1) {
      // Work mode: 50 minutes
      setTime(50 * 60);
      changeTheme(Themes.WORK);
    } else if (buttonIndex === 2) {
      // Coffee mode: 10 minutes
      setTime(10 * 60);
      changeTheme(Themes.COFFEE);
    } else if (buttonIndex === 3) {
      // Chill mode: 35 minutes
      setTime(35 * 60);
      changeTheme(Themes.CHILL);
    }
  };

  return (
    <div
      className="mt-5 p-3 w-80 shadow-lg rounded-md"
      style={{ backgroundImage: themeStyles[theme].timerBox }}
    >
      <div>
        <ButtonGroup handleButtonClick={handleButtonClick} />
        <div className="text-7xl text-white font-bold flex items-center justify-center h-36">
          <div>
            {Math.floor(time / 60)}:{String(time % 60).padStart(2, "0")}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center w-20 bg-white rounded-md shadow-md">
            <div className="inline-flex p-1 rounded-md bg-white">
              <button
                onClick={handleClick}
                className="foxus:outline-none text-red-400 font-bold"
              >
                {isRunning ? "Stop" : "Start"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
