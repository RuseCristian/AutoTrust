import React from "react";
import { useSession } from "next-auth/react"; // Import useSession from next-auth
import { Button } from "@/components/ui/button";
import { AiFillStar, AiOutlineSearch, AiOutlineReload } from "react-icons/ai";
import { BookmarkIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"; // Same icon as in SimpleFilter
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import LoginPopUpTrigger from "../auth/login-popup-trigger"; // Import LoginPopUpTrigger

interface StickyFooterProps {
  onClearFilters: () => void;
  formId: string;
}

export default function StickyFooter({
  onClearFilters,
  formId,
}: StickyFooterProps) {
  const { data: session } = useSession(); // Get the session object to check if the user is logged in

  const renderButtonWithLoginTrigger = (
    button:
      | string
      | number
      | boolean
      | React.JSX.Element
      | Iterable<React.ReactNode>
      | React.PromiseLikeOfReactNode
      | null
      | undefined
  ) => {
    if (!session) {
      return <LoginPopUpTrigger>{button}</LoginPopUpTrigger>;
    }
    return button;
  };

  return (
    <div className="bg-white -mb-16 p-4 w-full sticky z-50 border-t-2 border-b-2 border-gray-300 bottom-0">
      <div className="flex justify-between max-w-screen-xl mx-auto px-[20px] lg:px-20">
        {/* Saved Searches Button */}
        <div className="flex space-x-4">
          {renderButtonWithLoginTrigger(
            <button
              className="flex items-center text-gray-600 hover:text-blue-500"
              onClick={() => console.log("Saved Searches clicked")}
            >
              <BookmarkIcon className="w-5 h-5 mr-2 text-blue-500" />
              Saved Searches
            </button>
          )}
        </div>

        <div className="flex lg:hidden items-center space-x-2">
          <Button
            type="submit"
            form={formId}
            className="w-40 bg-gradient-to-r from-blue-300 to-blue-500 hover:from-blue-500 hover:to-blue-700 text-white shadow-md"
          >
            <AiOutlineSearch className="mr-2" />
            Results
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button>
                <HamburgerMenuIcon className="w-6 h-6 text-[#36485C]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={10}
              align="end"
              className="space-y-4"
            >
              <DropdownMenuItem asChild>
                <Button
                  variant="outline"
                  className="text-gray-600 border-gray-400 w-full bg-gradient-to-r from-gray-100 to-gray-200 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300"
                  onClick={onClearFilters}
                >
                  <AiOutlineReload className="mr-2" />
                  Clear Filters
                </Button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                {renderButtonWithLoginTrigger(
                  <Button className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white w-full shadow-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-600 hover:shadow-xl">
                    <AiFillStar className="mr-2" />
                    Save Search
                  </Button>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden lg:flex space-x-4 items-center">
          <Button
            variant="outline"
            className="text-gray-600 border-gray-400 bg-gradient-to-r from-gray-100 to-gray-200 hover:bg-gradient-to-r hover:from-gray-200 hover:to-gray-300"
            onClick={onClearFilters}
          >
            <AiOutlineReload className="mr-2" />
            Clear Filters
          </Button>
          {renderButtonWithLoginTrigger(
            <Button className="bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-lg hover:bg-gradient-to-r hover:from-red-500 hover:to-yellow-600 hover:shadow-xl">
              <AiFillStar className="mr-2" />
              Save Search
            </Button>
          )}
          <Button
            type="submit"
            form={formId}
            className="w-48 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-700 text-white shadow-md"
          >
            <AiOutlineSearch className="mr-2" />
            Results
          </Button>
        </div>
      </div>
    </div>
  );
}
