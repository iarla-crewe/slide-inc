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

  // return (
  //   <div>
  //     <Header/>
  //     <main>
  //       <h1>Welcome to HealthAI</h1>
  //       <p>
  //         Unlock the Power of AI in Healthcare
  //       </p>
  //       <p>
  //         Already have an account?
  //         <Link href="./signin">
  //           <span>Sign In</span>
  //         </Link>
  //       </p>
  //       <p>
  //         New to HealthAI?
  //         <Link href="./signup">
  //           <span>Create an Account</span>
  //         </Link>
  //       </p>
  //     </main>
  //   </div>
  // );
}

export default Home;
