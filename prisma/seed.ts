/**
 * Prisma Seeder
 * 安全に初期データを投入
 * 
 * npx tsx scripts/seeder （開発用）
 * APP_ENV=cli npx tsx scripts/seeder  (本番用)
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { UserRole, ThemeMode } from "../app/types/user"
import { ColorThemeKey } from "../app/theme/colorTheme"

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Prisma Seeder 開始(/app/prisma/seed.ts)");

  const seedUsers = [
    {
      email: "admin@example.com",
      name: "admin user",
      role: "admin" as UserRole,
      password: "passowrd",
      emailVerified: true,
      account: {
        type: "credentials",
        themeMode: "dark" as ThemeMode,
        colorThemes: "blue" as ColorThemeKey,
      },
    },
    {
      email: "user1@example.com",
      name: "Hashimoto Taro",
      role: "user" as UserRole,
      password: "passowrd",
      emailVerified: true,
      account: {
        type: "credentials",
        themeMode: "light" as ThemeMode,
        colorThemes: "green" as ColorThemeKey,
      },
    },
    {
      email: "user2@example.com",
      name: "Hanako Suzuki",
      role: "user" as UserRole,
      password: "passowrd",
      emailVerified: true,
      account: {
        type: "credentials",
        themeMode: "system" as ThemeMode,
        colorThemes: "purple" as ColorThemeKey,
      },
    },
  ];


  console.log("👤 ユーザーを作成 / 更新中...");
  try {
    for (const user of seedUsers) {
      const passwordHash = await bcrypt.hash(user.password, 10);

      const savedUser = await prisma.user.upsert({
        where: { email: user.email },
        update: {
          name: user.name,
          role: user.role as UserRole,
          passwordHash,
          emailVerified: user.emailVerified ? new Date() : null,
        },
        create: {
          email: user.email,
          name: user.name,
          role: user.role,
          passwordHash,
          emailVerified: user.emailVerified ? new Date() : null,
          isActive: true,
        },
      });
      await prisma.account.upsert({
        where: {
          // userId + type を一意にしたいので unique 制約を使う（後述）
          userId_type: {
            userId: savedUser.id,
            type: user.account.type,
          },
        },
        update: {
          themeMode: user.account.themeMode,
          colorThemes: user.account.colorThemes,
        },
        create: {
          userId: savedUser.id,
          type: user.account.type,
          themeMode: user.account.themeMode,
          colorThemes: user.account.colorThemes,
        },
      });
    }

    console.log(`✅ ユーザー ${seedUsers.length} 件処理完了`);

    // ノートデータの作成 
    console.log('📝 ノートデータを作成中...');

    const notes = await Promise.all([
      prisma.notes.create({
        data: {
          title: 'はじめてのノート',
          content: 'これは最初のノートです。Prisma + Next.jsで作成しました',
        },
      }),
      prisma.notes.create({
        data: {
          title: 'タスク管理',
          content: 'やること '.trim(),
        },
      }),
      prisma.notes.create({
        data: {
          title: '開発メモ',
          content: 'Next.js 16 + Prisma 6 + Tailwind 4 の構成で開発中',
        },
      }),
    ])

    console.log(`✅ ${notes.length} 件のノートを作成しました`)
    console.log('\n🎉 シードデータの投入が完了しました！')
    console.log(`👤 ユーザー: ${seedUsers.length}件`)
    console.log(`📝 ノート: ${notes.length}件`)
  } catch (error) {
    console.error('❌ シードデータの投入に失敗しました:', error)
    throw error
  }
}

main()
  .catch((e) => {
    console.error("❌ Seeder 失敗:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
