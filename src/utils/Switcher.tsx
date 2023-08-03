import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { DarkMode } from "./UseDarkTheme";

export const Switcher = () => {
  const [colorTheme, setColorTheme] = DarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked: boolean) => {
    setColorTheme(checked ? "dark" : "light");
    setDarkSide(checked);
  };

  return (
    <>
      <DarkModeSwitch checked={darkSide} onChange={toggleDarkMode} size={20} />
    </>
  );
};
