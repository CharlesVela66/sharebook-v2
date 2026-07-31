import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import z from 'zod';
import argon2 from "argon2"
import { getUserByEmail } from './features/Users/services/user.services';
 
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [    
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (parsedCredentials.success){
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user) return null;

          const passwordsMatch = await argon2.verify(user.password, password);
          if (passwordsMatch) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _password, ...safeUser } = user;
            return safeUser;
          }
        }
        console.log("Invalid credentials");
        return null;
      },
    }),]
});