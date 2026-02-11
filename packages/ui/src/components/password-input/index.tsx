"use client";

import { forwardRef, useState, useId, type InputHTMLAttributes } from "react";
import { cn } from "#lib/cn";
import { Input } from "../input";
import { EyeIcon, EyeOffIcon } from "../icons";

export type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
>;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, id: providedId, disabled, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const generatedId = useId();
    const inputId = providedId || generatedId;

    return (
      <div className="relative">
        <Input
          ref={ref}
          id={inputId}
          type={showPassword ? "text" : "password"}
          className={cn("pr-[var(--spacing-10)]", className)}
          disabled={disabled}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          disabled={disabled}
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          aria-controls={inputId}
          className={cn(
            "absolute right-0 top-0 h-[var(--spacing-10)] w-[var(--spacing-10)] inline-flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring rounded-[var(--radius-md)]",
            disabled &&
              "cursor-not-allowed opacity-50 text-text-tertiary hover:text-text-tertiary",
          )}
        >
          {showPassword ? (
            <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
          ) : (
            <EyeIcon className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
