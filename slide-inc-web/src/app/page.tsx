import React from 'react';

export default function Home() {
  return (
    <div>
      <header className="bg-gray-300 pb-6 pt-8 border-b border-gray-500">
        <h1 className="text-3xl font-bold text-black ml-4">HealthAI</h1>
      </header>
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold mb-8">Welcome to HealthAI</h1>
        <p className="text-xl text-center mb-8">
          Unlock the Power of AI in Healthcare
        </p>
        <div className="flex flex-col space-y-4">
          <button className="google-login-button">
            <span className="button-icon" />
            Login with Google
          </button>
        </div>
        <p className="text-lg mt-6">
          New to HealthAI? <a href="/register" className="text-blue-500">Create an Account</a>
        </p>
      </main>
    </div>
  );
}
