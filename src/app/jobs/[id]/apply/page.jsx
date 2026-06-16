import React from 'react';
import {getUserSession} from "@/lib/core/session";
import { redirect } from 'next/navigation';

const ApplyPage = async({params}) => {
    const {id} = await params;
    const user = await getUserSession();
    if(!user){
        redirect(`/signin?redirect=/jobs/${id}/apply`);
    }
    return (
        <div>
            Appy Here
        </div>
    );
};

export default ApplyPage;