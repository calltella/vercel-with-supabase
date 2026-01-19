// /app/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import PostgresAdapter from "@auth/pg-adapter";
import { Pool } from "pg";
import { getUserFromDb } from "@/lib/utils/auth";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production"
    ? { rejectUnauthorized: false }
    : false,
});

const isProduction = process.env.NODE_ENV === "production";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(pool),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        //let user = null;

        const { email, password } = credentials;

        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        // logic to verify if the user exists
        const user = await getUserFromDb(email, password);

        if (!user) {
          // No user found, so this is their first attempt to login
          // Optionally, this is also the place you could do a user registration
          return null;
        }

        // return user object with their profile data
        return user;
      },
    }),
    // --- 本番環境のみ OAuth を追加 ---
    ...(isProduction
      ? [
        Google({
          clientId: process.env.AUTH_GOOGLE_ID!,
          clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
      ]
      : []),
  ],
});
