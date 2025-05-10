import React, {useEffect, useState} from 'react';
import {useLoaderData, useParams} from "react-router";
import CompanyCard from "./CompanyCard.jsx";

const CompanyDetails = () => {

    const data = useLoaderData()
    // console.log(data)
    const {id} = useParams()
    const [company, setCompany] = useState([]);

    useEffect(() => {
        const companyDetails = data.find(companyDetail => companyDetail.id == id);
        console.log(companyDetails)

        setCompany(companyDetails);
    }, [data, id]);

    return (
        <div>
            <CompanyCard company={company}/>
        </div>
    );
};

export default CompanyDetails;