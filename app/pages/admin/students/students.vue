<template>
  <div class="p-4 md:p-8 font-['PROMPT',_sans-serif]">
    
    <div class="mb-8">
      <h2 class="font-bold text-slate-900 text-2xl md:text-3xl mb-1">ข้อมูลนักศึกษา</h2>
      <p class="text-slate-500 text-sm">รายชื่อนักศึกษาทั้งหมดที่ได้รับการอนุมัติสิทธิ์เข้าใช้งานแล้ว</p>
    </div>

    <div class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 min-h-[70vh] animate-[fadeIn_0.3s_ease-in-out]">
      
      <div class="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
        <div class="w-full xl:w-[400px] relative">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <i class="bi bi-search text-lg"></i>
          </div>
          <input type="text" v-model="searchQuery" placeholder="ค้นหาชื่อ หรือ รหัสนักศึกษา..." class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-all">
        </div>

        <div class="relative w-full sm:w-auto">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#1a1a40]"><i class="bi bi-calendar3"></i></div>
          <select v-model="selectedYear" class="w-full sm:w-[180px] bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl pl-11 pr-10 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-all appearance-none cursor-pointer">
            <option value="">ทุกปีการศึกษา</option>
            <option value="2568">ปี 2568</option>
            <option value="2567">ปี 2567</option>
          </select>
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400"><i class="bi bi-chevron-down font-bold"></i></div>
        </div>
      </div>

      <div class="overflow-x-auto pb-4">
        <table class="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr class="border-b-2 border-slate-100 text-slate-400 text-sm">
              <th class="pb-4 px-4 w-[80px] text-center">รูป</th>
              <th class="pb-4 font-medium">รหัสนักศึกษา</th>
              <th class="pb-4 font-medium">ชื่อ - นามสกุล</th>
              <th class="pb-4 font-medium w-[250px]">ชื่อโครงงาน</th>
              <th class="pb-4 font-medium">เบอร์โทรศัพท์</th>
              <th class="pb-4 font-medium">LINE ID</th>
              <th class="pb-4 font-medium text-center">สถานะ</th>
              <th class="pb-4 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in approvedList" :key="student.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td class="py-4 px-2 text-center">
                <img v-if="student.profileImage" :src="student.profileImage" alt="Profile" class="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm mx-auto" />
                <div v-else class="w-10 h-10 rounded-full bg-slate-100 text-slate-500 font-bold text-sm flex items-center justify-center border border-slate-200 shadow-inner mx-auto">
                  {{ student.name.replace(/^(นาย|นางสาว|นาง)\s*/, '').substring(0, 1) }}
                </div>
              </td>
              <td class="py-4 font-bold text-slate-500">{{ student.code }}</td>
              <td class="py-4 font-bold text-slate-800">{{ student.name }}</td>
              <td class="py-4 pr-4 text-[13px] text-slate-600">
                <span v-if="student.project" class="line-clamp-2">{{ student.project }}</span>
                <span v-else class="text-slate-300">-</span>
              </td>
              <td class="py-4 text-[15px] text-slate-600">{{ student.tel || '-' }}</td>
              <td class="py-4 text-[15px] text-indigo-600 font-medium">{{ student.line || '-' }}</td>
              <td class="py-4 text-center">
                <span class="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-[11px] font-bold">อนุมัติแล้ว</span>
              </td>
              <td class="py-4 text-center">
                <button @click="deleteStudent(student.id, student.name)" class="text-slate-300 hover:text-rose-500 transition-colors p-2"><i class="bi bi-trash text-lg"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="approvedList.length === 0" class="py-20 text-center text-slate-400">
        <i class="bi bi-people text-5xl opacity-20"></i>
        <p class="mt-4 font-medium text-slate-500">ไม่พบข้อมูลนักศึกษาที่อนุมัติแล้ว</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({ layout: 'admin' })

const alerts = useAlerts()
const searchQuery = ref('')

// 1. กำหนดค่า Default ให้เป็น '' (ทุกปีการศึกษา) เพื่อให้แสดงข้อมูลทั้งหมดตั้งแต่เริ่มต้น
const selectedYear = ref('')

// ดึงข้อมูลจริงจาก API (ตั้ง limit เยอะๆ เพื่อเอามา Search/Filter ฝั่ง Frontend)
const { data: apiData, pending, refresh } = await useFetch('/api/admin/students', {
  query: { limit: 9999 }
})

const students = computed(() => {
  if (!apiData.value?.students) return []
  return apiData.value.students.map(s => {
    return {
      id: s.id,
      code: s.username || '',
      name: s.fullname || 'ไม่มีชื่อ',
      profileImage: s.profileImage,
      project: s.projects1?.[0]?.titleTh || s.projects2?.[0]?.titleTh || null,
      tel: s.tel,
      line: s.lineId,
      status: s.isApproved ? 'APPROVED' : 'PENDING'
    }
  })
})

// กรองเอาเฉพาะคนที่ APPROVED มาโชว์ และเพิ่มตัวกรองปีการศึกษาเข้าไปด้วย
const approvedList = computed(() => {
  return students.value.filter(s => {
    // เงื่อนไข 1: เช็คสถานะอนุมัติ
    const isApproved = s.status === 'APPROVED'
    
    // เงื่อนไข 2: เช็คการค้นหาผ่านช่อง Search (ค้นด้วยชื่อหรือรหัส)
    const search = searchQuery.value.toLowerCase()
    const name = s.name || ''
    const code = s.code || ''
    const matchSearch = name.toLowerCase().includes(search) || code.includes(search)
    
    // เงื่อนไข 3: เช็คปีการศึกษา (นำรหัส 2 ตัวหน้าของเด็ก มาเทียบกับ 2 ตัวหลังของ Dropdown)
    let matchYear = true
    if (selectedYear.value !== '') {
      // ตัด '2568' ให้เหลือแค่ '68'
      const yearPrefix = selectedYear.value.substring(2) 
      // เช็คว่ารหัสนักศึกษาขึ้นต้นด้วย '68' หรือไม่
      matchYear = code.startsWith(yearPrefix)
    }

    // ต้องตรงตามเงื่อนไขทั้งหมดถึงจะแสดง
    return isApproved && matchSearch && matchYear
  })
})

const deleteStudent = async (id, name) => {
  const confirmResult = await alerts.confirm('ยืนยันการลบ', `คุณยืนยันที่จะลบข้อมูลของ "${name}" ทิ้งถาวรหรือไม่?\n* การกระทำนี้ไม่สามารถกู้คืนได้`, 'warning');
  if (confirmResult.isConfirmed) {
    try {
      const response = await $fetch(`/api/admin/students?id=${id}`, {
        method: 'DELETE'
      })
      if (response.success) {
        alerts.success('สำเร็จ!', 'ลบข้อมูลนักศึกษาเรียบร้อยแล้ว')
        refresh()
      }
    } catch (error) {
      alerts.error('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }
}
</script>