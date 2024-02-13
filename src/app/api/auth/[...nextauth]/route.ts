import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

import type { NextAuthOptions } from 'next-auth';

const AuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				identifier: {
					label: '아이디',
					type: 'text',
				},
				password: { label: '비밀번호', type: 'password' },
			},
			async authorize(credentials, req) {
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

				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},

		async session({ session, token }) {
			session.user = token as any;
			return session;
		},
	},
	pages: {
		signIn: '/login',
	},
};

const handler = NextAuth(AuthOptions);

export { handler as GET, handler as POST };
