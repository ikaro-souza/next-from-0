import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '../env/server.mjs';
import { createDefaultShoppingList } from '../server/common/create-default-shopping-list';
import { prisma } from '../server/db/client';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
    signIn({ user }) {
      createDefaultShoppingList(user.id);
      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
    // TwitterProvider({
    //   clientId: env.TWITTER_ID,
    //   clientSecret: env.TWITTER_SECRET,
    //   version: '2.0',
    // }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
};
