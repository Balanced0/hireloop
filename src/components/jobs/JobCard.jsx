import Link from "next/link";
import { MapPin, Briefcase, CircleDollar, ArrowRight } from "@gravity-ui/icons";

export default function JobCard({ job }) {
  const location = job.isRemote ? "Remote" : `${job.city}, ${job.country}`;
  const salary = `${job.currency} ${Number(job.salaryMin).toLocaleString()} – ${Number(job.salaryMax).toLocaleString()}`;

  return (
    <div className="bg-[#0d0f13] border border-white/8 rounded-2xl p-6 flex flex-col gap-5 hover:border-white/15 transition-colors duration-200">
      {/* Title + Description placeholder */}
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-bold text-white leading-tight">
          {job.title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
          {job.requirements?.split("\n")[0]?.replace(/^[-•]\s*/, "") ?? ""}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <span className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-full px-3 py-1.5 text-sm text-gray-300">
          <MapPin className="w-3.5 h-3.5 text-[#a78bfa]" />
          {location}
        </span>
        <span className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-full px-3 py-1.5 text-sm text-gray-300">
          <Briefcase className="w-3.5 h-3.5 text-[#a78bfa]" />
          {job.type}
        </span>
        <span className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-full px-3 py-1.5 text-sm text-gray-300">
          <CircleDollar className="w-3.5 h-3.5 text-[#a78bfa]" />
          {salary}
        </span>
      </div>

      {/* Apply Now */}
      <Link
        href={`/jobs/${job._id?.$oid ?? job._id}`}
        className="flex items-center gap-2 text-white font-semibold text-sm hover:gap-3 transition-all duration-150 w-fit"
      >
        Apply Now <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
