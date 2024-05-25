const {PrismaClient}=require("@prisma/client")
const {mockDeep}=require('vitest-mock-extended')

const prisma=mockDeep();

module.exports=prisma;