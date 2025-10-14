import db from "@/utils/db"
import { betterAuth } from "better-auth"
import { nextCookies } from "better-auth/next-js"
import { mongodbAdapter } from "better-auth/adapters/mongodb";

export const auth = betterAuth({
    plugins: [nextCookies()],
    emailAndPassword: {    
        enabled: true
    },
    database: mongodbAdapter(db)
})