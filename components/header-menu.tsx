"use client"

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

type HeaderLinksType = {
  name: string
  href: string
}
const links: HeaderLinksType[] = [
  { name: "Home", href: "/" },
  { name: "Book Club", href: "/book_club" },
  { name: "Account", href: "/account" },
]

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0)
  const handleScroll = () => {
    const position = window.scrollY
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const pathname = usePathname()

  return (
    <header className="sticky top-0 flex flex-row justify-end py-3 px-2 z-10 md:justify-center md:flex-row">
      {/* Mobile menu button */}
      <Popover className="relative md:hidden">
        <PopoverButton className="relative bg-pale-sky-700 rounded-full shadow-lg">
          <Menu className="h-10 w-10 p-2 text-gray-200" />
        </PopoverButton>
        <PopoverPanel
          anchor="bottom end"
          transition
          className="rounded-lg mt-2 bg-gray-800 text-gray-200 transition duration-200 ease-in-out data-closed:scale-95 data-closed:opacity-0 z-20 w-[calc(100vw-1rem)]"
        >
          <div className="flex flex-col gap-2 p-2">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`rounded-md px-2 py-1 ${(link.href.startsWith("/") ? link.href : "/" + link.href) === pathname ? "bg-pale-sky-800" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </PopoverPanel>
      </Popover>

      {/* Desktop menu */}
      <div
        className={`hidden rounded-md md:flex flex-row gap-2 p-2 transition ${
          scrollPosition > 10
            ? "shadow-xl bg-baltic-blue-900"
            : "shadow-sm bg-baltic-blue-800"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`rounded-md px-2 py-1 ${(link.href.startsWith("/") ? link.href : "/" + link.href) === pathname ? "bg-pale-sky-800" : ""}`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  )
}
