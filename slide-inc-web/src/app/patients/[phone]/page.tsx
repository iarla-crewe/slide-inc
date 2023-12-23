"use client"

import React from 'react';
import Link from 'next/link';
import { getPatient } from '../../lib/database';
import { displayGender } from '../../lib/utils';
import Header from '../../components/header';
import { redirect } from 'next/navigation';

import style from '../patients.module.css'
import MyHeartForm from './forms/heart';
import MyLungForm from './forms/lung';
import MyStrokeForm from './forms/stroke';
import HealthScoreButton from './button';

export default async function PatientDetails({ params }: { params: { phone: string }}) {
    const formattedPhone = params.phone.replace("%2B", "+").replace("%2", "+")
    const patient = await getPatient(formattedPhone);

    console.log(patient)

    if (patient == null) return (
        <div className={style.body}>
            <Header params={{ backLink: "" }}/>
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

    return (
        <div className={style.body}>
            <Header params={{ backLink: "/patients" }}/>
            <div className={style.patientDetails}>
                <div className={style.container}>
                    <div className={style.patientName}>
                        <p className={style.subheader}>Patient</p>
                        <h1 className={style.h1}>{patient.name}</h1>
                    </div>
                    <div className={style.row}>
                        <div className={style.column}>
                            <span className={style.patientDetaiLabel}>DOB: </span>
                            <span className={style.patientDetail}>{patient.dob}</span>
                        </div>
                        <div className={style.column}>
                            <span className={style.patientDetaiLabel}>Height: </span>
                            <span className={style.patientDetail}>{patient.height}cm</span>
                        </div>
                        <div className={style.column}>
                            <span className={style.patientDetaiLabel}>Health Insurance</span>
                        </div>
                    </div>
                    <div className={style.row}>
                        <div className={style.column}>
                            <span className={style.patientDetaiLabel}>Sex: </span>
                            <span className={style.patientDetail}>{displayGender(patient.sex)}</span>
                        </div>
                        <div className={style.column}>
                            <span className={style.patientDetaiLabel}>Weight: </span>
                            <span className={style.patientDetail}>{patient.weight}km</span>
                        </div>
                        <div className={style.column}>
                            <span className={style.patientDetail}>{patient.policyNumber}</span>
                        </div>
                    </div>
                    <MyLungForm params={{phone: formattedPhone}}/>
                    <MyHeartForm params={{phone: formattedPhone}}/>
                    <MyStrokeForm params={{phone: formattedPhone}}/>
                    <HealthScoreButton phone={formattedPhone} />
                </div>
            </div>
        </div>
    );
};
