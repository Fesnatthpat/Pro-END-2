<template>
  <div class="p-4 md:p-10 font-['Prompt',_sans-serif]">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
      <div class="relative">
        <h3 class="font-bold text-slate-900 text-3xl md:text-4xl mb-2 tracking-tight">Dashboard</h3>
        <div class="flex items-center gap-2 text-slate-500">
          <span class="w-8 h-px bg-indigo-200"></span>
          <p class="text-sm font-medium">ยินดีต้อนรับกลับ, Admin System 👋</p>
        </div>
      </div>
      <div class="glass-card px-6 py-3 rounded-2xl shadow-sm text-slate-700 font-bold text-sm flex items-center gap-3 border border-slate-200/50">
        <div class="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <span class="material-symbols-rounded text-lg">calendar_today</span>
        </div>
        {{ currentDate }}
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      
      <NuxtLink v-for="stat in statCards" :key="stat.to" :to="stat.to" 
        class="group relative overflow-hidden rounded-[32px] p-8 transition-all duration-500 premium-shadow-hover"
        :class="stat.bg">
        <!-- Background Decoration -->
        <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
        
        <div class="relative z-10 flex flex-col h-full">
          <div class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 border border-white/30 group-hover:rotate-12 transition-transform duration-500">
            <span class="material-symbols-rounded text-white text-3xl">{{ stat.icon }}</span>
          </div>
          <div class="mt-auto">
            <div class="text-4xl font-bold text-white mb-1 tracking-tight">{{ stat.value }}</div>
            <div class="text-sm font-semibold text-white/80 uppercase tracking-wider">{{ stat.label }}</div>
          </div>
        </div>
      </NuxtLink>

    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <div class="lg:col-span-8">
        <div class="admin-card bg-white overflow-hidden group">
          <div class="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <h5 class="font-bold text-slate-800 text-xl flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-500 flex items-center justify-center">
                <span class="material-symbols-rounded">history_edu</span>
              </div>
              คำร้องล่าสุดที่ต้องตรวจสอบ
            </h5>
            <NuxtLink to="/admin/projects" class="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all border border-indigo-100">
              ดูทั้งหมด
            </NuxtLink>
          </div>

          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-slate-50/50">
                  <th class="px-8 py-5 admin-table-header">ชื่อโครงงาน</th>
                  <th class="px-8 py-5 admin-table-header">นักศึกษา</th>
                  <th class="px-8 py-5 admin-table-header">สถานะ</th>
                  <th class="px-8 py-5 admin-table-header text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr v-for="(item, index) in recentProjects" :key="index" class="admin-table-row group/row">
                  <td class="px-8 py-5 font-bold text-slate-700 max-w-[240px]">
                    <div class="truncate" :title="item.title">{{ item.title }}</div>
                  </td>
                  <td class="px-8 py-5 text-slate-500 font-medium">{{ item.student }}</td>
                  <td class="px-8 py-5">
                    <span v-if="item.step === 1" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-100">
                      <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span> สอบหัวข้อ
                    </span>
                    <span v-else-if="item.step === 4" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span> สอบจบ
                    </span>
                    <span v-else class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> ดำเนินการ
                    </span>
                  </td>
                  <td class="px-8 py-5 text-center">
                    <NuxtLink :to="`/admin/project/${item.id}`" class="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-indigo-200 group-hover/row:scale-110">
                      <span class="material-symbols-rounded">arrow_forward</span>
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

      <div class="lg:col-span-4 flex flex-col gap-10">
        
        <div class="admin-card p-8 bg-gradient-to-br from-white to-slate-50">
          <div class="flex justify-between items-center mb-8">
            <h5 class="font-bold text-slate-800 text-xl flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <span class="material-symbols-rounded">how_to_reg</span>
              </div>
              รออนุมัติ
            </h5>
            <span class="bg-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full shadow-lg shadow-rose-200">{{ pendingStudents.length }}</span>
          </div>

          <div v-if="pendingStudents.length > 0" class="space-y-4">
            <div v-for="student in pendingStudents" :key="student.id" class="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-indigo-200 hover:shadow-md transition-all duration-300 group">
              <div class="flex items-center gap-4 overflow-hidden">
                <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center font-bold text-lg shrink-0 border border-indigo-100">
                  {{ student.name.substring(0, 1) }}
                </div>
                <div class="overflow-hidden">
                  <div class="font-bold text-slate-700 text-sm truncate">{{ student.name }}</div>
                  <div class="text-xs text-slate-400 font-medium tracking-tight">{{ student.code }}</div>
                </div>
              </div>
              
              <button @click="approveStudent(student.id, student.name)" class="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 shrink-0 shadow-sm" title="อนุมัติ">
                <span class="material-symbols-rounded text-xl">check</span>
              </button>
            </div>

            <div class="pt-4">
              <NuxtLink to="/admin/students/approve" class="group flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-900 hover:text-white transition-all duration-300">
                จัดการทั้งหมด 
                <span class="material-symbols-rounded text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </NuxtLink>
            </div>
          </div>
          
          <div v-else class="text-center py-10">
            <div class="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-4 border-2 border-emerald-100/50">
              <span class="material-symbols-rounded">check_circle</span>
            </div>
            <div class="text-base font-bold text-slate-700 mb-1">ไม่มีคำร้องใหม่</div>
            <div class="text-sm text-slate-400">นักศึกษาทุกคนได้รับการอนุมัติแล้ว</div>
          </div>
        </div>

        <div class="admin-card bg-white p-8">
          <h5 class="font-bold text-slate-800 text-xl mb-8 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <span class="material-symbols-rounded">bolt</span>
            </div>
            Quick Actions
          </h5>
          
          <div class="grid grid-cols-1 gap-4">
            <NuxtLink to="/admin/exam-topic" class="flex items-center p-5 rounded-[24px] border border-slate-100 hover:border-amber-400 bg-white hover:bg-amber-50/30 transition-all group">
              <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mr-5 group-hover:scale-110 group-hover:rotate-6 transition-all"><span class="material-symbols-rounded">calendar_month</span></div>
              <div>
                <div class="font-bold text-slate-700 group-hover:text-amber-700 text-[15px]">จัดตารางสอบหัวข้อ</div>
                <div class="text-[12px] text-slate-400 font-medium">จัดการคำร้อง CP1</div>
              </div>
            </NuxtLink>

            <NuxtLink to="/admin/reports" class="flex items-center p-5 rounded-[24px] border border-slate-100 hover:border-indigo-400 bg-white hover:bg-indigo-50/30 transition-all group">
              <div class="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-xl mr-5 group-hover:scale-110 group-hover:rotate-6 transition-all"><span class="material-symbols-rounded">analytics</span></div>
              <div>
                <div class="font-bold text-slate-700 group-hover:text-indigo-700 text-[15px]">ดูรายงานสรุปผล</div>
                <div class="text-[12px] text-slate-400 font-medium">สถิติภาพรวมประจำปี</div>
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