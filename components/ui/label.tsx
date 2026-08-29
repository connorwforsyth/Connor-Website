"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "font-medium text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

type LabelProps = React.ComponentProps<"label"> &
  VariantProps<typeof labelVariants>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, htmlFor, ...props }, ref) => (
    // biome-ignore lint/a11y/noLabelWithoutControl: This reusable wrapper forwards the consumer-provided control association.
    <label
      className={cn(labelVariants(), className)}
      htmlFor={htmlFor}
      ref={ref}
      {...props}
    />
  )
);
Label.displayName = "Label";

export { Label, type LabelProps, labelVariants };
