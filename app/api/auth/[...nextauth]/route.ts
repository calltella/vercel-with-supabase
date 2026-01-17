import { handlers } from "@/auth" // Referring to the auth.ts we just created
export const { GET, POST } = handlers


console.log('NODE_ENV=', process.env.NODE_ENV);
console.log('VERCEL_ENV=', process.env.VERCEL_ENV);
