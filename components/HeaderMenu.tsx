"use client";

import NextLink, { LinkProps } from "next/link";
import { ReactNode, useEffect, useState } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { usePathname } from "next/navigation";

export default function Header() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  type NavigationLinkProps = Omit<LinkProps, "href"> & {
    href: string;
    className: string | undefined;
    children: ReactNode;
  };

  const Link = ({ href, ...props }: NavigationLinkProps) => {
    const pathname = usePathname();
    const isActive = (href.startsWith("/") ? href : "/" + href) === pathname;

    return (
      <NavigationMenu.Link
        asChild
        active={isActive}
        className="block select-none rounded-md px-3 py-2 font-medium leading-none no-underline outline-none focus:shadow-[0_0_0_2px] hover:bg-orange-300 focus:bg-orange-500 data-[active]:bg-orange-500"
      >
        <NextLink href={href} {...props} />
      </NavigationMenu.Link>
    );
  };

  return (
    <header className="sticky top-0 flex flex-col py-3 z-10 lg:justify-center lg:flex-row">
      <NavigationMenu.Root className="relative z-[1] flex w-screen justify-center">
        <NavigationMenu.List
          className={`center m-0 flex list-none rounded-lg p-1 transition-all duration-300 ${
            scrollPosition > 10
              ? "bg-onyx shadow-blackA4 shadow-[0_2px_10px]"
              : ""
          }`}
        >
          <NavigationMenu.Item>
            <Link
              href="/"
              className="m-3 transition-colors duration-300 text-xl"
            >
              Home
            </Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <Link
              href="ope"
              className="m-3 transition-colors duration-300 text-xl"
            >
              Ope
            </Link>
          </NavigationMenu.Item>
          {/* <NavigationMenu.Item>
            <Link
              href="donate"
              className="m-3 transition-colors duration-300 text-xl"
            >
              Donate
            </Link>
          </NavigationMenu.Item> */}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
}
