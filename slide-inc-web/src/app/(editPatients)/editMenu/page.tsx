import React from 'react';
import Link from 'next/link'

export default function editMenu() {

  return (
    <div >
      <h2>Patients Edit Menu</h2>

      <Link href="/addPatient">
          <span>Add Patient</span>
        </Link>
    </div>
  );
}
