import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

const sizeClasses = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-sm"
};

const variantClasses = {
  primary:
    "bg-accent text-white hover:bg-accent-hover border border-transparent shadow-[0_0_0_1px_rgba(255,255,255,0.05)]",
  secondary:
    "bg-surface text-text-primary hover:border-white/20 border border-white/10",
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5 border border-transparent",
  danger:
    "bg-danger/15 text-red-300 hover:bg-danger/25 border border-danger/30"
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-mono uppercase tracking-[0.16em] transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/25 border-t-white" /> : null}
      {children}
    </button>
  )
);

Button.displayName = "Button";
