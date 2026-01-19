// app/(auth)/logout/actions.ts
"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

/**
 * ログアウト処理（Server Action）
 * - セッション破棄
 * - 完了後に /login へ遷移（必要なら callbackUrl を変更）
 */
export async function logoutAction() {
  await signOut({
    redirect: true,
    redirectTo: "/login",
  });


  // signOutがredirect=trueなら基本到達しないが保険として
  redirect("/login");
}

