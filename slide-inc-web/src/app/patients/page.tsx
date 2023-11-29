import React from 'react';
import Patient from '../components/patient';

import { createPatient, getAllPatientsOfDoctor } from '../lib/database';

export default function Patients() {
  const doctorPhone = "+353873459811"

  const foo = getAllPatientsOfDoctor(doctorPhone);
  console.log(foo);
  console.log("foo");
  createPatient("+353873459811", "iarla.crewe@gmail.com", "+3531234567", "foo", 123, true, 180, 80);

  const patients = [
    { name: 'Eric Afrifa', sex: 'Male', dob: '14/04/2002' },
    {name: 'Scott Geaney', sex: 'Male', dob: '06/06/2002'},
    {name: 'Leon Savva', sex: 'Male', dob: '25/09/1999'},
    {name: 'Diego Garcia', sex: 'Male', dob: '27/06/2006'},
    {name: 'Iarla Crewe', sex: 'Male', dob: '05/02/2002'},
    {name: 'Michelle Njoku', sex: 'Female', dob: '12/12/2001'},
    {name: 'Eoghan Smith', sex: 'Male', dob: '14/01/1998'},
    {name: 'Emma Smith', sex: 'Female', dob: '14/01/1998'}
  ];

  return (
    <div className="patientList" >
      <h2>Patients List</h2>
      {patients.map((patient, index) => (
        <Patient key={index} {...patient} />
      ))}
    </div>
  );
}
