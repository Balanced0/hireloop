"use server"
import {serverMutation} from "@/lib/core/server"

export const createCompany = async(newCompanyData) =>{
    return serverMutation("api/companies", newCompanyData);
}