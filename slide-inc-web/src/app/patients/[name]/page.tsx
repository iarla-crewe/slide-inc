import React from 'react';
import Link from 'next/link';
import Header from '../../components/header';

export default function PatientDetails({ params }: { params: { name: string }}) {
    const name = params.name.replace("%20", " ");

    const patientInfo = {
        name: name,
        sex: 'Male',
        dob: '14/04/2002',
        prediction: 'Rick prediction',
        healthScore: '90%',
    };

    return (
        <div className="container">
        <div className="patient-details">
            <Link href="/patientList">
            <span className="back-button">Back</span>
            </Link>
            <div className="patientBox">
            <div className="patientInfo">
                <p className="patientText">
                <span className="label">Name:</span> {patientInfo.name}
                </p>
                <p className="patientText">
                <span className="label">Sex:</span> {patientInfo.sex}
                </p>
                <p className="patientText">
                <span className="label">DOB:</span> {patientInfo.dob}
                </p>
            </div>
            </div>
        </div>
        <div className="divider"></div>
        <div className="predictionText">
            <p className="label">Prediction:</p>
            <p>{patientInfo.prediction}</p>
        </div>
        <div className="healthScoreText">
            <p className="label">Health Score:</p>
            <p>{patientInfo.healthScore}</p>
        </div>
        </div>
    );
};
