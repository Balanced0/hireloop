import React from "react";
import { getJobById } from "@/lib/api/jobs";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  CircleDollar,
  Calendar,
  House,
  AntennaSignal,
} from "@gravity-ui/icons";
import Link from "next/link";

const formatSalary = (min, max, currency) => {
  const fmt = (n) =>
    Number(n).toLocaleString("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    });
  return `${fmt(min)} – ${fmt(max)} / yr`;
};

const formatDeadline = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const daysLeft = (dateStr) => {
  const diff = new Date(dateStr) - new Date();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
};

const parseList = (str) =>
  str
    .split("\n")
    .map((s) => s.replace(/^[-•]\s*/, "").trim())
    .filter(Boolean);

const Badge = ({ children, variant = "default" }) => {
  const styles = {
    default: "bg-white/10 text-white/80",
    green: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    amber: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    red: "bg-red-500/15 text-red-400 border border-red-500/20",
    purple: "bg-violet-500/15 text-violet-400 border border-violet-500/20",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

const Section = ({ title, items }) => (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold text-white">{title}</h2>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 text-white/70 text-sm leading-relaxed"
        >
          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 flex-shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const MetaItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
      <Icon className="w-4 h-4 text-violet-400" />
    </div>
    <div>
      <p className="text-xs text-white/40 leading-none mb-0.5">{label}</p>
      <p className="text-sm font-medium text-white">{value}</p>
    </div>
  </div>
);

const page = async ({ params }) => {
  const { id } = await params;
  const job = await getJobById(id);

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <p className="text-white/40">Job not found.</p>
      </div>
    );
  }

  const remaining = daysLeft(job.deadline);
  const deadlineBadge =
    remaining === 0 ? "red" : remaining <= 5 ? "amber" : "green";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/jobs"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header card */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600/40 to-indigo-600/40 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <House className="w-6 h-6 text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-1">
                    {job.title}
                  </h1>
                  <p className="text-sm text-white/50">{job.category}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="purple">{job.type}</Badge>
                {job.isRemote && (
                  <Badge variant="green">
                    <AntennaSignal className="w-3 h-3" /> Remote
                  </Badge>
                )}
                <Badge>
                  <MapPin className="w-3 h-3" />
                  {job.city}, {job.country}
                </Badge>
                <Badge variant={deadlineBadge}>
                  <Clock className="w-3 h-3" />
                  {remaining > 0 ? `${remaining}d left` : "Deadline passed"}
                </Badge>
              </div>
            </div>

            {/* Responsibilities */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <Section
                title="Responsibilities"
                items={parseList(job.responsibilities)}
              />
            </div>

            {/* Requirements */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <Section
                title="Requirements"
                items={parseList(job.requirements)}
              />
            </div>

            {/* Benefits */}
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6">
              <Section title="Benefits" items={parseList(job.benefits)} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 sticky top-6">
              <div className="mb-5">
                <p className="text-xs text-white/40 mb-1">Salary range</p>
                <p className="text-2xl font-bold text-white">
                  {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
                </p>
              </div>

              <button className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 active:bg-violet-700 transition-colors text-sm font-semibold text-white mb-3">
                Apply Now
              </button>
              <button className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm font-medium text-white/70 border border-white/10">
                Save Job
              </button>

              <div className="border-t border-white/[0.06] my-5" />

              <div className="space-y-4">
                <MetaItem icon={Briefcase} label="Job type" value={job.type} />
                <MetaItem
                  icon={MapPin}
                  label="Location"
                  value={`${job.city}, ${job.country}`}
                />
                <MetaItem
                  icon={CircleDollar}
                  label="Salary"
                  value={formatSalary(
                    job.salaryMin,
                    job.salaryMax,
                    job.currency,
                  )}
                />
                <MetaItem
                  icon={Calendar}
                  label="Deadline"
                  value={formatDeadline(job.deadline)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
