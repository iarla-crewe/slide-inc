'use client';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth } from '../../firebase';

import style from '../auth.module.css'

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');

  const router = useRouter();

  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  return (
    <>
      <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <h1 className={style.title}>
            HealthAI
          </h1>
          <h2 className={style.signInHeading}>
            Sign up
          </h2>
        </div>

        <div className={style.formContainer}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className={style.formLabel}>
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={style.formField}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className={style.formLabel}>
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={style.formField}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className={style.formLabel}>
                  Password Again
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="passwordAgain"
                  name="passwordAgain"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPasswordAgain(e.target.value)}
                  required
                  className={style.formField}
                />
              </div>
            </div>

            <div>
              <button
                disabled={(!email || !password || !passwordAgain) || (password !== passwordAgain)}
                onClick={() => signup()}
                className={style.button}
              >
                Sign Up
              </button>
            </div>

            <p className="mt-10 text-center text-sm text-gray-400">
            Already a member?{' '}
            <button onClick={() => router.push('signin')} className={style.link}>
              Log In
            </button>
          </p>
          </div>
        </div>
      </div>
    </>
  );
}
