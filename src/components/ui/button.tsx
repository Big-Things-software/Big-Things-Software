import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-[0.6em] overflow-hidden isolate whitespace-nowrap rounded-full font-medium transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#6fc3e8] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-[18px] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "border border-transparent bg-[#1c6ea8] text-[#f2f6f9] shadow-[0_0_0_1px_rgba(47,137,197,0.4),0_8px_30px_rgba(47,137,197,0.35)] hover:shadow-[0_0_0_1px_rgba(47,137,197,0.6),0_12px_40px_rgba(47,137,197,0.5)]",
        ghost:
          "border border-[#2f89c5]/45 bg-transparent text-[#f2f6f9] hover:border-[#2f89c5] hover:bg-[#2f89c5]/10",
      },
      size: {
        default: "px-[1.8em] py-[0.85em] text-[0.95rem]",
        sm: "px-[1.2em] py-[0.6em] text-[0.85rem]",
        lg: "px-[2.2em] py-[1em] text-[1.05rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"a"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {asChild ? props.children : (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 -translate-x-[120%] bg-[linear-gradient(105deg,transparent_35%,rgba(255,255,255,0.28)_50%,transparent_65%)] transition-transform duration-700 ease-out group-hover:translate-x-[120%] group-focus-visible:translate-x-[120%]"
          />
          {props.children}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
