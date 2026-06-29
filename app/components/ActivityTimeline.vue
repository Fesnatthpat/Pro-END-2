<template>
  <!-- ส่วนแสดงผลตารางประวัติกิจกรรมของโครงงาน (A4 / Dashboard style) -->
  <div class="mt-12 bg-white dark:bg-slate-800 rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
    <!-- หัวข้อหัวตาราง -->
    <div class="flex items-center gap-3 mb-8">
      <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
        <span class="material-symbols-rounded">list_alt</span>
      </div>
      <div>
        <h3 class="text-xl text-[#1a1a40] dark:text-white md:text-2xl font-bold">ตารางประวัติกิจกรรม</h3>
        <p class="text-sm text-gray-500 dark:text-slate-400">บันทึกการทำรายการทั้งหมดของโครงงาน</p>
      </div>
    </div>

    <!-- แสดงตัวหมุนเมื่ออยู่ระหว่างดึงข้อมูล (loading) -->
    <div v-if="pending" class="flex justify-center py-10">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <!-- กรณีไม่มีประวัติกิจกรรม -->
    <div v-else-if="!timeline || timeline.length === 0" class="text-center py-10">
      <p class="text-gray-400 italic">ไม่พบข้อมูลประวัติกิจกรรม</p>
    </div>

    <!-- แสดงตารางประวัติเมื่อมีข้อมูล -->
    <div v-else class="overflow-x-auto pb-4">
      <table class="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr class="bg-gray-50 dark:bg-slate-700/50 text-gray-600 dark:text-slate-300 text-sm border-b border-gray-100 dark:border-slate-700">
            <th class="px-6 py-4 font-bold rounded-tl-2xl w-[15%]">วันเดือนปี</th>
            <th class="px-6 py-4 font-bold w-[15%]">เวลา</th>
            <th class="px-6 py-4 font-bold w-[50%]">รายการ</th>
            <th class="px-6 py-4 font-bold rounded-tr-2xl w-[20%]">สถานะ</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
          <tr v-for="(item, index) in timeline" :key="index" class="hover:bg-gray-50/50 dark:hover:bg-slate-700/30 transition-colors group">
            <!-- วันที่บันทึก -->
            <td class="px-6 py-5 align-top">
              <div class="text-sm font-semibold text-gray-700 dark:text-slate-300 flex items-center gap-2">
                <span class="material-symbols-rounded text-gray-400 text-lg">calendar_today</span>
                {{ formatDateOnly(item.date) }}
              </div>
            </td>
            <!-- เวลาที่บันทึก -->
            <td class="px-6 py-5 align-top">
              <div class="text-sm font-bold text-indigo-500 dark:text-indigo-400 flex items-center gap-2">
                <span class="material-symbols-rounded text-indigo-300 text-lg">schedule</span>
                {{ formatTimeOnly(item.date) }} น.
              </div>
            </td>
            <!-- หัวข้อเรื่องและรายละเอียดกิจกรรม -->
            <td class="px-6 py-5 align-top">
              <div class="flex gap-4">
                <!-- วงกลมไอคอนแสดงประเภทสถานะพร้อมภาพสีสัน -->
                <div class="mt-0.5 flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-slate-800 shadow-sm shrink-0" 
                  :class="getStatusBg(item.status)">
                  <span class="material-symbols-rounded text-white text-lg">{{ item.icon }}</span>
                </div>
                <div>
                  <div class="text-base font-bold text-[#1a1a40] dark:text-white mb-1.5">{{ item.title }}</div>
                  <p class="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{{ item.description }}</p>

                  <!-- แสดงลิงก์เพิ่มเติมกรณีส่งเล่มปิดโครงงาน (Step 5) -->
                  <div v-if="item.type === 'final_submit' && item.details" class="mt-3 p-3 rounded-xl bg-gray-50 dark:bg-slate-800/80 border border-gray-100 dark:border-slate-700 space-y-2 inline-block">
                    <a v-if="item.details.thesisUrl" :href="item.details.thesisUrl" target="_blank" class="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
                      <span class="material-symbols-rounded text-sm">link</span> เล่มวิทยานิพนธ์
                    </a>
                    <a v-if="item.details.programUrl" :href="item.details.programUrl" target="_blank" class="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
                      <span class="material-symbols-rounded text-sm">link</span> ซอร์สโค้ดโปรแกรม
                    </a>
                  </div>

                  <!-- แสดงลิงก์เมื่อมีไฟล์แนบอ้างอิง -->
                  <div v-if="item.fileUrl" class="mt-3">
                     <a :href="item.fileUrl" target="_blank" class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all">
                      <span class="material-symbols-rounded text-sm">attachment</span> ดูไฟล์แนบ
                    </a>
                  </div>

                  <!-- แสดงคอมเม้นท์ความเห็นจากอาจารย์/แอดมิน (ถ้ามี) -->
                  <div v-if="item.feedback" class="mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20">
                    <div class="flex items-center gap-1.5 text-xs font-black text-amber-600 dark:text-amber-500 uppercase mb-2">
                      <span class="material-symbols-rounded text-sm">comment</span> ความเห็นจากอาจารย์
                    </div>
                    <p class="text-sm text-amber-800 dark:text-amber-200/80 italic leading-relaxed">"{{ item.feedback }}"</p>
                  </div>
                </div>
              </div>
            </td>
            <!-- ป้ายสถานะกิจกรรม -->
            <td class="px-6 py-5 align-top">
              <span :class="getStatusTextClass(item.status)" class="inline-flex items-center px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-full bg-gray-50 dark:bg-slate-800 border">
                {{ getStatusLabel(item.status) }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// รับ props ไอดีโครงงานเพื่อนำไปดึงประวัติ
const props = defineProps({
  projectId: {
    type: Number,
    required: true
  }
})

// ดึงประวัติกิจกรรมผ่าน api endpoint
const { data: historyData, pending } = await useFetch('/api/student/activity-history', {
  query: { projectId: props.projectId }
})

// ประวัติกิจกรรมดึงมาจาก API
const timeline = computed(() => historyData.value?.timeline || [])

// ฟังก์ชันแปลงรูปแบบวันที่ (เฉพาะวันเดือนปีภาษาไทย)
const formatDateOnly = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('th-TH', { 
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

// ฟังก์ชันแปลงรูปแบบเวลาเป็น ชั่วโมง:นาที
const formatTimeOnly = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleTimeString('th-TH', { 
    hour: '2-digit', minute: '2-digit'
  })
}

// แผนผังคำแปลสถานะแต่ละประเภท
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

// กำหนดสีพื้นหลังให้กับไอคอนแสดงสถานะ
const getStatusBg = (status) => {
  if (status === 'success' || status === 'approved' || status === 'pass') return 'bg-emerald-500 shadow-emerald-100 dark:shadow-none'
  if (status === 'error' || status === 'rejected' || status === 'fail') return 'bg-rose-500 shadow-rose-100 dark:shadow-none'
  if (status === 'info' || status === 'seen') return 'bg-blue-500 shadow-blue-100 dark:shadow-none'
  return 'bg-amber-500 shadow-amber-100 dark:shadow-none'
}

// กำหนดคลาส css ป้ายข้อความของแต่ละสถานะ
const getStatusTextClass = (status) => {
  if (status === 'success' || status === 'approved' || status === 'pass') return 'text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/30'
  if (status === 'error' || status === 'rejected' || status === 'fail') return 'text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-500/30'
  if (status === 'info' || status === 'seen') return 'text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/30'
  return 'text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-500/30'
}
</script>
