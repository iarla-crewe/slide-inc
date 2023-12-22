'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import style from '../auth.module.css'

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  return (
    <>
    <div className={style.mainContainer}>
        <div className={style.headerContainer}>
          <h1 className={style.title}>
            HealthAI
          </h1>
          <h2 className={style.signInHeading}>
            Sign in to your account
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
                <div className="text-sm">
                  <div onClick={() => router.push('/forgot-password')} className={style.heavyLink}>
                    Forgot password?
                  </div>
                </div>
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
              <button
                onClick={() => signIn('credentials', {email, password, redirect: true, callbackUrl: '/patients'})}
                disabled={!email || !password}
                className={style.button}
              >
                Sign in
              </button>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-gray-400">
            Not a member?{' '}
            <button onClick={() => router.push('signup')} className={style.link}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </>
  )
}