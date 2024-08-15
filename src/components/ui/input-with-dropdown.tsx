import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input"; // Adjust based on your actual import path
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface CustomDropdownInputProps {
  options: string[];
  label?: string;
  placeholder?: string;
  name?: string;
  className?: string; // New prop to allow custom styling
}

export default function CustomDropdownInput({
  options,
  label = "",
  placeholder = "Select an option",
  name,
  className = "", // Default to an empty string if not provided
}: CustomDropdownInputProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setInputValue(option);
    setShowDropdown(false);
  };

  return (
    <div className={`relative w-full ${className}`} ref={inputRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-1 text-left">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          name={name}
          className="w-full pr-10"
        />
        <Popover open={showDropdown} onOpenChange={setShowDropdown}>
          <PopoverTrigger asChild>
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer z-10"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                  showDropdown ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="p-0"
            align="end"
            side="bottom"
            sideOffset={4}
            style={{
              width: inputRef.current?.offsetWidth || "auto",
              left: 0, // Align popover to the start of the input field
            }}
          >
            <div className="bg-white border border-gray-200 rounded-md shadow-lg">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
