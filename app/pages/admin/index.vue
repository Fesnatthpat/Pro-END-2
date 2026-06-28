<template>
  <div class="p-4 md:p-8 font-['PROMPT',_sans-serif]">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h3 class="font-bold text-slate-900 text-2xl md:text-3xl mb-1">Dashboard</h3>
        <p class="text-slate-500 text-sm">ยินดีต้อนรับกลับ, Admin System 👋</p>
      </div>
      <div class="bg-white px-4 py-2.5 rounded-full shadow-sm text-[#1a1a40] font-bold text-sm border border-slate-100 flex items-center gap-2">
        <i class="bi bi-calendar-event"></i> {{ currentDate }}
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      
      <NuxtLink to="/admin/students/students" class="bg-gradient-to-br from-[#4099ff] to-[#73b4ff] rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg shadow-blue-500/20 hover:-translate-y-1 transition-transform duration-300 block">
        <i class="bi bi-people-fill absolute right-4 top-1/2 -translate-y-1/2 text-[4rem] opacity-20"></i>
        <div class="text-[2.8rem] font-bold leading-none mb-1">{{ stats.students }}</div>
        <div class="text-sm font-medium opacity-90">นักศึกษาทั้งหมด</div>
      </NuxtLink>

      <NuxtLink to="/admin/projects" class="bg-gradient-to-br from-[#2ed8b6] to-[#59e0c5] rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg shadow-emerald-500/20 hover:-translate-y-1 transition-transform duration-300 block">
        <i class="bi bi-folder-fill absolute right-4 top-1/2 -translate-y-1/2 text-[4rem] opacity-20"></i>
        <div class="text-[2.8rem] font-bold leading-none mb-1">{{ stats.projects }}</div>
        <div class="text-sm font-medium opacity-90">โครงงานในระบบ</div>
      </NuxtLink>

      <NuxtLink to="/admin/exam-topic" class="bg-gradient-to-br from-[#FFB64D] to-[#ffcb80] rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg shadow-amber-500/20 hover:-translate-y-1 transition-transform duration-300 block">
        <i class="bi bi-clipboard-data absolute right-4 top-1/2 -translate-y-1/2 text-[4rem] opacity-20"></i>
        <div class="text-[2.8rem] font-bold leading-none mb-1">{{ stats.cp1 }}</div>
        <div class="text-sm font-medium opacity-90">รอสอบหัวข้อ (CP1)</div>
      </NuxtLink>

      <NuxtLink to="/admin/exam-final" class="bg-gradient-to-br from-[#FF5370] to-[#ff869a] rounded-[24px] p-6 text-white relative overflow-hidden shadow-lg shadow-rose-500/20 hover:-translate-y-1 transition-transform duration-300 block">
        <i class="bi bi-mortarboard-fill absolute right-4 top-1/2 -translate-y-1/2 text-[4rem] opacity-20"></i>
        <div class="text-[2.8rem] font-bold leading-none mb-1">{{ stats.cp2 }}</div>
        <div class="text-sm font-medium opacity-90">รอสอบจบ (CP2)</div>
      </NuxtLink>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <div class="lg:col-span-8">
        <div class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 h-full">
          <div class="flex justify-between items-center mb-6">
            <h5 class="font-bold text-slate-800 text-lg flex items-center gap-2">
              <i class="bi bi-pin-angle-fill text-rose-500"></i> คำร้องล่าสุดที่ต้องตรวจสอบ
            </h5>
            <NuxtLink to="/admin/projects" class="text-xs font-bold bg-slate-50 text-slate-600 px-4 py-2 rounded-full hover:bg-[#1a1a40] hover:text-white transition-colors">
              ดูทั้งหมด
            </NuxtLink>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="border-b border-slate-100 text-slate-400 text-sm">
                  <th class="pb-3 font-medium">ชื่อโครงงาน</th>
                  <th class="pb-3 font-medium">นักศึกษา</th>
                  <th class="pb-3 font-medium">สถานะขั้นตอน</th>
                  <th class="pb-3 font-medium text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-for="(item, index) in recentProjects" :key="index" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td class="py-4 pr-4 font-bold text-slate-700 truncate max-w-[200px]" :title="item.title">{{ item.title }}</td>
                  <td class="py-4 pr-4 text-slate-500">{{ item.student }}</td>
                  <td class="py-4 pr-4">
                    <span v-if="item.step === 1" class="px-3 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-100">สอบหัวข้อ</span>
                    <span v-else-if="item.step === 4" class="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">สอบจบ</span>
                    <span v-else class="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200">ดำเนินการ</span>
                  </td>
                  <td class="py-4 text-center">
                    <NuxtLink :to="`/admin/project/${item.id}`" class="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-[#1a1a40] hover:text-white transition-colors mx-auto">
                      <span class="material-symbols-rounded text-[20px]">chevron_right</span>
                    </NuxtLink>
                  </td>
                </tr>
                <tr v-if="recentProjects.length === 0">
                  <td colspan="4" class="px-8 py-10 text-center text-slate-400 font-medium italic">ไม่พบข้อมูลคำร้องล่าสุด</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="lg:col-span-4 flex flex-col gap-6">
        
        <div class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
          <div class="flex justify-between items-center mb-5">
            <h5 class="font-bold text-slate-800 text-lg flex items-center gap-2">
              <i class="bi bi-person-fill-add text-blue-500"></i> รออนุมัติเข้าใช้งาน
            </h5>
            <span class="bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{{ pendingStudents.length }}</span>
          </div>

          <div v-if="pendingStudents.length > 0" class="space-y-3">
            <div v-for="student in pendingStudents" :key="student.id" class="flex items-center justify-between p-3 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white transition-colors group">
              <div class="flex items-center gap-3 overflow-hidden">
                <div class="w-10 h-10 rounded-full bg-white text-slate-400 flex items-center justify-center font-bold text-sm shadow-sm shrink-0 border border-slate-100">
                  {{ student.name.substring(0, 1) }}
                </div>
                <div class="overflow-hidden">
                  <div class="font-bold text-slate-700 text-sm truncate">{{ student.name }}</div>
                  <div class="text-xs text-slate-400">{{ student.code }}</div>
                </div>
              </div>
              
              <button @click="approveStudent(student.id, student.name)" class="w-9 h-9 flex items-center justify-center rounded-full bg-white border-2 border-emerald-100 text-emerald-500 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white transition-colors shrink-0 shadow-sm" title="อนุมัติ">
                <i class="bi bi-check-lg text-lg"></i>
              </button>
            </div>

            <div class="pt-2 text-center">
             <NuxtLink to="/admin/students/approve" class="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors underline">
  จัดการนักศึกษาที่รออนุมัติทั้งหมด <i class="bi bi-arrow-right"></i>
</NuxtLink>
            </div>
          </div>
          
          <div v-else class="text-center py-6">
            <div class="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-3">
              <i class="bi bi-check-circle-fill"></i>
            </div>
            <div class="text-sm font-bold text-slate-700">ไม่มีคำร้องใหม่</div>
            <div class="text-xs text-slate-400">นักศึกษาทุกคนได้รับการอนุมัติแล้ว</div>
          </div>
        </div>

        <div class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100">
          <h5 class="font-bold text-slate-800 text-lg mb-5 flex items-center gap-2">
            <i class="bi bi-lightning-charge-fill text-amber-400"></i> Quick Actions
          </h5>
          
          <div class="space-y-3">
            <NuxtLink to="/admin/exam-topic" class="flex items-center p-3.5 rounded-2xl border-2 border-amber-50 hover:border-amber-400 bg-white hover:bg-amber-50 transition-all group">
              <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg mr-4 group-hover:scale-110 transition-transform"><i class="bi bi-calendar-check-fill"></i></div>
              <div>
                <div class="font-bold text-slate-700 group-hover:text-amber-700 text-sm">จัดตารางสอบหัวข้อ</div>
                <div class="text-[11px] text-slate-400">จัดการคำร้อง CP1</div>
              </div>
            </NuxtLink>

            <NuxtLink to="/admin/reports" class="flex items-center p-3.5 rounded-2xl border-2 border-emerald-50 hover:border-emerald-500 bg-white hover:bg-emerald-50 transition-all group">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg mr-4 group-hover:scale-110 transition-transform"><i class="bi bi-file-earmark-bar-graph-fill"></i></div>
              <div>
                <div class="font-bold text-slate-700 group-hover:text-emerald-700 text-sm">ดูรายงานสรุปผล</div>
                <div class="text-[11px] text-slate-400">สถิติภาพรวมประจำปี</div>
              </div>
            </NuxtLink>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

// บังคับใช้ Admin Layout
definePageMeta({ layout: 'admin' })

const alerts = useAlerts()

// สร้างวันที่ปัจจุบันภาษาไทย
const currentDate = computed(() => {
  return new Date().toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
})

// ดึงข้อมูลจริงจาก API
const { data: dashboardData, pending: loading, refresh } = await useFetch('/api/admin/dashboard-stats')

const stats = computed(() => dashboardData.value?.stats || { students: 0, projects: 0, cp1: 0, cp2: 0 })
const pendingStudents = computed(() => dashboardData.value?.pendingStudents || [])
const recentProjects = computed(() => dashboardData.value?.recentProjects || [])

const statCards = computed(() => [
  { to: '/admin/students/students', label: 'นักศึกษาทั้งหมด', value: stats.value.students, icon: 'group', bg: 'bg-gradient-to-br from-blue-600 to-indigo-600 shadow-blue-500/20' },
  { to: '/admin/projects', label: 'โครงงานในระบบ', value: stats.value.projects, icon: 'folder', bg: 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20' },
  { to: '/admin/exam-topic', label: 'รอสอบหัวข้อ (CP1)', value: stats.value.cp1, icon: 'assignment', bg: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20' },
  { to: '/admin/exam-final', label: 'รอสอบจบ (CP2)', value: stats.value.cp2, icon: 'school', bg: 'bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/20' },
])

// ฟังก์ชันอนุมัติรายบุคคลจากหน้า Dashboard
const approveStudent = async (id, name) => {
  const result = await alerts.confirm('ยืนยันการอนุมัติ', `ยืนยันการอนุมัติสิทธิ์เข้าใช้งานให้ "${name}" ใช่หรือไม่?`, 'question');
  if (result.isConfirmed) {
    try {
      const res = await $fetch('/api/admin/approve-student', {
        method: 'POST',
        body: { userId: id }
      })
      if (res.success) {
        alerts.success('สำเร็จ!', `อนุมัติสิทธิ์ให้ ${name} เรียบร้อยแล้ว`)
        refresh()
      }
    } catch (error) {
      alerts.error('ผิดพลาด', 'เกิดข้อผิดพลาดในการอนุมัติ กรุณาลองใหม่อีกครั้ง')
    }
  }
}
</script>