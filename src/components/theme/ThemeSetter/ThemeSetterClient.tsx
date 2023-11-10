"use client";

const ThemeSetterClient = ({ theme }: { theme?: string }) => {
  if (theme === "dark") {
    if (document) {
      document.body.classList.add("dark");
    }
  } else {
    if (document) {
      document.body.classList.remove("dark");
    }
  }

  return null;
};

export default ThemeSetterClient;
