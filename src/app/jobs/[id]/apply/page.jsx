import React from "react";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CircleInfoFill, ArrowLeft } from "@gravity-ui/icons";
import { getJobById } from "@/lib/api/jobs";
import JobApply from "./JobApply";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  if (!user) redirect(`/signin?redirect=/jobs/${id}/apply`);

  if (user.role !== "seeker") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="flex flex-col items-center text-center max-w-sm">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
            <CircleInfoFill className="w-6 h-6 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-sm text-white/40 mb-6">
            You must be a job seeker to apply for this position. Recruiters
            cannot apply for jobs.
          </p>
          <Link
            href="/jobs"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  const job = await getJobById(id);

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <Link
          href={`/jobs/${id}`}
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to job
        </Link>

        <div className="bg-[#111318] border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-white/[0.06]">
            <h1 className="text-white font-semibold text-lg">
              Apply for this role
            </h1>
            <p className="text-white/40 text-sm mt-0.5">
              {job?.title} · {job?.city}, {job?.country}
            </p>
          </div>

          <div className="px-6 py-6">
            <JobApply applicant={user} job={job} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyPage;
