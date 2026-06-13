import React from "react";
import { getCompanyJobs } from "@/lib/api/jobs";
import JobsTable from "@/components/dashboard/JobsTable";
import { getLoggedInRecruiterCompany } from "@/lib/api/companies";

const RecruiterJobs = async () => {
  const companyId = await getLoggedInRecruiterCompany();
  const jobs = await getCompanyJobs(companyId);

  return (
    <div className="px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Manage Jobs</h1>
          <p className="text-sm text-gray-400 mt-1">
            View, edit, and manage all job listings for your company.
          </p>
        </div>
      </div>

      {/* Table */}
      <JobsTable jobs={jobs ?? []} />
    </div>
  );
};

export default RecruiterJobs;
