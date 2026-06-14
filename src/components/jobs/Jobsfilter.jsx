"use client";

import { useState, useMemo } from "react";
import JobCard from "@/components/jobs/JobCard";
import { Magnifier, Xmark } from "@gravity-ui/icons";

const JOB_TYPES = [
  "All",
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
];

export default function JobsFilter({ jobs = [] }) {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const filtered = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        search === "" ||
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.category?.toLowerCase().includes(search.toLowerCase()) ||
        job.city?.toLowerCase().includes(search.toLowerCase()) ||
        job.country?.toLowerCase().includes(search.toLowerCase());

      const matchesType = selectedType === "All" || job.type === selectedType;

      return matchesSearch && matchesType;
    });
  }, [jobs, search, selectedType]);

  return (
    <>
      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search input */}
        <div className="relative flex-1">
          <Magnifier className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, category, or location..."
            className="w-full bg-[#0d0f13] border border-white/10 hover:border-white/20 focus:border-[#6366F1] focus:outline-none text-white placeholder-gray-600 text-sm rounded-xl pl-10 pr-10 py-3 transition-colors duration-150"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
            >
              <Xmark className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Type filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          {JOB_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors duration-150
                ${
                  selectedType === type
                    ? "bg-[#6366F1] border-[#6366F1] text-white"
                    : "bg-[#0d0f13] border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-gray-600 mb-6">
        Showing {filtered.length} of {jobs.length} positions
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((job) => (
            <JobCard
              key={job._id?.$oid ?? job._id}
              job={job}
              company={job.company}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-gray-500 text-sm">
            No jobs match your search. Try different keywords.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setSelectedType("All");
            }}
            className="mt-4 text-xs text-[#818CF8] hover:text-[#a5b4fc] transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}
