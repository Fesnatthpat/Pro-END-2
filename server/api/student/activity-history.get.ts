import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const projectId = query.projectId ? parseInt(query.projectId as string) : null

  if (!projectId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing projectId' })
  }

  const prisma = getPrisma()

  try {
    // 1. Fetch Project for base info
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        student1: true,
        student2: true,
        advisor: true,
        coAdvisor: true,
        stepStatuses: true // Include the new step statuses
      }
    })

    if (!project) {
      throw createError({ statusCode: 404, statusMessage: 'Project not found' })
    }

    // 2. Fetch Progress Reports
    const reports = await prisma.progressReport.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' }
    })

    // 3. Fetch Exams
    const exams = await prisma.examSchedule.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' }
    })

    // 4. Transform into a flat timeline
    const timeline: any[] = []

    // Map database status to timeline status (for consistency)
    const mapStatus = (s: string) => {
      const status = s?.toLowerCase()
      if (status === 'approved' || status === 'pass' || status === 'success') return 'success'
      if (status === 'rejected' || status === 'fail' || status === 'error') return 'error'
      if (status === 'revision' || status === 'seen' || status === 'info') return 'info'
      return 'pending'
    }

    // A. Add Step Statuses from ProjectStepStatus (Checkpoints)
    const stepNames: Record<number, string> = {
      1: 'ยื่นเสนอหัวข้อโครงงาน (CP1)',
      2: 'รายงานความก้าวหน้า',
      3: 'ส่งเล่มโครงงานฉบับร่าง',
      4: 'การสอบจบโครงงาน',
      5: 'ส่งเล่มและโปรแกรมฉบับสมบูรณ์'
    }

    project.stepStatuses.forEach(ss => {
      timeline.push({
        type: 'step_status',
        title: `ผลการพิจารณา: ${stepNames[ss.step] || `ขั้นตอนที่ ${ss.step}`}`,
        description: ss.status === 'approved' || ss.status === 'pass' 
          ? `ผ่านการพิจารณาในขั้นตอนที่ ${ss.step} เรียบร้อยแล้ว` 
          : (ss.feedback || `สถานะ: ${ss.status}`),
        date: ss.updatedAt,
        status: mapStatus(ss.status),
        icon: ss.status === 'approved' || ss.status === 'pass' ? 'verified' : 'analytics',
        feedback: ss.feedback
      })
    })

    // B. Add Progress Reports (Submission events)
    reports.forEach(r => {
      timeline.push({
        type: 'report',
        title: r.reportType === 'progress' ? 'อัปโหลดรายงานความก้าวหน้า' : 'อัปโหลดเล่มฉบับร่าง',
        description: r.title,
        date: r.createdAt,
        status: mapStatus(r.status),
        icon: r.reportType === 'progress' ? 'code' : 'description',
        fileUrl: r.fileUrl,
        feedback: r.feedback
      })
    })

    // C. Add Exams (Scheduling events)
    exams.forEach(e => {
      timeline.push({
        type: 'exam',
        title: `นัดหมายการสอบ${e.type === 'CP1' ? 'หัวข้อ' : 'จบ'}โครงงาน`,
        description: `สถานที่: ${e.examLocation} | เวลา: ${e.examTime}`,
        date: e.createdAt,
        status: mapStatus(e.status),
        icon: 'calendar_month',
        details: {
          examDate: e.examDate,
          location: e.examLocation,
          time: e.examTime
        }
      })
    })

    // D. Add Project Initiation (Legacy/Base)
    if (!project.stepStatuses.some(s => s.step === 1)) {
      timeline.push({
        type: 'project_created',
        title: 'เริ่มต้นยื่นเสนอหัวข้อ (CP1)',
        description: `ยื่นข้อเสนอโครงงานเรื่อง "${project.titleTh}"`,
        date: project.createdAt,
        status: project.step > 1 ? 'success' : mapStatus(project.status),
        icon: 'add_task'
      })
    }

    // E. Add Manual Activities from ProjectActivity Table
    const dbActivities = await prisma.projectActivity.findMany({
      where: { projectId },
      orderBy: { createdAt: 'desc' }
    })

    dbActivities.forEach(a => {
      // Avoid duplicate entries if possible
      timeline.push({
        type: 'db_activity',
        title: a.title,
        description: a.description,
        date: a.createdAt,
        status: mapStatus(a.status),
        icon: a.icon || 'history',
        fileUrl: a.fileUrl,
        actor: a.actorName
      })
    })

    // Sort by date desc
    timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return {
      success: true,
      timeline
    }
  } catch (error: any) {
    console.error('Fetch Activity Log Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการดึงข้อมูลประวัติกิจกรรม'
    })
  }
})
