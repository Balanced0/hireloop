"use client";

import {
  Magnifier,
  ChartLineArrowUp,
  ChartBar,
  Bookmark,
  HandPointRight,
  FileText,
  NutHex,
  ArrowUpRight,
} from "@gravity-ui/icons";

const features = [
  {
    icon: Magnifier,
    title: "Smart Search",
    desc: "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartLineArrowUp,
    title: "Salary Insights",
    desc: "Get real salary data to negotiate confidently.",
  },
  {
    icon: ChartBar,
    title: "Top Companies",
    desc: "Apply to vetted companies that are hiring.",
  },
  {
    icon: Bookmark,
    title: "Saved Jobs",
    desc: "Manage apps & favorites on your dashboard.",
  },
  {
    icon: HandPointRight,
    title: "One-Click Apply",
    desc: "Simplify your job applications for an easier process!",
  },
  {
    icon: FileText,
    title: "Resume Builder",
    desc: "Create professional resumes with modern templates.",
  },
  {
    icon: NutHex,
    title: "Skill-Based Matching",
    desc: "Discover jobs that match your skills and experience.",
  },
  {
    icon: ArrowUpRight,
    title: "Career Growth Resources",
    desc: "Boost your career with quick interview tips.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full bg-[#0d0f13] py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-2 h-2 rounded-sm bg-[#6366F1] rotate-45" />
          <span className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase">
            Features Job
          </span>
          <span className="w-2 h-2 rounded-sm bg-[#6366F1] rotate-45" />
        </div>

        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-bold text-white text-center leading-tight mb-14">
          Everything you need <br /> to succeed
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 bg-[#13151a] hover:bg-[#1a1d24] border border-white/5 rounded-2xl p-5 transition-colors duration-150"
            >
              {/* Icon box */}
              <div className="shrink-0 w-12 h-12 rounded-xl bg-[#0d0f13] border border-white/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-[#a78bfa]" />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-white">{title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
