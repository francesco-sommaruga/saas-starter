"use client";
import { Switch } from "@/components/ui/switch";
import { Label } from "../../ui/label";
import useThemeCookie from "../useThemeCookie";
import { setTheme } from "../actions";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

const ThemeButtonServer = ({ theme }: { theme?: string }) => {
  // detect if document.body has class dark
  // if yes, then set checked to true
  // else set checked to false

  const [checked, setChecked] = useState(theme === "dark" ? true : false);

  useEffect(() => {
    if (document) {
      if (checked) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }
  }, [checked]);

  return (
    <Button
      name="theme-switch"
      variant={"ghost"}
      className="px-2"
      size={"sm"}
      onClick={async () => {
        await setTheme(theme === "dark" ? "light" : "dark");
        setChecked((prev) => !prev);
      }}
    >
      {theme === "dark" ? (
        <SunIcon className="w-6 h-6 text-foreground" />
      ) : (
        <MoonIcon className="w-6 h-6 text-foreground" />
      )}
    </Button>
  );
};

export default ThemeButtonServer;
