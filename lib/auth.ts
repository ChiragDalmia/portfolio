import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

export const config = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.username = profile.login;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.username === "string") {
        session.user.username = token.username;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      username?: string | null;
    };
  }
  interface Profile {
    login: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string;
  }
}
