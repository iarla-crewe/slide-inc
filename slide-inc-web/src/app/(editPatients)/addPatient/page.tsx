'use client'

import React from 'react';
import { useState } from 'react';
import { createPatient } from '@/app/lib/database';
import Header from '@/app/components/header';

export default function AddPatient() {

    let gpEmail = "create@user.com"

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [policyNumber, setPolicyNumber] = useState('');
    const [sex, setSex] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');


    const handleSubmit = async (event: any) => {
        event.preventDefault();

        // Execute a function with the collected data
        const added = await createPatient(gpEmail, phone, email, name, parseInt(policyNumber), Boolean(sex), parseFloat(height), parseFloat(weight));

        if (added) {
            setEmail('');
            setPhone('');
            setName('');
            setPolicyNumber('');
            setSex('');
            setHeight('');
            setWeight('');

            alert("Patient added to database!")
        }
    };

    return (
        <div>
            <Header />
            <main className='flex flex-col items-center justify-center min-h-screen'>
                <div>
                    <h1> Register </h1>

                    <form onSubmit={handleSubmit} className='max-w md mx-auto p-4 bg-white shadow-md rounded-lg'>
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
                                    type="text"
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
                                    type="text"
                                    autoComplete="Weight"
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                    required
                                    className="block w-full rounded-md border-0 bg-white py-1.5 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className='text-center'>
                                <button
                                    type='submit'
                                    className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg'>
                                    Submit
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}