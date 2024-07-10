import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import type { NextAuthOptions } from 'next-auth';

const AuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				identifier: {},
				password: {},
			},
			async authorize(credentials) {
				const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user/login`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						identifier: credentials?.identifier,
						password: credentials?.password,
					}),
				});
				const user = await res.json();

				if (res.ok && user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }: any) {
			if (user) {
				token.accessToken = user.accessToken;
			}
			return token;
		},

		async session({ session, token }: { session: any; token: JWT }) {
			session.user = token;
			session.accessToken = token.accessToken;
			session.error = token.error;
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
