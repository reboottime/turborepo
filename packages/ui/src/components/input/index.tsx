"use client";

import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "#lib/cn";

const Input = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "form-field-base form-field-focus form-field-disabled form-field-error",
        "file:border-0 file:bg-transparent file:text-[length:var(--font-size-sm)] file:font-medium",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
