import { PrismaClient } from "../generated/prisma";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();
export const prisma = db; // Export prisma as an alias for db

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
