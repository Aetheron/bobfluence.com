"use client"

import { Transition } from "@headlessui/react"
import { X } from "lucide-react"
import { ReactElement, useState } from "react"

export default function Notification({
  title,
  body,
  icon,
}: {
  title: string
  body: string
  icon: ReactElement
}) {
  const [show, setShow] = useState(true)
  return (
    <Transition show={show}>
      <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black/5 transition data-closed:data-enter:translate-y-2 data-enter:transform data-closed:opacity-0 data-enter:duration-300 data-leave:duration-100 data-enter:ease-out data-leave:ease-in data-closed:data-enter:sm:translate-x-2 data-closed:data-enter:sm:translate-y-0">
        <div className="p-4">
          <div className="flex items-start">
            <div className="shrink-0">{icon}</div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">{title}</p>
              <p className="mt-1 text-sm text-gray-500">{body}</p>
            </div>
            <div className="ml-4 flex shrink-0">
              <button
                type="button"
                onClick={() => {
                  setShow(false)
                }}
                className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-michigan-blue-500 focus:ring-offset-2 cursor-pointer"
              >
                <span className="sr-only">Close</span>
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}
