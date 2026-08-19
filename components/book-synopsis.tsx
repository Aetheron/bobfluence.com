"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { ReactNode, useState } from "react"

export default function BookSynopsis({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-2" onClick={() => setOpen(!open)}>
      <p
        className={`text-sm text-gray-200 ${open ? "h-fit" : "overflow-hidden h-10 mask-b-from-black"}`}
      >
        {children}
      </p>
      {open ? (
        <ChevronUp className="w-full text-gray-200/50" />
      ) : (
        <ChevronDown className="w-full text-gray-200/50" />
      )}
    </div>
  )
}
