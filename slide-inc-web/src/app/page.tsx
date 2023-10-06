import React from 'react';

export default function Home() {
  return (
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
  );
}
