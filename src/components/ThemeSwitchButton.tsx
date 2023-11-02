"use client";
import { memo } from "react";
import { Button } from "@/components/ui/button";

const ThemeSwitch = () => {
  return (
    <Button
      onClick={() => {
        if (document) {
          document.body.classList.toggle("dark");
        }
      }}
    >
      Theme
    </Button>
  );
};

export default memo(ThemeSwitch);
