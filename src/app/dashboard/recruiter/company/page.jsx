import React from 'react';
import {getUserSession} from "@/lib/core/session"
import CompanyPage from "@/app/dashboard/recruiter/company/CompanyPage" 
const CompanyHomePage = async () => {
    const user = await getUserSession();
    return (
        <div>
            <CompanyPage recruiter={user}></CompanyPage>
        </div>
    );
};

export default CompanyHomePage;