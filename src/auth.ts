import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import NextAuth, { AuthError } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { signJwtAccessToken } from '@/lib/jwt';

import type { NextAuthConfig } from 'next-auth';

const prisma = new PrismaClient();

class InvalidCredentialsError extends AuthError {
  constructor(message: string) {
    super();
    this.message = message;
  }
}

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Identifier', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Partial<Record<'identifier' | 'password', unknown>>) {
        console.log('VERCEL_URL:', process.env.VERCEL_URL);
        if (!credentials?.identifier || !credentials?.password) {
          throw new InvalidCredentialsError('Missing credentials');
        }

        const identifier = credentials.identifier as string;
        const password = credentials.password as string;

        const user = await prisma.user.findFirst({
          where: { identifier },
        });

        if (!user) {
          throw new InvalidCredentialsError('Invalid identifier');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new InvalidCredentialsError('Invalid password');
        }

        const { password: _password, ...userWithoutPassword } = user;
        const accessToken = signJwtAccessToken(userWithoutPassword);

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          accessToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user = {
        id: token.id as string,
        name: token.name,
        email: token.email,
      };
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
