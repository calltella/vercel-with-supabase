// app/(protected)/AuthGate.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProviderClient from "./ThemeProviderClient";
import TopNaviMenu from "@/components/nav/TopNaviMenu";
import ThemeVariablesClient from "./ThemeVariablesClient";
import { SessionProvider } from "next-auth/react";
import { ColorThemeKey } from "@/app/theme/colorTheme";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function AuthGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");
  const key: ColorThemeKey = session.user.themeColor ?? "default";

  return (
    <SessionProvider session={session}>
      <ThemeProviderClient initialTheme={session.user.themeMode}>
        <ThemeVariablesClient paletteKey={key} />
        <TopNaviMenu />
        <main
          className={`
          ${geistSans.variable}
          ${geistMono.variable}
          antialiased
          pt-17
        `}
        >
          {children}
        </main>
      </ThemeProviderClient>
    </SessionProvider>
  );
}
