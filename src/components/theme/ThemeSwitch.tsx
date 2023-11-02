"use client";
import { Switch } from "@/components/ui/switch";
import { useMemo, useState } from "react";
import { Label } from "../ui/label";

const ThemeSwitch = () => {
  // detect if document.body has class dark
  // if yes, then set checked to true
  // else set checked to false

  const [checked, setChecked] = useState(
    document.body.classList.contains("dark")
  );

  return (
    <div className=" flex items-center space-x-1">
      {/* <span className="font-medium text-sm mr-2">Tema Scuro</span> */}
      <Label htmlFor="theme-switch">Tema Scuro</Label>
      <Switch
        name="theme-switch"
        checked={checked}
        onClick={() => {
          if (document) {
            document.body.classList.toggle("dark");
            setChecked((prev) => !prev);
          }
        }}
      />
    </div>
  );
};

export default ThemeSwitch;
