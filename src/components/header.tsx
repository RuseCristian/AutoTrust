"use client";

import Image from "next/image";
import Link from "next/link";
import { AvatarIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
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

  return (
    <nav className="bg-white sticky top-0 z-50 w-full shadow">
      <div className="flex w-full items-center justify-between px-[20px] py-[16px] lg:px-20 max-w-screen-xl mx-auto">
        {/* Left Side */}
        <div className="flex items-center lg:flex-none">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              height={64}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Center - Navigation Links */}
        <div className="hidden lg:flex gap-x-[56px]">
          {navLinks.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="text-[#36485C] font-medium hover:text-[#000000]"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex gap-x-5 items-center lg:flex-none">
          {user ? (
            <UserButton />
          ) : (
            <Link href="/auth/login">
              <Button>Get Started</Button>
            </Link>
          )}

          {/* Hamburger Menu for small screens */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="lg:hidden">
                <HamburgerMenuIcon className="w-6 h-6 text-[#36485C]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent sideOffset={10} align="end">
              {navLinks.map((item, index) => (
                <DropdownMenuItem asChild key={index}>
                  <Link href={item.href}>
                    <span className="text-[#36485C]">{item.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default Header;
