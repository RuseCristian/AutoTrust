"use client";

import Image from "next/image";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import Logo from "../../public/logo/logo.ico";
import { UserButton } from "./auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Buy", href: "/buy" },
  { name: "Sell", href: "/sell" },
  { name: "Faq", href: "/faq" },
];

export function Header() {
  const user = useCurrentUser();
  const isAdmin = user?.role === "ADMIN"; // Check if the user is an admin

  return (
    <nav className="bg-white fixed top-0 z-50 w-full drop-shadow-2xl">
      <div className="flex w-full items-center justify-between px-[20px] py-[16px] lg:px-20 max-w-screen-xl mx-auto">
        {/* Hamburger Menu for small screens */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="lg:hidden">
              <HamburgerMenuIcon className="w-6 h-6 text-[#36485C]" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10} align="start">
            {navLinks.map((item, index) => (
              <DropdownMenuItem asChild key={index}>
                <Link href={item.href}>
                  <span className="text-[#36485C]">{item.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
            {isAdmin && (
              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <span className="text-[#36485C]">Admin Panel</span>
                </Link>
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Center - Logo */}
        <div className="flex-1 flex justify-center lg:flex-none">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              height={64}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Right Side */}
        <div className="lg:flex gap-x-5 items-center hidden">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-[#36485C] font-medium hover:text-[#000000]"
            >
              {item.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="text-[#36485C] font-medium hover:text-[#000000]"
            >
              Admin Panel
            </Link>
          )}
        </div>

        <div className="flex gap-x-5 items-center lg:flex-none">
          {user ? (
            <UserButton />
          ) : (
            <Link href="/auth/login">
              <Button>Get Started</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
