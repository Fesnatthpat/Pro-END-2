import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { projectId, thesisUrl } = body

  if (!projectId || !thesisUrl) {
    throw createError({ statusCode: 400, statusMessage: 'Missing required fields' })
  }

  const prisma = getPrisma()

  try {
    const parsedProjectId = parseInt(projectId)

    // นับจำนวนการส่งเล่มวิทยานิพนธ์ที่มีอยู่แล้วเพื่อกำหนดลำดับครั้งที่และเวอร์ชั่น
    const count = await prisma.progressReport.count({
      where: { 
        projectId: parsedProjectId,
        reportType: 'thesis'
      }
    })
    const submissionNumber = count + 1

    // อัปเดตข้อมูลโปรเจค (เฉพาะลำดับขั้นตอน)
    const project = await prisma.project.update({
      where: { id: parsedProjectId },
      data: {
        step: {
          set: Math.max(3, (await prisma.project.findUnique({ where: { id: parsedProjectId } }))?.step || 0)
        }
      }
    })

    // สร้างประวัติการส่งใน ProgressReport
    await prisma.progressReport.create({
      data: {
        projectId: parsedProjectId,
        title: `ส่งครั้งที่ ${submissionNumber}`,
        description: `เล่มวิทยานิพนธ์ (ฉบับร่าง) เวอร์ชั่น ${submissionNumber}`,
        fileUrl: thesisUrl,
        reportType: 'thesis',
        status: 'pending'
      }
    })

    return {
      success: true,
      project
    }
  } catch (error: any) {
    console.error('Submit Thesis Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการบันทึกข้อมูลเล่มวิทยานิพนธ์'
    })
  }
})
