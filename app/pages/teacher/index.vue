<template>
  <div class="min-h-screen bg-slate-50 py-8 px-4 md:px-8  text-slate-800">
    <div class="max-w-[1200px] mx-auto w-full">
      
      <div class="mb-10 pl-2">
        <h2 class="font-bold text-[28px] md:text-[32px] text-slate-900 tracking-tight flex items-center gap-3">
          <span class="bg-indigo-600 text-white p-2.5 rounded-2xl shadow-lg shadow-indigo-200">
            <span class="material-symbols-rounded text-xl">grid_view</span>
          </span>
          Teacher Workspace
        </h2>
        <p class="text-slate-500 mt-2 font-medium">ติดตามความคืบหน้าโครงงานของนักศึกษา (View Only)</p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10">
        
        <div @click="selectedStatus = null" 
             :class="selectedStatus === null ? 'ring-4 ring-slate-500/30 scale-[1.02]' : 'opacity-70 hover:opacity-100'"
             class="bg-white rounded-3xl p-6 shadow-md border-b-[6px] border-slate-700 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 rounded-2xl bg-slate-700 text-white flex items-center justify-center text-xl shadow-md"><span class="material-symbols-rounded">collections_bookmark</span></div>
            <span class="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider border border-slate-200">ปี {{ selectedYear }}</span>
          </div>
          <div>
            <div class="text-[2.5rem] leading-none font-black text-slate-800">{{ statTotalAll }}</div>
            <div class="text-sm text-slate-600 font-bold mt-2">กลุ่มทั้งหมด</div>
          </div>
        </div>

        <div @click="selectStatus('progress')" 
             :class="selectedStatus === 'progress' ? 'ring-4 ring-blue-500/30 scale-[1.02]' : 'opacity-70 hover:opacity-100'"
             class="bg-white rounded-3xl p-6 shadow-md border-b-[6px] border-blue-600 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl shadow-md"><span class="material-symbols-rounded">code</span></div>
          </div>
          <div>
            <div class="text-[2.5rem] leading-none font-black text-blue-700">{{ statProgressAll }}</div>
            <div class="text-sm text-slate-600 font-bold mt-2">กำลังดำเนินงาน</div>
          </div>
        </div>

        <div @click="selectStatus('pending')" 
             :class="selectedStatus === 'pending' ? 'ring-4 ring-amber-500/30 scale-[1.02]' : 'opacity-70 hover:opacity-100'"
             class="bg-white rounded-3xl p-6 shadow-md border-b-[6px] border-amber-500 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-xl shadow-md"><span class="material-symbols-rounded">description</span></div>
          </div>
          <div>
            <div class="text-[2.5rem] leading-none font-black text-amber-600">{{ statPendingAll }}</div>
            <div class="text-sm text-slate-600 font-bold mt-2">รอสอบจบ</div>
          </div>
        </div>

        <div @click="selectStatus('completed')" 
             :class="selectedStatus === 'completed' ? 'ring-4 ring-emerald-500/30 scale-[1.02]' : 'opacity-70 hover:opacity-100'"
             class="bg-white rounded-3xl p-6 shadow-md border-b-[6px] border-emerald-500 transition-all duration-300 cursor-pointer flex flex-col justify-between h-full">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-md"><span class="material-symbols-rounded">check_circle_outline</span></div>
          </div>
          <div>
            <div class="text-[2.5rem] leading-none font-black text-emerald-600">{{ statCompletedAll }}</div>
            <div class="text-sm text-slate-600 font-bold mt-2">เสร็จสมบูรณ์</div>
          </div>
        </div>

      </div>

      <div class="flex flex-col md:flex-row gap-5 justify-between items-center mb-10 bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
        
        <div class="w-full md:w-auto relative group shrink-0">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-indigo-500">
            <span class="material-symbols-rounded">calendar_month</span>
          </div>
          <select 
            v-model="selectedYear" 
            class="w-full md:w-[220px] bg-slate-50 hover:bg-slate-100 border-2 border-slate-100 text-slate-800 text-sm font-bold rounded-full focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 block pl-12 pr-10 py-3 outline-none transition-all appearance-none cursor-pointer"
          >
            <option v-for="year in academicYears" :key="year" :value="year">
              ปีการศึกษา {{ year }}
            </option>
          </select>
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400 group-hover:text-indigo-600 transition-colors">
            <span class="material-symbols-rounded font-bold">expand_more</span>
          </div>
        </div>

        <div class="w-full md:w-[350px] relative group">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <span class="material-symbols-rounded text-lg">search</span>
          </div>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ค้นหาชื่อโครงงาน, รหัสนักศึกษา..." 
            class="w-full bg-slate-50 border-2 border-slate-100 text-slate-800 text-sm font-medium rounded-full focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 block pl-12 pr-10 py-3 outline-none transition-all"
          >
          <button v-if="searchQuery" @click="searchQuery = ''" class="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-rose-500 transition-colors">
            <span class="material-symbols-rounded text-lg">cancel</span>
          </button>
        </div>

      </div>

      <div v-if="selectedStatus" class="mb-6 flex items-center gap-3 animate-pulse">
        <span class="text-sm font-bold text-slate-400">กำลังแสดงหมวด:</span>
        <span :class="getStatusDisplay(selectedStatus).color" class="px-4 py-1 rounded-full text-xs font-bold shadow-sm border">
           {{ getStatusDisplay(selectedStatus).text }}
        </span>
        <button @click="selectedStatus = null" class="text-xs text-rose-500 hover:text-rose-700 font-bold underline transition-colors">ล้างการเลือก</button>
      </div>

      <div v-if="filteredProjects.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        
        <div v-for="project in filteredProjects" :key="project.id" 
             :class="getTheme(project.step).card"
             class="rounded-[28px] p-7 border-2 hover:-translate-y-1 transition-all duration-300 flex flex-col group relative overflow-hidden bg-white">
          
          <div :class="getTheme(project.step).topBar" class="absolute top-0 left-0 right-0 h-2"></div>

          <div class="flex justify-between items-start mb-6 mt-2 relative z-10">
            <span :class="getTheme(project.step).badge" class="px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wide inline-flex items-center gap-2">
              <i :class="getTheme(project.step).icon" class="text-sm"></i>
              {{ getStatusText(project.step) }}
            </span>
            <span class="text-xs font-bold text-slate-300">ID: {{ project.id }}</span>
          </div>

          <h3 class="font-bold text-xl text-slate-800 leading-snug mb-8 line-clamp-2 min-h-[3.5rem] relative z-10" :title="project.titleTh">
            {{ project.titleTh }}
          </h3>

          <div class="space-y-4 mb-8 relative z-10">
            <div class="flex items-center gap-4">
              <div :class="getTheme(project.step).avatarBg" class="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm uppercase shadow-inner border-2 border-white text-white">
                {{ getInitials(project.student1.fullname) }}
              </div>
              <div>
                <div class="text-[15px] font-bold text-slate-700 leading-none mb-1">{{ project.student1.fullname }}</div>
                <div class="text-xs text-slate-500 font-medium">{{ project.student1.username }}</div>
              </div>
            </div>
            
            <div v-if="project.student2" class="flex items-center gap-4">
              <div :class="getTheme(project.step).avatarBg" class="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm uppercase shadow-inner border-2 border-white text-white">
                {{ getInitials(project.student2.fullname) }}
              </div>
              <div>
                <div class="text-[15px] font-bold text-slate-700 leading-none mb-1">{{ project.student2.fullname }}</div>
                <div class="text-xs text-slate-500 font-medium">{{ project.student2.username }}</div>
              </div>
            </div>
          </div>

          <NuxtLink :to="`/teacher/project/${project.id}`" :class="getTheme(project.step).btn" class="mt-auto w-full py-3.5 text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 relative z-10 group/btn shadow-sm">
            ดูรายละเอียด <span class="material-symbols-rounded group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
          </NuxtLink>

        </div>

      </div>

      <div v-else class="bg-white rounded-3xl p-16 text-center shadow-sm border border-slate-200 mt-6 flex flex-col items-center justify-center">
        <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 text-5xl mb-6">
          <span class="material-symbols-rounded">search</span>
        </div>
        <h3 class="text-2xl font-bold text-slate-800 mb-2">ไม่พบข้อมูลโครงงาน</h3>
        <p class="text-slate-500 font-medium">ไม่มีกลุ่มนักศึกษาที่ตรงกับเงื่อนไขที่เลือก</p>
        <button @click="resetFilters" class="mt-6 px-6 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold transition-colors">
          แสดงโครงงานทั้งหมด
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

useHead({
  title: 'Teacher Workspace | BSRU',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;900&display=swap' }
  ]
})

definePageMeta({
  layout: 'teacher'
})

// ================= ข้อมูล & การกรอง =================
const academicYears = ['2568', '2567', '2566', '2565']
const selectedYear = ref('2568')
const searchQuery = ref('')
const selectedStatus = ref(null) // null = ทั้งหมด, progress, pending, completed

// ดึงข้อมูลอาจารย์ที่ Login อยู่
const userCookie = useCookie('user_session')
const teacher = userCookie.value

// ดึงข้อมูลจริงจาก API
const { data: projectsData, pending, refresh } = await useFetch('/api/teacher/projects', {
  query: {
    advisorId: teacher?.id,
    year: selectedYear
  },
  watch: [selectedYear]
})

const projects = computed(() => projectsData.value?.projects || [])

// สถิติแบบรวมทุกปี (แสดงเลขบนการ์ด)
const statTotalAll = computed(() => projects.value.filter(p => p.academicYear === selectedYear.value).length)
const statProgressAll = computed(() => projects.value.filter(p => p.academicYear === selectedYear.value && (p.step === 2 || p.step === 3)).length)
const statPendingAll = computed(() => projects.value.filter(p => p.academicYear === selectedYear.value && p.step === 4).length)
const statCompletedAll = computed(() => projects.value.filter(p => p.academicYear === selectedYear.value && p.step === 5).length)

// ฟังก์ชันกรองหลัก
const filteredProjects = computed(() => {
  return projects.value.filter(p => {
    const matchYear = p.academicYear === selectedYear.value
    
    const search = searchQuery.value.toLowerCase()
    const matchSearch = (p.titleTh || '').toLowerCase().includes(search) || 
                        (p.student1?.fullname || '').toLowerCase().includes(search) || 
                        p.student1.username.includes(search)

    let matchStatus = true
    if (selectedStatus.value === 'progress') matchStatus = (p.step === 2 || p.step === 3)
    if (selectedStatus.value === 'pending') matchStatus = (p.step === 4)
    if (selectedStatus.value === 'completed') matchStatus = (p.step === 5)

    return matchYear && matchSearch && matchStatus
  })
})

const selectStatus = (status) => {
  selectedStatus.value = selectedStatus.value === status ? null : status
}

const resetFilters = () => {
  selectedStatus.value = null
  searchQuery.value = ''
}

// ================= UI Helpers =================
const getInitials = (name) => {
  if (!name) return '?'
  return name.replace('นาย', '').replace('นางสาว', '').replace('นาง', '').trim().substring(0, 2)
}

const getStatusDisplay = (status) => {
  if (status === 'progress') return { text: 'กำลังดำเนินงาน', color: 'bg-blue-100 text-blue-700 border-blue-200' }
  if (status === 'pending') return { text: 'รอสอบจบ', color: 'bg-amber-100 text-amber-700 border-amber-200' }
  if (status === 'completed') return { text: 'เสร็จสมบูรณ์', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' }
  return { text: '', color: '' }
}

const getTheme = (step) => {
  if (step === 5) return {
    card: 'border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100',
    topBar: 'bg-emerald-500', badge: 'bg-emerald-100 text-emerald-700',
    icon: 'bi-check-circle-fill text-emerald-500',
    btn: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-500 hover:text-white',
    avatarBg: 'bg-emerald-500'
  }
  if (step === 4) return {
    card: 'border-amber-200 hover:border-amber-400 hover:shadow-amber-100',
    topBar: 'bg-amber-500', badge: 'bg-amber-100 text-amber-700',
    icon: 'bi-exclamation-circle-fill text-amber-500',
    btn: 'bg-amber-50 text-amber-700 hover:bg-amber-500 hover:text-white',
    avatarBg: 'bg-amber-500'
  }
  if (step >= 2) return {
    card: 'border-blue-200 hover:border-blue-400 hover:shadow-blue-100',
    topBar: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700',
    icon: 'bi-play-circle-fill text-blue-500',
    btn: 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white',
    avatarBg: 'bg-blue-500'
  }
  return {
    card: 'border-slate-200 hover:border-slate-400 hover:shadow-slate-100',
    topBar: 'bg-slate-400', badge: 'bg-slate-100 text-slate-600',
    icon: 'bi-record-circle-fill text-slate-400',
    btn: 'bg-slate-100 text-slate-700 hover:bg-slate-700 hover:text-white',
    avatarBg: 'bg-slate-400'
  }
}

const getStatusText = (step) => {
  if (step === 5) return 'เสร็จสมบูรณ์'
  if (step === 4) return 'รอสอบจบ'
  if (step >= 2) return 'กำลังดำเนินงาน'
  return 'อนุมัติหัวข้อแล้ว'
}
</script>

<style scoped>
/* ซ่อนปุ่ม x เดิมของช่องค้นหา */
input[type="text"]::-webkit-search-decoration,
input[type="text"]::-webkit-search-cancel-button,
input[type="text"]::-webkit-search-results-button,
input[type="text"]::-webkit-search-results-decoration {
  display: none;
}
</style>