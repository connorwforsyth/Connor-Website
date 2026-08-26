"use client";

import { useState, useEffect } from "react";

export function ColorText() {
  const [accentColor, setAccentColor] = useState("");
  const [colorName, setColorName] = useState("");

  useEffect(() => {
    function updateAccentColor() {
      const tempEl = document.createElement("div");
      tempEl.style.color = "SelectedItem";
      document.body.appendChild(tempEl);

      const color = getComputedStyle(tempEl).color;
      document.body.removeChild(tempEl);

      setAccentColor(color);
      setColorName(determineColorName(color));
    }

    function determineColorName(rgbColor: string) {
      const rgbMatch = rgbColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (!rgbMatch) return "Accent";

      const r = parseInt(rgbMatch[1]);
      const g = parseInt(rgbMatch[2]);
      const b = parseInt(rgbMatch[3]);

      // Map RGB to closest named system color
      // Pink detection needs to be first as it has higher priority
      if (r > 200 && g > 150 && g < 220 && b > 200) return "Pink";
      if (r > 180 && g < 100 && b < 100) return "Red";
      if (r > 170 && g > 100 && b < 100) return "Orange";
      if (r > 180 && g > 180 && b < 100) return "Yellow";
      if (r < 100 && g > 150 && b < 100) return "Green";
      if (r < 100 && g < 100 && b > 180) return "Blue";
      if (r > 120 && g < 100 && b > 180) return "Purple";
      if (r > 100 && r < 150 && g > 100 && g < 150 && b > 100 && b < 150)
        return "Graphite";

      return "Accent";
    }

    // Initial color check
    updateAccentColor();

    // Check for changes periodically
    const intervalId = setInterval(updateAccentColor, 1000);

    // Also check on window focus which often happens after system settings change
    window.addEventListener("focus", updateAccentColor);

    // Clean up
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("focus", updateAccentColor);
    };
  }, []);

  return (
    <span className="bg-[SelectedItem] text-[AccentColorText] dark:bg-[SelectedItem] dark:text-[AccentColorText] ">
      {colorName} button
    </span>
  );
}
