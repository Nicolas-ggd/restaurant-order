import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { UseDarkTheme } from "./UseDarkTheme";

export const Switcher = () => {
  const [colorTheme, setColorTheme] = UseDarkTheme();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked: boolean) => {
    setColorTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={20} />
    </>
  );
};
