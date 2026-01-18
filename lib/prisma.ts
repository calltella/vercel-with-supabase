// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { withOptimize } from "@prisma/extension-optimize";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  }).$extends(
    withOptimize({
      apiKey: process.env.OPTIMIZE_API_KEY!,
    })
  );
};

declare global {
  var prisma: ReturnType<typeof prismaClientSingleton> | undefined;
}

export const prisma = global.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
