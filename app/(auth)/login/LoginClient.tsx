// /app/app/(auth)/login/LoginClient.tsx
"use client";

import GoogleSignIn from "@/components/GoogleSignIn";
import { loginAction } from "./actions";
import LoginError from "./LoginError";

export default function LoginClient() {
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">
          ログイン
        </h1>

        <LoginError />

        <form action={loginAction}>
          <input type="hidden" name="next" value="/user/dashboard" />

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              メールアドレス
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded border px-3 py-2 text-sm"
            />
          </div>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium">
              パスワード
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded border px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 text-white"
          >
            ログイン
          </button>
        </form>

        {isProduction && <GoogleSignIn />}
      </div>
    </div>
  );
}
