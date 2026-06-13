import {serverFetch} from "@/lib/core/server"
import {getUserSession} from "@/lib/core/session"

export const getRecruiterCompany = async(recruiterId)=>{
    return serverFetch(`api/my/companies?recruiterId=${recruiterId}`);
}

export const getLoggedInRecruiterCompany = async()=>{
    const user = await getUserSession();
    return getRecruiterCompany(user?._id);
}