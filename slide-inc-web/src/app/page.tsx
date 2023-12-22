import React from 'react';
import Link from 'next/link';
import Header from './components/header';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Home: React.FC = () => {
  redirect('/patients');
  
  return (
    <div/>
  )
}

export default Home;
