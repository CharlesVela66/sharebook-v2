import type { NextAuthConfig, Session } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }: { session: Session; token: JWT }) {
      session.user.id = token.id;
      return session;
    },
  },
} satisfies NextAuthConfig;
