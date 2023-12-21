import React from 'react';
import Link from 'next/link';
import { Patient } from '../lib/model';
import { displayGender } from '../lib/utils';

import style from '../patients/patients.module.css'

const PatientView = (patient: Patient) => {
  return (
    <div className={style.patientBox}>
      <div className={style.patientInfo}>
        <p className={style.patientText}>
          <span className={style.label}>{patient.name}</span>
        </p>
        <p className={style.patientText}>
          <span className={style.label}>{displayGender(patient.sex)}</span>
        </p>
        <p className={style.patientText}>
          <span className={style.label}>{patient.dob}</span>
        </p>
      </div>
      <Link href={"/patients/" + patient.phone}>
        <button className={style.detailsButton}>
          <span>Details</span>
        </button>
      </Link>
    </div>
  );
};

export default PatientView;
