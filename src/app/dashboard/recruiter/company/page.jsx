import React from 'react';
import {getUserSession} from "@/lib/core/session"
import CompanyPage from "@/app/dashboard/recruiter/company/CompanyPage" 
import {getRecruiterCompany} from "@/lib/api/companies";
const CompanyHomePage = async () => {
    const user = await getUserSession();
    const company = await getRecruiterCompany(user?.id);
    return (
        <div>
            <CompanyPage recruiter={user} recruiterCompany={company}></CompanyPage>
        </div>
    );
};

export default CompanyHomePage;