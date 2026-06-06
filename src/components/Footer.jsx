"use client";

import Link from "next/link";
import { LogoFacebook, LogoLinkedin, LogoTelegram } from "@gravity-ui/icons";
import Image from "next/image";
import logo from "@/assets/logo.png";

const footerLinks = {
  Product: [
    { label: "Job discovery", href: "/jobs" },
    { label: "Worker AI", href: "/worker-ai" },
    { label: "Companies", href: "/companies" },
    { label: "Salary data", href: "/salary" },
  ],
  Navigations: [
    { label: "Help center", href: "/help" },
    { label: "Career library", href: "/career-library" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Brand Guideline", href: "/brand" },
    { label: "Newsroom", href: "/newsroom" },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/5 pt-14 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-0.5 select-none">
              <Image src={logo} width={100} height={40} alt="logo"></Image>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed max-w-[220px]">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-[#6366F1]">
                {heading}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/8 mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Social icons */}
          <div className="flex items-center gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-150"
              aria-label="Facebook"
            >
              <LogoFacebook className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-[#6366F1] hover:bg-[#4F46E5] flex items-center justify-center transition-colors duration-150"
              aria-label="Telegram"
            >
              <LogoTelegram className="w-4 h-4 text-white" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-150"
              aria-label="LinkedIn"
            >
              <LogoLinkedin className="w-4 h-4 text-white" />
            </a>
          </div>

          {/* Copyright + Legal */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
            <span>Copyright 2024 — hireloop</span>
            <div className="flex items-center gap-2">
              <Link
                href="/terms"
                className="hover:text-white transition-colors duration-150 text-gray-300"
              >
                Terms & Policy
              </Link>
              <span>-</span>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors duration-150 text-gray-300"
              >
                Privacy Guideline
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
