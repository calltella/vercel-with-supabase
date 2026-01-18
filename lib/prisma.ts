// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  }).$extends(withAccelerate());
};

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

export const prisma = global.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
