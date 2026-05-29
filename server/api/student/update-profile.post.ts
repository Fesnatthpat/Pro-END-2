import { getPrisma } from '~~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const auth = event.context.auth

  if (!auth?.userId) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const { fullname, tel, email, lineId } = body

  const prisma = getPrisma()

  try {
    const user = await prisma.user.update({
      where: { id: auth.userId },
      data: {
        fullname: fullname !== undefined ? fullname : undefined,
        tel: tel !== undefined ? tel : undefined,
        email: email !== undefined ? email : undefined,
        lineId: lineId !== undefined ? lineId : undefined,
      }
    })

    return {
      success: true,
      user: {
        id: user.id,
        fullname: user.fullname,
        tel: user.tel,
        email: user.email,
        lineId: user.lineId,
      }
    }
  } catch (error: any) {
    console.error('Update Profile Error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูลโปรไฟล์'
    })
  }
})
