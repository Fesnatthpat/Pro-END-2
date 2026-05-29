import { getPrisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = query.id as string

  const prisma = getPrisma()

  try {
    // Optional: Prevent deleting the last superadmin or self (can be added later)
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
