import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function fix() {
  const exams = await prisma.examSchedule.updateMany({
    where: {
      type: 'CP1',
      status: 'pending',
      project: {
        step: { gte: 2 }
      }
    },
    data: {
      status: 'pass'
    }
  })
  console.log('Fixed exams:', exams.count)
}

fix().then(() => prisma.$disconnect()).catch(console.error)
