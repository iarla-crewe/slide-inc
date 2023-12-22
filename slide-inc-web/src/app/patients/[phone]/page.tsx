import React from 'react';
import Link from 'next/link';
import { getPatient } from '@/app/lib/database';
import { displayGender } from '@/app/lib/utils';
import Header from '@/app/components/header';

import style from '../patients.module.css'

export default async function PatientDetails({ params }: { params: { phone: string }}) {
    const patient = await getPatient(params.phone.replace("%2B", "+"));
    if (patient == null) return (<div/>)

    // {patient.name}
    // {displayGender(patient.sex)}
    // {patient.dob}

    return (
        <div className={style.body}>
            <Header/>
            <div className={style.patientDetails}>
                <div className={style.container}>
                    <div className={style.patientName}>
                        <span className={style.subheader}>Patient</span>
                        <h1 className={style.h1}>{patient.name}</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
