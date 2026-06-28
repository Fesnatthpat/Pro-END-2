<template>
  <div class="p-4 md:p-8 font-['PROMPT',_sans-serif] bg-gray-50 min-h-screen">
    
    <div class="mb-6 max-w-[1400px] mx-auto">
      <NuxtLink to="/admin/projects" class="inline-flex items-center gap-2 text-slate-500 hover:text-[#1a1a40] font-bold text-sm transition-colors group bg-white px-5 py-2.5 rounded-full shadow-sm w-fit border border-gray-100">
        <i class="bi bi-arrow-left group-hover:-translate-x-1 transition-transform"></i> ย้อนกลับไปหน้ารายชื่อโครงงาน
      </NuxtLink>
    </div>

    <div class="mb-8 p-8 bg-white rounded-[32px] shadow-sm border border-slate-100 max-w-[1400px] mx-auto animate-[fadeIn_0.3s_ease-in-out]">
      <div class="flex items-center gap-2 text-rose-500 font-bold mb-4">
        <i class="bi bi-pin-angle-fill"></i> ข้อมูลโครงงาน
      </div>
      <h1 class="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-3">{{ project.title_th }}</h1>
      <h2 class="text-lg md:text-xl text-slate-500 font-medium mb-10">{{ project.title_en }}</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 pt-8 border-t border-slate-100">
        <div>
          <div class="text-sm font-medium text-slate-400 mb-2">ผู้วิจัย</div>
          <div class="space-y-1">
            <div v-for="student in project.students" :key="student.code" class="font-bold text-slate-800 text-[16px] flex items-center gap-2">
              <i class="bi bi-person-circle text-indigo-400"></i> {{ student.name }}
            </div>
          </div>
        </div>
        <div>
          <div class="text-sm font-medium text-slate-400 mb-2">รหัสนักศึกษา</div>
          <div class="space-y-1">
            <div v-for="student in project.students" :key="student.code" class="font-bold text-slate-800 text-[16px]">
              {{ student.code }}
            </div>
          </div>
        </div>
        <div>
          <div class="text-sm font-medium text-slate-400 mb-2">อาจารย์ที่ปรึกษา</div>
          <div class="font-bold text-slate-800 text-[16px]">{{ project.advisor || '-' }}</div>
        </div>
        <div>
          <div class="text-sm font-medium text-slate-400 mb-2">ปีการศึกษา</div>
          <div class="font-bold text-slate-800 text-[16px]">{{ project.academic_year }}</div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-[1400px] mx-auto">
      
      <div class="lg:col-span-2 space-y-8">
        <div class="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-slate-100 relative overflow-hidden">
          
          <div :class="isProjectComplete(project.current_step) ? 'bg-emerald-500' : 'bg-amber-400'" class="absolute top-0 left-0 right-0 h-1.5"></div>

          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-8 border-b border-slate-100">
            <h3 class="font-bold text-2xl text-slate-900 flex items-center gap-3">
              <i class="bi bi-list-ol text-rose-500"></i> สถานะการดำเนินงาน (5 ขั้นตอน)
            </h3>
            
            <div class="shrink-0 flex items-center gap-2">
              <div v-for="step in 5" :key="step" 
                   :class="getBoxClass(step, project.current_step)"
                   class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border-2 transition-colors">
                <i v-if="step < project.current_step || project.current_step > 5" class="bi bi-check-lg text-xl"></i>
                <span v-else>{{ step }}</span>
              </div>
            </div>
          </div>

          <div class="relative pl-4 space-y-12 ml-2">
            <div class="absolute inset-y-0 left-4 border-l-2 border-slate-100 z-0"></div>

            <div class="relative z-10">
              <div :class="getDotColorClass(1)" class="absolute -left-[30px] top-1 w-6 h-6 rounded-full border-[5px] border-white shadow-md transition-colors"></div>
              <div class="pl-10">
                <h4 class="font-bold text-xl text-slate-800 mb-2">ยื่นสอบหัวข้อ (CP1)</h4>
                <div class="text-[15px] font-medium mb-4">
                  <span v-if="project.cp1_status === 'APPROVED'" class="text-emerald-600"><i class="bi bi-check-circle-fill"></i> อนุมัติแล้ว</span>
                  <span v-else-if="project.cp1_status === 'WAITING'" class="text-blue-600"><i class="bi bi-hourglass-split"></i> รอตรวจสอบ</span>
                  <span v-else class="text-slate-400"><i class="bi bi-dash-circle"></i> ยังไม่ดำเนินการ</span>
                </div>
                <button v-if="project.cp1_file" class="inline-flex items-center gap-2 px-5 py-2 rounded-full border-2 border-blue-100 text-blue-600 hover:bg-blue-50 hover:border-blue-300 text-sm font-bold transition-all bg-white shadow-sm">
                  <i class="bi bi-file-earmark-pdf-fill text-rose-500"></i> เปิดดูไฟล์ CP1
                </button>
              </div>
            </div>

            <div class="relative z-10">
              <div :class="getDotColorClass(2)" class="absolute -left-[30px] top-1 w-6 h-6 rounded-full border-[5px] border-white shadow-md transition-colors"></div>
              <div class="pl-10">
                
                <div class="flex items-center gap-4 mb-5">
                  <h4 class="font-bold text-xl text-slate-800">พัฒนาโปรแกรม (Program)</h4>
                  <span v-if="project.current_step === 2" class="px-4 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">กำลังดำเนินการ</span>
                </div>

                <div v-if="project.current_step >= 2">
                  <div class="bg-slate-50 p-6 rounded-[20px] border border-slate-100 mb-8">
                    <div class="flex justify-between items-center mb-3">
                      <span class="font-bold text-slate-700 text-base">ความคืบหน้าของระบบ</span>
                      <span class="font-bold text-blue-600 text-base">{{ project.program_progress }}%</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div class="bg-blue-500 h-3 rounded-full transition-all duration-500" :style="`width: ${project.program_progress}%`"></div>
                    </div>
                  </div>

                  <div class="mb-4">
                    <h5 class="font-bold text-slate-800 text-[16px] mb-6">ประวัติการรายงานล่าสุด</h5>
                    <div class="relative pl-5 space-y-8">
                      <div class="absolute top-2 bottom-0 left-[9px] w-[2px] bg-blue-100 z-0"></div>

                      <div v-for="(history, index) in project.program_history" :key="index" class="relative z-10">
                        <div class="absolute -left-[27px] top-1 w-4 h-4 bg-white border-[4px] border-blue-500 rounded-full"></div>
                        
                        <div class="text-sm font-medium text-slate-500 mb-2">{{ history.date }}</div>
                        <div class="bg-white border border-slate-200 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-shadow">
                          <div class="inline-block px-4 py-1.5 bg-blue-600 text-white text-[12px] font-bold rounded-full mb-4 shadow-sm">
                            System {{ history.percent }}%
                          </div>
                          <p class="text-[15px] text-slate-700 mb-5 leading-relaxed font-medium">{{ history.detail }}</p>
                          <button v-if="history.file" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 text-sm font-bold transition-all">
                            <i class="bi bi-file-earmark-zip-fill text-blue-500"></i> เปิดดูไฟล์แนบ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-[15px] font-medium text-slate-400"><i class="bi bi-dash-circle"></i> ยังไม่ถึงขั้นตอนนี้</div>
              </div>
            </div>

            <div class="relative z-10">
              <div :class="getDotColorClass(3)" class="absolute -left-[30px] top-1 w-6 h-6 rounded-full border-[5px] border-white shadow-md transition-colors"></div>
              <div class="pl-10">
                
                <div class="flex items-center gap-4 mb-5">
                  <h4 class="font-bold text-xl text-slate-800">จัดทำเล่มบัณฑิตนิพนธ์ (Document)</h4>
                  <span v-if="project.current_step === 3" class="px-4 py-1 bg-amber-50 text-amber-600 text-xs font-bold rounded-full border border-amber-100">กำลังดำเนินการ</span>
                </div>

                <div v-if="project.current_step >= 3">
                  <div class="bg-slate-50 p-6 rounded-[20px] border border-slate-100 mb-8">
                    <div class="flex justify-between items-center mb-3">
                      <span class="font-bold text-slate-700 text-base">ความคืบหน้าของรูปเล่ม</span>
                      <span class="font-bold text-amber-500 text-base">{{ project.thesis_progress }}%</span>
                    </div>
                    <div class="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                      <div class="bg-amber-400 h-3 rounded-full transition-all duration-500" :style="`width: ${project.thesis_progress}%`"></div>
                    </div>
                  </div>

                  <div class="mb-4">
                    <h5 class="font-bold text-slate-800 text-[16px] mb-6">ประวัติการส่งเล่มให้ที่ปรึกษา</h5>
                    <div class="relative pl-5 space-y-8">
                      <div class="absolute top-2 bottom-0 left-[9px] w-[2px] bg-amber-100 z-0"></div>

                      <div v-for="(history, index) in project.thesis_history" :key="index" class="relative z-10">
                        <div class="absolute -left-[27px] top-1 w-4 h-4 bg-white border-[4px] border-amber-400 rounded-full"></div>
                        
                        <div class="text-sm font-medium text-slate-500 mb-2">{{ history.date }}</div>
                        <div class="bg-white border border-slate-200 p-6 rounded-[24px] shadow-sm hover:shadow-md transition-shadow">
                          <div class="inline-block px-4 py-1.5 bg-amber-400 text-amber-900 text-[12px] font-bold rounded-full mb-4 shadow-sm">
                            Document {{ history.percent }}%
                          </div>
                          <p class="text-[15px] text-slate-700 mb-5 leading-relaxed font-medium">{{ history.detail }}</p>
                          <button v-if="history.file" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800 text-sm font-bold transition-all">
                            <i class="bi bi-file-earmark-pdf-fill text-rose-500"></i> เปิดดูไฟล์แนบ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-[15px] font-medium text-slate-400"><i class="bi bi-dash-circle"></i> ยังไม่ถึงขั้นตอนนี้</div>
              </div>
            </div>

            <div class="relative z-10">
              <div :class="getDotColorClass(4)" class="absolute -left-[30px] top-1 w-6 h-6 rounded-full border-[5px] border-white shadow-md transition-colors"></div>
              <div class="pl-10">
                <h4 class="font-bold text-xl text-slate-800 mb-2">ยื่นสอบจบ (CP2)</h4>
                <div class="text-[15px] font-medium mb-4">
                  <span v-if="project.cp2_status === 'PASSED'" class="text-emerald-600"><i class="bi bi-check-circle-fill"></i> ผ่านแล้ว</span>
                  <span v-else-if="project.cp2_status === 'SCHEDULED'" class="text-blue-600"><i class="bi bi-calendar-check-fill"></i> นัดสอบแล้ว</span>
                  <span v-else-if="project.cp2_status === 'WAITING'" class="text-amber-500"><i class="bi bi-hourglass-split"></i> รอตรวจสอบ</span>
                  <span v-else class="text-slate-400"><i class="bi bi-dash-circle"></i> ยังไม่ดำเนินการ</span>
                </div>
              </div>
            </div>

            <div class="relative z-10">
              <div :class="getDotColorClass(5)" class="absolute -left-[30px] top-1 w-6 h-6 rounded-full border-[5px] border-white shadow-md transition-colors"></div>
              <div class="pl-10">
                <h4 class="font-bold text-xl text-slate-800 mb-2">ส่งเล่มฉบับสมบูรณ์</h4>
                <div class="text-[15px] font-medium">
                  <span v-if="project.current_step > 5" class="text-emerald-600"><i class="bi bi-check-circle-fill"></i> ส่งเรียบร้อยแล้ว</span>
                  <span v-else-if="project.current_step === 5" class="text-blue-600"><i class="bi bi-hourglass-split"></i> รอการดำเนินการ</span>
                  <span v-else class="text-slate-400"><i class="bi bi-dash-circle"></i> ยังไม่ดำเนินการ</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div class="lg:col-span-1 space-y-6 sticky top-[30px] self-start animate-[fadeInUp_0.3s_ease-in-out_0.1s_both]">
        
        <div v-for="(student, index) in project.students" :key="student.code" 
             class="bg-gradient-to-b from-[#1a1a40] to-[#2c2c54] rounded-[32px] p-8 text-center text-white shadow-xl shadow-indigo-900/20 border-t-8 border-white/10 relative">
          
          <div v-if="project.students.length > 1" class="absolute top-4 left-6 text-indigo-300 text-[11px] font-bold tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full border border-white/5">
            ผู้วิจัยคนที่ {{ index + 1 }}
          </div>
          
          <div class="w-[100px] h-[100px] bg-white text-[#1a1a40] rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-inner border-4 border-white/20 mt-4">
            {{ student.name.substring(0, 1) }}
          </div>
          
          <h3 class="font-bold text-2xl mb-1 truncate px-2">{{ student.name }}</h3>
          <p class="text-indigo-200 text-sm font-medium mb-8">รหัสนักศึกษา {{ student.code }}</p>

          <div class="space-y-3">
            <div class="bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-4 flex items-center gap-4 text-left border border-white/5">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-indigo-300">
                <i class="bi bi-telephone-fill text-lg"></i>
              </div>
              <div class="overflow-hidden">
                <div class="text-[11px] text-indigo-300 font-bold uppercase tracking-wider mb-0.5">เบอร์โทรศัพท์</div>
                <div class="font-bold text-[15px] truncate">{{ student.tel || '-' }}</div>
              </div>
            </div>

            <div class="bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-4 flex items-center gap-4 text-left border border-white/5">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-emerald-300">
                <i class="bi bi-line text-lg"></i>
              </div>
              <div class="overflow-hidden">
                <div class="text-[11px] text-indigo-300 font-bold uppercase tracking-wider mb-0.5">LINE ID</div>
                <div class="font-bold text-[15px] truncate">{{ student.line || '-' }}</div>
              </div>
            </div>

            <div class="bg-white/5 hover:bg-white/10 transition-colors rounded-2xl p-4 flex items-center gap-4 text-left border border-white/5">
              <div class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-rose-300">
                <i class="bi bi-envelope-fill text-lg"></i>
              </div>
              <div class="overflow-hidden">
                <div class="text-[11px] text-indigo-300 font-bold uppercase tracking-wider mb-0.5">อีเมล (Email)</div>
                <div class="font-bold text-[14px] truncate" :title="student.email">{{ student.email || '-' }}</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const projectId = route.params.id

// Fetch real data from API
const { data: apiData, pending, error } = await useFetch(`/api/admin/project-detail?id=${projectId}`)

const project = computed(() => {
  const p = apiData.value?.project
  if (!p) return {}

  // Map students array
  const studentsList = []
  if (p.student1) {
    studentsList.push({
      name: p.student1.fullname || 'ไม่มีชื่อ',
      code: p.student1.username || '-',
      tel: p.student1.tel || '-',
      line: p.student1.lineId || '-',
      email: p.student1.email || '-'
    })
  }
  if (p.student2) {
    studentsList.push({
      name: p.student2.fullname || 'ไม่มีชื่อ',
      code: p.student2.username || '-',
      tel: p.student2.tel || '-',
      line: p.student2.lineId || '-',
      email: p.student2.email || '-'
    })
  }

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const d = new Date(dateString)
    return `${d.getDate().toString().padStart(2, '0')}/${(d.getMonth()+1).toString().padStart(2, '0')}/${d.getFullYear()} ${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')} น.`
  }

  // Filter reports
  const programHistory = (p.reports || []).filter(r => r.type === 'PROGRAM').map(r => ({
    date: formatDate(r.createdAt),
    percent: r.progress,
    detail: r.detail,
    file: r.fileUrl
  }))
  
  const thesisHistory = (p.reports || []).filter(r => r.type === 'THESIS').map(r => ({
    date: formatDate(r.createdAt),
    percent: r.progress,
    detail: r.detail,
    file: r.fileUrl
  }))

  return {
    id: p.id,
    title_th: p.titleTh || 'ยังไม่มีชื่อโครงงาน (ภาษาไทย)',
    title_en: p.titleEn || 'ยังไม่มีชื่อโครงงาน (ภาษาอังกฤษ)',
    academic_year: p.academicYear || '-',
    advisor: p.advisor?.fullname || 'ยังไม่กำหนด',
    current_step: p.step || 1,
    cp1_status: p.cp1Status || 'WAITING',
    cp2_status: p.cp2Status || 'WAITING',
    cp1_file: p.cp1File || null,
    cp2_file: p.cp2File || null,
    program_progress: programHistory.length > 0 ? programHistory[0].percent : 0,
    thesis_progress: thesisHistory.length > 0 ? thesisHistory[0].percent : 0,
    program_history: programHistory,
    thesis_history: thesisHistory,
    students: studentsList
  }
})

const getBoxClass = (stepCheck, currentStep) => {
  if (currentStep > 5 || stepCheck < currentStep) {
    return 'bg-emerald-50 border-emerald-500 text-emerald-600 shadow-sm'
  }
  if (stepCheck === currentStep) {
    return 'bg-amber-50 border-amber-400 text-amber-600 shadow-sm'
  }
  return 'bg-slate-50 border-slate-200 text-slate-400'
}

const getDotColorClass = (step) => {
  const current = project.value.current_step
  if (step < current || current > 5) return 'bg-emerald-500 shadow-emerald-500/30'
  if (step === current) return 'bg-amber-400 shadow-amber-400/30'
  return 'bg-slate-200'
}

const isProjectComplete = (currentStep) => {
  return currentStep > 5
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>