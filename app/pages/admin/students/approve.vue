<template>
  <div class="p-4 md:p-10">
    
    <div class="mb-8">
      <NuxtLink to="/admin" class="group inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-sm transition-all">
        <span class="material-symbols-rounded group-hover:-translate-x-1 transition-transform">arrow_back</span> 
        <span>ย้อนกลับไปหน้า Dashboard</span>
      </NuxtLink>
    </div>

    <div class="mb-10">
      <div class="flex items-center gap-2 text-indigo-500 font-black mb-2 uppercase tracking-widest text-xs">
        <span class="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
        Account Registration Control
      </div>
      <h2 class="font-bold text-slate-900 text-3xl md:text-4xl mb-2 tracking-tight">อนุมัติบัญชีนักศึกษาใหม่</h2>
      <div class="flex items-center gap-2 text-slate-500">
        <span class="w-8 h-px bg-slate-200"></span>
        <p class="text-sm font-medium">ตรวจสอบและเปิดใช้งานบัญชีผู้ใช้งานสำหรับนักศึกษาที่เพิ่งลงทะเบียน</p>
      </div>
    </div>

    <div class="admin-card bg-white overflow-hidden">
      <div class="bg-indigo-600 p-8 text-white relative overflow-hidden">
        <!-- Background Decoration -->
        <div class="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div class="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl"></div>
        
        <div class="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div class="font-bold text-xl flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <span class="material-symbols-rounded">group_add</span>
            </div>
            <span>รายการที่รออนุมัติทั้งหมด</span> 
            <span class="bg-white text-indigo-600 px-4 py-1 rounded-2xl text-2xl font-black ml-2 shadow-lg">{{ pendingList.length }}</span>
          </div>
        </div>
      </div>

      <div v-if="!pendingList || pendingList.length === 0" class="py-32 text-center animate-[fadeIn_0.5s_ease-out]">
        <div class="w-24 h-24 bg-slate-50 text-slate-200 rounded-[32px] flex items-center justify-center mx-auto mb-6">
          <span class="material-symbols-rounded text-6xl">how_to_reg</span>
        </div>
        <h3 class="text-2xl font-bold text-slate-800 mb-2">ไม่มีบัญชีที่รอการอนุมัติ</h3>
        <p class="text-slate-400 font-medium max-w-xs mx-auto text-sm">นักศึกษาทุกคนที่ลงทะเบียนได้รับการตรวจสอบเรียบร้อยแล้ว</p>
      </div>

      <div v-else class="animate-[fadeIn_0.3s_ease-out]">
        <div class="overflow-x-auto">
          <table class="w-full text-left min-w-[800px]">
            <thead>
              <tr class="bg-slate-50/50">
                <th class="px-8 py-5 admin-table-header w-[120px] text-center">โปรไฟล์</th>
                <th class="px-8 py-5 admin-table-header">รหัสนักศึกษา</th>
                <th class="px-8 py-5 admin-table-header">ชื่อ - นามสกุล</th>
                <th class="px-8 py-5 admin-table-header">อีเมล</th>
                <th class="px-8 py-5 admin-table-header text-center">สถานะ</th>
                <th class="px-8 py-5 admin-table-header text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50 text-sm">
              <tr v-for="student in pendingList" :key="student.id" class="admin-table-row group/row">
                <td class="px-8 py-6 text-center">
                  <div v-if="student.profileImage" class="w-14 h-14 rounded-2xl border-2 border-white shadow-md mx-auto overflow-hidden group-hover/row:scale-110 transition-transform">
                    <img :src="student.profileImage" alt="Profile" class="w-full h-full object-cover">
                  </div>
                  <div v-else class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-500 font-black text-xl flex items-center justify-center border border-indigo-200 mx-auto group-hover/row:scale-110 transition-transform">
                    {{ student.fullname.substring(0, 1) }}
                  </div>
                </td>
                <td class="px-8 py-6 font-bold text-slate-500 tracking-tight">{{ student.username }}</td>
                <td class="px-8 py-6 font-black text-slate-800 text-base">{{ student.fullname }}</td>
                <td class="px-8 py-6 text-slate-500 font-medium italic">{{ student.email }}</td>
                <td class="px-8 py-6 text-center">
                  <span class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-black uppercase tracking-widest">
                    <span class="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span> รอตรวจสอบ
                  </span>
                </td>
                <td class="px-8 py-6 text-center">
                  <button @click="approveStudent(student.id, student.fullname)" class="group/btn relative overflow-hidden bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-lg shadow-emerald-100 active:scale-95 flex items-center gap-2 mx-auto border-b-4 border-emerald-700">
                    <span class="material-symbols-rounded text-xl group-hover/btn:rotate-12 transition-transform">verified_user</span> 
                    <span>อนุมัติบัญชี</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({ layout: 'admin' })

const alerts = useAlerts()
const { data: result, refresh } = await useFetch('/api/admin/pending-students')
const pendingList = computed(() => result.value?.students || [])

const approveStudent = async (userId, name) => {
  const confirm = await alerts.confirm('ยืนยันการอนุมัติ', `คุณต้องการอนุมัติบัญชีของ "${name}" เข้าใช้งานระบบใช่หรือไม่?`, 'question')
  if (!confirm.isConfirmed) return

  try {
    const res = await $fetch('/api/admin/approve-student', {
      method: 'POST',
      body: { userId }
    })

    if (res.success) {
      alerts.success('สำเร็จ!', `อนุมัติบัญชี ${name} เรียบร้อยแล้ว`)
      refresh()
    }
  } catch (error) {
    alerts.error('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาดในการอนุมัติ')
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
