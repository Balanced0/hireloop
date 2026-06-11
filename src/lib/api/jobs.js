import {serverFetch} from "@/lib/core/server"

export const getCompanyJobs = async(companyId, status="active")=>{
    return serverFetch(`api/jobs?companyId=${companyId}&status=${status}`);
}