import { getPrisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id as string

  const prisma = getPrisma()

  try {
    const auth = event.context.auth
    if (auth?.userId === Number(id)) {
      throw createError({ statusCode: 400, statusMessage: 'ไม่สามารถลบตัวเองได้' })
    }

    await prisma.admin.delete({
      where: { id: Number(id) }
    })

    return { success: true }
  } catch (error: any) {
    console.error('Delete Admin Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการลบผู้ดูแลระบบ'
    })
  }
})
