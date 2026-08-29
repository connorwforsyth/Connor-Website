"use client";

import { useState } from "react";

import AccessForm from "@/components/access-form";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function MigrationPrimitiveFixture() {
  const [theme, setTheme] = useState<string | null>("system");

  return (
    <TooltipProvider delay={0}>
      <main className="flex min-h-screen flex-col items-start gap-6 p-8">
        <Select onValueChange={setTheme} value={theme}>
          <SelectTrigger aria-label="Theme">
            <SelectValue placeholder="Choose a theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline">Options</Button>}
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>Archive</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipTrigger render={<Button>Hover for help</Button>} />
          <TooltipContent>Helpful information</TooltipContent>
        </Tooltip>

        <AccessForm />
      </main>
    </TooltipProvider>
  );
}
