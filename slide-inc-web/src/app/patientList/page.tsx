"use client"

import React from 'react';
import Header from '../components/header';
import PatientList from '../components/list'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation';

export default function PatientsList() {
  const session = useSession({
    required: true,
    onUnauthenticated() {
        redirect('/signin')
    },
  })


  return (
    <div>
      <Header/>
      <PatientList/>
    </div>
  );
}

PatientsList.requireAuth = true

