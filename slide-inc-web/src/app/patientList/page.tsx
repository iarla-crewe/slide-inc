import React from 'react';
import Header from '../components/header';
import PatientList from '../components/list'

const patientList: React.FC = () => {
  return (
  
    <div>
      <Header/>
      <PatientList/>
    </div>
  );
}

export default patientList;
