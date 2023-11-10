"use client";
import { Switch } from "@/components/ui/switch";
import { Label } from "../../ui/label";
import useThemeCookie from "../useThemeCookie";
import { setTheme } from "../actions";
import { useEffect, useState } from "react";

const ThemeSwitch = ({ theme }: { theme?: string }) => {
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
    <div className=" flex items-center space-x-1">
      {/* <span className="font-medium text-sm mr-2">Tema Scuro</span> */}
      <Label htmlFor="theme-switch">Tema Scuro</Label>
      <Switch
        name="theme-switch"
        checked={theme === "dark"}
        onClick={async () => {
          await setTheme(theme === "dark" ? "light" : "dark");

          setChecked((prev) => !prev);
        }}
      />
    </div>
  );
};

export default ThemeSwitch;
