import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { UseDarkTheme } from "./UseDarkTheme";

export const Switcher = () => {
  const [colorTheme, setColorTheme] = UseDarkTheme();
  const [darkSide, setDarkSide] = useState(colorTheme === "dark");

  const toggleDarkMode = () => {
    const newTheme = colorTheme === "dark" ? "light" : "dark";
    setColorTheme(newTheme);
    setDarkSide(newTheme === "dark");
  };

  return (
    <>
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={20} />
    </>
  );
};