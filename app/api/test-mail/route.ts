import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function POST() {
  await sendMail({
    to: "seve_force@yahoo.co.jp",
    subject: "テストメール",
    text: "これはテストメールです。",
    html: "<p>これは <strong>テストメール</strong> です。</p>",
  });

  return NextResponse.json({ ok: true });
}
