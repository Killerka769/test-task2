import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createUser = async (data: {
  fullName: string;
  birthDate: Date;
  email: string;
  password: string;
  role?: "ADMIN" | "USER";
}) => prisma.user.create({ data });

export const findUserByEmail = (email: string) =>
  prisma.user.findUnique({ where: { email } });

export const findUserById = (id: string) =>
  prisma.user.findUnique({ where: { id } });

export const listUsers = () =>
  prisma.user.findMany({ orderBy: { createdAt: "desc" } });

export const updateUser = (id: string, data: any) =>
  prisma.user.update({ where: { id }, data });
