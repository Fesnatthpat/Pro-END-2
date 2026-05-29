<template>
  <div class="p-4 md:p-10 font-['Prompt',_sans-serif]">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
      <div class="relative">
        <div class="flex items-center gap-2 text-rose-500 font-black mb-2 uppercase tracking-widest text-xs">
          <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          Final Defense Management
        </div>
        <h2 class="font-bold text-slate-900 text-3xl md:text-4xl mb-2 tracking-tight">คำร้องขอสอบจบ (CP2/CP3)</h2>
        <div class="flex items-center gap-2 text-slate-500">
          <span class="w-8 h-px bg-slate-200"></span>
          <p class="text-sm font-medium">จัดการคำร้องสอบจบและบันทึกผลการประเมินขั้นสุดท้าย</p>
        </div>
      </div>
      
      <div class="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 shadow-inner">
        <button @click="activeTab = 'waiting'" 
                :class="activeTab === 'waiting' ? 'bg-white text-rose-600 shadow-md font-bold' : 'text-slate-500 hover:text-slate-700'"
                class="px-8 py-3 rounded-xl text-sm transition-all flex items-center gap-2 text-nowrap">
          <span class="material-symbols-rounded text-[20px]">hourglass_empty</span> 
          <span>รอดำเนินการ</span>
          <span v-if="waitList.length" class="ml-1 w-5 h-5 flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-black">{{ waitList.length }}</span>
        </button>
        <button @click="activeTab = 'scheduled'" 
                :class="activeTab === 'scheduled' ? 'bg-white text-rose-600 shadow-md font-bold' : 'text-slate-500 hover:text-slate-700'"
                class="px-8 py-3 rounded-xl text-sm transition-all flex items-center gap-2 text-nowrap">
          <span class="material-symbols-rounded text-[20px]">event_available</span> 
          <span>นัดสอบแล้ว</span>
        </button>
      </div>
    </div>

    <div class="admin-card bg-white overflow-hidden">
      
      <!-- Waiting Tab -->
      <div v-if="activeTab === 'waiting'" class="animate-[fadeIn_0.3s_ease-out]">
        <div class="overflow-x-auto">
          <table class="w-full text-left min-w-[900px]">
            <thead>
              <tr class="bg-slate-50/50">
                <th class="px-8 py-5 admin-table-header">ข้อมูลโครงงาน</th>
                <th class="px-8 py-5 admin-table-header">ผู้วิจัย</th>
                <th class="px-8 py-5 admin-table-header">วันที่ยื่นคำร้อง</th>
                <th class="px-8 py-5 admin-table-header text-center">เอกสาร (CP2/CP3)</th>
                <th class="px-8 py-5 admin-table-header text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50 text-sm">
              <tr v-for="item in waitList" :key="item.id" class="admin-table-row group/row">
                <td class="px-8 py-6 max-w-[300px]">
                  <div class="font-bold text-slate-800 text-base mb-1 truncate" :title="item.titleTh">{{ item.titleTh }}</div>
                  <div class="text-xs text-slate-400 font-medium truncate">{{ item.titleEn }}</div>
                </td>
                <td class="px-8 py-6">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-xs border border-slate-200">
                      {{ item.student1.fullname.charAt(0) }}
                    </div>
                    <span class="font-bold text-slate-700">{{ item.student1.fullname }}</span>
                  </div>
                </td>
                <td class="px-8 py-6">
                  <div class="flex items-center gap-2 text-slate-500 font-medium">
                    <span class="material-symbols-rounded text-slate-300 text-[18px]">event</span>
                    {{ formatDate(item.updatedAt) }}
                  </div>
                </td>
                <td class="px-8 py-6">
                  <div class="flex items-center justify-center gap-3">
                    <NuxtLink :to="`/student/cp2?projectId=${item.id}`" target="_blank" class="px-3 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all font-black text-[10px] tracking-widest border border-indigo-100 flex items-center gap-1.5">
                      <span class="material-symbols-rounded text-[16px]">picture_as_pdf</span> CP2
                    </NuxtLink>
                    <NuxtLink :to="`/student/cp3?projectId=${item.id}`" target="_blank" class="px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all font-black text-[10px] tracking-widest border border-rose-100 flex items-center gap-1.5">
                      <span class="material-symbols-rounded text-[16px]">picture_as_pdf</span> CP3
                    </NuxtLink>
                  </div>
                </td>
                <td class="px-8 py-6 text-center">
                  <button @click="openScheduleModal(item)" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white hover:bg-rose-600 transition-all font-bold text-sm shadow-md shadow-slate-100 active:scale-95">
                    <span class="material-symbols-rounded text-[18px]">calendar_add_on</span>
                    <span>ระบุวันสอบ</span>
                  </button>
                </td>
              </tr>
              <tr v-if="waitList.length === 0">
                <td colspan="5" class="px-8 py-24 text-center">
                  <div class="w-20 h-20 bg-slate-50 text-slate-200 rounded-[28px] flex items-center justify-center mx-auto mb-6">
                    <span class="material-symbols-rounded text-6xl">hourglass_empty</span>
                  </div>
                  <p class="font-bold text-slate-400 text-lg">ไม่มีรายการคำร้องใหม่</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Scheduled Tab -->
      <div v-if="activeTab === 'scheduled'" class="animate-[fadeIn_0.3s_ease-out]">
        <div class="overflow-x-auto">
          <table class="w-full text-left min-w-[900px]">
            <thead>
              <tr class="bg-slate-50/50">
                <th class="px-8 py-5 admin-table-header">วัน/เวลาสอบจบ</th>
                <th class="px-8 py-5 admin-table-header text-center">สถานที่/ห้อง</th>
                <th class="px-8 py-5 admin-table-header">ข้อมูลโครงงาน & ผู้วิจัย</th>
                <th class="px-8 py-5 admin-table-header text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-50 text-sm">
              <tr v-for="item in scheduleList" :key="item.id" class="admin-table-row group/row">
                <td class="px-8 py-6">
                  <div v-if="item.exams?.find(e => e.type === 'CP2' && e.status === 'pending')" class="flex items-center gap-4">
                    <div class="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 group-hover/row:scale-110 transition-transform">
                      <span class="text-[10px] font-black text-rose-400 uppercase tracking-tighter">{{ new Date(item.exams.find(e => e.type === 'CP2' && e.status === 'pending').examDate).toLocaleDateString('th-TH', { month: 'short' }) }}</span>
                      <span class="text-xl font-black text-rose-600 leading-none">{{ new Date(item.exams.find(e => e.type === 'CP2' && e.status === 'pending').examDate).getDate() }}</span>
                    </div>
                    <div>
                      <div class="font-black text-slate-800 text-base">{{ formatDate(item.exams.find(e => e.type === 'CP2' && e.status === 'pending').examDate) }}</div>
                      <div class="text-rose-500 font-bold text-xs flex items-center gap-1">
                        <span class="material-symbols-rounded text-sm">schedule</span>
                        {{ item.exams.find(e => e.type === 'CP2' && e.status === 'pending').examTime }} น.
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-8 py-6 text-center">
                  <div v-if="item.exams?.find(e => e.type === 'CP2' && e.status === 'pending')" class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 text-slate-600 font-bold border border-slate-100">
                    <span class="material-symbols-rounded text-[18px]">location_on</span>
                    {{ item.exams.find(e => e.type === 'CP2' && e.status === 'pending').examLocation }}
                  </div>
                </td>
                <td class="px-8 py-6">
                  <div class="font-bold text-slate-800 mb-2 truncate max-w-[250px]" :title="item.titleTh">{{ item.titleTh }}</div>
                  <div class="flex items-center gap-3 mb-2">
                    <NuxtLink :to="`/student/cp2?projectId=${item.id}`" target="_blank" class="px-2 py-1 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all font-black text-[9px] tracking-widest border border-indigo-100 flex items-center gap-1">
                      <span class="material-symbols-rounded text-[14px]">picture_as_pdf</span> CP2
                    </NuxtLink>
                    <NuxtLink :to="`/student/cp3?projectId=${item.id}`" target="_blank" class="px-2 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-all font-black text-[9px] tracking-widest border border-rose-100 flex items-center gap-1">
                      <span class="material-symbols-rounded text-[14px]">picture_as_pdf</span> CP3
                    </NuxtLink>
                  </div>
                  <div class="text-slate-400 font-medium flex items-center gap-1.5">
                    <span class="material-symbols-rounded text-sm">person</span>
                    {{ item.student1.fullname }}
                  </div>
                </td>
                <td class="px-8 py-6 text-center">
                  <button @click="openResultModal(item)" class="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-all font-bold text-sm shadow-md shadow-emerald-100 active:scale-95">
                    <span class="material-symbols-rounded text-[18px]">how_to_reg</span>
                    <span>บันทึกผลสอบจบ</span>
                  </button>
                </td>
              </tr>
              <tr v-if="scheduleList.length === 0">
                <td colspan="4" class="px-8 py-24 text-center">
                  <div class="w-20 h-20 bg-slate-50 text-slate-200 rounded-[28px] flex items-center justify-center mx-auto mb-6">
                    <span class="material-symbols-rounded text-6xl">event_busy</span>
                  </div>
                  <p class="font-bold text-slate-400 text-lg">ยังไม่มีตารางนัดสอบจบ</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- Modals -->
    <Transition name="fade">
      <!-- Schedule Modal -->
      <div v-if="showScheduleModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <div class="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden animate-[fadeIn_0.3s_ease-out] border border-white/20">
          <div class="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-200">
                <span class="material-symbols-rounded">calendar_add_on</span>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 tracking-tight">ระบุวันสอบจบ</h3>
            </div>
            <button @click="showScheduleModal = false" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
              <span class="material-symbols-rounded">close</span>
            </button>
          </div>
          
          <form @submit.prevent="saveSchedule" class="p-8 space-y-6">
            <div class="space-y-1.5">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">วันที่สอบ</label>
              <input type="date" v-model="scheduleForm.date" required class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50">
            </div>
            
            <div class="grid grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">เวลาสอบ</label>
                <!-- ปรับเป็น type="time" -->
                <input type="time" v-model="scheduleForm.time" required class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50">
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">สถานที่ / ห้อง</label>
                <input type="text" v-model="scheduleForm.room" placeholder="เช่น ห้อง 6125" required class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50">
              </div>
            </div>

            <div class="pt-4">
              <button type="submit" class="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-rose-100 transition-all active:scale-95 flex items-center justify-center gap-3">
                <span class="material-symbols-rounded">save</span>
                <span>ยืนยันจัดตารางสอบจบ</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Result Modal -->
    <Transition name="fade">
      <div v-if="showResultModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <div class="bg-white rounded-[40px] shadow-2xl w-full max-w-xl overflow-hidden animate-[fadeIn_0.3s_ease-out] border border-white/20">
          <div class="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                <span class="material-symbols-rounded">how_to_reg</span>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 tracking-tight">บันทึกผลการสอบจบ</h3>
            </div>
            <button @click="showResultModal = false" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
              <span class="material-symbols-rounded">close</span>
            </button>
          </div>

          <form @submit.prevent="saveResult" class="p-8 space-y-6">
            
            <div class="flex flex-col gap-3">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">ผลการประเมินการสอบจบ</label>
              <div class="flex gap-4">
                <label class="flex-1 cursor-pointer group">
                  <input type="radio" v-model="resultForm.status" value="pass" class="hidden peer">
                  <div class="flex flex-col items-center gap-2 p-5 rounded-3xl border-2 border-slate-100 peer-checked:border-emerald-500 peer-checked:bg-emerald-50/50 transition-all hover:bg-slate-50 group-active:scale-95">
                    <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 peer-checked:bg-emerald-500 peer-checked:text-white flex items-center justify-center">
                      <span class="material-symbols-rounded" v-if="resultForm.status !== 'pass'">circle</span>
                      <span class="material-symbols-rounded" v-else>check_circle</span>
                    </div>
                    <span class="font-black text-sm" :class="resultForm.status === 'pass' ? 'text-emerald-700' : 'text-slate-500'">ผ่านการสอบ</span>
                  </div>
                </label>
                <label class="flex-1 cursor-pointer group">
                  <input type="radio" v-model="resultForm.status" value="fail" class="hidden peer">
                  <div class="flex flex-col items-center gap-2 p-5 rounded-3xl border-2 border-slate-100 peer-checked:border-rose-500 peer-checked:bg-rose-50/50 transition-all hover:bg-slate-50 group-active:scale-95">
                    <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-400 peer-checked:bg-rose-500 peer-checked:text-white flex items-center justify-center">
                      <span class="material-symbols-rounded" v-if="resultForm.status !== 'fail'">circle</span>
                      <span class="material-symbols-rounded" v-else>cancel</span>
                    </div>
                    <span class="font-black text-sm" :class="resultForm.status === 'fail' ? 'text-rose-700' : 'text-slate-500'">ไม่ผ่านการสอบ</span>
                  </div>
                </label>
              </div>
            </div>

            <div v-if="resultForm.status === 'pass'" class="space-y-1.5 animate-[fadeIn_0.3s_ease-out]">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">ผลการเรียน (Grade)</label>
              <div class="relative">
                <select v-model="resultForm.grade" class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50 appearance-none">
                  <option v-for="g in ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D']" :key="g" :value="g">Grade {{ g }}</option>
                </select>
                <span class="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">รายละเอียด / หมายเหตุ</label>
              <textarea v-model="resultForm.details" rows="3" placeholder="กรอกข้อเสนอแนะ การแก้ไขเล่มโครงงาน หรือสาเหตุที่ไม่ผ่าน..." class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10 outline-none transition-all text-sm font-medium bg-slate-50/50 resize-none"></textarea>
            </div>

            <div class="pt-4">
              <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-emerald-100 transition-all active:scale-95 flex items-center justify-center gap-3">
                <span class="material-symbols-rounded text-[22px]">cloud_done</span>
                <span>ยืนยันบันทึกผลการสอบจบ</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({ layout: 'admin' })

const alerts = useAlerts()
const activeTab = ref('waiting')
const showScheduleModal = ref(false)
const showResultModal = ref(false)

const scheduleForm = ref({ projectId: null, date: '', time: '', room: '' })
const resultForm = ref({ projectId: null, status: 'pass', grade: 'A', details: '' })

// ดึงข้อมูลจริงจาก API
const { data: projectsData, pending, refresh } = await useFetch('/api/admin/projects-by-step', {
  query: { step: 4 }
})

const projects = computed(() => projectsData.value?.projects || [])

// แบ่งกลุ่มข้อมูล
const waitList = computed(() => projects.value.filter(p => !p.exams || p.exams.length === 0))
const scheduleList = computed(() => projects.value.filter(p => p.exams && p.exams.some(e => e.type === 'CP2' && e.status === 'pending')))

const openScheduleModal = (item) => {
  scheduleForm.value.projectId = item.id
  const pendingExam = item.exams?.find(e => e.type === 'CP2' && e.status === 'pending')
  scheduleForm.value.date = pendingExam?.examDate ? new Date(pendingExam.examDate).toISOString().split('T')[0] : ''
  scheduleForm.value.time = pendingExam?.examTime || ''
  scheduleForm.value.room = pendingExam?.examLocation || ''
  showScheduleModal.value = true
}

const openResultModal = (item) => {
  const pendingExam = item.exams?.find(e => e.type === 'CP2' && e.status === 'pending')
  resultForm.value.projectId = item.id
  resultForm.value.status = 'pass'
  resultForm.value.grade = 'A'
  resultForm.value.details = ''
  showResultModal.value = true
}

const saveSchedule = async () => {
  try {
    const res = await $fetch('/api/admin/update-project', {
      method: 'POST',
      body: {
        projectId: scheduleForm.value.projectId,
        examDate: scheduleForm.value.date,
        examTime: scheduleForm.value.time,
        examLocation: scheduleForm.value.room,
        status: 'pending'
      }
    })
    if (res.success) {
      alerts.success('สำเร็จ!', 'จัดตารางสอบจบเรียบร้อยแล้ว')
      showScheduleModal.value = false
      refresh()
    }
  } catch (error) {
    alerts.error('ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}

const saveResult = async () => {
  const confirm = await alerts.confirm('ยืนยันบันทึกผล', 'คุณยืนยันการบันทึกผลการสอบจบครั้งนี้ใช่หรือไม่?', 'question')
  if (!confirm.isConfirmed) return

  try {
    const isPass = resultForm.value.status === 'pass'
    const res = await $fetch('/api/admin/update-project', {
      method: 'POST',
      body: {
        projectId: resultForm.value.projectId,
        status: isPass ? 'pending' : 'rejected', // เปลี่ยนจาก approved เป็น pending เพื่อให้ไปรอนักศึกษาส่งเล่มสมบูรณ์ในขั้นตอนที่ 5
        step: isPass ? 5 : 4,
        details: resultForm.value.details
      }
    })
    if (res.success) {
      alerts.success('สำเร็จ!', isPass ? 'บันทึกผลการสอบผ่านแล้ว โปรเจกต์เข้าสู่ขั้นตอนการส่งเล่มสมบูรณ์' : 'บันทึกผลการสอบไม่ผ่านเรียบร้อยแล้ว')
      showResultModal.value = false
      refresh()
    }
  } catch (error) {
    alerts.error('ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('th-TH', { 
    day: 'numeric', month: 'long', year: 'numeric'
  })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>