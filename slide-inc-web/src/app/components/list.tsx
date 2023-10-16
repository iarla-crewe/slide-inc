import React from 'react';
import Patient from './patient';

const patients = [
  { name: 'Eric Afrifa', sex: 'Male', dob: '14/04/2002' },
  {name: 'Scott Geaney', sex: 'Male', dob: '06/06/2002'},
  {name: 'Leon Savva', sex: 'Male', dob: '25/09/1999'},
  {name: 'Diego Garcia', sex: 'Male', dob: '27/06/2006'},
  {name: 'Iarla Crewe', sex: 'Male', dob: '05/02/2002'},
  {name: 'Michelle Njoku', sex: 'Female', dob: '12/12/2001'},
  {name: 'Eoghan Smith', sex: 'Male', dob: '14/01/1998'}
  
];

const PatientList = () => {
  return (
    <div>
      <h2>Patients List</h2>
      {patients.map((patient, index) => (
        <Patient key={index} {...patient} />
      ))}
    </div>
  );
};

export default PatientList;
