import React from 'react';
import Link from 'next/link';
import { getPatient } from '@/app/lib/database';
import { displayGender } from '@/app/lib/utils';
import Header from '@/app/components/header';

export default async function PatientDetails({ params }: { params: { phone: string }}) {
    const patient = await getPatient(params.phone.replace("%2B", "+"));
    if (patient == null) return (<div/>)

    return (
        <div className="container">
            <Header/>
            <div className="patient-details">
                <Link href="/patients">
                    <span className="back-button">Back</span>
                </Link>
                <div className="patientBox">
                <div className="patientInfo">
                    <p className="patientText">
                    <span className="label">Name: {patient.name} </span>
                    </p>
                    <p className="patientText">
                    <span className="label">Sex: {displayGender(patient.sex)} </span>
                    </p>
                    <p className="patientText">
                    <span className="label">DOB: {patient.dob} </span>
                    </p>
                </div>
                </div>
            </div>
            <div className="divider"></div>
            <div className="predictionText">
                <p className="label">Prediction:</p>
                <p>TODO</p>
            </div>
            <div className="healthScoreText">
                <p className="label">Health Score:</p>
                <p>TODO</p>
            </div>
        </div>
    );
};
