import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      fullName: "Админ Админов",
      birthDate: new Date("2000-01-01"),
      email: "admin@example.com",
      password: adminPassword,
      role: "ADMIN",
      isActive: true
    }
  });

  const userPassword = await hash("user456", 10);
  await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      fullName: "Пётр Петров",
      birthDate: new Date("2005-05-05"),
      email: "user@example.com",
      password: userPassword,
      role: "USER",
      isActive: true
    }
  });

  console.log("Seed completed ✅");
}

main().catch(console.error).finally(() => prisma.$disconnect());