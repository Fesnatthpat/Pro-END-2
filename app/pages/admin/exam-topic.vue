<template>
  <div class="p-4 md:p-8 font-['PROMPT',_sans-serif]">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h2 class="font-bold text-slate-900 text-2xl md:text-3xl mb-1">คำร้องขอสอบหัวข้อ (CP1)</h2>
        <p class="text-slate-500 text-sm">จัดการคำร้องและตารางนัดสอบ</p>
      </div>
      
      <div class="flex bg-white rounded-full p-1 shadow-sm border border-slate-100">
        <button @click="activeTab = 'waiting'" 
                :class="activeTab === 'waiting' ? 'bg-[#1a1a40] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'"
                class="px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 text-nowrap">
          <i class="bi bi-inbox"></i> รอดำเนินการ
          <span v-if="waitList.length > 0" class="bg-rose-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full ml-1">{{ waitList.length }}</span>
        </button>
        <button @click="activeTab = 'scheduled'" 
                :class="activeTab === 'scheduled' ? 'bg-[#1a1a40] text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'"
                class="px-6 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 text-nowrap">
          <i class="bi bi-calendar-check"></i> ตารางนัดสอบ
          <span v-if="scheduleList.length > 0" class="bg-indigo-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full ml-1">{{ scheduleList.length }}</span>
        </button>
      </div>
    </div>

    <!-- Tab: รอดำเนินการ -->
    <div v-if="activeTab === 'waiting'" class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 min-h-[500px] animate-[fadeIn_0.3s_ease-in-out]">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b-2 border-slate-100 text-slate-400 text-[15px]">
              <th class="pb-4 font-medium px-4">ชื่อโครงงาน</th>
              <th class="pb-4 font-medium">ผู้วิจัย</th>
              <th class="pb-4 font-medium">วันที่ยื่นคำร้อง</th>
              <th class="pb-4 font-medium text-center">เอกสาร (CP1)</th>
              <th class="pb-4 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in waitList" :key="item.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td class="py-4 px-4 font-bold text-slate-800 text-[15px] max-w-[300px] truncate" :title="item.titleTh">{{ item.titleTh }}</td>
              <td class="py-4 text-slate-600">
                <div class="flex flex-col gap-1">
                  <div class="text-md">{{ item.student1?.fullname }}</div>
                  <div class="text-md" v-if="item.student2">{{ item.student2.fullname }}</div>
                </div>
              </td>
              <td class="py-4 text-slate-500 text-md">{{ formatDate(item.updatedAt) }}</td>
              <td class="py-4 text-center">
                <NuxtLink :to="`/student/cp1?projectId=${item.id}`" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-bold shadow-sm transition-colors">
                  <i class="bi bi-file-earmark-pdf text-rose-500 text-base"></i> View
                </NuxtLink>
              </td>
              <td class="py-4 text-center">
                <button @click="openScheduleModal(item)" class="bg-white border-2 border-[#1a1a40] text-[#1a1a40] hover:bg-[#1a1a40] hover:text-white px-5 py-1.5 rounded-full text-sm font-bold transition-colors shadow-sm">
                  ระบุวันสอบ
                </button>
              </td>
            </tr>
            <tr v-if="waitList.length === 0">
              <td colspan="5" class="py-10 text-center text-slate-400 font-medium">ไม่มีรายการคำร้องขอสอบหัวข้อ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tab: ตารางนัดสอบ -->
    <div v-if="activeTab === 'scheduled'" class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 min-h-[500px] animate-[fadeIn_0.3s_ease-in-out]">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b-2 border-slate-100 text-slate-400 text-[15px]">
              <th class="pb-4 font-medium px-4">วันสอบ</th>
              <th class="pb-4 font-medium">เวลา</th>
              <th class="pb-4 font-medium text-center">ห้อง</th>
              <th class="pb-4 font-medium">ผู้วิจัย</th>
              <th class="pb-4 font-medium text-center">เอกสาร (CP1)</th>
              <th class="pb-4 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in scheduleList" :key="item.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              <td class="py-4 px-4 font-bold text-[#1a1a40] text-lg">{{ formatDate(item.exams?.find(e => e.type === 'CP1' && e.status === 'pending')?.examDate) }}</td>
              <td class="py-4 font-bold text-slate-700">{{ item.exams?.find(e => e.type === 'CP1' && e.status === 'pending')?.examTime || '-' }}</td>
              <td class="py-4 text-center">
                <span class="bg-slate-100 border border-slate-200 text-slate-700 px-3 py-1 rounded-lg text-sm font-bold">{{ item.exams?.find(e => e.type === 'CP1' && e.status === 'pending')?.examLocation || '-' }}</span>
              </td>
              <td class="py-4 text-slate-600">
                <div class="flex flex-col gap-1">
                  <div class="text-md">{{ item.student1?.fullname }}</div>
                  <div class="text-md" v-if="item.student2">{{ item.student2.fullname }}</div>
                </div>
              </td>
              <td class="py-4 text-center">
                <NuxtLink :to="`/student/cp1?projectId=${item.id}`" target="_blank" class="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-bold shadow-sm transition-colors">
                  <i class="bi bi-file-earmark-pdf text-rose-500 text-base"></i> View
                </NuxtLink>
              </td>
              <td class="py-4 text-center">
                <button @click="openResultModal(item)" class="bg-[#1a1a40] hover:bg-emerald-600 text-white px-5 py-1.5 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 mx-auto">
                  <i class="bi bi-clipboard-check"></i> บันทึกผลสอบ
                </button>
              </td>
            </tr>
            <tr v-if="scheduleList.length === 0">
              <td colspan="6" class="py-10 text-center text-slate-400 font-medium">ยังไม่มีตารางนัดสอบ</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal จัดตารางสอบ -->
    <div v-if="showScheduleModal" class="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div class="bg-white w-full max-w-[650px] rounded-[32px] p-10 shadow-2xl relative" @click.stop>
        
        <button @click="showScheduleModal = false" class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
          <i class="bi bi-x-lg text-xl"></i>
        </button>

        <h3 class="font-bold text-[28px] text-center text-slate-900 mb-10">ระบุวันสอบหัวข้อ (CP1)</h3>
        
        <form @submit.prevent="saveSchedule" class="space-y-6">
          <div class="flex flex-col gap-2">
            <label class="font-bold text-slate-700 text-lg">วันที่</label>
            <input type="date" v-model="scheduleForm.date" required class="w-full bg-white border-2 border-slate-200 text-slate-700 text-lg rounded-2xl px-5 py-4 outline-none focus:border-[#1a1a40] transition-colors cursor-pointer">
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-bold text-slate-700 text-lg">เวลา</label>
            <div class="flex items-center gap-4">
              <select v-model="scheduleForm.startTime" required class="flex-1 bg-white border-2 border-slate-200 text-slate-700 text-lg rounded-2xl px-5 py-4 outline-none focus:border-[#1a1a40] transition-colors cursor-pointer">
                <option value="" disabled>เวลาเริ่มต้น</option>
                <option v-for="time in timeOptions" :key="time" :value="time">{{ time }} น.</option>
              </select>
              <span class="font-bold text-slate-400">ถึง</span>
              <select v-model="scheduleForm.endTime" required class="flex-1 bg-white border-2 border-slate-200 text-slate-700 text-lg rounded-2xl px-5 py-4 outline-none focus:border-[#1a1a40] transition-colors cursor-pointer">
                <option value="" disabled>เวลาสิ้นสุด</option>
                <option v-for="time in timeOptions" :key="time" :value="time">{{ time }} น.</option>
              </select>
            </div>
          </div>
          
          <div class="flex flex-col gap-2">
            <label class="font-bold text-slate-700 text-lg">ห้อง</label>
            <input type="text" v-model="scheduleForm.room" placeholder="เช่น 6125" required class="w-full bg-white border-2 border-slate-200 text-slate-700 text-lg rounded-2xl px-5 py-4 outline-none focus:border-[#1a1a40] transition-colors">
          </div>
          
          <button type="submit" :disabled="isSubmittingSchedule" class="w-full bg-[#1a1a40] hover:bg-[#2c2c54] text-white font-bold text-xl py-4 rounded-[20px] mt-8 shadow-xl flex justify-center items-center gap-3 transition-transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0">
            <i v-if="isSubmittingSchedule" class="bi bi-arrow-repeat animate-spin text-2xl"></i>
            <i v-else class="bi bi-calendar-plus-fill"></i> 
            <span v-if="isSubmittingSchedule">กำลังบันทึกข้อมูล...</span>
            <span v-else>ยืนยันตารางสอบ</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Modal บันทึกผลสอบ -->
    <div v-if="showResultModal" class="fixed inset-0 z-[101] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div class="bg-white w-full max-w-[850px] rounded-[32px] p-8 md:p-12 shadow-2xl relative" @click.stop>
        
        <button @click="showResultModal = false" class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-rose-600 transition-all">
          <i class="bi bi-x-lg text-xl"></i>
        </button>

        <div class="text-center mb-10">
          <h3 class="font-bold text-3xl text-slate-900">บันทึกผลสอบหัวข้อ (CP1)</h3>
          <p class="text-slate-500 mt-2">ยืนยันผลการพิจารณาหัวข้อโครงงาน</p>
        </div>

        <form @submit.prevent="saveResult" class="space-y-8">
          
          <div class="flex flex-col gap-3">
            <label class="font-bold text-slate-700 text-lg">ผลการพิจารณา</label>
            <div class="flex gap-4 w-full">
              <label class="flex-1 cursor-pointer group">
                <input type="radio" v-model="resultForm.status" value="pass" class="hidden peer">
                <div class="px-6 py-4 rounded-2xl border-2 border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/30 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 text-slate-400 peer-checked:text-emerald-600 font-bold transition-all text-center text-lg flex items-center justify-center gap-2">
                  <i class="bi bi-check-circle-fill text-xl"></i> ผ่าน
                </div>
              </label>
              <label class="flex-1 cursor-pointer group">
                <input type="radio" v-model="resultForm.status" value="fail" class="hidden peer">
                <div class="px-6 py-4 rounded-2xl border-2 border-slate-100 hover:border-rose-300 hover:bg-rose-50/30 peer-checked:border-rose-500 peer-checked:bg-rose-50 text-slate-400 peer-checked:text-rose-600 font-bold transition-all text-center text-lg flex items-center justify-center gap-2">
                  <i class="bi bi-x-circle-fill text-xl"></i> ไม่ผ่าน / แก้ไข
                </div>
              </label>
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-bold text-slate-700 text-lg">รายละเอียดการพิจารณา / ข้อเสนอแนะเพิ่มเติม</label>
            <textarea v-model="resultForm.details" rows="6" placeholder="กรอกข้อเสนอแนะสำหรับการแก้ไขหัวข้อ หรือระบุสาเหตุที่ไม่ผ่านอย่างละเอียด..." class="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-6 py-5 outline-none focus:bg-white focus:border-[#1a1a40] transition-all text-base text-slate-700 resize-none shadow-inner"></textarea>
          </div>

          <div class="flex gap-4 pt-4">
            <button @click="showResultModal = false" type="button" class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-2xl transition-all text-lg">
              ยกเลิก
            </button>
            <button type="submit" class="flex-[2] bg-[#1a1a40] hover:bg-[#2c2c54] text-white font-bold text-lg py-4 rounded-2xl shadow-xl flex justify-center items-center gap-2 transition-transform hover:-translate-y-1 active:scale-95">
              <i class="bi bi-save-fill"></i> ยืนยันผลสอบ
            </button>
          </div>
        </form>
      </div>
    </div>

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
const isSubmittingSchedule = ref(false)

const scheduleForm = ref({ projectId: null, date: '', startTime: '', endTime: '', room: '' })
const resultForm = ref({ projectId: null, status: 'pass', details: '' })

const timeOptions = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', 
  '17:00', '17:30', '18:00'
]

// ดึงข้อมูลจริงจาก API (Step 1 = ขอสอบหัวข้อ)
const { data: projectsData, pending, refresh } = await useFetch('/api/admin/projects-by-step', {
  query: { step: 1 }
})

const projects = computed(() => projectsData.value?.projects || [])

// แบ่งกลุ่มข้อมูล
const waitList = computed(() => projects.value.filter(p => p.status === 'pending' && (!p.exams || p.exams.length === 0)))
const scheduleList = computed(() => projects.value.filter(p => p.exams && p.exams.some(e => e.type === 'CP1' && e.status === 'pending')))

const openScheduleModal = (item) => {
  try {
    scheduleForm.value.projectId = item.id
    const pendingExam = item.exams?.find(e => e.type === 'CP1' && e.status === 'pending')
    
    if (pendingExam?.examDate) {
      const d = new Date(pendingExam.examDate)
      if (!isNaN(d.getTime())) {
        scheduleForm.value.date = d.toISOString().split('T')[0]
      } else {
        scheduleForm.value.date = ''
      }
    } else {
      scheduleForm.value.date = ''
    }
    
    const timeParts = pendingExam?.examTime ? pendingExam.examTime.split('-').map(s => s.trim()) : []
    scheduleForm.value.startTime = timeParts[0] || ''
    scheduleForm.value.endTime = timeParts[1] || ''
    
    scheduleForm.value.room = pendingExam?.examLocation || ''
    showScheduleModal.value = true
  } catch (err) {
    console.error('Error opening modal:', err)
    alerts.error('ข้อผิดพลาด', 'ไม่สามารถเปิดหน้าต่างจัดตารางสอบได้')
  }
}

const openResultModal = (item) => {
  const pendingExam = item.exams?.find(e => e.type === 'CP1' && e.status === 'pending')
  resultForm.value.projectId = item.id
  resultForm.value.status = 'pass'
  resultForm.value.details = ''
  showResultModal.value = true
}

const saveSchedule = async () => {
  isSubmittingSchedule.value = true
  try {
    const res = await $fetch('/api/admin/update-project', {
      method: 'POST',
      body: {
        projectId: scheduleForm.value.projectId,
        examDate: scheduleForm.value.date,
        examTime: `${scheduleForm.value.startTime} - ${scheduleForm.value.endTime}`,
        examLocation: scheduleForm.value.room,
        status: 'pending' // backend API update-project usually updates the current pending exam
      }
    })
    if (res.success) {
      showScheduleModal.value = false
      alerts.success('สำเร็จ!', 'จัดตารางสอบหัวข้อเรียบร้อยแล้ว')
      refresh()
    }
  } catch (error) {
    alerts.error('ข้อผิดพลาด', 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    isSubmittingSchedule.value = false
  }
}

const saveResult = async () => {
  const confirm = await alerts.confirm('ยืนยันบันทึกผล', 'คุณยืนยันการบันทึกผลการสอบหัวข้อครั้งนี้ใช่หรือไม่?', 'question')
  if (!confirm.isConfirmed) return

  try {
    const isPass = resultForm.value.status === 'pass'
    const res = await $fetch('/api/admin/update-project', {
      method: 'POST',
      body: {
        projectId: resultForm.value.projectId,
        status: isPass ? 'approved' : 'rejected', // CP1 ถ้าผ่านก็ approved เข้าสู่ขั้นตอน 2
        step: isPass ? 2 : 1, // ถ้าผ่านไป Step 2 (ดำเนินการโครงงาน)
        details: resultForm.value.details
      }
    })
    if (res.success) {
      alerts.success('สำเร็จ!', isPass ? 'บันทึกผลสอบผ่านแล้ว โปรเจกต์เข้าสู่ขั้นตอนดำเนินการโครงงาน' : 'บันทึกผลการสอบไม่ผ่านเรียบร้อยแล้ว')
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