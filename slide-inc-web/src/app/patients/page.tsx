import PatientView from '../components/patientView';

import { createPatient, getAllPatientsOfDoctor, getDoctor } from '../lib/database';

export default async function Patients() {
  const doctorPhone = "+353873459811"

  const patients = await getAllPatientsOfDoctor(doctorPhone);

  return (
    <div className="patientList" >
      <h2>Patients List</h2>
      {patients.map((patient, index) => (
        <PatientView key={index} {...patient} />
      ))}
    </div>
  );
}
