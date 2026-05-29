import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const prisma = getPrisma()

  try {
    const studentCount = await prisma.student.count({ where: { isApproved: true } })
    const projectCount = await prisma.project.count()
    const cp1PendingCount = await prisma.project.count({ where: { step: 1, status: 'pending' } })
    const cp2PendingCount = await prisma.project.count({ where: { step: 4, status: 'pending' } })

    const recentProjects = await prisma.project.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        student1: true
      }
    })

    const pendingStudents = await prisma.student.findMany({
      where: { isApproved: false },
      take: 5,
      orderBy: { createdAt: 'desc' }
    })

    return {
      success: true,
      stats: {
        students: studentCount,
        projects: projectCount,
        cp1: cp1PendingCount,
        cp2: cp2PendingCount
      },
      recentProjects: recentProjects.map(p => ({
        id: p.id,
        title: p.titleTh,
        student: p.student1.fullname,
        step: p.step
      })),
      pendingStudents: pendingStudents.map(s => ({
        id: s.id,
        name: s.fullname,
        code: s.username
      }))
    }
  } catch (error: any) {
    console.error('Admin Stats Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลสถิติ'
    })
  }
})
