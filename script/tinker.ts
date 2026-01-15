// /app/scripts/tinker.ts
import { prisma } from "@/lib/prisma";

// npx tsx script/tinker.ts 

async function main() {
  console.log(await prisma.notes.count());
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
