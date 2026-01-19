// app/(auth)/logout/page.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { logoutAction } from "./actions";

export default async function LogoutPage() {
  const session = await auth();
  // 未ログインならログイン画面へ
  if (!session) redirect("/login");

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <p className="mb-4 text-sm text-gray-700">
          ログアウトします。よろしいですか？
        </p>
        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 px-4 rounded-md shadow hover:bg-sky-600"
          >
            ログアウト
          </button>
        </form>
      </div>
    </div>
  );
}
