// /types/next-auth.d.ts
import { DefaultSession } from "next-auth";
import type { UserRole, ThemeMode } from "./user";
import type { ColorThemeKey } from "@/app/theme/colorTheme";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      themeMode: ThemeMode;
      themeColor: ColorThemeKey;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
  }
}
