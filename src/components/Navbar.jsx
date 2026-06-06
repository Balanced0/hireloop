"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logo from "@/assets/logo.png"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full container mx-auto sm:rounded-2xl bg-[#111318] border-b border-white/5 sticky top-0 sm:top-6 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0.5 select-none">
            <Image src={logo} width={100} height={40} alt="logo"></Image>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/jobs"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-150 font-medium"
            >
              Browse Jobs
            </Link>
            <Link
              href="/company"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-150 font-medium"
            >
              Company
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-150 font-medium"
            >
              Pricing
            </Link>

            <div className="h-5 w-px bg-white/15" />

            <Link
              href="/signin"
              className="text-sm text-[#818CF8] hover:text-[#a5b4fc] transition-colors duration-150 font-medium"
            >
              Sign In
            </Link>

            <Link
              href="/get-started"
              className="btn btn-sm bg-[#6366F1] hover:bg-[#4F46E5] border-none text-white text-sm font-semibold px-5 rounded-lg shadow-lg shadow-indigo-500/20 transition-all duration-150"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden btn btn-ghost btn-sm text-gray-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111318] border-t border-white/5 px-4 pb-4 pt-2 flex flex-col gap-3">
          <Link
            href="/jobs"
            className="text-sm text-gray-300 hover:text-white py-2 font-medium"
          >
            Browse Jobs
          </Link>
          <Link
            href="/company"
            className="text-sm text-gray-300 hover:text-white py-2 font-medium"
          >
            Company
          </Link>
          <Link
            href="/pricing"
            className="text-sm text-gray-300 hover:text-white py-2 font-medium"
          >
            Pricing
          </Link>
          <div className="h-px bg-white/10 my-1" />
          <Link
            href="/signin"
            className="text-sm text-[#818CF8] hover:text-[#a5b4fc] py-2 font-medium"
          >
            Sign In
          </Link>
          <Link
            href="/get-started"
            className="btn bg-[#6366F1] hover:bg-[#4F46E5] border-none text-white text-sm font-semibold rounded-lg w-full"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
}
