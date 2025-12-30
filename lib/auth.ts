import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db";
import { env } from "@/lib/env";

// const { getDb } = await import("@/lib/db.js")
// const db = getDb()

export const auth = betterAuth({
    advanced: {
        database: {
            generateId: false,
        },
    },
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),

    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET
        },
        google: {
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET
        }
    }
});


