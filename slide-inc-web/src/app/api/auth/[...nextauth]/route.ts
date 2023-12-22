import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from "@/app/firebase";
import { NextApiRequest, NextApiResponse } from "next";

const authOptions = {
  pages: {
    signIn: '/signin'
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(
          auth, 
          (credentials as any).email || '', 
          (credentials as any).password || '')
        .then(userCredential => {
          if (userCredential.user) return userCredential.user;
          else return null;
        })
        .catch((error) => {
          console.log(error);
          return null;
        });
      }
    })
  ],
}

const authHandler = NextAuth(authOptions);

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    return await authHandler(req, res)
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return await authHandler(req, res)
}
