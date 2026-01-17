// lib/env.ts
import dotenv from "dotenv";

if (!process.env.NEXT_RUNTIME) {
  dotenv.config({ path: ".env.local" });
}