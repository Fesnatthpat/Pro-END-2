<template>
  <div class="min-h-screen py-8 px-4 bg-[#f8f9fa]">
    <div class="max-w-[900px] mx-auto w-full">

      <!-- Header Section -->
      <div
        class="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-[fadeIn_0.5s_ease-out]">
        <div>
          <NuxtLink to="/student"
            class="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 transition-all mb-3 font-bold text-sm group">
            <span class="material-symbols-rounded group-hover:-translate-x-1 transition-transform">arrow_back</span>
            กลับหน้าหลัก
          </NuxtLink>
          <h2 class="font-black text-[28px] md:text-[36px] text-[#1a1a40] leading-tight tracking-tight">
            คำร้องขอสอบจบโครงงาน
          </h2>
          <p class="text-slate-500 mt-2 font-medium flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            ขั้นตอนการประเมินผลสัมฤทธิ์ของโครงงานคอมพิวเตอร์
          </p>
        </div>
        <div class="shrink-0 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <span class="material-symbols-rounded">school</span>
          </div>
          <div>
            <div class="text-[10px] font-black text-slate-400 uppercase tracking-widest">สถานะปัจจุบัน</div>
            <div class="text-sm font-black text-slate-700">{{ getProjectStepStatus() }}</div>
          </div>
        </div>
      </div>

      <!-- Main Status Card -->
      <div
        class="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white relative overflow-hidden mb-10">
        <!-- Decoration Gradients -->
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-blue-50/20 rounded-full -mr-32 -mt-32 blur-3xl opacity-60">
        </div>
        <div
          class="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-emerald-50/40 to-transparent rounded-full -ml-32 -mb-32 blur-3xl opacity-60">
        </div>

        <div v-if="finalExam" class="relative z-10 animate-[fadeIn_0.6s_ease-out]">
          <div class="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-6 border-b border-slate-50">
            <div class="flex items-center gap-5 mb-4 md:mb-0">
              <div
                class="w-16 h-16 rounded-[24px] bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-emerald-200 shrink-0">
                <span class="material-symbols-rounded">event_available</span>
              </div>
              <div>
                <h3 class="text-2xl font-black text-[#1a1a40]">ตารางการสอบถูกกำหนดแล้ว</h3>
                <p class="text-emerald-600 font-bold flex items-center gap-1 text-sm mt-0.5">
                  <span class="material-symbols-rounded text-base">check_circle</span>
                  เจ้าหน้าที่ยืนยันวันเวลาสอบเรียบร้อยแล้ว
                </p>
              </div>
            </div>
            <div
              class="bg-emerald-50 text-emerald-600 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100/50 self-start md:self-auto">
              Confirmed
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              class="p-8 rounded-[32px] bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-500">
              <div
                class="w-12 h-12 rounded-2xl bg-white text-blue-600 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span class="material-symbols-rounded">calendar_month</span>
              </div>
              <div class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-0.5">วันที่สอบ</div>
              <div class="text-xl font-black text-[#1a1a40]">{{ formatDate(finalExam.examDate) }}</div>
            </div>

            <div
              class="p-8 rounded-[32px] bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-500">
              <div
                class="w-12 h-12 rounded-2xl bg-white text-amber-500 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span class="material-symbols-rounded">schedule</span>
              </div>
              <div class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-0.5">เวลาเริ่มต้น
              </div>
              <div class="text-xl font-black text-[#1a1a40]">{{ finalExam.examTime }} น.</div>
            </div>

            <div
              class="p-8 rounded-[32px] bg-slate-50/50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-100 transition-all duration-500">
              <div
                class="w-12 h-12 rounded-2xl bg-white text-rose-500 shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span class="material-symbols-rounded">location_on</span>
              </div>
              <div class="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-0.5">สถานที่/ห้องสอบ
              </div>
              <div class="text-xl font-black text-[#1a1a40]">{{ finalExam.examLocation }}</div>
            </div>
          </div>

          <div
            class="mt-10 p-6 rounded-[28px] bg-indigo-50 border border-indigo-100/50 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div
              class="w-12 h-12 rounded-full bg-white text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
              <span class="material-symbols-rounded">lightbulb</span>
            </div>
            <p class="text-indigo-900 text-[13px] font-bold leading-relaxed">
              คำแนะนำ: นักศึกษาควรไปถึงสถานที่สอบก่อนเวลา 15 นาที และเตรียมเอกสาร CP2/CP3 รวมถึงไฟล์นำเสนอให้พร้อมครับ
            </p>
          </div>
        </div>

        <div v-else class="relative z-10">
          <!-- Passed State -->
          <div v-if="project?.step >= 5" class="text-center py-8 animate-[fadeIn_0.6s_ease-out]">
            <div class="relative w-32 h-32 mx-auto mb-8">
              <div class="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping"></div>
              <div
                class="relative w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-full flex items-center justify-center text-6xl shadow-2xl shadow-emerald-200">
                <span class="material-symbols-rounded text-6xl">verified</span>
              </div>
            </div>
            <h3 class="text-3xl font-black text-[#1a1a40] mb-4">ผ่านการสอบจบเรียบร้อยแล้ว</h3>
            <p class="text-slate-500 max-w-[500px] mx-auto mb-10 text-lg leading-relaxed">
              ขอแสดงความยินดีด้วย! คุณผ่านขั้นตอนการสอบจบแล้ว
              ขั้นตอนสุดท้ายคือการส่งเล่มวิทยานิพนธ์และโปรแกรมฉบับสมบูรณ์เข้าสู่ระบบครับ
            </p>
            <NuxtLink to="/student/final-submit"
              class="inline-flex items-center gap-3 px-12 py-5 bg-[#1a1a40] text-white rounded-[24px] font-black text-lg hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-200 hover:-translate-y-1 active:scale-95 group">
              ไปหน้าส่งงานฉบับสมบูรณ์
              <span class="material-symbols-rounded group-hover:translate-x-1 transition-transform">rocket_launch</span>
            </NuxtLink>
          </div>

          <!-- Pending Scheduling State -->
          <div v-else-if="project?.step === 4" class="text-center py-12 animate-[fadeIn_0.6s_ease-out]">
            <div
              class="w-32 h-32 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-amber-100/50">
              <span class="material-symbols-rounded text-6xl animate-pulse">hourglass_empty</span>
            </div>
            <h3 class="text-3xl font-black text-[#1a1a40] mb-3">อยู่ระหว่างจัดตารางสอบ</h3>
            <p class="text-slate-500 max-w-[450px] mx-auto text-lg leading-relaxed font-medium">
              คุณได้ยื่นคำร้องเรียบร้อยแล้ว แอดมินกำลังดำเนินการจัดหาวันเวลาและสถานที่สอบที่เหมาะสมให้คุณครับ
            </p>
            <div
              class="mt-10 inline-flex items-center gap-2 px-6 py-2 bg-amber-50 text-amber-700 rounded-full text-xs font-black uppercase tracking-widest border border-amber-100">
              Waiting for Schedule
            </div>
          </div>

          <!-- Initial Submission State -->
          <div v-else class="text-center py-10">
            <div
              class="w-28 h-28 bg-blue-50 text-blue-600 rounded-[35px] flex items-center justify-center mx-auto mb-8 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <span class="material-symbols-rounded text-5xl">grading</span>
            </div>
            <h3 class="text-3xl font-black text-[#1a1a40] mb-4">ยื่นคำร้องขอสอบจบโครงงาน</h3>
            <p class="text-slate-500 max-w-[500px] mx-auto mb-10 text-lg leading-relaxed">
              หากคุณดำเนินงานโครงงานและจัดทำรูปเล่มฉบับร่างเสร็จสมบูรณ์แล้ว
              สามารถกดยืนยันเพื่อขอรับการนัดหมายวันสอบจากคณะกรรมการได้ทันทีครับ
            </p>

            <button @click="handleNotifyReadiness" :disabled="submitting"
              class="inline-flex items-center gap-3 px-12 py-5 bg-blue-600 text-white rounded-[24px] font-black text-lg hover:bg-indigo-600 transition-all shadow-2xl shadow-blue-200 hover:-translate-y-1 active:scale-95 disabled:opacity-50 group">
              <span class="material-symbols-rounded text-2xl" v-if="!submitting">check_circle</span>
              <span>{{ submitting ? 'กำลังประมวลผล...' : 'ยืนยันความพร้อมและยื่นคำร้อง' }}</span>
              <span class="material-symbols-rounded group-hover:translate-x-1 transition-transform"
                v-if="!submitting">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Documentation Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 animate-[fadeIn_0.8s_ease-out]">

        <!-- CP2 Card -->
        <div v-if="project?.step >= 5"
          class="bg-white rounded-[35px] p-8 shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-xl transition-all duration-500">
          <div
            class="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[24px] flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition-transform">
            <span class="material-symbols-rounded">task_alt</span>
          </div>
          <div>
            <h3 class="font-black text-xl text-[#1a1a40] mb-1">จัดการ CP2 สำเร็จ</h3>
            <p class="text-slate-400 text-xs font-bold uppercase tracking-wide mb-4">แบบคำร้องขอสอบจบ</p>
            <NuxtLink to="/student/cp2"
              class="inline-flex items-center gap-2 text-indigo-600 font-black text-sm hover:underline">
              ดูเอกสารย้อนหลัง <span class="material-symbols-rounded text-base">open_in_new</span>
            </NuxtLink>
          </div>
        </div>

        <NuxtLink v-else to="/student/cp2"
          class="bg-white rounded-[35px] p-8 shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-2xl hover:shadow-indigo-100 hover:border-indigo-100 transition-all duration-500 relative overflow-hidden">
          <div
            class="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
          </div>
          <div
            class="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[24px] flex items-center justify-center text-4xl shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
            <span class="material-symbols-rounded">description</span>
          </div>
          <div>
            <h3 class="font-black text-xl text-[#1a1a40] mb-1 group-hover:text-indigo-700 transition-colors">แบบขอสอบจบ
              (CP2)</h3>
            <p class="text-slate-400 text-xs font-bold uppercase tracking-wide mb-4">พิมพ์เอกสารให้ที่ปรึกษาลงนาม</p>
            <div class="flex items-center gap-2 text-indigo-600 font-black text-sm">
              จัดการเอกสาร <span
                class="material-symbols-rounded text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
        </NuxtLink>

        <!-- CP3 Card -->
        <div v-if="project?.step >= 5"
          class="bg-white rounded-[35px] p-8 shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-xl transition-all duration-500">
          <div
            class="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[24px] flex items-center justify-center text-4xl shrink-0 group-hover:scale-110 transition-transform">
            <span class="material-symbols-rounded">assignment_turned_in</span>
          </div>
          <div>
            <h3 class="font-black text-xl text-[#1a1a40] mb-1">จัดการ CP3 สำเร็จ</h3>
            <p class="text-slate-400 text-xs font-bold uppercase tracking-wide mb-4">แบบประเมินการสอบ</p>
            <NuxtLink to="/student/cp3"
              class="inline-flex items-center gap-2 text-indigo-600 font-black text-sm hover:underline">
              ดูเอกสารย้อนหลัง <span class="material-symbols-rounded text-base">open_in_new</span>
            </NuxtLink>
          </div>
        </div>

        <NuxtLink v-else-if="project?.step >= 4" to="/student/cp3"
          class="bg-white rounded-[35px] p-8 shadow-sm border border-slate-100 flex items-center gap-6 group hover:shadow-2xl hover:shadow-indigo-100 hover:border-indigo-100 transition-all duration-500 relative overflow-hidden">
          <div
            class="absolute top-0 right-0 w-16 h-16 bg-indigo-50 rounded-full -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
          </div>
          <div
            class="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[24px] flex items-center justify-center text-4xl shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
            <span class="material-symbols-rounded">task</span>
          </div>
          <div>
            <h3 class="font-black text-xl text-[#1a1a40] mb-1 group-hover:text-indigo-700 transition-colors">
              แบบประเมินสอบ (CP3)</h3>
            <p class="text-slate-400 text-xs font-bold uppercase tracking-wide mb-4">พิมพ์เอกสารมอบให้คณะกรรมการ</p>
            <div class="flex items-center gap-2 text-indigo-600 font-black text-sm">
              จัดการเอกสาร <span
                class="material-symbols-rounded text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </div>
          </div>
        </NuxtLink>

        <!-- Locked CP3 -->
        <div v-else class="bg-gray-50/50 rounded-[35px] p-8 border border-slate-100 flex items-center gap-6 opacity-60">
          <div
            class="w-20 h-20 bg-slate-100 text-slate-400 rounded-[24px] flex items-center justify-center text-4xl shrink-0">
            <span class="material-symbols-rounded">lock</span>
          </div>
          <div>
            <h3 class="font-black text-xl text-slate-400 mb-1">แบบประเมินสอบ (CP3)</h3>
            <p class="text-slate-400 text-xs font-bold uppercase tracking-wide">กรุณายื่นคำร้องขอสอบก่อน</p>
          </div>
        </div>

      </div>

      <!-- Activity Section -->
      <!-- <ActivityTimeline v-if="project?.id" :project-id="project.id" /> -->

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

definePageMeta({ layout: 'student' })

const userCookie = useCookie('user_session')
const user = userCookie.value
const submitting = ref(false)

const { data: projectData, refresh } = await useFetch('/api/student/my-project')
const project = computed(() => projectData.value?.project)

// Find the latest final exam schedule (CP2 type)
const finalExam = computed(() => {
  if (!project.value?.exams) return null
  // Return the pending one first, or the latest one
  return project.value.exams.find(e => e.type === 'CP2' && e.status === 'pending') ||
    project.value.exams.find(e => e.type === 'CP2')
})

const { success: alertSuccess, error: alertError } = useAlerts()

const handleNotifyReadiness = async () => {
  if (!project.value) return
  submitting.value = true
  try {
    const res = await $fetch('/api/student/request-exam', {
      method: 'POST',
      body: {
        projectId: project.value.id
      }
    })
    if (res.success) {
      alertSuccess('สำเร็จ', 'ส่งคำร้องขอสอบจบเรียบร้อยแล้ว! กรุณารอแอดมินแจ้งวันเวลาสอบครับ')
      refresh()
    }
  } catch (error) {
    alertError('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาด')
  } finally {
    submitting.value = false
  }
}

const getProjectStepStatus = () => {
  if (!project.value) return 'ยังไม่ได้เริ่ม'
  if (project.value.step >= 5) return 'รอส่งเล่มสมบูรณ์'
  if (project.value.step === 4) return 'ยื่นคำร้องสอบจบแล้ว'
  return 'อยู่ระหว่างทำรูปเล่ม'
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('th-TH', {
    day: 'numeric', month: 'long', year: 'numeric'
  })
}
</script>

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

.material-symbols-rounded {
  font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48;
}
</style>
