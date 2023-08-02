import { useState, useEffect } from "react";

type Theme = "dark" | "light";

export const UseDarkTheme = (): [
  Theme,
  React.Dispatch<React.SetStateAction<Theme>>
] => {
  const [theme, setTheme] = useState<Theme>(localStorage.theme || "light");

  const colorTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(colorTheme);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  return [colorTheme, setTheme];
};
