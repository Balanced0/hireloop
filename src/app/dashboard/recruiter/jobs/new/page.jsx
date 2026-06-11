import PostJobPage from "@/app/dashboard/recruiter/jobs/new/PostJobPage";
import { getRecruiterCompany } from "@/lib/api/companies";
import { getUserSession } from "@/lib/core/session";

export default async function Page() {
  const user = await getUserSession();
  const companies = await getRecruiterCompany(user?.id);
  return <PostJobPage companies={companies ?? []} />;
}
