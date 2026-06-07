"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutCells,
  OfficeBadge,
  Briefcase,
  LayoutList,
  Gear,
  CrownDiamond,
  Bars,
  Xmark,
} from "@gravity-ui/icons";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutCells },
  { label: "My Company", href: "/dashboard/company", icon: OfficeBadge },
  { label: "Manage Jobs", href: "/dashboard/jobs", icon: Briefcase },
  { label: "Applications", href: "/dashboard/applications", icon: LayoutList },
  { label: "Settings", href: "/dashboard/settings", icon: Gear },
];

function SidebarContent({ user, onClose }) {
  const pathname = usePathname();

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  const roleLabel = user?.role === "recruiter" ? "Recruiter" : "Job Seeker";

  return (
    <div className="flex flex-col h-full">
      {/* Logo row */}
      <div className="flex items-center justify-between mb-8 px-2">
        <Link href="/" className="text-white font-extrabold text-xl tracking-tight">
          HireLoop
        </Link>
        {/* Close button — mobile only */}
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden text-gray-500 hover:text-white transition-colors"
            aria-label="Close sidebar"
          >
            <Xmark className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User info */}
      <div className="flex flex-col gap-3 mb-6 px-2">
        <div className="flex items-center gap-3">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name || "User"}
              width={40}
              height={40}
              className="rounded-full object-cover shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#6366F1]/20 border border-[#6366F1]/30 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-[#818CF8]">{initials}</span>
            </div>
          )}
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate">{user?.name || "User"}</span>
            <span className="text-xs text-gray-500">{roleLabel}</span>
          </div>
        </div>

        {user?.isPremium && (
          <div className="flex items-center gap-1.5 w-fit bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
            <CrownDiamond className="w-3 h-3 text-yellow-400" />
            <span className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider">
              Premium Account
            </span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5 mb-4" />

      {/* Nav */}
      <nav className="flex flex-col gap-1">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors duration-150 group
                ${active
                  ? "bg-white/8 text-white border-r-2 border-[#6366F1]"
                  : "text-gray-500 hover:text-gray-200 hover:bg-white/5"
                }`}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-colors duration-150
                ${active ? "text-[#818CF8]" : "text-gray-600 group-hover:text-gray-400"}`}
              />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default function DashboardSidebar({ user }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    const t = setTimeout(() => setOpen(false), 0);
    return () => clearTimeout(t);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Mobile top bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 h-14 bg-[#0d0f13] border-b border-white/5">
        <Link href="/" className="text-white font-extrabold text-lg tracking-tight">
          HireLoop
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Bars className="w-5 h-5" />
        </button>
      </div>

      {/* ── Mobile offset so content doesn't hide under top bar ── */}
      <div className="lg:hidden h-14 shrink-0" />

      {/* ── Backdrop ── */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <div className={`lg:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[#0d0f13] border-r border-white/5 px-4 py-6 transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <SidebarContent user={user} onClose={() => setOpen(false)} />
      </div>

      {/* ── Desktop static sidebar ── */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-[#0d0f13] border-r border-white/5 px-4 py-6 shrink-0">
        <SidebarContent user={user} onClose={null} />
      </aside>
    </>
  );
}