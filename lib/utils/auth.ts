import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

/**
 * メールアドレスとハッシュ化前パスワードでユーザーを取得
 * @param email string
 * @param password string（平文）
 */
export async function getUserFromDb(
  email: string,
  password: string
) {
  // ユーザー取得
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return null;
  }

  if (!user.passwordHash) {
    return null;
  }

  // パスワード検証
  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    return null;
  }

  // NextAuth が要求する user オブジェクトを返す
  return {
    id: user.id.toString(), // NextAuth は string を期待
    name: user.name,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };
}
