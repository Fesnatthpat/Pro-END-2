<template>
  <div class="min-h-screen py-8 px-4 bg-[#f8f9fa] dark:bg-slate-900">
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
          <h2 class="md: text-[#1a1a40] dark:text-white leading-tight tracking-tight text-2xl md:text-3xl font-bold">
            คำร้องขอสอบจบโครงงาน
          </h2>
          <p class="text-slate-500 dark:text-slate-400 mt-2 font-medium flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
            ขั้นตอนการประเมินผลสัมฤทธิ์ของโครงงานคอมพิวเตอร์
          </p>
        </div>
        <div class="shrink-0 bg-white dark:bg-slate-800 px-5 py-3 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <span class="material-symbols-rounded">school</span>
          </div>
          <div>
            <div class="text-xs font-black text-slate-400 uppercase tracking-widest">สถานะปัจจุบัน</div>
            <div class="text-sm font-black text-slate-700 dark:text-slate-300">{{ getProjectStepStatus() }}</div>
          </div>
        </div>
      </div>

      <!-- Main Status Card -->
      <div class="bg-white dark:bg-slate-800 p-8 rounded-[32px] border border-gray-100 dark:border-slate-700 shadow-sm mb-10 max-w-3xl mx-auto relative animate-[fadeIn_0.5s_ease-out]">
        
        <div v-if="finalExam">
          <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-slate-700">
            <div class="mb-4 md:mb-0">
              <h3 class="text-xl font-bold text-[#1a1a40] dark:text-white">ตารางการสอบถูกกำหนดแล้ว</h3>
              <p class="text-sm text-gray-500 dark:text-slate-400">เจ้าหน้าที่ยืนยันวันเวลาสอบเรียบร้อยแล้ว</p>
            </div>
            <div class="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 self-start md:self-auto">
              <span class="w-2 h-2 rounded-full bg-current animate-pulse"></span>
              Confirmed
            </div>
          </div>

          <div class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
                <div class="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-blue-600 shadow-sm flex items-center justify-center text-xl shrink-0">
                  <span class="material-symbols-rounded">calendar_month</span>
                </div>
                <div>
                  <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">วันที่สอบ</div>
                  <div class="text-sm font-bold text-[#1a1a40] dark:text-white">{{ formatDate(finalExam.examDate) }}</div>
                </div>
              </div>
              <div class="flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
                <div class="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-amber-600 shadow-sm flex items-center justify-center text-xl shrink-0">
                  <span class="material-symbols-rounded">schedule</span>
                </div>
                <div>
                  <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">เวลาเริ่มต้น</div>
                  <div class="text-sm font-bold text-[#1a1a40] dark:text-white">{{ finalExam.examTime }} น.</div>
                </div>
              </div>
            </div>

            <div class="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
              <div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-rose-600 shadow-sm flex items-center justify-center text-2xl shrink-0">
                <span class="material-symbols-rounded">location_on</span>
              </div>
              <div class="flex-grow">
                <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">สถานที่/ห้องสอบ</div>
                <div class="text-sm font-bold text-[#1a1a40] dark:text-white">{{ finalExam.examLocation }}</div>
              </div>
              <NuxtLink to="/student/cp3" class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1a1a40] text-white font-bold text-sm hover:bg-indigo-600 transition-all shadow-md mt-4 md:mt-0">
                <span class="material-symbols-rounded text-base">print</span> พิมพ์ใบ CP3
              </NuxtLink>
            </div>
          </div>
        </div>

        <div v-else class="relative z-10">
          <!-- Passed State -->
          <div v-if="project?.step >= 5" class="text-center py-8 animate-[fadeIn_0.6s_ease-out]">
            <div class="relative w-32 h-32 mx-auto mb-8">
              <div class="absolute inset-0 bg-emerald-400/20 rounded-full animate-ping"></div>
              <div
                class="relative w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-full flex items-center justify-center text-6xl shadow-2xl shadow-emerald-200 dark:shadow-none">
                <span class="material-symbols-rounded text-6xl">verified</span>
              </div>
            </div>
            <h3 class="text-[#1a1a40] dark:text-white mb-4 text-xl md:text-2xl font-bold">ผ่านการสอบจบเรียบร้อยแล้ว</h3>
            <p class="text-slate-500 dark:text-slate-400 max-w-[500px] mx-auto mb-10 text-lg leading-relaxed">
              ขอแสดงความยินดีด้วย! คุณผ่านขั้นตอนการสอบจบแล้ว
              ขั้นตอนสุดท้ายคือการส่งเล่มวิทยานิพนธ์และโปรแกรมฉบับสมบูรณ์เข้าสู่ระบบครับ
            </p>
            <NuxtLink to="/student/final-submit"
              class="inline-flex items-center gap-3 px-12 py-5 bg-[#1a1a40] text-white rounded-[24px] font-black text-lg hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-200 dark:shadow-none hover:-translate-y-1 active:scale-95 group">
              ไปหน้าส่งงานฉบับสมบูรณ์
              <span class="material-symbols-rounded group-hover:translate-x-1 transition-transform">rocket_launch</span>
            </NuxtLink>
          </div>

          <!-- Pending Scheduling State -->
          <div v-else-if="project?.step === 4 && project?.status === 'pending'" class="animate-[fadeIn_0.6s_ease-out]">
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-slate-700">
              <div class="mb-4 md:mb-0">
                <h3 class="text-xl font-bold text-[#1a1a40] dark:text-white">คำร้องขอสอบจบโครงงาน</h3>
                <p class="text-sm text-gray-500 dark:text-slate-400">แอดมินกำลังดำเนินการจัดหาวันเวลาและสถานที่สอบที่เหมาะสมให้คุณครับ</p>
              </div>
              <div class="bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 self-start md:self-auto">
                <span class="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                อยู่ระหว่างจัดตารางสอบ
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
                <div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-indigo-600 shadow-sm flex items-center justify-center text-2xl shrink-0">
                  <span class="material-symbols-rounded">title</span>
                </div>
                <div class="flex-grow">
                  <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ชื่อโครงงาน (ภาษาไทย)</div>
                  <div class="text-base font-bold text-[#1a1a40] dark:text-white">{{ project?.titleTh }}</div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
                  <div class="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-blue-600 shadow-sm flex items-center justify-center text-xl shrink-0">
                    <span class="material-symbols-rounded">person_pin</span>
                  </div>
                  <div>
                    <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">อาจารย์ที่ปรึกษาหลัก</div>
                    <div class="text-sm font-bold text-[#1a1a40] dark:text-white">{{ project?.advisor?.fullname || '-' }}</div>
                  </div>
                </div>
                <div class="flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
                  <div class="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 text-emerald-600 shadow-sm flex items-center justify-center text-xl shrink-0">
                    <span class="material-symbols-rounded">group</span>
                  </div>
                  <div>
                    <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">อาจารย์ที่ปรึกษาร่วม</div>
                    <div class="text-sm font-bold text-[#1a1a40] dark:text-white">{{ project?.coAdvisor?.fullname || '-' }}</div>
                  </div>
                </div>
              </div>
              
              <div class="flex flex-col md:flex-row md:items-center gap-6 p-6 rounded-2xl bg-gray-50/50 border border-gray-100 dark:border-slate-700">
                <div class="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-amber-500 shadow-sm flex items-center justify-center text-2xl shrink-0">
                  <span class="material-symbols-rounded">hourglass_empty</span>
                </div>
                <div class="flex-grow">
                  <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ข้อมูลการยื่นคำร้อง</div>
                  <div class="text-sm font-bold text-[#1a1a40] dark:text-white">คุณได้ยื่นคำร้องเรียบร้อยแล้ว รอการจัดตารางสอบ</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Initial Submission State -->
          <div v-else class="text-center py-10">
            <div class="w-28 h-28 bg-blue-50 text-blue-600 rounded-[35px] flex items-center justify-center mx-auto mb-8 rotate-12 group-hover:rotate-0 transition-transform duration-500">
              <span class="material-symbols-rounded text-5xl">grading</span>
            </div>
            <h3 class="text-[#1a1a40] dark:text-white mb-4 text-xl md:text-2xl font-bold">ยื่นคำร้องขอสอบจบโครงงาน</h3>
            <p class="text-slate-500 dark:text-slate-400 max-w-[500px] mx-auto mb-10 text-lg leading-relaxed">
              กรุณาตรวจสอบข้อมูลโครงงานให้ถูกต้องก่อนกดยื่นคำร้อง
              เมื่อยื่นแล้วระบบจะแจ้งไปยังแอดมินเพื่อจัดตารางสอบให้ครับ
            </p>
            <button @click="handleNotifyReadiness" :disabled="submitting"
              class="inline-flex items-center gap-3 px-12 py-5 bg-[#1a1a40] text-white rounded-[24px] font-black text-lg hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-200 dark:shadow-none hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:pointer-events-none group">
              <span class="material-symbols-rounded group-hover:-translate-y-1 transition-transform" :class="{ 'animate-spin': submitting }">
                {{ submitting ? 'progress_activity' : 'send' }}
              </span>
              {{ submitting ? 'กำลังยื่นคำร้อง...' : 'ยื่นคำร้องขอสอบจบ' }}
            </button>
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
const isAdmin = computed(() => user?.role === 'admin' || user?.role === 'teacher')

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
  if (project.value.step === 4 && project.value.status === 'pending') return 'ยื่นคำร้องสอบจบแล้ว'
  if (project.value.step === 4) return 'พร้อมยื่นคำร้องสอบจบ'
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
