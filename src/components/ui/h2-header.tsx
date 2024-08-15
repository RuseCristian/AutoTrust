import React from "react";

interface H2HeaderProps {
  label: string;
}

export default function H2Header({ label }: H2HeaderProps) {
  return (
    <div className="border-l-4 border-blue-500 pl-2 mb-5">
      <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-left text-gray-800">
        {label}
      </h2>
    </div>
  );
}
