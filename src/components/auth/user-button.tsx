"use client";

import {
  ExitIcon,
  HeartIcon,
  BookmarkIcon,
  MagnifyingGlassIcon,
  GearIcon,
} from "@radix-ui/react-icons";
import { FaUser } from "react-icons/fa";

import { LogoutButton } from "@/components/auth/logout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useCurrentUser } from "@/hooks/use-current-user";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuItem>
          <Avatar>
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback className="bg-sky-500">
              <FaUser className="text-white" />
            </AvatarFallback>
          </Avatar>
          <div className="ml-2">{user?.email}</div>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="DropdownMenuSeparator" />
        <DropdownMenuItem>
          <BookmarkIcon className="h-6 w-6 mr-2 text-blue-500" />
          Saved Searches
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MagnifyingGlassIcon className="h-6 w-6 mr-2 text-blue-500" />
          Last Search
        </DropdownMenuItem>

        <DropdownMenuItem>
          <HeartIcon className="h-6 w-6 mr-2 text-blue-500" />
          Favorite Cars
        </DropdownMenuItem>
        <DropdownMenuItem>
          <GearIcon className="h-6 w-6 mr-2 text-blue-500" />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator className="DropdownMenuSeparator" />

        <LogoutButton>
          <DropdownMenuItem>
            <ExitIcon className="h-6 w-6 mr-2 text-blue-500" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
