import React from 'react';
import Link from 'next/link'
import Header from '@/app/components/header';

export default function editMenu() {

  return (
    <div >
      <Header/>
      <h2>Patients Edit Menu</h2>

      <Link href="/addPatient">
          <span>Add Patient</span>
        </Link>
    </div>
  );
}
