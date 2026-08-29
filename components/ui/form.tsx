"use client";

import { Field as FieldPrimitive } from "@base-ui/react/field";
import * as React from "react";

import { cn } from "@/lib/utils";

const Field = FieldPrimitive.Root;

const FieldLabel = React.forwardRef<HTMLElement, FieldPrimitive.Label.Props>(
  ({ className, ...props }, ref) => (
    <FieldPrimitive.Label
      className={cn("font-medium text-sm leading-none", className)}
      ref={ref}
      {...props}
    />
  )
);
FieldLabel.displayName = "FieldLabel";

const FieldDescription = React.forwardRef<
  HTMLDivElement,
  FieldPrimitive.Description.Props
>(({ className, ...props }, ref) => (
  <FieldPrimitive.Description
    className={cn("text-[0.8rem] text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";

const FieldError = React.forwardRef<HTMLDivElement, FieldPrimitive.Error.Props>(
  ({ className, ...props }, ref) => (
    <FieldPrimitive.Error
      className={cn("font-medium text-[0.8rem] text-destructive", className)}
      ref={ref}
      {...props}
    />
  )
);
FieldError.displayName = "FieldError";

export { Field, FieldDescription, FieldError, FieldLabel };
