"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

type Intervals = ("year" | "month" | "day" | "week" | null)[];
const SelectInterval = ({ intervals }: { intervals: Intervals }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="annual" onClick={() => setIsAnnual((prev) => !prev)}>
        {text.switchLabel}
      </Label>
      <Switch
        name="annual"
        checked={isAnnual}
        onClick={() => setIsAnnual((prev) => !prev)}
      />
      {intervals.map((interval) => interval)}
    </div>
  );
};

const text = {
  switchLabel: "Annual Billing",
};

export default SelectInterval;
