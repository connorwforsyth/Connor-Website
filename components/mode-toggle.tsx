"use client";
import { useState, useEffect } from "react";
import { FC } from "react";
import { useTheme } from "next-themes";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// documenting themes, and their icons
const themeIcons: Record<string, typeof SunIcon> = {
  light: SunIcon,
  dark: MoonIcon,
  system: DesktopIcon,
};

const ThemeSelectItem: FC<{ readonly value: string }> = ({ value }) => {
  const Icon = themeIcons[value];

  return (
    <SelectItem value={value} key={value}>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4" />
        {value.charAt(0).toUpperCase() + value.slice(1)}
      </div>
    </SelectItem>
  );
};

export const ModeToggle: FC = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, themes, theme } = useTheme();
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Select value={theme} onValueChange={setTheme}>
      <SelectTrigger className="gap-2 dark:border-zinc-700">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {themes.map((option) => (
          <ThemeSelectItem key={option} value={option} />
        ))}
      </SelectContent>
    </Select>
  );
};
