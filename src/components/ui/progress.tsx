"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ProgressProps {
  value?: number
  className?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        className
      )}
      {...props}
    >
      <div
        className="h-full w-full flex-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-300 ease-out"
        style={{ transform: `translateX(-${100 - value}%)` }}
      />
    </div>
  )
)
Progress.displayName = "Progress"

export { Progress }
