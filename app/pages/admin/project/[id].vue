<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({ layout: 'admin' })

const alerts = useAlerts()
const route = useRoute()
const projectId = route.params.id

// ดึงข้อมูลจริงจาก API
const { data: result, pending, refresh } = await useFetch('/api/admin/project-detail', {
  query: { id: projectId }
})

const project = computed(() => result.value?.project)
const progressReports = computed(() => project.value?.reports?.filter(r => r.reportType === 'progress') || [])
const thesisReports = computed(() => project.value?.reports?.filter(r => r.reportType === 'thesis') || [])

// Find active exams
const cp1Exam = computed(() => project.value?.exams?.find(e => e.type === 'CP1'))
const finalExam = computed(() => project.value?.exams?.find(e => e.type === 'CP2'))

// --- ส่วนของการจัดการ (Admin Management) ---
const updating = ref(false)
const feedbackText = ref('')

watchEffect(() => {
  if (project.value) {
    feedbackText.value = project.value.feedback || ''
  }
})

const updateProject = async (step, status) => {
  let nextStep = step
  let finalStatus = status
  let advisorId = undefined

  // --- ส่วนของการตรวจสอบความพร้อม (Validation) ---
  if (status === 'approved') {
    if (step === 1) {
      if (!cp1Exam.value) {
        return alerts.error('ไม่สามารถอนุมัติได้', 'ยังไม่มีการนัดสอบหัวข้อ (CP1)')
      }
    } else if (step === 2) {
      if (progressReports.value.length === 0) {
        return alerts.error('ไม่สามารถอนุมัติได้', 'นักศึกษายังไม่ได้ส่งรายงานความก้าวหน้า')
      }
    } else if (step === 3) {
      if (!project.value?.thesisUrl) {
        return alerts.error('ไม่สามารถอนุมัติได้', 'นักศึกษายังไม่ได้ส่งเล่มวิทยานิพนธ์ (ฉบับร่าง)')
      }
    } else if (step === 4) {
      // ตรวจสอบการสอบจบ (CP2)
      if (!finalExam.value) {
        return alerts.error('ไม่สามารถอนุมัติได้', 'ยังไม่มีการนัดสอบจบ (CP2/CP3)')
      }
    } else if (step === 5) {
      // ขั้นตอนสุดท้าย ต้องส่งเอกสารครบถ้วน
      if (!project.value?.thesisUrl || !project.value?.programUrl || !project.value?.manualUrl) {
        return alerts.error('ไม่สามารถอนุมัติได้', 'นักศึกษายังส่งเอกสารฉบับสมบูรณ์ไม่ครบ (เล่มสมบูรณ์, โปรแกรม และคู่มือ)')
      }
    }
  }

  // ถ้าเป็นการ "อนุมัติ" (ยกเว้นขั้นตอนที่ 5) ให้ขยับไปขั้นตอนถัดไปโดยอัตโนมัติ
  if (status === 'approved') {
    if (step < 5) {
      nextStep = step + 1
      // ถ้าขยับไปขั้นตอนที่ 5 ให้เป็น pending เพื่อรอตรวจเล่มสมบูรณ์
      finalStatus = nextStep === 5 ? 'pending' : 'approved'
    }
  }

  const confirm = await alerts.confirm('ยืนยันการบันทึก', 'คุณยืนยันการบันทึกการเปลี่ยนแปลงใช่หรือไม่?', 'question')
  if (!confirm.isConfirmed) return

  updating.value = true
  try {
    const res = await $fetch('/api/admin/update-project', {
      method: 'POST',
      body: {
        projectId: project.value.id,
        step: nextStep,
        status: finalStatus,
        feedback: feedbackText.value,
        advisorId
      }
    })
    if (res.success) {
      alerts.success('สำเร็จ!', 'บันทึกการเปลี่ยนแปลงเรียบร้อยแล้ว')
      refresh()
    }
  } catch (error) {
    alerts.error('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    updating.value = false
  }
}

// ฟังก์ชันหาคลาสสีของกล่องสถานะย่อส่วน
const getBoxClass = (stepCheck, currentStep) => {
  if (isProjectComplete(project.value) || stepCheck < currentStep) {
    return 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100'
  }
  if (stepCheck === currentStep) {
    return 'bg-amber-400 border-amber-400 text-white shadow-lg shadow-amber-100 animate-pulse'
  }
  return 'bg-white border-slate-100 text-slate-300'
}

// ฟังก์ชันหาคลาสสีของจุดไข่ปลา
const getDotColorClass = (step) => {
  const current = project.value?.step || 0
  if (step < current || isProjectComplete(project.value)) return 'bg-emerald-500 shadow-emerald-500/30'
  if (step === current) return 'bg-amber-400 shadow-amber-400/30'
  return 'bg-slate-200'
}

const isProjectComplete = (p) => {
  return p && (p.step > 5 || (p.step === 5 && p.status === 'approved'))
}

// --- ส่วนของการจัดการสอบ (Exam Management) ---
const showScheduleModal = ref(false)
const scheduleForm = ref({ date: '', time: '', room: '' })
const resultForm = ref({ status: 'pass', advisorMain: '', grade: 'A', details: '' })

// ดึงรายชื่ออาจารย์สำหรับ Select ใน Modal ผลสอบ
const { data: teachersData } = await useFetch('/api/admin/teachers')
const teachers = computed(() => teachersData.value?.teachers || [])

const openScheduleModal = () => {
  const pendingExam = project.value?.exams?.find(e => e.type === 'CP1' && e.status === 'pending')
  scheduleForm.value.date = pendingExam?.examDate ? new Date(pendingExam.examDate).toISOString().split('T')[0] : ''
  scheduleForm.value.time = pendingExam?.examTime || ''
  scheduleForm.value.room = pendingExam?.examLocation || ''
  showScheduleModal.value = true
}

const saveSchedule = async () => {
  try {
    const res = await $fetch('/api/admin/update-project', {
      method: 'POST',
      body: {
        projectId: project.value.id,
        examDate: scheduleForm.value.date,
        examTime: scheduleForm.value.time,
        examLocation: scheduleForm.value.room,
        status: 'pending'
      }
    })
    if (res.success) {
      alerts.success('สำเร็จ!', 'จัดตารางสอบหัวข้อเรียบร้อยแล้ว')
      showScheduleModal.value = false
      refresh()
    }
  } catch (error) {
    alerts.error('ผิดพลาด', 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('th-TH', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}
</script>

<template>
  <div class="p-4 md:p-10">

    <div class="mb-8">
      <NuxtLink to="/admin/projects"
        class="group inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-sm transition-all">
        <span class="material-symbols-rounded group-hover:-translate-x-1 transition-transform">arrow_back</span>
        <span>ย้อนกลับไปหน้ารายชื่อโครงงาน</span>
      </NuxtLink>
    </div>

    <div v-if="pending" class="flex flex-col items-center justify-center py-32">
      <div class="relative w-20 h-20">
        <div class="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p class="mt-6 text-slate-400 font-bold animate-pulse">กำลังดึงข้อมูลรายละเอียด...</p>
    </div>

    <div v-else-if="!project" class="flex flex-col items-center justify-center py-32 animate-[fadeIn_0.5s_ease-out]">
      <div
        class="w-24 h-24 bg-rose-50 text-rose-500 rounded-[32px] flex items-center justify-center mb-6 border-2 border-rose-100/50 shadow-xl shadow-rose-100/20">
        <span class="material-symbols-rounded text-6xl">search_off</span>
      </div>
      <h3 class="text-2xl font-black text-slate-800 mb-2">ไม่พบข้อมูลโครงงาน</h3>
      <p class="text-slate-400 font-medium mb-8 text-center max-w-xs">
        ขออภัย ไม่พบข้อมูลโครงงานที่คุณต้องการ หรือโครงงานนี้อาจถูกลบไปแล้ว
      </p>
      <NuxtLink to="/admin/projects"
        class="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all hover:bg-indigo-600 active:scale-95 shadow-lg">
        กลับสู่รายชื่อโครงงาน
      </NuxtLink>
    </div>

    <div v-else class="animate-[fadeIn_0.5s_ease-out]">
      <div class="admin-card bg-white p-8 mb-10 relative overflow-hidden">
        <div class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

        <div class="relative z-10">
          <div class="flex items-center gap-2 text-indigo-500 font-black mb-4 uppercase tracking-widest text-xs">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            Project Details
          </div>
          <h1 class="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-4 tracking-tight">{{
            project.titleTh }}</h1>
          <h2 class="text-xl text-slate-400 font-medium mb-10 max-w-4xl">{{ project.titleEn || '-' }}</h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-slate-100">
            <div class="space-y-1">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">ผู้วิจัย</div>
              <div class="font-bold text-slate-800 flex flex-col">
                <span>{{ project.student1.fullname }}</span>
                <span v-if="project.student2" class="text-slate-800">{{ project.student2.fullname }}</span>
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">รหัสนักศึกษา</div>
              <div class="font-bold text-slate-600 flex flex-col">
                <span>{{ project.student1.username }}</span> <br>
                <span v-if="project.student2" class="text-slate-800">{{ project.student2.username }}</span>
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">อาจารย์ที่ปรึกษา</div>
              <div class="font-bold text-slate-800 flex flex-col">
                <span>{{ project.advisor?.fullname || 'ยังไม่ระบุ' }}</span>
                <span v-if="project.coAdvisor" class="text-indigo-600">ที่ปรึกษาร่วม: {{ project.coAdvisor.fullname
                  }}</span>
              </div>
            </div>
            <div class="space-y-1">
              <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">ปีการศึกษา/ภาค</div>
              <div class="font-bold text-indigo-600">{{ project.academicYear }}/{{ project.semester }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-3 gap-10">

        <div class="xl:col-span-2 space-y-10">
          <div class="admin-card bg-white p-10 relative overflow-hidden">
            <div :class="isProjectComplete(project) ? 'bg-emerald-500' : 'bg-amber-400'"
              class="absolute top-0 left-0 right-0 h-2"></div>

            <div
              class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-50">
              <h3 class="font-black text-2xl text-slate-900 flex items-center gap-3 tracking-tight">
                <span class="material-symbols-rounded text-indigo-600 text-3xl">reorder</span>
                สถานะการดำเนินงาน
              </h3>

              <div class="shrink-0 flex items-center gap-2">
                <div v-for="s in 5" :key="s" :class="getBoxClass(s, project.step)"
                  class="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg border-2 transition-all duration-500">
                  <span v-if="s < project.step || isProjectComplete(project)"
                    class="material-symbols-rounded text-xl font-black">check</span>
                  <span v-else>{{ s }}</span>
                </div>
              </div>
            </div>

            <div class="relative pl-4 space-y-12 ml-4">
              <div class="absolute inset-y-0 left-4 border-l-4 border-slate-100 z-0"></div>

              <!-- Step 1: CP1 -->
              <div class="relative z-10 group/step">
                <div :class="getDotColorClass(1)"
                  class="absolute -left-[32px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-xl transition-all duration-500 group-hover/step:scale-125">
                </div>
                <div class="pl-10">
                  <h4 class="font-black text-xl text-slate-800 mb-2">ยื่นสอบหัวข้อ (CP1)</h4>

                  <!-- ปุ่มดูเอกสาร CP1 และจัดการสอบ (ย้ายมาจากหน้าหลักตามความต้องการ) -->
                  <div class="flex flex-wrap items-center gap-3 mb-4">
                    <a :href="`/student/cp1?projectId=${project.id}&hideNav=true`" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all font-bold text-xs border border-rose-100">
                      <span class="material-symbols-rounded text-[18px]">picture_as_pdf</span>
                      <span>ดูเอกสาร CP1</span>
                    </a>
                    
                    <button v-if="!cp1Exam || cp1Exam.status === 'pending'" @click="openScheduleModal" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-all font-bold text-xs shadow-sm">
                      <span class="material-symbols-rounded text-[18px]">calendar_month</span>
                      <span>{{ cp1Exam ? 'แก้ไขวันสอบ' : 'ระบุวันสอบ' }}</span>
                    </button>
                  </div>

                  <!-- ข้อมูลนัดสอบหัวข้อ (แสดงถ้ามี CP1 Exam) -->
                  <div v-if="cp1Exam"
                    :class="cp1Exam.status === 'pass' ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'"
                    class="border p-5 rounded-[24px] mb-4 relative overflow-hidden">
                    <div class="relative z-10 flex items-center gap-4">
                      <div :class="cp1Exam.status === 'pass' ? 'bg-emerald-500' : 'bg-amber-500'"
                        class="w-10 h-10 rounded-xl text-white flex items-center justify-center shadow-md">
                        <span class="material-symbols-rounded">{{ cp1Exam.status === 'pass' ? 'check_circle' :
                          'calendar_month' }}</span>
                      </div>
                      <div>
                        <div :class="cp1Exam.status === 'pass' ? 'text-emerald-600' : 'text-amber-600'"
                          class="text-[10px] font-black uppercase tracking-widest mb-0.5">
                          {{ cp1Exam.status === 'pass' ? 'ผ่านการสอบหัวข้อแล้ว' : 'นัดหมายสอบหัวข้อโครงงาน' }}
                        </div>
                        <div class="text-sm font-bold"
                          :class="cp1Exam.status === 'pass' ? 'text-emerald-900' : 'text-amber-900'">วันที่: {{
                            formatDate(cp1Exam.examDate) }}</div>
                        <div class="text-xs font-bold"
                          :class="cp1Exam.status === 'pass' ? 'text-emerald-700' : 'text-amber-700'">เวลา: {{
                          cp1Exam.examTime }} น. | สถานที่: {{ cp1Exam.examLocation }}</div>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center gap-2">
                    <span v-if="project.step >= 2"
                      class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">อนุมัติผ่านขั้นตอนแล้ว</span>
                    <span v-else-if="project.step === 1 && project.status === 'approved'"
                      class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">ผ่านการสอบหัวข้อแล้ว</span>
                    <span v-else-if="project.step === 1"
                      class="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">กำลังรอการตรวจสอบ
                      / นัดสอบ</span>
                    <span v-else
                      class="px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-100">ยังไม่ดำเนินการ</span>
                  </div>

                  <!-- Management Actions for Step 1 -->
                  <div v-if="project.step === 1 && !isProjectComplete(project)" class="mt-8 pt-6 border-t border-slate-100 space-y-4">
                    <div class="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-widest mb-2">
                      <span class="material-symbols-rounded text-base">settings_suggest</span>
                      การจัดการขั้นตอน CP1
                    </div>

                    <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ความคิดเห็น / ข้อเสนอแนะ</label>
                      <textarea v-model="feedbackText" rows="3"
                        class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none font-medium"
                        placeholder="ระบุข้อความถึงนักศึกษาสำหรับขั้นตอนนี้..."></textarea>
                    </div>
                    <div class="flex flex-wrap gap-3">
                      <button @click="updateProject(1, 'approved')" :disabled="updating" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-emerald-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">verified</span>
                        <span>อนุมัติและไปขั้นตอนถัดไป</span>
                      </button>
                      <button @click="updateProject(1, 'revision')" :disabled="updating" class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-amber-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">edit_note</span>
                        <span>ให้แก้ไข</span>
                      </button>
                      <button @click="updateProject(1, 'rejected')" :disabled="updating" class="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-rose-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">cancel</span>
                        <span>ไม่อนุมัติ</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 2: Reports -->
              <div class="relative z-10 group/step">
                <div :class="getDotColorClass(2)"
                  class="absolute -left-[32px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-xl transition-all duration-500 group-hover/step:scale-125">
                </div>
                <div class="pl-10">
                  <h4 class="font-black text-xl text-slate-800 mb-6">รายงานความก้าวหน้า (Progress)</h4>

                  <div v-if="progressReports.length > 0" class="space-y-6">
                    <div v-for="report in [progressReports[0]]" :key="report.id"
                      class="bg-white border border-slate-100 px-6 py-4 rounded-[32px] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group/report">
                      <div
                        class="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-500 opacity-0 group-hover/report:opacity-100 transition-opacity">
                      </div>
                      <div class="flex justify-between items-center mb-4">
                        <div class="flex flex-col">
                          <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Latest Progress Log</span>
                          <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{
                            formatDate(report.createdAt) }}</span>
                        </div>
                        <div
                          class="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xs border border-indigo-100 shadow-sm">
                          P
                        </div>
                      </div>
                      <h5
                        class="font-black text-slate-800 text-base mb-2 group-hover/report:text-indigo-600 transition-colors">
                        {{ report.title }}</h5>
                      <p class="text-sm text-slate-500 mb-4 leading-relaxed">{{ report.description }}</p>
                      <div v-if="report.feedback"
                        class="mt-4 pt-4 border-t border-slate-50 text-xs text-indigo-500 font-bold flex items-center gap-2 italic">
                        <span class="material-symbols-rounded text-sm">chat_bubble</span>
                        <span>ความเห็นอาจารย์: {{ report.feedback }}</span>
                      </div>
                    </div>
                  </div>
                  <div v-else
                    class="flex items-center gap-2 p-6 rounded-[28px] border-2 border-dashed border-slate-100 text-slate-300 font-bold">
                    <span class="material-symbols-rounded">inbox</span>
                    <span>ยังไม่มีการส่งรายงานความก้าวหน้า</span>
                  </div>

                  <!-- Management Actions for Step 2 -->
                  <div v-if="project.step === 2 && !isProjectComplete(project)" class="mt-8 pt-6 border-t border-slate-100 space-y-4">
                    <div class="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-widest mb-2">
                      <span class="material-symbols-rounded text-base">settings_suggest</span>
                      การจัดการขั้นตอน รายงานความก้าวหน้า
                    </div>
                    <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ความคิดเห็น / ข้อเสนอแนะ</label>
                      <textarea v-model="feedbackText" rows="3"
                        class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none font-medium"
                        placeholder="ระบุข้อความถึงนักศึกษาสำหรับขั้นตอนนี้..."></textarea>
                    </div>
                    <div class="flex flex-wrap gap-3">
                      <button @click="updateProject(2, 'approved')" :disabled="updating" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-emerald-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">verified</span>
                        <span>อนุมัติและไปขั้นตอนถัดไป</span>
                      </button>
                      <button @click="updateProject(2, 'revision')" :disabled="updating" class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-amber-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">edit_note</span>
                        <span>ให้แก้ไข</span>
                      </button>
                      <button @click="updateProject(2, 'rejected')" :disabled="updating" class="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-rose-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">cancel</span>
                        <span>ไม่อนุมัติ</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3: Thesis Draft -->
              <div class="relative z-10 group/step">
                <div :class="getDotColorClass(3)"
                  class="absolute -left-[32px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-xl transition-all duration-500 group-hover/step:scale-125">
                </div>
                <div class="pl-10">
                  <h4 class="font-black text-xl text-slate-800 mb-6">เล่มบัณฑิตนิพนธ์ (ฉบับร่าง)</h4>

                  <!-- ส่วนข้อมูลการส่งเล่มล่าสุด (Thesis Reports - Show only latest) -->
                  <div v-if="thesisReports.length > 0" class="mb-8 space-y-4">
                    <div v-for="report in [thesisReports[0]]" :key="report.id"
                      class="bg-indigo-50/30 border border-indigo-100 p-6 rounded-[32px] relative overflow-hidden group/thesis-report">
                      <div class="flex justify-between items-start mb-3">
                        <div class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{{
                          formatDate(report.createdAt) }}</div>
                        <span
                          class="px-2 py-0.5 rounded-lg bg-indigo-100 text-indigo-600 text-[9px] font-black uppercase">Latest Draft Log</span>
                      </div>
                      <h5 class="font-bold text-slate-800 text-sm mb-1">{{ report.title }}</h5>
                      <p class="text-xs text-slate-500 leading-relaxed">{{ report.description }}</p>
                    </div>
                  </div>

                  <div v-if="project.thesisUrl"
                    class="bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group/thesis">
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <div
                          class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                          <span class="material-symbols-rounded">picture_as_pdf</span>
                        </div>
                        <div>
                          <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">
                            ลิงก์เล่มวิทยานิพนธ์ (ฉบับร่าง)</div>
                          <a :href="project.thesisUrl" target="_blank"
                            class="text-sm font-bold text-indigo-600 hover:underline break-all">{{ project.thesisUrl
                            }}</a>
                        </div>
                      </div>
                      <a :href="project.thesisUrl" target="_blank"
                        class="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-indigo-600 transition-colors">
                        <span class="material-symbols-rounded text-xl">open_in_new</span>
                      </a>
                    </div>
                  </div>
                  <div v-else
                    class="flex items-center gap-2 p-6 rounded-[28px] border-2 border-dashed border-slate-100 text-slate-300 font-bold">
                    <span class="material-symbols-rounded">link_off</span>
                    <span>ยังไม่ได้ส่งเล่มฉบับร่าง</span>
                  </div>

                  <!-- Management Actions for Step 3 -->
                  <div v-if="project.step === 3 && !isProjectComplete(project)" class="mt-8 pt-6 border-t border-slate-100 space-y-4">
                    <div class="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-widest mb-2">
                      <span class="material-symbols-rounded text-base">settings_suggest</span>
                      การจัดการขั้นตอน เล่มวิทยานิพนธ์ (ฉบับร่าง)
                    </div>
                    <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ความคิดเห็น / ข้อเสนอแนะ</label>
                      <textarea v-model="feedbackText" rows="3"
                        class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none font-medium"
                        placeholder="ระบุข้อความถึงนักศึกษาสำหรับขั้นตอนนี้..."></textarea>
                    </div>
                    <div class="flex flex-wrap gap-3">
                      <button @click="updateProject(3, 'approved')" :disabled="updating" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-emerald-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">verified</span>
                        <span>อนุมัติและไปขั้นตอนถัดไป</span>
                      </button>
                      <button @click="updateProject(3, 'revision')" :disabled="updating" class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-amber-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">edit_note</span>
                        <span>ให้แก้ไข</span>
                      </button>
                      <button @click="updateProject(3, 'rejected')" :disabled="updating" class="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-rose-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">cancel</span>
                        <span>ไม่อนุมัติ</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 4: Exam -->
              <div class="relative z-10 group/step">
                <div :class="getDotColorClass(4)"
                  class="absolute -left-[32px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-xl transition-all duration-500 group-hover/step:scale-125">
                </div>
                <div class="pl-10">
                  <h4 class="font-black text-xl text-slate-800 mb-4">ยื่นสอบจบ (CP2/CP3)</h4>
                  
                  <!-- เอกสาร CP2/CP3 (แสดงเฉพาะเมื่ออยู่ขั้นที่ 4 หรือสูงกว่า) -->
                  <div v-if="project.step >= 4" class="flex items-center gap-3 mb-6">
                    <NuxtLink :to="`/student/cp2?projectId=${project.id}`" target="_blank" class="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all font-black text-xs tracking-widest border border-indigo-100 flex items-center gap-2">
                      <span class="material-symbols-rounded">picture_as_pdf</span> 
                      <span>ดูแบบขอสอบ (CP2)</span>
                    </NuxtLink>
                    <NuxtLink :to="`/student/cp3?projectId=${project.id}`" target="_blank" class="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all font-black text-xs tracking-widest border border-rose-100 flex items-center gap-2">
                      <span class="material-symbols-rounded">picture_as_pdf</span>
                      <span>ดูผลการประเมิน (CP3)</span>
                    </NuxtLink>
                  </div>

                  <div v-if="project.step === 4 && project.examDate"
                    class="bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 rounded-[32px] text-white shadow-xl shadow-indigo-100 mb-4 relative overflow-hidden">
                    <span
                      class="material-symbols-rounded absolute -right-4 -bottom-4 text-8xl text-white/10">event_available</span>
                    <div class="relative z-10">
                      <div
                        class="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                        นัดหมายการสอบจบโครงงาน
                      </div>
                      <div class="text-lg font-black mb-1">วันที่: {{ formatDate(project.examDate) }}</div>
                      <div class="text-sm font-bold opacity-90 mb-4">เวลา: {{ project.examTime }} น. | สถานที่: {{
                        project.examLocation }}</div>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <span v-if="project.step >= 5"
                      class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">ผ่านการสอบจบแล้ว</span>
                    <span v-else-if="project.step === 4"
                      class="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">กำลังรอการสอบจบ</span>
                    <span v-else
                      class="px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-100">ยังไม่ดำเนินการ</span>
                  </div>

                  <!-- Management Actions for Step 4 -->
                  <div v-if="project.step === 4 && !isProjectComplete(project)" class="mt-8 pt-6 border-t border-slate-100 space-y-4">
                    <div class="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-widest mb-2">
                      <span class="material-symbols-rounded text-base">settings_suggest</span>
                      การจัดการขั้นตอน ยื่นสอบจบ (CP2/CP3)
                    </div>
                    <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ความคิดเห็น / ข้อเสนอแนะ</label>
                      <textarea v-model="feedbackText" rows="3"
                        class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none font-medium"
                        placeholder="ระบุข้อความถึงนักศึกษาสำหรับขั้นตอนนี้..."></textarea>
                    </div>
                    <div class="flex flex-wrap gap-3">
                      <button @click="updateProject(4, 'approved')" :disabled="updating" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-emerald-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">verified</span>
                        <span>อนุมัติและไปขั้นตอนถัดไป</span>
                      </button>
                      <button @click="updateProject(4, 'revision')" :disabled="updating" class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-amber-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">edit_note</span>
                        <span>ให้แก้ไข</span>
                      </button>
                      <button @click="updateProject(4, 'rejected')" :disabled="updating" class="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-rose-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">cancel</span>
                        <span>ไม่อนุมัติ</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 5: Final -->
              <div class="relative z-10 group/step">
                <div :class="getDotColorClass(5)"
                  class="absolute -left-[32px] top-1.5 w-6 h-6 rounded-full border-4 border-white shadow-xl transition-all duration-500 group-hover/step:scale-125">
                </div>
                <div class="pl-10">
                  <h4 class="font-black text-xl text-slate-800 mb-6">ส่งเล่มฉบับสมบูรณ์</h4>
                  <div v-if="project.step === 5 && (project.thesisUrl || project.programUrl || project.manualUrl)" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <a v-if="project.thesisUrl" :href="project.thesisUrl" target="_blank"
                      class="flex items-center justify-between p-5 bg-rose-50 text-rose-600 rounded-[24px] border border-rose-100 hover:bg-rose-600 hover:text-white transition-all group/doc">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center border border-rose-100 group-hover/doc:bg-white/20">
                          <span class="material-symbols-rounded">picture_as_pdf</span>
                        </div>
                        <span class="font-black text-sm">เล่มโครงงานสมบูรณ์ (Final)</span>
                      </div>
                      <span
                        class="material-symbols-rounded opacity-0 group-hover/doc:opacity-100 transition-opacity">download</span>
                    </a>
                    <a v-if="project.programUrl" :href="project.programUrl" target="_blank"
                      class="flex items-center justify-between p-5 bg-emerald-50 text-emerald-600 rounded-[24px] border border-emerald-100 hover:bg-emerald-600 hover:text-white transition-all group/doc">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center border border-emerald-100 group-hover/doc:bg-white/20">
                          <span class="material-symbols-rounded">code</span>
                        </div>
                        <span class="font-black text-sm">ซอร์สโค้ดโปรแกรม</span>
                      </div>
                      <span
                        class="material-symbols-rounded opacity-0 group-hover/doc:opacity-100 transition-opacity">open_in_new</span>
                    </a>
                    <a v-if="project.manualUrl" :href="project.manualUrl" target="_blank"
                      class="flex items-center justify-between p-5 bg-amber-50 text-amber-600 rounded-[24px] border border-amber-100 hover:bg-amber-600 hover:text-white transition-all group/doc">
                      <div class="flex items-center gap-3">
                        <div
                          class="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center border border-amber-100 group-hover/doc:bg-white/20">
                          <span class="material-symbols-rounded">menu_book</span>
                        </div>
                        <span class="font-black text-sm">คู่มือการใช้งาน (Manual)</span>
                      </div>
                      <span
                        class="material-symbols-rounded opacity-0 group-hover/doc:opacity-100 transition-opacity">open_in_new</span>
                    </a>
                  </div>
                  <div v-else-if="project.step === 5 && !project.thesisUrl && !project.programUrl && !project.manualUrl"
                    class="flex items-center gap-2 p-6 rounded-[28px] border-2 border-dashed border-slate-100 text-slate-300 font-bold mb-6">
                    <span class="material-symbols-rounded">pending_actions</span>
                    <span>ยังไม่ได้ส่งเล่มและโปรแกรมฉบับสมบูรณ์</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <span v-if="project.step === 5 && project.status === 'approved'"
                      class="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">อนุมัติโครงการเสร็จสมบูรณ์</span>
                    <span v-else-if="project.step === 5"
                      class="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">รอการตรวจสอบขั้นสุดท้าย</span>
                    <span v-else
                      class="px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-slate-100">ยังไม่ดำเนินการ</span>
                  </div>

                  <!-- Management Actions for Step 5 -->
                  <div v-if="project.step === 5 && !isProjectComplete(project)" class="mt-8 pt-6 border-t border-slate-100 space-y-4">
                    <div class="flex items-center gap-2 text-indigo-500 font-black text-[10px] uppercase tracking-widest mb-2">
                      <span class="material-symbols-rounded text-base">settings_suggest</span>
                      การจัดการขั้นตอน ส่งเล่มฉบับสมบูรณ์
                    </div>
                    <div class="space-y-2">
                      <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ความคิดเห็น / ข้อเสนอแนะ</label>
                      <textarea v-model="feedbackText" rows="3"
                        class="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm text-slate-700 outline-none focus:border-indigo-500 focus:bg-white transition-all resize-none font-medium"
                        placeholder="ระบุข้อความถึงนักศึกษาสำหรับขั้นตอนนี้..."></textarea>
                    </div>
                    <div class="flex flex-wrap gap-3">
                      <button @click="updateProject(5, 'approved')" :disabled="updating" class="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-emerald-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">verified</span>
                        <span>อนุมัติโครงการเสร็จสมบูรณ์</span>
                      </button>
                      <button @click="updateProject(5, 'revision')" :disabled="updating" class="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-amber-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">edit_note</span>
                        <span>ให้แก้ไข</span>
                      </button>
                      <button @click="updateProject(5, 'rejected')" :disabled="updating" class="px-5 py-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-black text-xs transition-all shadow-md shadow-rose-100 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50">
                        <span class="material-symbols-rounded text-sm">cancel</span>
                        <span>ไม่อนุมัติ</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="xl:col-span-1">
          <div class="admin-card p-10 bg-slate-900 text-white relative overflow-hidden shadow-2xl sticky top-8">
            <!-- Header Decoration -->
            <div class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl"></div>

            <div class="relative z-10 text-center">
              <div
                class="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[32px] flex items-center justify-center text-4xl font-black mx-auto mb-6 shadow-xl border-4 border-white/10 scale-110">
                {{ project.student1.fullname.charAt(0) }}
              </div>
              <h3 class="font-black text-2xl mb-2 tracking-tight">{{ project.student1.fullname }}</h3>
              <p class="text-indigo-400 text-xs font-black uppercase tracking-widest mb-10">นักศึกษา รหัส {{
                project.student1.username }}</p>

              <div class="space-y-4 mb-10">
                <!-- Student 1 -->
                <div class="p-4 rounded-[28px] bg-white/5 border border-white/5">
                  <div class="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mb-3 px-2">ข้อมูลการติดต่อ
                    (คนที่ 1)</div>
                  <div class="space-y-2">
                    <div class="flex items-center gap-3 text-left">
                      <div
                        class="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <span class="material-symbols-rounded text-sm">phone</span>
                      </div>
                      <div class="text-sm font-bold truncate">{{ project.student1.tel || '-' }}</div>
                    </div>
                    <div class="flex items-center gap-3 text-left">
                      <div
                        class="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                        <span class="material-symbols-rounded text-sm">mail</span>
                      </div>
                      <div class="text-sm font-bold truncate">{{ project.student1.email || '-' }}</div>
                    </div>
                  </div>
                </div>

                <!-- Student 2 (If exists) -->
                <div v-if="project.student2" class="p-4 rounded-[28px] bg-white/5 border border-white/5">
                  <div class="text-[10px] text-indigo-300 font-bold uppercase tracking-widest mb-3 px-2">ข้อมูลการติดต่อ
                    (คนที่ 2)</div>
                  <div class="space-y-2">
                    <div class="flex items-center gap-3 text-left">
                      <div
                        class="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                        <span class="material-symbols-rounded text-sm">phone</span>
                      </div>
                      <div class="text-sm font-bold truncate">{{ project.student2.tel || '-' }}</div>
                    </div>
                    <div class="flex items-center gap-3 text-left">
                      <div
                        class="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                        <span class="material-symbols-rounded text-sm">mail</span>
                      </div>
                      <div class="text-sm font-bold truncate">{{ project.student2.email || '-' }}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- --- Modals สำหรับการจัดการสอบ (ย้ายมาจากหน้าหลัก) --- -->
    <Teleport to="body">
      <!-- Schedule Modal -->
      <Transition name="fade">
        <div v-if="showScheduleModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div class="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden border border-white/20">
            <div class="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-lg shadow-amber-200">
                  <span class="material-symbols-rounded">calendar_add_on</span>
                </div>
                <h3 class="text-2xl font-bold text-slate-900 tracking-tight">ระบุวันสอบหัวข้อ</h3>
              </div>
              <button @click="showScheduleModal = false" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
                <span class="material-symbols-rounded">close</span>
              </button>
            </div>
            
            <form @submit.prevent="saveSchedule" class="p-8 space-y-6">
              <div class="space-y-1.5">
                <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">วันที่สอบ</label>
                <input type="date" v-model="scheduleForm.date" required class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50">
              </div>
              
              <div class="grid grid-cols-2 gap-6">
                <div class="space-y-1.5">
                  <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">เวลาสอบ</label>
                  <input type="time" v-model="scheduleForm.time" required class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50">
                </div>
                <div class="space-y-1.5">
                  <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">สถานที่ / ห้อง</label>
                  <input type="text" v-model="scheduleForm.room" placeholder="เช่น ห้อง 6125" required class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50">
                </div>
              </div>

              <div class="pt-4">
                <button type="submit" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-3">
                  <span class="material-symbols-rounded">save</span>
                  <span>ยืนยันจัดตารางสอบ</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>