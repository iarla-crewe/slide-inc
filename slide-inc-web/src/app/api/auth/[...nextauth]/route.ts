import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import {signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from "@/app/firebase";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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

export async function POST(req: Request, res: Response) {
    return await authHandler(req, res)
}

export async function GET(req: Request, res: Response) {
  return await authHandler(req, res)
}
