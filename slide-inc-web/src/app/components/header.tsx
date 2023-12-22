'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from "react";

import style from './header.module.css'

const Header = ({params}: {params: { backLink: string }}) => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    }
  });

  let backButton = (<span/>)
  if (params != undefined && params.backLink != undefined && params.backLink != null && params.backLink != "") {
    backButton = (
      <a href={params.backLink}>
        <div className={style.button}>Back</div>
      </a>
    )
  }
  
  return (
    <header className={style.header}>
      <div>
        <Link href="./">
          <h1 className={style.h1}>HealthAI</h1>
        </Link>
        {backButton}
      </div>
      <div className={style.accountInfoDiv}>
        <div className={style.email}>{session?.data?.user?.email}</div>
        <button className={style.button} onClick={() => signOut()}>Logout</button>
      </div>
    </header>
  )
}

export default Header;