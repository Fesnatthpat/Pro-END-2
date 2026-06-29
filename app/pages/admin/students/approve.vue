<template>
  <!-- หน้าจัดการอนุมัติสิทธิ์การเข้าใช้งานระบบสำหรับนักศึกษาใหม่ (Admin Only) -->
  <div class="p-4 md:p-10 font-['PROMPT',_sans-serif]">
    
    <!-- ลิงก์ย้อนกลับหน้า Dashboard -->
    <div class="mb-6">
      <NuxtLink to="/admin" class="group inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-all">
        <span class="material-symbols-rounded text-[20px] group-hover:-translate-x-1 transition-transform">arrow_back</span> 
        <span>ย้อนกลับไปหน้า Dashboard</span>
      </NuxtLink>
    </div>

    <!-- ส่วนหัวข้อหลักประจำหน้าจอ -->
    <div class="mb-10">
      <div class="flex items-center gap-2 text-blue-600 font-bold mb-2 text-sm">
        <span class="material-symbols-rounded text-[20px]">person_add</span>
        คำร้องเข้าใช้งานใหม่
      </div>
      <h2 class="text-[#1a1a40] dark:text-white tracking-tight text-3xl font-black mb-2">จัดการการอนุมัตินักศึกษา</h2>
      <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">ตรวจสอบรายชื่อนักศึกษาใหม่ที่รอการยืนยันสิทธิ์ (ยังไม่มีข้อมูลโครงงาน)</p>
    </div>

    <!-- การ์ดตารางข้อมูลและแถบจัดการ Bulk action -->
    <div class="bg-white dark:bg-slate-800 rounded-[24px] shadow-sm border border-slate-100 overflow-hidden">
      
      <!-- ส่วนหัวการ์ดตารางพร้อมปุ่มจัดการแบบกลุ่ม (Bulk Delete & Bulk Approve) -->
      <div class="p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-50">
        <div class="font-bold text-lg flex items-center gap-2 text-[#1a1a40] dark:text-white">
          รายการที่รอตรวจสอบ <span class="text-blue-600 mx-1">{{ pendingList.length }}</span> รายการ
        </div>
        
        <div class="flex items-center gap-3 w-full md:w-auto">
          <!-- ปุ่มลบแบบกลุ่ม (จะเปิดให้กดเมื่อมีการกดติ๊กถูกเลือกอย่างน้อย 1 รายการ) -->
          <button @click="bulkDelete" :disabled="selectedStudents.length === 0" class="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all" :class="selectedStudents.length > 0 ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-slate-50 text-slate-400 cursor-not-allowed'">
            <span class="material-symbols-rounded text-[20px]">delete</span>
            ลบคำร้อง ({{ selectedStudents.length }})
          </button>
          
          <!-- ปุ่มอนุมัติแบบกลุ่ม (จะเปิดให้กดเมื่อมีการกดติ๊กถูกเลือกอย่างน้อย 1 รายการ) -->
          <button @click="bulkApprove" :disabled="selectedStudents.length === 0" class="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all" :class="selectedStudents.length > 0 ? 'bg-blue-50 text-blue-600 hover:bg-blue-100' : 'bg-slate-50 text-slate-400 cursor-not-allowed'">
            <span class="material-symbols-rounded text-[20px]">check</span>
            อนุมัติที่เลือก ({{ selectedStudents.length }})
          </button>
        </div>
      </div>

      <!-- สถานะว่างเมื่อไม่มีข้อมูลที่ค้างรอตรวจสอบ -->
      <div v-if="!pendingList || pendingList.length === 0" class="py-24 text-center animate-[fadeIn_0.5s_ease-out]">
        <div class="w-20 h-20 bg-slate-50 dark:bg-slate-900 text-slate-300 rounded-[24px] flex items-center justify-center mx-auto mb-6">
          <span class="material-symbols-rounded text-5xl">how_to_reg</span>
        </div>
        <h3 class="text-[#1a1a40] dark:text-slate-200 mb-2 text-xl font-bold">ไม่มีบัญชีที่รอการอนุมัติ</h3>
        <p class="text-slate-400 font-medium text-sm">นักศึกษาทุกคนที่ลงทะเบียนได้รับการตรวจสอบเรียบร้อยแล้ว</p>
      </div>

      <!-- ตารางแสดงรายการนักศึกษาที่รอการอนุมัติบัญชี -->
      <div v-else class="animate-[fadeIn_0.3s_ease-out] overflow-x-auto">
        <table class="w-full text-left min-w-[800px]">
          <thead>
            <tr class="bg-slate-50/50 text-slate-500 text-[13px]">
              <!-- ตัวเลือกทั้งหมด -->
              <th class="px-8 py-4 w-[80px] text-center">
                <input type="checkbox" v-model="selectAll" class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
              </th>
              <th class="px-4 py-4 font-bold w-[80px]">รูป</th>
              <th class="px-4 py-4 font-bold w-[150px]">รหัสนักศึกษา</th>
              <th class="px-4 py-4 font-bold">ชื่อ - นามสกุล</th>
              <th class="px-4 py-4 font-bold">อีเมล (Email)</th>
              <th class="px-8 py-4 font-bold w-[120px]">สถานะ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50 text-sm">
            <tr v-for="student in pendingList" :key="student.id" class="hover:bg-slate-50/50 transition-colors group">
              <!-- ตัวเลือกแต่ละรายการ -->
              <td class="px-8 py-5 text-center">
                <input type="checkbox" :value="student.id" v-model="selectedStudents" class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
              </td>
              <!-- ภาพประจำตัว หรือ อักษรแรกของชื่อ -->
              <td class="px-4 py-5">
                <div v-if="student.profileImage" class="w-10 h-10 rounded-full border border-slate-200 mx-auto overflow-hidden">
                  <img :src="student.profileImage" alt="Profile" class="w-full h-full object-cover">
                </div>
                <div v-else class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 font-bold text-sm flex items-center justify-center border border-slate-200">
                  {{ student.fullname.substring(0, 1) }}
                </div>
              </td>
              <!-- ข้อมูลรหัส ชื่อ และ อีเมล -->
              <td class="px-4 py-5 font-bold text-slate-500">{{ student.username }}</td>
              <td class="px-4 py-5 font-bold text-[#1a1a40] dark:text-slate-200">{{ student.fullname }}</td>
              <td class="px-4 py-5 text-slate-500">{{ student.email }}</td>
              <!-- สถานะ "รออนุมัติ" พร้อมจุดไฟกระพริบสีส้ม -->
              <td class="px-8 py-5">
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100 text-[11px] font-bold whitespace-nowrap">
                  <span class="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse shrink-0"></span> รออนุมัติ
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

// กำหนดเพจนี้ให้ใช้ Layout สำหรับ Admin
definePageMeta({ layout: 'admin' })

const alerts = useAlerts()

// ดึงข้อมูลบัญชีนักศึกษาใหม่ที่ค้างการอนุมัติในระบบ
const { data: result, refresh } = await useFetch('/api/admin/pending-students')
const pendingList = computed(() => result.value?.students || [])

// เก็บอาร์เรย์ของไอดีนักศึกษาที่กำลังเลือกอยู่
const selectedStudents = ref([])

// ตัวแปรสองทิศทางสำหรับติ๊กถูกเลือกทั้งหมด (Select All)
const selectAll = computed({
  get: () => pendingList.value.length > 0 && selectedStudents.value.length === pendingList.value.length,
  set: (val) => {
    if (val) {
      selectedStudents.value = pendingList.value.map(s => s.id)
    } else {
      selectedStudents.value = []
    }
  }
})

// ฟังก์ชันอนุมัติรายการที่เลือกทั้งหมดแบบกลุ่ม (Bulk Approve)
const bulkApprove = async () => {
  if (selectedStudents.value.length === 0) return
  
  const confirm = await alerts.confirm('ยืนยันการอนุมัติ', `คุณต้องการอนุมัติบัญชีนักศึกษาจำนวน ${selectedStudents.value.length} รายการ ใช่หรือไม่?`, 'question')
  if (!confirm.isConfirmed) return

  try {
    // ส่งคำขอแบบขนาน (Parallel Fetch) เพื่อเปิดใช้งานสถานะของทุกรายการที่เลือก
    const results = await Promise.allSettled(
      selectedStudents.value.map(userId => 
        $fetch('/api/admin/approve-student', { method: 'POST', body: { userId } })
      )
    )
    
    const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length

    alerts.success('สำเร็จ!', `อนุมัติบัญชีนักศึกษาเรียบร้อยแล้ว ${successCount} รายการ`)
    selectedStudents.value = []
    refresh()
  } catch (error) {
    alerts.error('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาดในการอนุมัติ')
  }
}

// ฟังก์ชันลบคำขอที่เลือกทั้งหมดแบบกลุ่ม (Bulk Delete)
const bulkDelete = async () => {
  if (selectedStudents.value.length === 0) return
  
  const confirm = await alerts.confirm('ยืนยันการลบทิ้ง', `คุณต้องการลบคำร้องบัญชีนักศึกษาจำนวน ${selectedStudents.value.length} รายการ ถาวรใช่หรือไม่?`, 'error')
  if (!confirm.isConfirmed) return

  try {
    // ส่งคำขอลบแบบขนานของไอดีทั้งหมดที่ระบุ
    const results = await Promise.allSettled(
      selectedStudents.value.map(userId => 
        $fetch(`/api/admin/students?id=${userId}`, { method: 'DELETE' })
      )
    )
    
    const successCount = results.filter(r => r.status === 'fulfilled' && r.value.success).length

    alerts.success('สำเร็จ!', `ลบคำร้องเรียบร้อยแล้ว ${successCount} รายการ`)
    selectedStudents.value = []
    refresh()
  } catch (error) {
    alerts.error('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาดในการลบ')
  }
}
</script>

<style scoped>
/* ภาพเคลื่อนไหวตอนเฟดเข้าหน้าตารางการอนุมัติ */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
