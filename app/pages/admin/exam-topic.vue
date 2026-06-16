<template>
  <div class="p-4 md:p-10">
    
    <div class="mb-8">
      <NuxtLink to="/admin" class="group inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-sm transition-all">
        <span class="material-symbols-rounded group-hover:-translate-x-1 transition-transform">arrow_back</span> 
        <span>ย้อนกลับไปหน้า Dashboard</span>
      </NuxtLink>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
      <div class="relative">
        <div class="flex items-center gap-2 text-amber-500 font-black mb-2 uppercase tracking-widest text-xs">
          <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          CP1 Request Management
        </div>
        <h2 class="text-slate-900 dark:text-white md: mb-2 tracking-tight text-2xl md:text-3xl font-bold">คำร้องขอสอบหัวข้อ (CP1)</h2>
        <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <span class="w-8 h-px bg-slate-200"></span>
          <p class="text-sm font-medium">จัดการคำร้องและจัดตารางสอบหัวข้อโครงงาน</p>
        </div>
      </div>
      
      <div class="flex bg-slate-100 dark:bg-slate-700 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
        <button @click="activeTab = 'waiting'" 
                :class="activeTab === 'waiting' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-md font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'"
                class="px-8 py-3 rounded-xl text-sm transition-all flex items-center gap-2 text-nowrap">
          <span class="material-symbols-rounded text-xl">inbox</span> 
          <span>รอดำเนินการ</span>
          <span v-if="waitList.length" class="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-amber-500 text-white text-xs font-black">{{ waitList.length }}</span>
        </button>
        <button @click="activeTab = 'scheduled'" 
                :class="activeTab === 'scheduled' ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-md font-bold' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'"
                class="px-8 py-3 rounded-xl text-sm transition-all flex items-center gap-2 text-nowrap">
          <span class="material-symbols-rounded text-xl">calendar_month</span> 
          <span>ตารางนัดสอบ</span>
        </button>
      </div>
    </div>

    <div class="admin-card bg-white dark:bg-slate-800 overflow-hidden">
      
      <!-- Waiting List Tab -->
      <div v-if="activeTab === 'waiting'" class="animate-[fadeIn_0.3s_ease-out]">
        <div class="overflow-x-auto">
          <table class="w-full text-left min-w-[900px]">
            <thead>
              <tr class="bg-slate-50/50 dark:bg-slate-700/30">
                <th class="px-8 py-5 admin-table-header">ข้อมูลโครงงาน</th>
                <th class="px-8 py-5 admin-table-header">ผู้วิจัย</th>
                <th class="px-8 py-5 admin-table-header">วันที่ยื่นคำร้อง</th>
                <th class="px-8 py-5 admin-table-header text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50 dark:divide-slate-700/50 text-sm">
              <tr v-for="item in waitList" :key="item.id" class="admin-table-row group/row">
                <td class="px-8 py-6 max-w-[300px]">
                  <div class="font-bold text-slate-800 dark:text-slate-200 text-base mb-1 truncate" :title="item.titleTh">{{ item.titleTh }}</div>
                  <div class="text-xs text-slate-400 font-medium truncate">{{ item.titleEn }}</div>
                </td>
                <td class="px-8 py-6">
                  <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs border border-indigo-100 dark:border-indigo-800/50 shrink-0">
                        {{ item.student1.fullname.charAt(0) }}
                      </div>
                      <span class="font-bold text-slate-700 dark:text-slate-300 text-sm">{{ item.student1.fullname }}</span>
                    </div>
                    <div v-if="item.student2" class="flex items-center gap-3">
                      <div class="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-100 dark:border-emerald-800/50 shrink-0">
                        {{ item.student2.fullname.charAt(0) }}
                      </div>
                      <span class="font-bold text-slate-700 dark:text-slate-300 text-sm">{{ item.student2.fullname }}</span>
                    </div>
                  </div>
                </td>
                <td class="px-8 py-6">
                  <div class="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                    <span class="material-symbols-rounded text-slate-300 text-lg">event</span>
                    {{ formatDate(item.createdAt) }}
                  </div>
                </td>
                <td class="px-8 py-6 text-center">
                  <NuxtLink :to="`/admin/project/${item.id}`" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all font-bold text-sm shadow-md shadow-indigo-100 dark:shadow-none active:scale-95">
                    <span class="material-symbols-rounded text-lg">visibility</span>
                    <span>ดูรายละเอียดและจัดสอบ</span>
                  </NuxtLink>
                </td>
              </tr>
              <tr v-if="waitList.length === 0">
                <td colspan="4" class="px-8 py-24 text-center">
                  <div class="w-20 h-20 bg-slate-50 dark:bg-slate-900 text-slate-200 rounded-[28px] flex items-center justify-center mx-auto mb-6">
                    <span class="material-symbols-rounded text-6xl">inbox</span>
                  </div>
                  <p class="font-bold text-slate-400 text-lg">ไม่มีรายการคำร้องใหม่</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Scheduled Tab -->
      <div v-if="activeTab === 'scheduled'" class="animate-[fadeIn_0.3s_ease-out]">
        <div class="overflow-x-auto">
          <table class="w-full text-left min-w-[900px]">
            <thead>
              <tr class="bg-slate-50/50 dark:bg-slate-700/30">
                <th class="px-8 py-5 admin-table-header">วัน/เวลาสอบ</th>
                <th class="px-8 py-5 admin-table-header text-center">สถานที่/ห้อง</th>
                <th class="px-8 py-5 admin-table-header">ข้อมูลโครงงาน & ผู้วิจัย</th>
                <th class="px-8 py-5 admin-table-header text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50 dark:divide-slate-700/50 text-sm">
              <tr v-for="item in scheduleList" :key="item.id" class="admin-table-row group/row">
                <td class="px-8 py-6">
                  <div v-if="item.exams?.find(e => e.type === 'CP1' && e.status === 'pending')" class="flex items-center gap-4">
                    <div class="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800/50 group-hover/row:scale-110 transition-transform">
                      <span class="text-xs font-black text-indigo-400 uppercase tracking-tighter">{{ new Date(item.exams.find(e => e.type === 'CP1' && e.status === 'pending').examDate).toLocaleDateString('th-TH', { month: 'short' }) }}</span>
                      <span class="text-xl font-black text-indigo-600 leading-none">{{ new Date(item.exams.find(e => e.type === 'CP1' && e.status === 'pending').examDate).getDate() }}</span>
                    </div>
                    <div>
                      <div class="font-black text-slate-800 dark:text-slate-200 text-base">{{ formatDate(item.exams.find(e => e.type === 'CP1' && e.status === 'pending').examDate) }}</div>
                      <div class="text-indigo-500 font-bold text-xs flex items-center gap-1">
                        <span class="material-symbols-rounded text-sm">schedule</span>
                        {{ item.exams.find(e => e.type === 'CP1' && e.status === 'pending')?.examTime || '-' }} น.
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-8 py-6 text-center">
                  <div v-if="item.exams?.find(e => e.type === 'CP1' && e.status === 'pending')" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold border border-amber-100 dark:border-amber-800/50">
                    <span class="material-symbols-rounded text-lg">location_on</span>
                    {{ item.exams.find(e => e.type === 'CP1' && e.status === 'pending')?.examLocation || '-' }}
                  </div>
                </td>
                <td class="px-8 py-6">
                  <div class="font-bold text-slate-800 dark:text-slate-200 mb-2 truncate max-w-[250px]" :title="item.titleTh">{{ item.titleTh }}</div>
                  <div class="flex flex-col gap-1">
                    <div class="text-slate-500 dark:text-slate-400 font-bold text-xs flex items-center gap-1.5">
                      <span class="material-symbols-rounded text-sm">person</span>
                      {{ item.student1.fullname }}
                    </div>
                    <div v-if="item.student2" class="text-slate-500 dark:text-slate-400 font-bold text-xs flex items-center gap-1.5">
                      <span class="material-symbols-rounded text-sm">person</span>
                      {{ item.student2.fullname }}
                    </div>
                  </div>
                </td>
                <td class="px-8 py-6 text-center">
                  <NuxtLink :to="`/admin/project/${item.id}`" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all font-bold text-sm shadow-md shadow-emerald-100 dark:shadow-none active:scale-95">
                    <span class="material-symbols-rounded text-lg">visibility</span>
                    <span>ดูรายละเอียด</span>
                  </NuxtLink>
                </td>
              </tr>
              <tr v-if="scheduleList.length === 0">
                <td colspan="4" class="px-8 py-24 text-center">
                  <div class="w-20 h-20 bg-slate-50 dark:bg-slate-900 text-slate-200 rounded-[28px] flex items-center justify-center mx-auto mb-6">
                    <span class="material-symbols-rounded text-6xl">event_busy</span>
                  </div>
                  <p class="font-bold text-slate-400 text-lg">ยังไม่มีตารางนัดสอบ</p>
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
import { ref, computed } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({ layout: 'admin' })

const alerts = useAlerts()
const activeTab = ref('waiting')

// ดึงข้อมูลจริงจาก API
const { data: projectsData, pending, refresh } = await useFetch('/api/admin/projects-by-step', {
  query: { step: 1 }
})

const projects = computed(() => projectsData.value?.projects || [])

// แบ่งกลุ่มข้อมูล
const waitList = computed(() => projects.value.filter(p => !p.exams || p.exams.length === 0))
const scheduleList = computed(() => projects.value.filter(p => p.exams && p.exams.some(e => e.type === 'CP1' && e.status === 'pending')))

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('th-TH', { 
    day: 'numeric', month: 'long', year: 'numeric'
  })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>