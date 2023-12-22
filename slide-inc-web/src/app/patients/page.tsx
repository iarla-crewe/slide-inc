import Header from '../components/header';
import PatientView from '../components/patientView';

import { getAllPatientsOfDoctor } from '../lib/database';

import style from './patients.module.css';

export default async function Patients() {
  const doctorPhone = "+353873459811"

  const patients = await getAllPatientsOfDoctor(doctorPhone);

  return (
    <div className={style.body}>
      <Header/>
      <div className={style.patientList} >
        <h2 className={style.listHeader}>Patients List</h2>
        {patients.map((patient, index) => (
          <PatientView key={index} {...patient} />
        ))}
      </div>
    </div>
  );
}
