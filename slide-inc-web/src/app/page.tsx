import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Home() {
  let isSignedIn = true;

  if (isSignedIn) redirect("/patients");

  return (
    <div>
        <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold mb-8">Welcome to HealthAI</h1>
        <p className="text-xl text-center mb-8">
            Unlock the Power of AI in Healthcare
        </p>
        <div className="flex flex-col space-y-4">
            <Link href="./patientList">
            <span className="google-login-button">
                <span className="button-icon" />
                Login with Google
            </span>
            </Link>
        </div>
        <p className="text-lg mt-6">
            New to HealthAI?{' '}
            <Link href="./registration">
            <span className="text-blue-500">Create an Account</span>
            </Link>
        </p>
        </main>
    </div>
);
}
