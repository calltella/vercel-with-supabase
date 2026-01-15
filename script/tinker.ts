// /app/scripts/tinker.ts
import {prisma} from "@/prisma";

// const prisma = prismaModule.prisma;

async function main() {
  console.log(await prisma.migrateAplineBase.count());
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
