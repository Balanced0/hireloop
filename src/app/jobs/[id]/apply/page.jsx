import React from "react";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CircleInfoFill } from "@gravity-ui/icons";
import { ArrowLeft } from "@gravity-ui/icons";
import { getJobById } from "@/lib/api/jobs";
import JobApply from "./JobApply";

const ApplyPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();
  if (!user) {
    redirect(`/signin?redirect=/jobs/${id}/apply`);
  }
  if (user.role !== "seeker") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="flex flex-col items-center text-center max-w-sm">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
            <CircleInfoFill className="w-6 h-6 text-red-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-sm text-gray-400 mb-6">
            You must be a job seeker to apply for this position. Recruiters
            cannot apply for jobs.
          </p>
          <Link
            href="/jobs"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors duration-150"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }
  const job = await getJobById(id);
  return <div>
    Appy Here
    <JobApply job={job} />
  </div>;
};

export default ApplyPage;
