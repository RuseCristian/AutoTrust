import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
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
  className?: string;
  suffix?: string;
  disabled?: boolean;
  groupSize?: number;
  maxLength?: number;
  onSelect?: (value: string) => void;
  reset?: boolean;
}

export default function CustomDropdownInput({
  options,
  label = "",
  placeholder = "Select an option",
  name,
  className = "",
  suffix = "",
  disabled = false,
  groupSize = 3,
  maxLength = 6,
  onSelect,
  reset = false,
}: CustomDropdownInputProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reset) {
      setInputValue("");
    }
  }, [reset]);

  const formatNumber = (value: string) => {
    const regex = new RegExp(`\\B(?=(\\d{${groupSize}})+(?!\\d))`, "g");
    return value.replace(regex, ".");
  };

  const handleOptionClick = (option: string) => {
    let numericValue = option.replace(/\D/g, "");
    if (maxLength) {
      numericValue = numericValue.slice(0, maxLength);
    }
    const formattedValue =
      numericValue && suffix
        ? `${formatNumber(numericValue)} ${suffix}`
        : formatNumber(numericValue);
    setInputValue(formattedValue);
    if (onSelect) {
      onSelect(formattedValue);
    }
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/\D/g, "");
    if (maxLength) {
      newValue = newValue.slice(0, maxLength);
    }
    setInputValue(newValue);
  };

  const handleBlur = () => {
    let numericValue = inputValue.replace(/\D/g, "");
    if (maxLength) {
      numericValue = numericValue.slice(0, maxLength);
    }
    const formattedValue =
      numericValue && suffix
        ? `${formatNumber(numericValue)} ${suffix}`
        : formatNumber(numericValue);
    setInputValue(formattedValue);

    if (onSelect && formattedValue) {
      onSelect(formattedValue);
    }
  };

  const handleFocus = () => {
    if (inputValue.endsWith(` ${suffix}`)) {
      setInputValue(inputValue.replace(` ${suffix}`, ""));
    }
  };

  const handleDropdownOpen = () => {
    setShowDropdown(!showDropdown);
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
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          name={name}
          className="w-full pr-10"
          disabled={disabled}
        />
        <Popover open={showDropdown} onOpenChange={handleDropdownOpen}>
          <PopoverTrigger asChild>
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer z-10"
              onClick={handleDropdownOpen}
            >
              <div className="h-full w-[1px] bg-gray-200 mr-2"></div>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                  showDropdown ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="p-0 max-h-40 overflow-y-auto"
            align="end"
            side="bottom"
            sideOffset={4}
            style={{
              width: inputRef.current?.offsetWidth || "auto",
            }}
          >
            <div className="bg-white border border-gray-200 rounded-md shadow-lg">
              {options.length > 0 ? (
                options.map((option, index) => (
                  <div
                    key={index}
                    className="cursor-pointer px-4 py-2 hover:bg-gray-100"
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
    </div>
  );
}
