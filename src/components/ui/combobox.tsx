"use client";

import { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface ComboboxProps {
  options: string[];
  placeholder?: string;
  label?: string;
  value?: string;
  onSelect: (value: string) => void;
  disabled?: boolean; // New prop to handle disabling the input
}

export default function Combobox({
  options,
  placeholder = "Select an option",
  label = "",
  value,
  onSelect,
  disabled = false, // Default to false if not provided
}: ComboboxProps) {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);
  const inputRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: string) => {
    setInputValue(""); // Clear the search input after selecting an option
    onSelect(option);
    setOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(searchValue)
    );
    setInputValue(searchValue);
    setFilteredOptions(filtered);
  };

  const handleDropdownOpen = () => {
    if (!disabled) {
      setOpen(!open);
      setInputValue(""); // Clear the search input when opening the dropdown
      setFilteredOptions(options); // Reset options to full list when opening the dropdown
    }
  };

  return (
    <div className="relative w-full" ref={inputRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-900 mb-1 text-left">
          {label}
        </label>
      )}
      <Popover open={open && !disabled} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={`w-full relative cursor-pointer ${
              disabled ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={handleDropdownOpen} // Clear search and open dropdown
          >
            <Input
              value={value || ""}
              placeholder={placeholder}
              readOnly
              className={`w-full pr-10 bg-zinc-100 ${
                disabled ? "bg-gray-100" : ""
              }`}
              disabled={disabled} // Disable the input if disabled is true
            />
            {!disabled && (
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 z-10">
                <ChevronDownIcon
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                    open ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="p-2 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg"
          align="start"
          side="bottom"
          sideOffset={0}
          style={{
            width: inputRef.current?.offsetWidth || "auto",
          }}
        >
          <Input
            value={inputValue}
            onChange={handleSearch}
            placeholder="Search..."
            className="p-2 border-b border-gray-200 mb-2"
          />
          <div
            className="max-h-40 overflow-y-auto space-y-1"
            style={{ maxHeight: "200px" }}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <div
                  key={index}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-200 rounded transition-colors"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No options found</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
