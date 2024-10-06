import { PrismaAdapter } from "@auth/prisma-adapter";
import {
  getServerSession,
  type NextAuthOptions,
  type DefaultUser,
} from "next-auth";
import type { Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import Stripe from "stripe";
import { env } from "@/env";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & {
      id: string;
      // ...other properties
      // role: UserRole;
      stripeCustomerId: string;
      isActive: boolean;
    };
  }

  interface User extends DefaultUser {
    // ...other properties
    id: string;
    stripeCustomerId: string;
    isActive: boolean;
    // role: UserRole;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: async ({ session, user }) => {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      session.user!.id = user.id;
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      session.user!.stripeCustomerId = user.stripeCustomerId;
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      session.user!.isActive = user.isActive;
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      session.user!.name = user.name;
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      session.user!.email = user.email;
      return session;
    },
  },
  events: {
    createUser: async ({ user }) => {
      const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
        apiVersion: "2024-06-20",
      });
      if (!user.email || !user.name) {
        console.log("user", user);
        throw new Error("missing some info to create a user's customer");
      }

      await stripe.customers
        .create({
          email: user.email,
          name: user.name,
        })
        .then(async (customer) => {
          await db.user.update({
            where: {
              id: user.id,
            },
            data: {
              stripeCustomerId: customer.id,
            },
          });
          return;
        })
        .catch((err) => {
          console.log("user", user, err);
          console.error("Failed to create user");
          throw new Error("missing some info to create a user's customer");
        });
    },
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
