"use client";

import Link from "next/link";
import { useState } from "react";

export default function MenuToggle() {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div
        className="sm:hidden ml-auto flex flex-col justify-between h-4 cursor-pointer transition-transform hover:scale-105"
        onClick={handleClick}
      >
        <div
          className={`bg-cyan-700 w-6 h-1 rounded-full transition-transform duration-300 ${
            isOpen && "rotate-45 translate-y-[0.375rem]"
          }`}
        />
        <div
          className={`bg-cyan-700 w-6 h-1 rounded-full transition-transform duration-300 ${
            isOpen && "-rotate-45 -translate-y-[0.375rem]"
          }`}
        />
      </div>
      <div
        className={`sm:hidden ${!isOpen && "-top-24"} absolute -z-10 ${
          isOpen && "top-16"
        } left-0 w-full bg-white overflow-hidden py-4 space-y-4 border-b-2 border-gray-200 shadow-sm px-6 transition-all duration-300`}
      >
        <li>
          <Link href="#features" className="hover-link">
            Features
          </Link>
        </li>
        <li>
          <Link href="#faq" className="hover-link">
            FAQ
          </Link>
        </li>
        <li>
          <Link href="#contact" className="hover-link">
            Contact
          </Link>
        </li>
      </div>
    </>
  );
}
