<template>
  <div class="p-4 md:p-8 font-['PROMPT',_sans-serif]">
    
    <div class="mb-8">
      <h2 class="font-bold text-slate-900 text-2xl md:text-3xl mb-1">ข้อมูลโครงงานทั้งหมด</h2>
      <p class="text-slate-500 text-sm">ค้นหา, ติดตามสถานะ และจัดการข้อมูลโครงงานในระบบ</p>
    </div>

    <div class="bg-white rounded-[20px] p-5 mb-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
      <div class="flex-grow relative">
        <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
          <i class="bi bi-search"></i>
        </div>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="ค้นหาชื่อโครงงาน, ชื่อนักศึกษา..." 
          class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-all"
        >
      </div>
      
      <div class="md:w-48 relative shrink-0">
        <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#1a1a40]">
          <i class="bi bi-calendar3"></i>
        </div>
        <select 
          v-model="selectedYear" 
          class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-bold rounded-xl pl-11 pr-10 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-all appearance-none cursor-pointer"
        >
          <option value="">ทุกปีการศึกษา</option>
          <option v-for="year in availableYears" :key="year" :value="year">ปี {{ year }}</option>
        </select>
        <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
          <i class="bi bi-chevron-down font-bold"></i>
        </div>
      </div>
    </div>

    <div class="space-y-5">
      
      <div v-for="project in filteredProjects" :key="project.id" 
           :class="isProjectComplete(project.current_step) ? 'border-emerald-500' : 'border-amber-400'"
           class="bg-white rounded-[24px] p-6 shadow-sm border-2 hover:-translate-y-1 hover:shadow-md transition-all duration-300 relative group animate-[fadeIn_0.3s_ease-in-out]">
        
        <div class="hidden md:block absolute top-6 right-6 text-[13px] text-slate-400 font-medium">
          แก้ไขล่าสุด: <span class="text-slate-500">{{ project.updated_at }}</span> น.
        </div>

        <div class="flex flex-col xl:flex-row gap-6 xl:items-end justify-between">
          
          <div class="flex-grow space-y-3 md:pr-10">
            <div class="flex items-start gap-4">
              <div class="w-32 shrink-0 font-bold text-[#1a1a40] text-sm pt-0.5">ชื่อโครงงาน</div>
              <div class="font-bold text-slate-800 text-lg leading-tight">{{ project.title }}</div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-32 shrink-0 font-bold text-[#1a1a40] text-sm">ชื่อผู้วิจัย</div>
              <div class="text-slate-600 text-[15px]">{{ project.student }}</div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-32 shrink-0 font-bold text-[#1a1a40] text-sm">อาจารย์ที่ปรึกษา</div>
              <div class="text-slate-600 text-[15px]">{{ project.advisor || '-' }}</div>
            </div>

            <div class="flex items-center gap-3 pt-3">
              <NuxtLink :to="`/admin/project/${project.id}`" class="inline-flex items-center gap-2 border-2 border-[#1a1a40] text-[#1a1a40] hover:bg-[#1a1a40] hover:text-white px-5 py-1.5 rounded-full text-sm font-bold transition-colors">
                <i class="bi bi-eye"></i> ดูข้อมูล
              </NuxtLink>
              <button @click="deleteProject(project.id, project.title)" class="w-9 h-9 flex items-center justify-center border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white rounded-full transition-colors" title="ลบโครงงาน">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>

          <div class="shrink-0 flex items-center xl:justify-end gap-2 pt-4 xl:pt-0 border-t xl:border-t-0 border-slate-100">
            <div class="text-xs font-bold text-slate-400 mr-2 hidden md:block">สถานะ:</div>
            
            <div v-for="step in 5" :key="step" 
                 :class="getBoxClass(step, project.current_step)"
                 class="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center font-bold text-lg border-2 transition-colors">
              <i v-if="step < project.current_step || project.current_step > 5" class="bi bi-check-lg text-xl"></i>
              <span v-else>{{ step }}</span>
            </div>
            
          </div>

        </div>
      </div>

      <div v-if="filteredProjects.length === 0" class="bg-white rounded-[24px] p-16 text-center shadow-sm border border-slate-100">
        <div class="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 text-4xl mx-auto mb-4">
          <i class="bi bi-inbox"></i>
        </div>
        <h3 class="text-xl font-bold text-slate-700 mb-2">ไม่พบข้อมูลโครงงาน</h3>
        <p class="text-slate-500 text-sm">ลองเปลี่ยนคำค้นหา หรือเลือกปีการศึกษาอื่น</p>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({ layout: 'admin' })

// 1. นำชุดข้อมูลปีการศึกษามาประกาศไว้ก่อน
const availableYears = ['2568', '2567', '2566', '2565']

// 2. State สำหรับ Filter
const searchQuery = ref('')
// 🌟 เปลี่ยนค่า Default เป็นปีล่าสุดอัตโนมัติ (ดึงจาก Index 0 ของ Array) 🌟
const selectedYear = ref(availableYears[0]) 

// Fetch real data from the database
const { data: apiData, pending, refresh } = await useFetch('/api/admin/all-projects')

const projects = computed(() => {
  if (!apiData.value?.projects) return []
  return apiData.value.projects.map(p => {
    // Combine student names
    const students = []
    if (p.student1?.fullname) students.push(p.student1.fullname)
    if (p.student2?.fullname) students.push(p.student2.fullname)
    
    // Format date
    const d = new Date(p.updatedAt)
    const formattedDate = `${d.getDate()} ${['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'][d.getMonth()]} ${d.getFullYear() + 543} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
    
    return {
      id: p.id,
      title: p.titleTh || 'ยังไม่มีชื่อโครงงาน',
      student: students.join(' และ '),
      advisor: p.advisor?.fullname || '-',
      year: p.academicYear || '',
      current_step: p.step || 1,
      updated_at: formattedDate
    }
  })
})

// ฟังก์ชันกรองข้อมูล (Filter Logic)
const filteredProjects = computed(() => {
  return projects.value.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                        p.student.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchYear = selectedYear.value === '' || p.year === selectedYear.value
    return matchSearch && matchYear
  })
})

// ฟังก์ชันหาคลาสสีของกล่อง 5 ช่อง (เหมือน Logic PHP)
const getBoxClass = (stepCheck, currentStep) => {
  if (currentStep > 5 || stepCheck < currentStep) {
    // ผ่านแล้ว (สีเขียว)
    return 'bg-emerald-50 border-emerald-500 text-emerald-600 shadow-sm'
  }
  if (stepCheck === currentStep) {
    // กำลังทำ (สีเหลือง)
    return 'bg-amber-50 border-amber-400 text-amber-600 shadow-sm'
  }
  // ยังไม่ถึง (สีเทา)
  return 'bg-slate-50 border-slate-200 text-slate-400'
}

// ฟังก์ชันเช็คว่าโปรเจกต์จบหรือยัง (ขอบการ์ดสีเขียว/เหลือง)
const isProjectComplete = (currentStep) => {
  return currentStep > 5
}

// ฟังก์ชันลบข้อมูล
const deleteProject = async (id, title) => {
  if (confirm(`ยืนยันการลบโครงงาน:\n"${title}"\n\nข้อมูลทั้งหมดที่เกี่ยวข้องจะถูกลบถาวร!`)) {
    // ในอนาคตสามารถใส่ API สำหรับลบโครงงานตรงนี้ได้ เช่น:
    // await $fetch(`/api/admin/delete-project`, { method: 'DELETE', body: { id } })
    // refresh()
    
    alert('ระบบการลบข้อมูลจริงยังไม่ได้เปิดใช้งาน')
  }
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>