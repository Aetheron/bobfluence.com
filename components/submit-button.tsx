"use client"

import { Button } from "@radix-ui/themes"
import React, { type ComponentProps } from "react"
import { useFormStatus } from "react-dom"
import { twMerge } from "tailwind-merge"

type Props = ComponentProps<typeof Button> & {
  pendingContent?: string | React.ReactNode
}

export function SubmitButton({
  children,
  pendingContent = "Submitting...",
  className,
  ...props
}: Props) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      className={twMerge(
        "rounded-md bg-maize-300 px-3 py-2 text-sm font-semibold text-gray-800 shadow-sm hover:bg-maize-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maize-500",
        className
      )}
      aria-disabled={pending}
      {...props}
    >
      {pending ? pendingContent : children}
    </Button>
  )
}
