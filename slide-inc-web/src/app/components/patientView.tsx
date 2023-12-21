import React from 'react';
import Link from 'next/link';
import { Patient } from '../lib/model';
import { displayGender } from '../lib/utils';

const PatientView = (patient: Patient) => {
  return (
    <div className="patientBox">
      <div className="patientInfo">
        <p className="patientText">
          <span className="label">Name: {patient.name}</span>
        </p>
        <p className="patientText">
          <span className="label">Sex: {displayGender(patient.sex)}</span>
        </p>
        <p className="patientText">
          <span className="label">DOB: {patient.dob}</span>
        </p>
      </div>
      <Link href={"/patients/" + patient.phone}>
        <button className="detailsButton">
          <span>Details</span>
        </button>
      </Link>
    </div>
  );
};

export default PatientView;
