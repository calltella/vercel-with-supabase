
// /app/lib/mail.ts
import nodemailer, { Transporter } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

type SendMailResult =
  | { ok: true; messageId: string }
  | { ok: false; error: string };

// モジュールスコープに「1つだけ」トランスポートを持つ
let smtpTransport: Transporter | null = null;

export function getTransporter(): Transporter {
  if (smtpTransport) return smtpTransport;

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT) {
    throw new Error("SMTP_HOST or SMTP_PORT is not set");
  }

  const port = Number(SMTP_PORT);

  // 25番は必ず secure:false（465のみ true）
  const secure = port === 465;

  const isProduction = process.env.NODE_ENV === "production";

  // ★ 認証なし（auth / authMethod は指定しない）
  const options: SMTPTransport.Options = {
    host: SMTP_HOST,
    port,
    secure,
    requireTLS: isProduction,
    logger: !isProduction,
    debug: !isProduction,
  };

  // 本番のみ
  if (isProduction) {
    if (!SMTP_USER || !SMTP_PASS) {
      throw new Error("SMTP_USER or SMTP_PASS is not set in production");
    }

    options.auth = {
      user: SMTP_USER,
      pass: SMTP_PASS,
      method: "LOGIN",
    };
  }

  smtpTransport = nodemailer.createTransport(options);

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
