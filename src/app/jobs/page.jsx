import JobCard from "@/components/jobs/JobCard";
import { getAllJobs } from "@/lib/api/jobs";

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

        {/* Grid */}
        {jobs && jobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <JobCard key={job._id?.$oid ?? job._id} job={job} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="text-gray-500 text-sm">
              No jobs available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
