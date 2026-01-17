// /app/prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 User seeding started...');

  // 開発環境のみ全削除
  if (process.env.NODE_ENV !== 'production') {
    await prisma.user.deleteMany();
  }

  const users = [
    {
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'ADMIN' as const,
      password: 'admin1234',
    },
    {
      email: 'user1@example.com',
      name: 'Taro Yamada',
      role: 'USER' as const,
      password: 'password123',
    },
    {
      email: 'user2@example.com',
      name: 'Hanako Suzuki',
      role: 'USER' as const,
      password: 'password123',
    },
  ];

  for (const user of users) {
    const passwordHash = await bcrypt.hash(user.password, 10);

    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        email: user.email,
        name: user.name,
        role: user.role,
        passwordHash,
        emailVerified: user.role === 'ADMIN' ? new Date() : null,
      },
    });
  }

  console.log('✅ User seeding finished.');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });