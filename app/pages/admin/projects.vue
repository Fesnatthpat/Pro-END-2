<template>
  <div class="p-4 md:p-10">
    
    <div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="relative">
        <h2 class="font-bold text-slate-900 text-3xl md:text-4xl mb-2 tracking-tight">ข้อมูลโครงงานทั้งหมด</h2>
        <div class="flex items-center gap-2 text-slate-500">
          <span class="w-8 h-px bg-indigo-200"></span>
          <p class="text-sm font-medium">ค้นหา, ติดตามสถานะ และจัดการข้อมูลโครงงานทั้งหมดในระบบ</p>
        </div>
      </div>
    </div>

    <div class="admin-card p-6 mb-10 flex flex-col lg:flex-row gap-6 bg-gradient-to-br from-white to-slate-50 shadow-md">
      <div class="flex-grow relative group">
        <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <span class="material-symbols-rounded text-xl">search</span>
        </div>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="ค้นหาชื่อโครงงาน, ชื่อนักศึกษา..." 
          class="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
        >
      </div>
      
      <div class="lg:w-64 relative group shrink-0">
        <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none text-indigo-500">
          <span class="material-symbols-rounded text-xl">calendar_month</span>
        </div>
        <select 
          v-model="selectedYear" 
          class="w-full bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-2xl pl-14 pr-12 py-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer shadow-sm"
        >
          <option value="">ทุกปีการศึกษา</option>
          <option v-for="year in availableYears" :key="year" :value="year">{{ year }}</option>
        </select>
        <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
          <span class="material-symbols-rounded font-bold">expand_more</span>
        </div>
      </div>
    </div>

    <div v-if="pending" class="flex flex-col items-center justify-center py-32">
      <div class="relative w-20 h-20">
        <div class="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p class="mt-6 text-slate-400 font-bold animate-pulse">กำลังดึงข้อมูลโครงงาน...</p>
    </div>

    <div v-else class="grid grid-cols-1 gap-6">
      
      <div v-for="project in filteredProjects" :key="project.id" 
           class="admin-card bg-white overflow-hidden group/card hover:border-indigo-200 transition-all duration-500 animate-[fadeIn_0.4s_ease-out]">
        
        <div class="flex flex-col xl:flex-row">
          <!-- Main Content -->
          <div class="flex-grow p-8">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div class="flex items-center gap-3">
                <span class="px-3 py-1 rounded-lg bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                  ID: {{ String(project.id).slice(0, 8) }}
                </span>
                <span class="text-xs text-slate-400 font-bold flex items-center gap-1">
                  <span class="material-symbols-rounded text-sm">schedule</span>
                  แก้ไขล่าสุด: {{ formatDate(project.updatedAt) }}
                </span>
              </div>
              <div v-if="isProjectComplete(project)" class="flex items-center gap-1 text-emerald-500 font-black text-xs uppercase tracking-widest">
                <span class="material-symbols-rounded text-sm animate-bounce">verified</span>
                COMPLETED
              </div>
            </div>

            <h3 class="text-xl md:text-2xl font-black text-slate-800 mb-6 leading-tight group-hover/card:text-indigo-600 transition-colors">
              {{ project.titleTh }}
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                  <span class="material-symbols-rounded">groups</span>
                </div>
                <div>
                  <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ผู้วิจัย</div>
                  <div class="text-sm font-bold text-slate-700 leading-tight">
                    {{ project.student1.fullname }}
                    <div v-if="project.student2" class="mt-1">{{ project.student2.fullname }}</div>
                  </div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0 border border-slate-100">
                  <span class="material-symbols-rounded">person_pin</span>
                </div>
                <div>
                  <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">อาจารย์ที่ปรึกษา</div>
                  <div class="text-sm font-bold text-slate-700 leading-tight">
                    {{ project.advisor?.fullname || 'ยังไม่ระบุ' }}
                    <div v-if="project.coAdvisor" class="mt-1 text-slate-500 font-medium">(ร่วม: {{ project.coAdvisor.fullname }})</div>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-end md:justify-start">
                <NuxtLink :to="`/admin/project/${project.id}`" class="inline-flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-slate-100">
                  <span>ดูรายละเอียด</span>
                  <span class="material-symbols-rounded text-lg">arrow_forward</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Status Bar -->
          <div class="shrink-0 bg-slate-50/50 p-8 border-t xl:border-t-0 xl:border-l border-slate-100 flex flex-col justify-center items-center gap-4">
            <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">ความคืบหน้า (Steps)</div>
            <div class="flex items-center gap-2">
              <div v-for="s in 5" :key="s" 
                   class="relative w-11 h-11 rounded-2xl flex items-center justify-center font-black text-base border-2 transition-all duration-500 group/step"
                   :class="getBoxClass(s, project)">
                <span v-if="s < project.step || isProjectComplete(project)" class="material-symbols-rounded font-black text-xl scale-110">check_circle</span>
                <span v-else>{{ s }}</span>
                
                <!-- Tooltip -->
                <div class="absolute -top-10 scale-0 group-hover/step:scale-100 transition-transform bg-slate-800 text-white text-[10px] py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap z-20">
                  {{ getStepName(s) }}
                </div>
              </div>
            </div>
            <div class="text-[11px] font-bold" :class="isProjectComplete(project) ? 'text-emerald-500' : 'text-amber-500'">
              {{ isProjectComplete(project) ? 'เสร็จสิ้นกระบวนการ' : `ปัจจุบัน: ${getStepName(project.step)}` }}
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredProjects.length === 0" class="admin-card bg-white py-32 text-center">
        <div class="w-24 h-24 bg-slate-50 text-slate-200 rounded-[32px] flex items-center justify-center mx-auto mb-6">
          <span class="material-symbols-rounded text-6xl">search_off</span>
        </div>
        <h3 class="text-2xl font-black text-slate-800 mb-2">ไม่พบข้อมูลโครงงาน</h3>
        <p class="text-slate-400 font-medium max-w-xs mx-auto">ลองเปลี่ยนคำค้นหา หรือเลือกปีการศึกษาอื่น</p>
        <button @click="searchQuery = ''; selectedYear = ''" class="mt-6 text-indigo-600 font-black hover:underline">แสดงโครงงานทั้งหมด</button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({ layout: 'admin' })

const searchQuery = ref('')
const selectedYear = ref('')
const availableYears = ['2568', '2567', '2566', '2565']

// ดึงข้อมูลจริงจาก API
const { data: result, pending } = await useFetch('/api/admin/all-projects')
const projects = computed(() => result.value?.projects || [])

const filteredProjects = computed(() => {
  return projects.value.filter(p => {
    const search = searchQuery.value.toLowerCase()
    const matchSearch = (p.titleTh || '').toLowerCase().includes(search) || 
                        (p.student1?.fullname || '').toLowerCase().includes(search)
    const matchYear = selectedYear.value === '' || p.academicYear === selectedYear.value
    return matchSearch && matchYear
  })
})

const getBoxClass = (stepCheck, project) => {
  if (isProjectComplete(project) || stepCheck < project.step) return 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100'
  if (stepCheck === project.step) return 'bg-amber-400 border-amber-400 text-white shadow-lg shadow-amber-100 animate-pulse'
  return 'bg-white border-slate-100 text-slate-300'
}

const getStepName = (step) => {
  const names = {
    1: 'ยื่นสอบหัวข้อ (CP1)',
    2: 'พัฒนาโปรแกรม',
    3: 'เล่มบัณฑิตนิพนธ์ (ฉบับร่าง)',
    4: 'ยื่นสอบจบ (CP2/CP3)',
    5: 'ส่งเล่มและโปรแกรมสมบูรณ์'
  }
  return names[step] || 'ไม่ระบุ'
}

const isProjectComplete = (p) => p.step > 5 || (p.step === 5 && p.status === 'approved')
const formatDate = (date) => new Date(date).toLocaleDateString('th-TH', { 
  day: 'numeric', month: 'short', year: 'numeric' 
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
