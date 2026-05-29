<template>
  <div class="p-4 md:p-10">
    
    <div class="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 print:hidden">
      <div class="relative">
        <h2 class="font-bold text-slate-900 text-3xl md:text-4xl mb-2 tracking-tight">รายงานสรุปผล</h2>
        <div class="flex items-center gap-2 text-slate-500">
          <span class="w-8 h-px bg-indigo-200"></span>
          <p class="text-sm font-medium">สถิติภาพรวมโครงงานนักศึกษา แยกตามปีการศึกษา</p>
        </div>
      </div>
      
      <div class="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
        <div class="relative w-full sm:w-[220px] group">
          <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none text-indigo-500 group-focus-within:scale-110 transition-transform">
            <span class="material-symbols-rounded">calendar_month</span>
          </div>
          <select 
            v-model="selectedYear" 
            class="w-full bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-2xl pl-14 pr-12 py-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer shadow-sm"
          >
            <option value="all">ทุกปีการศึกษา</option>
            <option v-for="year in availableYears" :key="year" :value="year">ปีการศึกษา {{ year }}</option>
          </select>
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
            <span class="material-symbols-rounded font-bold">expand_more</span>
          </div>
        </div>

        <button 
          @click="printReport"
          class="group relative overflow-hidden bg-slate-900 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-slate-200 flex items-center justify-center gap-3 w-full sm:w-auto shrink-0 active:scale-95"
        >
          <span class="material-symbols-rounded group-hover:rotate-12 transition-transform">print</span> 
          <span>พิมพ์รายงาน</span>
          <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </div>

    <div class="hidden print:block text-center mb-12 border-b-2 border-black pb-8">
      <h1 class="text-3xl font-black text-black mb-2 tracking-tight uppercase">Project Summary Report</h1>
      <h3 class="text-xl font-bold text-black mb-4">รายงานสรุปโครงงานนักศึกษา</h3>
      <p class="text-lg text-black font-medium">
        ปีการศึกษา: {{ selectedYear === 'all' ? 'ทั้งหมด' : selectedYear }} | วันที่พิมพ์: {{ new Date().toLocaleDateString('th-TH') }}
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
      
      <div class="admin-card p-8 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white shadow-xl shadow-indigo-100 print:bg-white print:text-black print:border-2 print:border-black print:shadow-none relative overflow-hidden group">
        <span class="material-symbols-rounded absolute -right-4 -bottom-4 text-8xl text-white/10 group-hover:scale-125 transition-transform duration-700 print:hidden">folder_open</span>
        <div class="relative z-10 text-center">
          <div class="text-5xl font-black mb-2 tracking-tighter">{{ stats.total }}</div>
          <div class="text-[10px] font-black uppercase tracking-widest opacity-80">โครงงานทั้งหมด</div>
        </div>
      </div>

      <div class="admin-card p-8 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-100 print:bg-white print:text-black print:border-2 print:border-black print:shadow-none relative overflow-hidden group">
        <span class="material-symbols-rounded absolute -right-4 -bottom-4 text-8xl text-white/10 group-hover:scale-125 transition-transform duration-700 print:hidden">verified</span>
        <div class="relative z-10 text-center">
          <div class="text-5xl font-black mb-2 tracking-tighter">{{ stats.passed }}</div>
          <div class="text-[10px] font-black uppercase tracking-widest opacity-80">สอบผ่าน / จบแล้ว</div>
        </div>
      </div>

      <div class="admin-card p-8 bg-gradient-to-br from-amber-400 to-amber-500 text-white shadow-xl shadow-amber-100 print:bg-white print:text-black print:border-2 print:border-black print:shadow-none relative overflow-hidden group">
        <span class="material-symbols-rounded absolute -right-4 -bottom-4 text-8xl text-white/10 group-hover:scale-125 transition-transform duration-700 print:hidden">pending_actions</span>
        <div class="relative z-10 text-center">
          <div class="text-5xl font-black mb-2 tracking-tighter">{{ stats.doing }}</div>
          <div class="text-[10px] font-black uppercase tracking-widest opacity-80">กำลังดำเนินการ</div>
        </div>
      </div>

    </div>

    <div class="admin-card bg-white overflow-hidden print:shadow-none print:border-none print:p-0">
      <div class="p-8 border-b border-slate-50 flex items-center gap-4 bg-slate-50/30 print:hidden">
        <div class="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
          <span class="material-symbols-rounded">format_list_bulleted</span>
        </div>
        <h5 class="font-black text-slate-800 text-xl tracking-tight">รายชื่อโครงงาน</h5>
      </div>
      
      <div class="overflow-x-auto animate-[fadeIn_0.3s_ease-out]">
        <table class="w-full text-left min-w-[900px] print:min-w-full print:border print:border-black">
          <thead>
            <tr class="bg-slate-50/50 print:bg-gray-100">
              <th class="px-8 py-5 admin-table-header text-center w-[140px] print:border-r print:border-black">รหัสนักศึกษา</th>
              <th class="px-8 py-5 admin-table-header w-[220px] print:border-r print:border-black">ชื่อ - นามสกุล</th>
              <th class="px-8 py-5 admin-table-header print:border-r print:border-black">ชื่อโครงงาน</th>
              <th class="px-8 py-5 admin-table-header text-center w-[120px] print:border-r print:border-black">ปีการศึกษา</th>
              <th class="px-8 py-5 admin-table-header text-center w-[140px] print:border-r print:border-black">สถานะ</th>
              <th class="px-8 py-5 admin-table-header text-center w-[140px]">วันสอบจบ</th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-slate-50">
            <tr v-for="project in filteredProjects" :key="project.id" class="admin-table-row group/row print:border-b print:border-black">
              <td class="px-8 py-6 text-center font-bold text-slate-500 tracking-tight print:text-black print:border-r print:border-black">{{ project.student1.username }}</td>
              <td class="px-8 py-6 font-black text-slate-800 text-base print:text-black print:border-r print:border-black">{{ project.student1.fullname }}</td>
              <td class="px-8 py-6 text-slate-600 font-medium leading-relaxed print:text-black print:border-r print:border-black">{{ project.titleTh || '-' }}</td>
              <td class="px-8 py-6 text-center font-black text-slate-500 print:text-black print:border-r print:border-black">{{ project.academicYear }}</td>
              <td class="px-8 py-6 text-center print:border-r print:border-black">
                <span v-if="project.step === 5 && project.status === 'approved'" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black uppercase tracking-widest print:bg-transparent print:border-none print:text-black">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 print:hidden"></span> COMPLETED
                </span>
                <span v-else class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-500 border border-slate-200 text-[10px] font-black uppercase tracking-widest print:bg-transparent print:border-none print:text-black">
                  <span class="w-1.5 h-1.5 rounded-full bg-slate-400 print:hidden"></span> IN PROGRESS
                </span>
              </td>
              <td class="px-8 py-6 text-center text-slate-500 font-bold italic print:text-black">{{ project.examDate ? formatDate(project.examDate) : '-' }}</td>
            </tr>
            <tr v-if="filteredProjects.length === 0">
              <td colspan="6" class="px-8 py-24 text-center text-slate-400 font-bold italic">ไม่พบข้อมูลโครงงานในปีการศึกษานี้</td>
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