// /app/app/(auth)/login/LoginClient.tsx
"use client";

import GoogleSignIn from "@/components/GoogleSignIn";
import { loginAction } from "./actions";
import { useSearchParams } from "next/navigation";

export default function LoginClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const isProduction = process.env.NODE_ENV === "production";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">
          ログイン
        </h1>

        {error && (
          <p className="mb-4 text-sm text-red-600">
            メールアドレスまたはパスワードが違います
          </p>
        )}

        <form action={loginAction}>
          {/* redirect 先を保持したい場合 */}
          <input type="hidden" name="next" value="/user/dashboard" />

          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium">
              メールアドレス
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
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
              className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            ログイン
          </button>
        </form>

        {/* 本番環境のみ OAuth */}
        {isProduction && (
          <>
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t" />
              <span className="mx-2 text-xs text-gray-500">
                または
              </span>
              <div className="flex-1 border-t" />
            </div>

            <GoogleSignIn />
          </>
        )}
      </div>
    </div>
  );
}
