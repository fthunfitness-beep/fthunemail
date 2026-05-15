import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full bg-white/[0.03] px-4 text-sm text-white",
        "border border-white/[0.06] outline-none",
        "placeholder:text-zinc-600",
        "transition-colors duration-300",
        "focus:border-white/20 focus:bg-white/[0.05]",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
