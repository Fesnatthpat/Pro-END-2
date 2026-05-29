<template>
  <div class="mt-12 bg-white rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-100">
    <div class="flex items-center gap-3 mb-8">
      <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
        <span class="material-symbols-rounded">history</span>
      </div>
      <div>
        <h3 class="text-xl font-bold text-[#1a1a40]">ประวัติกิจกรรมและไทม์ไลน์</h3>
        <p class="text-sm text-gray-500">บันทึกการทำรายการทั้งหมดของโครงงาน</p>
      </div>
    </div>

    <div v-if="pending" class="flex justify-center py-10">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <div v-else-if="!timeline || timeline.length === 0" class="text-center py-10">
      <p class="text-gray-400 italic">ไม่พบข้อมูลประวัติกิจกรรม</p>
    </div>

    <div v-else class="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
      
      <!-- Timeline Item -->
      <div v-for="(item, index) in timeline" :key="index" class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
        <!-- Icon dot -->
        <div class="flex items-center justify-center w-10 h-10 rounded-full border border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-transform group-hover:scale-110" 
          :class="getStatusBg(item.status)">
          <span class="material-symbols-rounded text-white text-xl">{{ item.icon }}</span>
        </div>
        
        <!-- Content card -->
        <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all">
          <div class="flex items-center justify-between mb-2">
            <time class="font-black text-[10px] text-indigo-400 uppercase tracking-widest">{{ formatDate(item.date) }}</time>
            <span :class="getStatusTextClass(item.status)" class="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-full bg-gray-50 border">
              {{ getStatusLabel(item.status) }}
            </span>
          </div>
          <div class="text-base font-black text-[#1a1a40] mb-1">{{ item.title }}</div>
          <p class="text-sm text-gray-500 leading-relaxed mb-4">{{ item.description }}</p>

          <!-- Extra details based on type -->
          <div v-if="item.type === 'final_submit' && item.details" class="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
            <a v-if="item.details.thesisUrl" :href="item.details.thesisUrl" target="_blank" class="flex items-center gap-2 text-xs text-blue-600 font-bold hover:underline">
              <span class="material-symbols-rounded text-sm">link</span> เล่มวิทยานิพนธ์
            </a>
            <a v-if="item.details.programUrl" :href="item.details.programUrl" target="_blank" class="flex items-center gap-2 text-xs text-emerald-600 font-bold hover:underline">
              <span class="material-symbols-rounded text-sm">link</span> ซอร์สโค้ดโปรแกรม
            </a>
          </div>

          <div v-if="item.fileUrl" class="mt-3">
             <a :href="item.fileUrl" target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 text-[11px] font-bold hover:bg-indigo-600 hover:text-white transition-all">
              <span class="material-symbols-rounded text-sm">attachment</span> ดูไฟล์แนบ
            </a>
          </div>

          <div v-if="item.feedback" class="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-100">
            <div class="text-[10px] font-black text-amber-600 uppercase mb-1">ความเห็นจากอาจารย์</div>
            <p class="text-xs text-amber-800 italic">"{{ item.feedback }}"</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  projectId: {
    type: Number,
    required: true
  }
})

const { data: historyData, pending } = await useFetch('/api/student/activity-history', {
  query: { projectId: props.projectId }
})

const timeline = computed(() => historyData.value?.timeline || [])

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('th-TH', { 
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

const getStatusLabel = (status) => {
  const maps = {
    'success': 'อนุมัติแล้ว/สำเร็จ',
    'approved': 'อนุมัติแล้ว',
    'pass': 'ผ่านการสอบ',
    'fail': 'ไม่ผ่านการสอบ',
    'error': 'ไม่ผ่าน/ให้แก้ไข',
    'rejected': 'ไม่ผ่าน',
    'info': 'ได้รับทราบแล้ว',
    'seen': 'เปิดอ่านแล้ว',
    'pending': 'รอการตรวจสอบ'
  }
  return maps[status] || 'อยู่ระหว่างดำเนินการ'
}

const getStatusBg = (status) => {
  if (status === 'success' || status === 'approved' || status === 'pass') return 'bg-emerald-500 shadow-emerald-100'
  if (status === 'error' || status === 'rejected' || status === 'fail') return 'bg-rose-500 shadow-rose-100'
  if (status === 'info' || status === 'seen') return 'bg-blue-500 shadow-blue-100'
  return 'bg-amber-500 shadow-amber-100'
}

const getStatusTextClass = (status) => {
  if (status === 'success' || status === 'approved' || status === 'pass') return 'text-emerald-600 border-emerald-100'
  if (status === 'error' || status === 'rejected' || status === 'fail') return 'text-rose-600 border-rose-100'
  if (status === 'info' || status === 'seen') return 'text-blue-600 border-blue-100'
  return 'text-amber-600 border-amber-100'
}
</script>
