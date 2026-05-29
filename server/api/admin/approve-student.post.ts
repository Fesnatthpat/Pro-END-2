import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { userId } = body

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ไม่พบ ID ผู้ใช้งาน'
    })
  }

  const prisma = getPrisma()

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isApproved: true }
    })

    return {
      success: true,
      user: {
        id: user.id,
        fullname: user.fullname,
        isApproved: user.isApproved
      }
    }
  } catch (error: any) {
    console.error('Approve Student Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการอนุมัติผู้ใช้งาน'
    })
  }
})
