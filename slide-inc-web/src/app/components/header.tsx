'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from "react";

const Header: React.FC = () => {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/signin');
    },
  });
  
  return (
    <header className="bg-gray-300 pb-6 pt-8 border-b border-gray-500">
      <Link href="./">
      <h1 className="text-3xl font-bold text-black ml-4">HealthAI</h1>
      </Link>
      <div className="p-8">
        <div className='text-white'>{session?.data?.user?.email}</div>
        <button className='text-white' onClick={() => signOut()}>Logout</button>
      </div>
    </header>
  )

}

export default Header;