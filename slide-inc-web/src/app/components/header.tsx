'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from "react";

import style from './header.module.css'

const Header: React.FC = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    }
  });
  
  return (
    <header className={style.header}>
      <Link href="./">
        <h1 className={style.h1}>HealthAI</h1>
      </Link>
      <div className={style.accountInfoDiv}>
        <div className={style.email}>{session?.data?.user?.email}</div>
        <button className={style.button} onClick={() => signOut()}>Logout</button>
      </div>
    </header>
  )
}

export default Header;