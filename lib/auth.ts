import db from "@/utils/db"
import { betterAuth } from "better-auth"
import {createAuthMiddleware} from "better-auth/api"
import { nextCookies } from "better-auth/next-js"
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { sendEmailVerification } from "@/components/features/verification-email";
import { sendForgetPasswordEmail } from "@/components/features/forget-password-email";
import { sendWelcomeEmail } from "@/components/features/welcome-email";

export const auth = betterAuth({
    plugins: [nextCookies()],
    emailAndPassword: {    
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({user, url})=>{
        await sendForgetPasswordEmail(user, url)
        }
    },
    emailVerification: {
        autoSignInAfterVerification: true,
        sendOnSignUp: true,
        sendVerificationEmail: async ({user, url})=> {
            await sendEmailVerification(user, url)
        }
    },
    database: mongodbAdapter(db),
    hooks: {
        after: createAuthMiddleware(async ctx => {
            if(ctx.path.startsWith("/sign-up")){
                const user = ctx.context.newSession?.user ?? {
                    email: ctx.body.email,
                    name: ctx.body.name
                }
                if(user != null){
                   await sendWelcomeEmail(user)
                }
            } 
        })
    }
})