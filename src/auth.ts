import NextAuth, { AuthError } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

class InvalidCredentialsError extends AuthError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

const MAX_AGE_DATE = 15 * 24 * 60 * 60; // 15일
const UPDATE_ATE_DATE = 24 * 60 * 60; // 1일

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: MAX_AGE_DATE,
    updateAge: UPDATE_ATE_DATE,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        id: token.id as string,
        name: token.name,
        email: token.email,
      };
      session.error = token.error || null;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Identifier', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Partial<Record<'identifier' | 'password', unknown>>, req: any) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new InvalidCredentialsError('Missing credentials');
        }

        const identifier = credentials.identifier as string;
        const password = credentials.password as string;

        const res = await fetch(`${process.env.API_URL}/api/verify-credentials`, {
          method: 'POST',
          body: JSON.stringify({ identifier, password }),
          headers: { 'Content-Type': 'application/json' },
        });

        const user = await res.json();

        if (!res.ok || !user) {
          throw new InvalidCredentialsError(user?.message || 'Invalid credentials');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
});
