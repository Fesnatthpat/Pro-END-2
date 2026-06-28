<template>
  <div class="p-4 md:p-8">
    
    <div class="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 print:hidden">
      <div>
        <h2 class="text-slate-900 dark:text-white mb-1 text-2xl font-bold">รายงานสรุปผล</h2>
        <p class="text-sm text-slate-500 dark:text-slate-400">สถิติภาพรวมโครงงานนักศึกษา แยกตามปีการศึกษา</p>
      </div>
      
      <div class="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        <div class="relative w-full sm:w-[220px]">
          <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
            <span class="material-symbols-rounded text-[20px]">calendar_month</span>
          </div>
          <select 
            v-model="selectedYear" 
            class="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm rounded-lg pl-10 pr-10 py-2.5 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all appearance-none cursor-pointer shadow-sm"
          >
            <option value="all">ทุกปีการศึกษา</option>
            <option v-for="year in availableYears" :key="year" :value="year">ปีการศึกษา {{ year }}</option>
          </select>
          <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
            <span class="material-symbols-rounded text-[20px]">expand_more</span>
          </div>
        </div>

        <button 
          @click="printReport"
          class="bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2 w-full sm:w-auto shrink-0"
        >
          <span class="material-symbols-rounded text-[18px]">print</span> 
          <span>พิมพ์รายงาน</span>
        </button>
      </div>
    </div>

    <div class="hidden print:block text-center mb-10 border-b-2 border-black pb-6">
      <h1 class="text-black mb-2 uppercase text-3xl font-bold">Project Summary Report</h1>
      <h3 class="text-xl text-black mb-3 font-semibold">รายงานสรุปโครงงานนักศึกษา</h3>
      <p class="text-base text-black">
        ปีการศึกษา: {{ selectedYear === 'all' ? 'ทั้งหมด' : selectedYear }} | วันที่พิมพ์: {{ new Date().toLocaleDateString('th-TH') }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between print:border-black print:shadow-none">
        <div>
          <div class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">โครงงานทั้งหมด</div>
          <div class="text-3xl font-bold text-slate-800 dark:text-slate-100">{{ stats.total }}</div>
        </div>
        <div class="w-12 h-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center print:hidden">
          <span class="material-symbols-rounded text-2xl">folder_open</span>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between print:border-black print:shadow-none">
        <div>
          <div class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">สอบผ่าน / จบแล้ว</div>
          <div class="text-3xl font-bold text-emerald-600">{{ stats.passed }}</div>
        </div>
        <div class="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center print:hidden">
          <span class="material-symbols-rounded text-2xl">verified</span>
        </div>
      </div>

      <div class="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-between print:border-black print:shadow-none">
        <div>
          <div class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">กำลังดำเนินการ</div>
          <div class="text-3xl font-bold text-amber-600">{{ stats.doing }}</div>
        </div>
        <div class="w-12 h-12 rounded-lg bg-amber-50 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center print:hidden">
          <span class="material-symbols-rounded text-2xl">pending_actions</span>
        </div>
      </div>

    </div>

    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm print:shadow-none print:border-none print:rounded-none">
      <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/50 print:hidden">
        <span class="material-symbols-rounded text-slate-500">format_list_bulleted</span>
        <h5 class="font-bold text-slate-800 dark:text-slate-200 text-lg">รายชื่อโครงงาน</h5>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm print:min-w-full print:border print:border-black">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 print:bg-gray-100">
              <th class="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 text-center w-[120px] print:border-r print:border-black">รหัสนักศึกษา</th>
              <th class="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 w-[200px] print:border-r print:border-black">ชื่อ - นามสกุล</th>
              <th class="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 print:border-r print:border-black">ชื่อโครงงาน</th>
              <th class="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 text-center w-[100px] print:border-r print:border-black">ปีการศึกษา</th>
              <th class="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 text-center w-[120px] print:border-r print:border-black">สถานะ</th>
              <th class="px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 text-center w-[120px]">วันสอบจบ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
            <tr v-for="project in filteredProjects" :key="project.id" class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors print:border-b print:border-black">
              <td class="px-6 py-4 text-center text-slate-600 dark:text-slate-400 print:text-black print:border-r print:border-black">{{ project.student1.username }}</td>
              <td class="px-6 py-4 font-medium text-slate-800 dark:text-slate-200 print:text-black print:border-r print:border-black">{{ project.student1.fullname }}</td>
              <td class="px-6 py-4 text-slate-600 dark:text-slate-300 print:text-black print:border-r print:border-black">{{ project.titleTh || '-' }}</td>
              <td class="px-6 py-4 text-center text-slate-600 dark:text-slate-400 print:text-black print:border-r print:border-black">{{ project.academicYear }}</td>
              <td class="px-6 py-4 text-center print:border-r print:border-black">
                <span v-if="project.step === 5 && project.status === 'approved'" class="inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-medium print:bg-transparent print:border-none print:text-black">
                  เสร็จสิ้น
                </span>
                <span v-else class="inline-flex items-center px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 border border-amber-200 text-xs font-medium print:bg-transparent print:border-none print:text-black">
                  กำลังดำเนินการ
                </span>
              </td>
              <td class="px-6 py-4 text-center text-slate-500 dark:text-slate-400 print:text-black">{{ project.examDate ? formatDate(project.examDate) : '-' }}</td>
            </tr>
            <tr v-if="filteredProjects.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-slate-500">ไม่พบข้อมูลโครงงานในปีการศึกษานี้</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="hidden print:grid grid-cols-2 mt-24 text-black px-10 pb-10">
        <div class="text-left space-y-2">
          <p class="font-bold">ลงชื่อ ....................................................... </p>
          <p class="pl-10 text-sm">(เจ้าหน้าที่ผู้ตรวจสอบ)</p>
          <p class="pl-4">วันที่ ........./........./.............</p>
        </div>
        <div class="text-right space-y-2">
          <p class="font-bold">ลงชื่อ ....................................................... </p>
          <p class="pr-10 text-sm">(หัวหน้าภาควิชา)</p>
          <p class="pr-4">วันที่ ........./........./.............</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({ layout: 'admin' })

const selectedYear = ref('all')

// ดึงข้อมูลจริงจาก API
const { data: result, pending } = await useFetch('/api/admin/all-projects')
const projectsList = computed(() => result.value?.projects || [])

// ดึงรายการปีการศึกษาที่มีทั้งหมดมาทำเป็น filter
const availableYears = computed(() => {
  const years = projectsList.value.map(p => p.academicYear)
  return [...new Set(years)].sort((a, b) => b.localeCompare(a))
})

// ฟังก์ชันกรองข้อมูลตามปีการศึกษาที่เลือก
const filteredProjects = computed(() => {
  if (selectedYear.value === 'all') return projectsList.value
  return projectsList.value.filter(p => p.academicYear === selectedYear.value)
})

// คำนวณตัวเลขสถิติด้านบน (อิงจากข้อมูลที่ถูกกรองแล้ว)
const stats = computed(() => {
  const total = filteredProjects.value.length
  const passed = filteredProjects.value.filter(p => p.step === 5 && p.status === 'approved').length
  const doing = total - passed
  return { total, passed, doing }
})

// ฟังก์ชันสั่งพิมพ์
const printReport = () => {
  window.print()
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('th-TH', { 
    day: 'numeric', month: 'short', year: 'numeric'
  })
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media print {
  @page { margin: 1cm; size: A4 portrait; }
  body { background-color: white !important; font-family: 'Kanit', sans-serif !important; }
  
  /* ซ่อน Sidebar ของ Layout Admin ตอนพิมพ์ */
  aside { display: none !important; }
  
  /* ขยายพื้นที่หลักให้เต็ม 100% */
  main { width: 100% !important; max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
  
  /* บังคับสีตอนพิมพ์ */
  .print-text-black { color: black !important; }
}
</style>