import React from 'react';
import {getCompanyJobs} from "@/lib/api/jobs"

const RecruiterJobs = async() => {
    const companyId = "6a28252972b9e76a325ab5a5";
    const jobs = await getCompanyJobs(companyId);
    return (
        <div>
            Recruiter/ company all jobs
        </div>
    );
};

export default RecruiterJobs;