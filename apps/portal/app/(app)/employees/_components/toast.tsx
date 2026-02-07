"use client";

import { useEffect } from "react";
import { cn } from "@repo/ui";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 right-6 z-50 rounded-lg px-4 py-3 text-sm font-medium shadow-lg",
        "animate-in slide-in-from-bottom-2 fade-in duration-300",
        type === "success"
          ? "bg-status-success/10 text-status-success border border-status-success/20"
          : "bg-status-error/10 text-status-error border border-status-error/20",
      )}
    >
      {message}
    </div>
  );
}
