import React from 'react';
import Link from 'next/link';

import Header from '../components/header';
import PatientView from '../components/patientView';
import { getAllPatientsOfDoctor } from '../lib/database';
import style from './patients.module.css';

export default async function Patients() {
  const doctorPhone = "+353871234567"
  const patients = await getAllPatientsOfDoctor(doctorPhone);

  return (
    <div className={style.body}>
      
      <Header params={{ backLink: "" }}/>
      <div className={style.addPatient}>
        <Link href="/addPatient">
          <button className={style.detailsButton}>Add Patient</button>
        </Link>
      </div>
      <div className={style.patientList}>
        <h2 className={style.listHeader}>Patients List</h2>
        {patients.map((patient, index) => (
          <PatientView key={index} {...patient} />
        ))}
        
      </div>
    
    </div>
  );
}
