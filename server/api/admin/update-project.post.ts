import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { projectId, examDate, examTime, examLocation, status, step, advisorId, coAdvisorId, feedback, details } = body

  if (!projectId) {
    throw createError({ statusCode: 400, statusMessage: 'Missing projectId' })
  }

  const prisma = getPrisma()

  try {
    const currentProject = await prisma.project.findUnique({
      where: { id: parseInt(projectId) },
      include: {
        reports: true,
        exams: true
      }
    })

    if (!currentProject) {
      throw createError({ statusCode: 404, statusMessage: 'ไม่พบข้อมูลโครงงาน' })
    }

    // --- Validation for Approval ---
    // ตรวจสอบว่าเป็นการพยายาม "อนุมัติ" ขั้นตอนปัจจุบันหรือไม่
    // ในที่นี้คือ status เป็น 'approved' หรือกรณีพิเศษที่ขยับจาก 4 ไป 5 (ซึ่ง status จะเป็น 'pending')
    const isApproving = status === 'approved' || (status === 'pending' && step && parseInt(step) === 5 && currentProject.step === 4)
    
    if (isApproving) {
      const stepToApprove = currentProject.step
      
      if (stepToApprove === 1) {
        const hasExam = currentProject.exams.some(e => e.type === 'CP1')
        if (!hasExam) {
          throw createError({ statusCode: 400, statusMessage: 'ยังไม่มีการนัดสอบหัวข้อ (CP1)' })
        }
        // ไม่ต้องเช็ค cp1Pass แล้ว เพราะถ้า status='approved' ระบบจะไปแก้สถานะสอบให้เองใน transaction
      } else if (stepToApprove === 2) {
        const hasProgress = currentProject.reports.some(r => r.reportType === 'progress')
        if (!hasProgress) {
          throw createError({ statusCode: 400, statusMessage: 'นักศึกษายังไม่ได้ส่งรายงานความก้าวหน้า' })
        }
      } else if (stepToApprove === 3) {
        if (!currentProject.thesisUrl) {
          throw createError({ statusCode: 400, statusMessage: 'นักศึกษายังไม่ได้ส่งเล่มวิทยานิพนธ์ (ฉบับร่าง)' })
        }
      } else if (stepToApprove === 4) {
        const hasExam = currentProject.exams.some(e => e.type === 'CP2')
        if (!hasExam) {
          throw createError({ statusCode: 400, statusMessage: 'ยังไม่มีการนัดสอบจบ (CP2/CP3)' })
        }
        // ไม่ต้องเช็ค cp2Pass เช่นกัน
      } else if (stepToApprove === 5) {
        // อนุมัติจบโครงการ ต้องมีครบทั้ง 3 อย่าง
        if (!currentProject.thesisUrl || !currentProject.programUrl || !currentProject.manualUrl) {
          throw createError({ statusCode: 400, statusMessage: 'นักศึกษายังส่งเอกสารฉบับสมบูรณ์ไม่ครบ (เล่มสมบูรณ์, โปรแกรม และคู่มือ)' })
        }
      }
    }

    const projectUpdateData: any = {
      status: status !== undefined ? status : undefined,
      step: step !== undefined ? parseInt(step) : undefined,
      advisorId: advisorId !== undefined ? (advisorId ? parseInt(advisorId) : null) : undefined,
      coAdvisorId: coAdvisorId !== undefined ? (coAdvisorId ? parseInt(coAdvisorId) : null) : undefined,
      feedback: feedback !== undefined ? feedback : (details !== undefined ? details : undefined)
    }

    // Use transaction to update project and handle exam schedule if provided
    const result = await prisma.$transaction(async (tx) => {
      const updatedProject = await tx.project.update({
        where: { id: parseInt(projectId) },
        data: projectUpdateData
      })

      // 2. Update Step Status (ProjectStepStatus Table)
      if (status !== undefined) {
        await tx.projectStepStatus.upsert({
          where: {
            projectId_step: {
              projectId: updatedProject.id,
              step: updatedProject.step
            }
          },
          update: {
            status: status,
            feedback: feedback || undefined,
            approvedById: event.context.auth?.userId // Assuming admin is logged in
          },
          create: {
            projectId: updatedProject.id,
            step: updatedProject.step,
            status: status,
            feedback: feedback || undefined,
            approvedById: event.context.auth?.userId
          }
        })
      }

      // If exam data is provided, create or update an exam schedule
      if (examDate || examTime || examLocation) {
        // Find existing pending exam for this step's type
        const examType = updatedProject.step === 1 ? 'CP1' : 'CP2'
        const existingExam = await tx.examSchedule.findFirst({
          where: {
            projectId: updatedProject.id,
            type: examType,
            status: 'pending'
          }
        })

        if (existingExam) {
          await tx.examSchedule.update({
            where: { id: existingExam.id },
            data: {
              examDate: examDate ? new Date(examDate) : undefined,
              startTime: examTime !== undefined ? examTime : undefined,
              location: examLocation !== undefined ? examLocation : undefined,
              status: status === 'approved' ? 'pass' : (status === 'rejected' ? 'fail' : 'pending')
            }
          })
        } else {
          await tx.examSchedule.create({
            data: {
              projectId: updatedProject.id,
              type: examType,
              examDate: examDate ? new Date(examDate) : new Date(),
              startTime: examTime || '-',
              location: examLocation || '-',
              status: status === 'approved' ? 'pass' : (status === 'rejected' ? 'fail' : 'pending')
            }
          })
        }
      } else if (status !== undefined) {
        // If status is updated but no exam data, check if we should update a pending exam
        const examType = updatedProject.step === 1 ? 'CP1' : 'CP2'
        const existingExam = await tx.examSchedule.findFirst({
          where: {
            projectId: updatedProject.id,
            type: examType,
            status: 'pending'
          }
        })

        if (existingExam) {
          await tx.examSchedule.update({
            where: { id: existingExam.id },
            data: {
              status: status === 'approved' ? 'pass' : (status === 'rejected' ? 'fail' : 'pending')
            }
          })
        }
      }

      // 3. Record Activity Log for Admin Update
      if (status !== undefined || examDate || examTime || examLocation || feedback) {
        let activityTitle = 'แอดมินอัปเดตข้อมูลโครงงาน'
        let activityDesc = feedback || ''
        let activityStatus = 'info'
        let activityIcon = 'settings'

        if (status === 'approved') {
          activityTitle = `อนุมัติขั้นตอนที่ ${updatedProject.step}`
          activityDesc = `ขั้นตอนการดำเนินงานได้รับการอนุมัติเรียบร้อยแล้ว`
          activityStatus = 'success'
          activityIcon = 'verified'
        } else if (status === 'rejected' || status === 'revision') {
          activityTitle = status === 'rejected' ? 'ไม่ผ่าน/ให้แก้ไข' : 'แจ้งแก้ไขข้อมูล'
          activityDesc = feedback || 'แอดมินแจ้งให้มีการปรับปรุงข้อมูลในขั้นตอนนี้'
          activityStatus = status === 'rejected' ? 'error' : 'info'
          activityIcon = 'edit_note'
        } else if (examDate || examTime || examLocation) {
          activityTitle = 'นัดหมายการสอบ'
          activityDesc = `แอดมินกำหนดวันเวลาสอบ ณ ${examLocation || '-'}`
          activityStatus = 'info'
          activityIcon = 'calendar_month'
        }

        await tx.projectActivity.create({
          data: {
            projectId: updatedProject.id,
            type: 'ADMIN_UPDATE',
            title: activityTitle,
            description: activityDesc,
            status: activityStatus,
            icon: activityIcon,
            actorName: event.context.auth?.fullname || 'Admin'
          }
        })
      }

      return updatedProject
    })

    return {
      success: true,
      project: result
    }
  } catch (error: any) {
    console.error('Admin Update Project Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลโครงงาน'
    })
  }
})
