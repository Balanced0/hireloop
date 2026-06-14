import { getAllJobs } from "@/lib/api/jobs";
import JobsFilter from "@/components/jobs/Jobsfilter";

export default async function JobsPage() {
  const jobs = await getAllJobs();

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Browse Jobs
          </h1>
          <p className="text-gray-400 text-sm">
            {jobs?.length ?? 0} open positions available right now
          </p>
        </div>

        {/* Filter + Grid */}
        <JobsFilter jobs={jobs ?? []} />
      </div>
    </div>
  );
}
