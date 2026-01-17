
// /app/lib/mail.ts
import nodemailer, { Transporter } from "nodemailer";

type SendMailResult =
  | { ok: true; messageId: string }
  | { ok: false; error: string };

// モジュールスコープに「1つだけ」トランスポートを持つ
let smtpTransport: Transporter | null = null;

export function getTransporter(): Transporter {
  if (smtpTransport) return smtpTransport;

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE } = process.env;
  if (!SMTP_HOST || !SMTP_PORT) {
    throw new Error("SMTP_HOST or SMTP_PORT is not set");
  }

  const port = Number(SMTP_PORT);
  // 25番は必ず secure:false（465のみ true）
  const secure = SMTP_SECURE === "true" || port === 465 ? true : false;

  // ★ 認証なし（auth / authMethod は指定しない）
  smtpTransport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,          // 25番は false
    // このサーバは STARTTLS を広告していないので ignoreTLS は不要（付けても良い）
    // ignoreTLS: true,
    logger: process.env.NODE_ENV !== "production",
    debug: process.env.NODE_ENV !== "production",
  });

  // 実行時に効いている値を確認
  console.log("[SMTP CONFIG]", {
    host: SMTP_HOST,
    port,
    secure,
  });

  return smtpTransport;
}

export async function sendMail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}): Promise<SendMailResult> {
  if (!process.env.MAIL_FROM) {
    return { ok: false, error: "MAIL_FROM is not set" };
  }

  try {
    const info = await getTransporter().sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
      html,
    });

    return { ok: true, messageId: info.messageId };
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("❌ Mail send error:", err);
    } else {
      console.error("❌ Mail send failed");
    }
    return { ok: false, error: "Failed to send email" };
  }
}
