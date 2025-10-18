
export interface SessionProps {
    name: string
    email: string
    createdAt: Date;
    updatedAt: Date
    id: string;
    image?: string | undefined |null
    
}

export type Tabs = "sign-in" | "sign-up" | "email-verification" | "forget-password"
