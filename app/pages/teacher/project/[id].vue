<template>
  <div class="min-h-screen bg-slate-50 py-8 px-4 md:px-8 ">
    <div class="max-w-[1000px] mx-auto">
      
      <!-- Header -->
      <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <NuxtLink to="/teacher" class="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold text-sm transition-colors mb-4 group">
            <span class="material-symbols-rounded group-hover:-translate-x-1 transition-transform">arrow_back</span> ย้อนกลับไปรายการโครงงาน
          </NuxtLink>
          <h2 class="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">รายละเอียดโครงงาน</h2>
        </div>
        
        <div class="flex items-center gap-3">
          <span :class="getStatusBadgeClass(project?.status)" class="px-4 py-2 rounded-2xl text-sm font-bold shadow-sm border">
            {{ getStatusText(project?.status) }}
          </span>
          <span class="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-2xl text-sm font-bold border border-indigo-100">
            ขั้นตอนที่ {{ project?.step }}
          </span>
        </div>
      </div>

      <div v-if="pending" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else-if="!project" class="flex flex-col items-center justify-center py-32 animate-[fadeIn_0.5s_ease-out]">
        <div class="w-24 h-24 bg-rose-50 text-rose-500 rounded-[32px] flex items-center justify-center mb-6 border-2 border-rose-100/50 shadow-xl shadow-rose-100/20">
          <span class="material-symbols-rounded text-6xl">search_off</span>
        </div>
        <h3 class="text-2xl font-black text-slate-800 mb-2">ไม่พบข้อมูลโครงงาน</h3>
        <p class="text-slate-400 font-medium mb-8 text-center max-w-xs">
          ขออภัย ไม่พบข้อมูลโครงงานที่คุณต้องการ หรือคุณไม่มีสิทธิ์เข้าถึงโครงงานนี้
        </p>
        <NuxtLink to="/teacher" class="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all hover:bg-indigo-600 active:scale-95 shadow-lg">
          กลับสู่รายการโครงงาน
        </NuxtLink>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- ข้อมูลโครงงาน -->
        <div class="lg:col-span-2 space-y-6">
          <div class="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <div class="flex items-center gap-3 text-indigo-600 font-bold mb-4">
              <span class="material-symbols-rounded text-xl">book</span> ข้อมูลเบื้องต้น
            </div>
            <h1 class="text-2xl font-bold text-slate-800 mb-6 leading-relaxed">{{ project.titleTh }}</h1>
            
            <div class="grid grid-cols-2 gap-6 text-sm">
              <div>
                <div class="text-slate-400 mb-1">ปีการศึกษา</div>
                <div class="font-bold text-slate-700">{{ project.academicYear }}</div>
              </div>
              <div>
                <div class="text-slate-400 mb-1">ภาคเรียน</div>
                <div class="font-bold text-slate-700">{{ project.semester }}</div>
              </div>
            </div>

            <!-- CP1 Exam Request Section (Show in Step 1 or if exists) -->
            <div v-if="cp1Exam" :class="cp1Exam.status === 'pass' ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'" class="mt-6 p-6 rounded-[24px] border animate-[fadeIn_0.3s_ease-out]">
              <div class="flex items-center gap-4 mb-4">
                <div :class="cp1Exam.status === 'pass' ? 'bg-white text-emerald-600' : 'bg-white text-amber-600'" class="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm border border-slate-50">
                  <span class="material-symbols-rounded">{{ cp1Exam.status === 'pass' ? 'check_circle' : 'calendar_month' }}</span>
                </div>
                <div>
                  <div :class="cp1Exam.status === 'pass' ? 'text-emerald-400' : 'text-amber-400'" class="text-[11px] font-bold uppercase tracking-widest">
                    {{ cp1Exam.status === 'pass' ? 'ผ่านการสอบหัวข้อแล้ว' : 'ข้อมูลนัดหมายการสอบหัวข้อ (CP1)' }}
                  </div>
                  <div class="font-bold" :class="cp1Exam.status === 'pass' ? 'text-emerald-900' : 'text-amber-900'">วันที่: {{ formatDateNoTime(cp1Exam.examDate) }}</div>
                  <div class="text-sm font-medium" :class="cp1Exam.status === 'pass' ? 'text-emerald-800' : 'text-amber-800'">เวลา: {{ cp1Exam.examTime }} น. | สถานที่: {{ cp1Exam.examLocation }}</div>
                </div>
              </div>
            </div>

            <!-- CP2/CP3 Exam Request Section (Show in Step 4 or if exists) -->
            <div v-if="finalExam" class="mt-4 p-6 rounded-[24px] bg-blue-50 border border-blue-100 animate-[fadeIn_0.3s_ease-out]">
              <div class="flex items-center gap-4 mb-4">
                <div class="w-12 h-12 rounded-2xl bg-white text-blue-600 flex items-center justify-center text-xl shadow-sm border border-blue-50">
                  <span class="material-symbols-rounded">event_available</span>
                </div>
                <div>
                  <div class="text-[11px] font-bold text-blue-400 uppercase tracking-widest">ข้อมูลนัดหมายการสอบจบ (CP2/CP3)</div>
                  <div class="text-blue-900 font-bold">วันที่: {{ formatDateNoTime(finalExam.examDate) }}</div>
                  <div class="text-blue-800 text-sm">เวลา: {{ finalExam.examTime }} น. | สถานที่: {{ finalExam.examLocation }}</div>
                </div>
              </div>
              <div class="flex gap-2">
                <NuxtLink :to="`/student/cp2?projectId=${project.id}`" target="_blank" class="flex-1 bg-white text-blue-600 border border-blue-200 py-2 rounded-xl text-xs font-bold text-center hover:bg-blue-50 transition-all">ดูใบ CP2</NuxtLink>
                <NuxtLink :to="`/student/cp3?projectId=${project.id}`" target="_blank" class="flex-1 bg-white text-blue-600 border border-blue-200 py-2 rounded-xl text-xs font-bold text-center hover:bg-blue-50 transition-all">ดูใบ CP3</NuxtLink>
              </div>
            </div>

            <!-- Thesis Link Section -->
            <div v-if="project.thesisUrl" class="mt-6 p-4 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-between animate-[fadeIn_0.3s_ease-out]">
              <div class="flex items-center gap-3 overflow-hidden">
                <span class="material-symbols-rounded text-2xl text-purple-600">picture_as_pdf</span>
                <div class="overflow-hidden">
                  <div class="text-[11px] font-bold text-purple-400 uppercase tracking-wider">{{ project.step === 5 ? 'เล่มวิทยานิพนธ์ (ฉบับสมบูรณ์)' : 'เล่มวิทยานิพนธ์ (ฉบับร่าง)' }}</div>
                  <a :href="project.thesisUrl" target="_blank" class="text-sm text-purple-700 font-bold hover:underline block truncate">{{ project.thesisUrl }}</a>
                </div>
              </div>
              <a :href="project.thesisUrl" target="_blank" class="bg-white text-purple-600 p-2 rounded-xl border border-purple-200 hover:bg-purple-600 hover:text-white transition-all shadow-sm">
                <span class="material-symbols-rounded">open_in_new</span>
              </a>
            </div>

            <!-- Final Submission Materials (Step 5) -->
            <div v-if="project.step === 5" class="mt-4 space-y-3 animate-[fadeIn_0.4s_ease-out]">
              <div v-if="project.programUrl" class="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                <div class="flex items-center gap-3 overflow-hidden">
                  <span class="material-symbols-rounded text-2xl text-emerald-600">code</span>
                  <div class="overflow-hidden">
                    <div class="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">ซอร์สโค้ดโปรแกรม</div>
                    <a :href="project.programUrl" target="_blank" class="text-sm text-emerald-700 font-bold hover:underline block truncate">{{ project.programUrl }}</a>
                  </div>
                </div>
              </div>

              <div v-if="project.manualUrl" class="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-between">
                <div class="flex items-center gap-3 overflow-hidden">
                  <span class="material-symbols-rounded text-2xl text-amber-600">book</span>
                  <div class="overflow-hidden">
                    <div class="text-[11px] font-bold text-amber-400 uppercase tracking-wider">คู่มือการใช้งาน</div>
                    <a :href="project.manualUrl" target="_blank" class="text-sm text-amber-700 font-bold hover:underline block truncate">{{ project.manualUrl }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <div class="flex items-center gap-3 text-indigo-600 font-bold mb-6">
              <span class="material-symbols-rounded text-xl">group</span> สมาชิกกลุ่ม
            </div>
            
            <div class="space-y-6">
              <!-- Student 1 -->
              <div class="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div class="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
                  {{ project.student1.fullname.substring(0, 1) }}
                </div>
                <div>
                  <div class="font-bold text-slate-800">{{ project.student1.fullname }}</div>
                  <div class="text-xs text-slate-500 font-medium mb-2">{{ project.student1.username }}</div>
                  <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                    <span class="flex items-center gap-1"><span class="material-symbols-rounded">phone</span> {{ project.student1.tel }}</span>
                    <span class="flex items-center gap-1"><span class="material-symbols-rounded">mail</span> {{ project.student1.email }}</span>
                  </div>
                </div>
              </div>

              <!-- Student 2 (Optional) -->
              <div v-if="project.student2" class="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div class="w-12 h-12 rounded-full bg-indigo-400 text-white flex items-center justify-center font-bold shadow-md">
                  {{ project.student2.fullname.substring(0, 1) }}
                </div>
                <div>
                  <div class="font-bold text-slate-800">{{ project.student2.fullname }}</div>
                  <div class="text-xs text-slate-500 font-medium mb-2">{{ project.student2.username }}</div>
                  <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
                    <span class="flex items-center gap-1"><span class="material-symbols-rounded">phone</span> {{ project.student2.tel }}</span>
                    <span class="flex items-center gap-1"><span class="material-symbols-rounded">mail</span> {{ project.student2.email }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
            <div class="flex items-center gap-3 text-indigo-600 font-bold mb-6">
              <span class="material-symbols-rounded text-xl">history</span> บันทึกความก้าวหน้า
            </div>

            <div v-if="project.reports.length === 0" class="text-center py-10 text-slate-400">
              <span class="material-symbols-rounded text-4xl mb-2 block opacity-30">inbox</span>
              ยังไม่มีการส่งรายงานความก้าวหน้า
            </div>

            <div v-else class="space-y-6">
              <div v-for="report in project.reports" :key="report.id" class="p-6 rounded-[24px] bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-all">
                <div class="flex justify-between items-start mb-4">
                  <div>
                    <div class="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{{ formatDate(report.createdAt) }}</div>
                    <h4 class="font-bold text-slate-800">{{ report.title }}</h4>
                  </div>
                  <span :class="getReportStatusClass(report.status)" class="px-3 py-1 rounded-full text-[10px] font-bold border uppercase">
                    {{ getReportStatusText(report.status) }}
                  </span>
                </div>
                
                <p class="text-sm text-slate-600 leading-relaxed mb-6 whitespace-pre-line">{{ report.description }}</p>

                <!-- Feedback Section for this report -->
                <div class="mt-4 pt-4 border-t border-slate-200/60">
                  <div class="flex items-center justify-between">
                    <div v-if="report.feedback" class="text-xs text-slate-500 italic">
                      <span class="material-symbols-rounded text-indigo-400 mr-1">chat</span> {{ report.feedback }}
                    </div>
                    <div v-else class="text-xs text-slate-300 italic">ยังไม่มีข้อเสนอแนะรายสัปดาห์</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- แผงข้อมูลสถานะ (View Only สำหรับอาจารย์) -->
        <div class="space-y-6">
          <div class="bg-white rounded-[32px] p-8 shadow-lg border border-slate-100 sticky top-8">
            <div class="flex items-center gap-3 text-indigo-600 font-bold mb-6">
              <span class="material-symbols-rounded text-xl">info</span> สถานะการดำเนินงาน
            </div>

            <div class="space-y-4">
              <div class="p-4 rounded-2xl bg-indigo-50 border border-indigo-100 text-center">
                <div class="text-indigo-600 font-bold text-sm mb-1">ขั้นตอนปัจจุบัน</div>
                <div class="text-indigo-800 font-black text-xl">ขั้นตอนที่ {{ project.step }}</div>
              </div>

              <div class="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">ความคิดเห็นจากระบบ/Admin</div>
                <div class="text-sm text-slate-600 italic leading-relaxed">
                  {{ project.feedback || 'ยังไม่มีข้อความตอบกลับ' }}
                </div>
              </div>

              <div class="mt-6 pt-6 border-t border-slate-100">
                <p class="text-[13px] text-slate-400 text-center leading-relaxed">
                  * อาจารย์ที่ปรึกษาสามารถเข้าดูข้อมูลได้อย่างเดียว <br>
                  การอนุมัติจะดำเนินการโดยผู้ดูแลระบบ (Admin)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: 'teacher' })

const route = useRoute()
const projectId = route.params.id

const { data: result, pending } = await useFetch('/api/teacher/project-detail', {
  query: { id: projectId }
})

const project = computed(() => result.value?.project)

// Find active exams
const cp1Exam = computed(() => project.value?.exams?.find(e => e.type === 'CP1'))
const finalExam = computed(() => project.value?.exams?.find(e => e.type === 'CP2'))

// UI Helpers
const getStatusText = (status) => {
  const maps = {
    'pending': 'รอการตรวจสอบ',
    'approved': 'ผ่านการอนุมัติ',
    'revision': 'ให้แก้ไขข้อมูล',
    'rejected': 'ไม่ผ่าน/ปฏิเสธ'
  }
  return maps[status] || status
}

const getStatusBadgeClass = (status) => {
  if (status === 'approved') return 'bg-emerald-50 text-emerald-600 border-emerald-100'
  if (status === 'revision') return 'bg-amber-50 text-amber-600 border-amber-100'
  if (status === 'rejected') return 'bg-rose-50 text-rose-500 border-rose-100'
  return 'bg-blue-50 text-blue-600 border-blue-100'
}

const formatDate = (date) => new Date(date).toLocaleDateString('th-TH', { 
  day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
})

const formatDateNoTime = (date) => new Date(date).toLocaleDateString('th-TH', { 
  day: 'numeric', month: 'long', year: 'numeric' 
})

const getReportStatusText = (status) => {
  const maps = { 'pending': 'รอการตรวจสอบ', 'seen': 'อ่านแล้ว', 'approved': 'ตรวจแล้ว' }
  return maps[status] || status
}

const getReportStatusClass = (status) => {
  if (status === 'approved') return 'bg-emerald-50 text-emerald-600 border-emerald-100'
  if (status === 'seen') return 'bg-blue-50 text-blue-600 border-blue-100'
  return 'bg-amber-50 text-amber-600 border-amber-100'
}
</script>

