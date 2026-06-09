import {serverFetch} from "@/lib/core/server"

const getRecruiterCompany = async(recruiterId)=>{
    return serverFetch(`api/my/companies?recruiterId=${recruiterId}`);
}