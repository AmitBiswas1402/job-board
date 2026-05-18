import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

// Use dynamic import to avoid module resolution issues
let prisma: any = null;

export async function initPrisma() {
  if (!prisma) {
    try {
      const { PrismaClient } = await import("../../prisma/generated/client");
      prisma = new PrismaClient({ adapter });
    } catch (error) {
      console.error("Failed to import Prisma:", error);
      throw error;
    }
  }
  return prisma;
}

// For convenience, export a wrapped version
export const getPrisma = async () => {
  if (!prisma) {
    await initPrisma();
  }
  return prisma;
};