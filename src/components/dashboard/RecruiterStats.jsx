"use client";

import {
  FileText,
  Persons,
  ThunderboltFill,
  SealCheck,
} from "@gravity-ui/icons";

const stats = [
  {
    label: "Total Job Posts",
    value: 48,
    icon: FileText,
  },
  {
    label: "Total Applicants",
    value: 1284,
    icon: Persons,
  },
  {
    label: "Active Jobs",
    value: 18,
    icon: ThunderboltFill,
  },
  {
    label: "Jobs Closed",
    value: 32,
    icon: SealCheck,
  },
];

function formatNumber(n) {
  return n >= 1000
    ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "K"
    : n.toString();
}

// Show 1,284 style for large numbers
function displayValue(n) {
  return n.toLocaleString();
}

export default function RecruiterStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="flex flex-col gap-6 bg-[#0d0f13] border border-white/8 rounded-2xl p-5"
        >
          {/* Icon box */}
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center">
            <Icon className="w-5 h-5 text-gray-400" />
          </div>

          {/* Text */}
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-500">{label}</span>
            <span className="text-3xl font-bold text-white">
              {displayValue(value)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
