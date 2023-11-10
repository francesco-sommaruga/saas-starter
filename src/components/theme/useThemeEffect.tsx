"use client";
import { useEffect } from "react";
import useThemeCookie from "./useThemeCookie";

const useThemeEffect = () => {
  const { theme } = useThemeCookie();

  useEffect(() => {
    if (!window) return;
    if (theme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);
};

export default useThemeEffect;
