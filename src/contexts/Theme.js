import React, { createContext, useState, useContext } from 'react';
import "./Gradients.css"

// Define an enum w/ key value pairs
export const Themes = {
  WORK: 'work',
  COFFEE: 'coffee',
  CHILL: 'chill',
};

// const themeStyles = {
//   [Themes.WORK]: {
//     mainColor: '#ef4444',
//     bannerColor: '#fb7185',
//     buttonGroup: "#fca5a5",
//     loginButton: "#f43f5e",
//     timerBox: "linear-gradient(to right, #f87171, #f43f5e)",
//     themeButton: "#ef4444"
//   },

// Define color schemes for each theme obj
const themeStyles = {
  [Themes.WORK]: {
    mainColor: '#ef4444',
    bannerColor: '#f87171',
    buttonGroup: "#fca5a5",
    loginButton: "#f43f5e",
    timerBox: "linear-gradient(to right, #f87171, #f43f5e)",
    themeButton: "#ef4444"
  },
  [Themes.COFFEE]: {
    mainColor: '#422006',
    bannerColor: '#92400e',
    buttonGroup: "#d97706",
    loginButton: "#7c2d12",
    timerBox: "linear-gradient(to right, #b45309, #7c2d12)",
    themeButton: "#431407"
  },
  [Themes.CHILL]: {
    mainColor: '#4f46e5',
    bannerColor: '#818cf8',
    buttonGroup: "#fca5a5",
    loginButton: "#f43f5e",
    timerBox: "linear-gradient(to right, #3b82f6, #4338ca)",
    themeButton: "#ef4444"
  },
};

// Create a context ojbect to obtain React components
const ThemeContext = createContext();

// Take a component as input and wrap the child component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(Themes.WORK); 

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  return ( // Pass necessary values as prop to arbitrary child component
    <ThemeContext.Provider value={{ theme, changeTheme, themeStyles }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create custom hook to denote theme hook in children import statements
export const useTheme = () => useContext(ThemeContext);
