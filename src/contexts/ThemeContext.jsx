import { useEffect, useMemo, useState } from "react";
import { ThemeContext } from "./themeContext";

function getInitialTheme() {
  const savedTheme = window.localStorage.getItem("smart-loan-theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    return savedTheme;
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("smart-loan-theme", theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      toggleTheme: () => setTheme((current) => (current === "dark" ? "light" : "dark")),
      setTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
