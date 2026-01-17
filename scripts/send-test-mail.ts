import "@/scripts/env";
import { sendMail } from "@/lib/mail";

async function main() {
  console.log("📨 Sending test mail...");

  const result = await sendMail({
    to: "yuichi.asa@gmail.com",
    subject: "CLI テストメール",
    text: "これはコンソールから送信したテストメールです。",
    html: "<p>これは <strong>CLI テストメール</strong> です。</p>",
  });

  if (!result.ok) {
    console.error("❌ Failed:", result.error);
    process.exit(1);
  }

  console.log("✅ Sent successfully:", result.messageId);
}

main();

// npx tsx scripts/send-test-mail.ts