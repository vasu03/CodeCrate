import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        primary:
          "bg-linear-to-tr from-cyan-400 via-sky-500 to-blue-600 hover:from-blue-600 hover:to-cyan-400 hover:cursor-pointer text-primary-foreground shadow-xs",
        primary_outline:
          "border border-cyan-500 bg-background text-cyan-500 hover:border-none hover:bg-linear-to-tr hover:from-cyan-400 hover:via-sky-500 hover:to-blue-600 hover:cursor-pointer hover:text-primary-foreground shadow-xs",
        secondary:
          "bg-gradient-to-tr from-gray-400/20 to-gray-400/40 text-secondary-foreground hover:from-gray-400/50 to-gray-400/30 shadow-xs",
        destructive:
          "bg-linear-to-tr from-red-100 to-red-200 text-red-500 hover:from-red-200 hover:to-red-100 hover:cursor-pointer shadow-xs",
        destructive_outline:
          "border border-red-300 bg-background text-red-400 hover:bg-linear-to-tr hover:from-red-100 hover:to-red-200 hover:border-none hover:text-red-500 hover:cursor-pointer shadow-xs",
        outline:
          "border bg-background shadow-xs hover:cursor-pointer hover:bg-linear-to-tr hover:from-zinc-100 hover:to-zinc-200 hover:border-zinc-100 text-gray-800 dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost:
          "hover:bg-zinc-100 text-gray-800 hover:cursor-pointer dark:hover:bg-zinc-100/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-6 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-md gap-1.5 px-4 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-8 has-[>svg]:px-6",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    (<Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />)
  );
}

export { Button, buttonVariants }
