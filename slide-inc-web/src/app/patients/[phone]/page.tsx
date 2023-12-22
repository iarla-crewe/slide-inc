import React from 'react';
import Link from 'next/link';
import { getPatient } from '@/app/lib/database';
import { displayGender } from '@/app/lib/utils';
import Header from '@/app/components/header';

import style from '../patients.module.css'

export default async function PatientDetails({ params }: { params: { phone: string }}) {
    const formattedPhone = params.phone.replace("%2B", "+").replace("%2", "+")
    const patient = await getPatient(formattedPhone);

    if (patient == null) return (
        <div className={style.body}>
            <Header/>
            <div className={style.patientDetails}>
                <div className={style.container}>
                    <div className={style.patientName}>
                        <h1 className={style.h1}>Could not find patient with phone number: {formattedPhone}</h1>
                        <a href="/patients" className={style.subheaderLink}>Go Back</a>
                    </div>
                </div>
            </div>
        </div>
    )

    // {displayGender(patient.sex)}
    // {patient.dob}

    return (
        <div className={style.body}>
            <Header/>
            <div className={style.patientDetails}>
                <div className={style.container}>
                    <div className={style.patientName}>
                        <p className={style.subheader}>Patient</p>
                        <h1 className={style.h1}>{patient.name}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
