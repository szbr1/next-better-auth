import z from "zod";

const signUpSchema = z.object({
    name: z.string().min(1),
    email: z.email().min(5),
    password: z.string().min(6)
})


export type SignUpProps = z.infer<typeof signUpSchema>