// lib/env.ts
import dotenv from "dotenv";

if (!process.env.VERCEL) {
  const envFile =
    process.env.APP_ENV === "cli"
      ? ".env.production"
      : ".env";
  console.log(`設定ファイル ${envFile} を使います`)
  dotenv.config({ path: envFile });
}

// npx tsx scripts/seeder
// APP_ENV=cli npx tsx scripts/seeder