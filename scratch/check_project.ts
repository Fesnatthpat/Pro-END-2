import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const p = await prisma.project.findUnique({
    where: { id: 31 },
    include: {
      reports: true,
      stepStatuses: true
    }
  })
  console.log(JSON.stringify(p, null, 2))
}
main().catch(console.error).finally(() => prisma.$disconnect())
