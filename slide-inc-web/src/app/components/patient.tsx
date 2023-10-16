import React from 'react';
import Link from 'next/link';

interface PatientProps {
  name: string;
  sex: string;
  dob: string;
}

const Patient = ({ name, sex, dob }: PatientProps) => {
  return (
    <div className="patientBox">
      <div className="patientInfo">
        <p className="patientText">
          <span className="label">Name:</span> {name}
        </p>
        <p className="patientText">
          <span className="label">Sex:</span> {sex}
        </p>
        <p className="patientText">
          <span className="label">DOB:</span> {dob}
        </p>
      </div>
      <button className="detailsButton">
        <Link href="/patientDetails">
          <span>Details</span>
        </Link>
      </button>
    </div>
  );
};

export default Patient;
