'use client'

import React from 'react';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import Firebase auth functions
import Link from 'next/link';
import Header from '@/app/components/header';
import { auth } from '@/app/firebase';
import { createPatient } from '@/app/lib/database'; // Import your createPatient function from the database module

export default function AddPatient() {
  let gpPhone = "+353871234567"

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [sex, setSex] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [dob, setDob] = useState('');

  const signUserUp = () => {
    createUserWithEmailAndPassword(auth, email, dob);
  };

  const handleAddPatient = async () => {
    if (!name || !email || !phone || !policyNumber || !sex || !height || !weight || !dob) {
      alert('Please fill out all fields before adding a patient.');
      return;
    }

    const added = await createPatient(gpPhone, phone, email, name, Number(policyNumber), Boolean(sex), Number(height), Number(weight), dob);

    if (added) {
      signUserUp();
      setEmail('');
      setPhone('');
      setName('');
      setPolicyNumber('');
      setSex('');
      setHeight('');
      setWeight('');
      setDob('');
      alert('Patient added to the database!');
    }
  };

  return (
    <div>
      <Header params={{ backLink: "/patients" }}/>
      <main className='flex flex-col items-center justify-center min-h-screen'>
        <div>
          <h1> Add Patient </h1>

          <form onSubmit={handleAddPatient} className='max-w md mx-auto p-4 bg-white shadow-md rounded-lg'>
            <div className='mb-4'>

              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-800">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>

              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-800">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>

              <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-800">
                Phone
              </label>
              <div className="mt-2">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>

              <label htmlFor="policyNumber" className="block text-sm font-medium leading-6 text-gray-800">
                Policy Number
              </label>
              <div className="mt-2">
                <input
                  id="policyNumber"
                  name="policyNumber"
                  type="text"
                  autoComplete="Policy Number"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>

              <label htmlFor="sex" className="block text-sm font-medium leading-6 text-gray-800">
                Sex
              </label>
              <div className="mt-2">
                <input
                  id="sex"
                  name="sex"
                  type="text"
                  autoComplete="Sex"
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>

              <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-800">
                Height
              </label>
              <div className="mt-2">
                <input
                  id="height"
                  name="height"
                  type="number"
                  autoComplete="Height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>


              <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-800">
                Weight
              </label>
              <div className="mt-2">
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  autoComplete="Weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>

              <label htmlFor="dob" className="block text-sm font-medium leading-6 text-gray-800">
                Date of Birth
              </label>
              <div className="mt-2">
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  autoComplete="DD/MM/YYYY"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
              <div>
                <button
                  type="button" // Use type="button" to prevent form submission
                  onClick={handleAddPatient} // Call your handleAddPatient function when the button is clicked
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Add Patient
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
