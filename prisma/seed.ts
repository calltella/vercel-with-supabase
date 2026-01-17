import { PrismaClient, UserRole } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 User seeding started...');

  // 既存削除（開発用）
  await prisma.user.deleteMany();

  const now = new Date();

  const users = [
    {
      email: 'admin@example.com',
      name: 'Admin User',
      role: UserRole.ADMIN,
      passwordHash: 'hashed-admin-password',
      emailVerified: now,
    },
    {
      email: 'user1@example.com',
      name: 'Taro Yamada',
      role: UserRole.USER,
      passwordHash: 'hashed-user1-password',
    },
    {
      email: 'user2@example.com',
      name: 'Hanako Suzuki',
      role: UserRole.USER,
      passwordHash: 'hashed-user2-password',
    },
  ];

  await prisma.user.createMany({
    data: users,
  });

  console.log('✅ User seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
