"use client";
import { DesktopIcon, MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { type FC, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// documenting themes, and their icons
const themeIcons: Record<string, typeof SunIcon> = {
  dark: MoonIcon,
  light: SunIcon,
  system: DesktopIcon,
};

const formatThemeName = (value: string) =>
  `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

const ThemeSelectItem: FC<{ readonly value: string }> = ({ value }) => {
  const Icon = themeIcons[value];

  return (
    <SelectItem value={value}>
      <div className="flex items-center gap-2 [&_svg]:size-4">
        <Icon />
        {formatThemeName(value)}
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

  const themeItems = themes.map((value) => ({
    label: formatThemeName(value),
    value,
  }));

  return (
    <Select
      items={themeItems}
      onValueChange={(value) => {
        if (value) {
          setTheme(value);
        }
      }}
      value={theme ?? null}
    >
      <SelectTrigger className="gap-2 border border-border hover:border-foreground focus:bg-accent">
        <SelectValue placeholder="Theme">
          {(value: string | null) => {
            const Icon = value ? themeIcons[value] : undefined;
            return Icon ? (
              <span className="flex items-center gap-2">
                <Icon />
                {formatThemeName(value as string)}
              </span>
            ) : (
              "Theme"
            );
          }}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {themeItems.map(({ value }) => (
            <ThemeSelectItem key={value} value={value} />
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
