import { mergeAnonymousCartIntoUserCart } from '@/lib/db/cart';
import { prisma } from '@/lib/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '@/lib/env';

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as PrismaClient) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      session.user.isAdmin =
        user.email === env.ADMIN || user.email === env.SUPER_ADMIN;
      return session;
    },
  },
  events: {
    async signIn({ user }) {
      await mergeAnonymousCartIntoUserCart(user.id);
    },
  },
};

export default authOptions;
