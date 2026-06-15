import {serverFetch} from "@/lib/core/server"

export const getAllJobs = async()=>{
    return serverFetch("api/jobs");
}

export const getJobById = async(jobId) =>{
    return serverFetch(`api/jobs/${jobId}`);
}

export const getCompanyJobs = async(companyId, status="active")=>{
    return serverFetch(`api/jobs?companyId=${companyId}&status=${status}`);
}