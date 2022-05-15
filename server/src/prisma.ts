import { PrismaClient } from "@prisma/client";

//Criar o cliente do Prisma
//Configura para mostrar os logs de todas as querys
export const prisma = new PrismaClient({
  log: ['query']
})