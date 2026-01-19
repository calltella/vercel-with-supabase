// /app/app/(auth)/login/LoginError.tsx
"use client";

import { useSearchParams } from "next/navigation";

export default function LoginError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  if (!error) return null;

  return (
    <p className="mb-4 text-sm text-red-600">
      メールアドレスまたはパスワードが違います
    </p>
  );
}
