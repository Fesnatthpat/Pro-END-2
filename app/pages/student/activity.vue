<template>
  <div class="min-h-screen py-8 px-4 bg-[#f8f9fa]">
    <div class="max-w-[1000px] mx-auto w-full">
      
      <div class="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <NuxtLink to="/student" class="flex items-center gap-2 text-gray-500 hover:text-[#1a1a40] transition-colors mb-2 font-medium w-fit">
            <span class="material-symbols-rounded">arrow_back</span> กลับหน้าหลัก
          </NuxtLink>
          <h2 class="font-bold text-[24px] md:text-[28px] text-[#1a1a40] flex items-center gap-3">
            <span class="material-symbols-rounded text-indigo-600">history_edu</span> ประวัติกิจกรรมและสถานะโครงงาน
          </h2>
          <p class="text-gray-500 mt-1">ติดตามทุกความเคลื่อนไหวและการอัปเดตของโครงงานคุณได้ที่นี่</p>
        </div>
      </div>

      <div v-if="pending" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>

      <div v-else-if="!project" class="bg-white rounded-[32px] p-16 text-center shadow-sm border border-gray-100">
        <div class="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          <span class="material-symbols-rounded">folder_off</span>
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">ไม่พบข้อมูลโครงงาน</h3>
        <p class="text-gray-400 text-sm">คุณยังไม่ได้ยื่นเสนอหัวข้อโครงงานเข้าสู่ระบบครับ</p>
      </div>

      <div v-else>
        <!-- สรุปสถานะปัจจุบัน -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div class="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100 flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <span class="material-symbols-rounded">ads_click</span>
            </div>
            <div>
              <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">ขั้นตอนปัจจุบัน</div>
              <div class="text-sm font-bold text-[#1a1a40]">{{ getStepName(project.step) }}</div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100 flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <span class="material-symbols-rounded">sync</span>
            </div>
            <div>
              <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">สถานะล่าสุด</div>
              <div class="text-sm font-bold" :class="project.status === 'approved' ? 'text-emerald-600' : 'text-amber-600'">
                {{ getStatusText(project.status) }}
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100 flex items-center gap-4">
            <div class="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <span class="material-symbols-rounded">update</span>
            </div>
            <div>
              <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">อัปเดตเมื่อ</div>
              <div class="text-sm font-bold text-[#1a1a40]">{{ formatDateShort(project.updatedAt) }}</div>
            </div>
          </div>
        </div>

        <!-- คอมโพเนนต์ไทม์ไลน์ -->
        <ActivityTimeline :project-id="project.id" />
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

definePageMeta({ layout: 'student' })

const { data: projectData, pending } = await useFetch('/api/student/my-project')
const project = computed(() => projectData.value?.project)

const getStepName = (step) => {
  const steps = {
    1: 'ยื่นเสนอหัวข้อ (CP1)',
    2: 'รายงานความก้าวหน้า',
    3: 'ส่งเล่มฉบับร่าง',
    4: 'ยื่นคำร้องขอสอบจบ',
    5: 'ส่งเล่มสมบูรณ์'
  }
  return steps[step] || 'ไม่ระบุ'
}

const getStatusText = (status) => {
  const maps = {
    'pending': 'รอการตรวจสอบ',
    'approved': 'อนุมัติเรียบร้อย',
    'rejected': 'ไม่ผ่าน/ให้แก้ไข',
    'revision': 'รอการแก้ไข'
  }
  return maps[status] || status
}

const formatDateShort = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('th-TH', { 
    day: 'numeric', month: 'short', year: '2-digit'
  })
}
</script>
