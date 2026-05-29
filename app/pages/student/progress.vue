<template>
  <div class="min-h-screen bg-[#f8f9fa] py-8 px-4 ">
    <div class="max-w-[900px] mx-auto w-full">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <NuxtLink to="/student" class="flex items-center gap-2 text-gray-500 hover:text-[#1a1a40] transition-colors mb-2 font-medium text-sm">
            <span class="material-symbols-rounded">arrow_back</span> กลับหน้าหลัก
          </NuxtLink>
          <h2 class="font-bold text-[24px] md:text-[28px] text-[#1a1a40]">
            💻 รายงานความก้าวหน้าโครงงาน
          </h2>
        </div>
        
        <button 
          @click="showAddModal = true" 
          class="bg-[#1a1a40] text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:bg-[#2c2c54] transition-all flex items-center gap-2"
        >
          <span class="material-symbols-rounded">add</span> เพิ่มรายงานใหม่
        </button>
      </div>

      <!-- ส่วนแสดงคำแนะนำจากอาจารย์ (Global Feedback) -->
      <div v-if="project?.feedback" class="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-2xl mb-8 shadow-sm">
        <div class="flex items-center gap-2 text-amber-700 font-bold mb-2">
          <span class="material-symbols-rounded">warning</span> ข้อเสนอแนะจากอาจารย์ที่ปรึกษา
        </div>
        <p class="text-amber-800 text-sm leading-relaxed">{{ project.feedback }}</p>
      </div>

      <div v-if="pending" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1a1a40]"></div>
      </div>

      <div v-else-if="reports.length === 0" class="bg-white rounded-[32px] p-16 text-center shadow-sm border border-gray-100">
        <div class="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          <span class="material-symbols-rounded">assignment_late</span>
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">ยังไม่มีรายงานความก้าวหน้า</h3>
        <p class="text-gray-400 text-sm">คุณสามารถเริ่มส่งรายงานความก้าวหน้าครั้งแรกได้โดยกดปุ่มด้านบนครับ</p>
      </div>

      <div v-else class="space-y-6">
        <div v-for="report in reports" :key="report.id" class="bg-white rounded-[28px] p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex justify-between items-start mb-4">
            <div>
              <div class="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">
                {{ formatDate(report.createdAt) }}
              </div>
              <h3 class="text-xl font-bold text-[#1a1a40]">{{ report.title }}</h3>
            </div>
            <span :class="getStatusBadgeClass(report.status)" class="px-4 py-1.5 rounded-full text-xs font-bold border">
              {{ getStatusText(report.status) }}
            </span>
          </div>
          
          <p class="text-gray-600 text-[15px] mb-6 whitespace-pre-line">{{ report.description }}</p>

          <div v-if="report.fileUrl" class="mb-6 p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2 w-fit">
            <span class="material-symbols-rounded text-lg text-indigo-400">link</span>
            <a :href="report.fileUrl" target="_blank" class="text-xs text-blue-600 hover:underline font-bold">ดูไฟล์แนบ (PDF)</a>
          </div>

          <div v-if="report.feedback" class="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div class="text-xs font-bold text-indigo-600 mb-2 flex items-center gap-2">
              <span class="material-symbols-rounded">chat</span> ความเห็นจากอาจารย์:
            </div>
            <p class="text-sm text-slate-700">{{ report.feedback }}</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Modal เพิ่มรายงาน -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        <div class="p-8 border-b border-gray-100 flex justify-between items-center">
          <h3 class="text-xl font-bold text-[#1a1a40]">รายงานความก้าวหน้าใหม่</h3>
          <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
            <span class="material-symbols-rounded">close</span>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="p-8 space-y-5">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">หัวข้อรายงาน (เช่น ความคืบหน้าสัปดาห์ที่ 1)</label>
            <input v-model="newReport.title" type="text" required class="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#1a1a40] outline-none transition-all text-sm bg-gray-50" placeholder="ระบุหัวข้อ...">
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">รายละเอียดการดำเนินงาน</label>
            <textarea v-model="newReport.description" rows="4" required class="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-[#1a1a40] outline-none transition-all text-sm bg-gray-50" placeholder="อธิบายงานที่ทำไป..."></textarea>
          </div>

          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">แนบไฟล์ PDF (ถ้ามี - สูงสุด 10MB)</label>
            <div class="relative">
              <input type="file" accept=".pdf" @change="onFileChange" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10">
              <div class="px-5 py-3 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center gap-3 text-sm text-gray-500 overflow-hidden">
                <span class="material-symbols-rounded text-indigo-400">picture_as_pdf</span>
                <span class="truncate">{{ selectedFile ? selectedFile.name : 'เลือกไฟล์ PDF...' }}</span>
              </div>
            </div>
          </div>

          <div class="pt-4 flex gap-3">
            <button 
              type="button" 
              @click="showAddModal = false"
              class="flex-1 px-6 py-3 rounded-full border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50 transition-all"
            >
              ยกเลิก
            </button>
            <button 
              type="submit" 
              :disabled="submitting"
              class="flex-1 px-6 py-3 rounded-full bg-[#1a1a40] text-white font-bold text-sm hover:bg-[#2c2c54] transition-all disabled:opacity-50"
            >
              {{ submitting ? 'กำลังส่ง...' : 'ส่งรายงาน' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({ layout: 'student' })

const userCookie = useCookie('user_session')
const user = userCookie.value
const supabase = useSupabaseClient()

const showAddModal = ref(false)
const submitting = ref(false)
const selectedFile = ref(null)
const newReport = ref({ title: '', description: '' })

// ดึงข้อมูลโปรเจคเพื่อเอา Feedback รวม
const { data: projectData } = await useFetch('/api/student/my-project', {
  query: { studentId: user?.id }
})
const project = computed(() => projectData.value?.project)

// ดึงรายงานความก้าวหน้า
const { data: reportsData, pending, refresh } = await useFetch('/api/student/get-progress', {
  query: { 
    projectId: computed(() => project.value?.id),
    reportType: 'progress'
  },
  watch: [project]
})
const reports = computed(() => reportsData.value?.reports || [])

const { success: alertSuccess, error: alertError } = useAlerts()

const onFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    if (file.size > 10 * 1024 * 1024) {
      alertError('ไฟล์ใหญ่เกินไป', 'กรุณาอัปโหลดไฟล์ขนาดไม่เกิน 10MB')
      e.target.value = ''
      return
    }
    if (file.type !== 'application/pdf') {
      alertError('ไฟล์ไม่ถูกต้อง', 'กรุณาอัปโหลดไฟล์ในรูปแบบ PDF เท่านั้น')
      e.target.value = ''
      return
    }
    selectedFile.value = file
  }
}

const handleSubmit = async () => {
  if (!project.value) return alertError('ไม่พบข้อมูล', 'ไม่พบข้อมูลโครงงานในระบบ')
  
  submitting.value = true
  try {
    let fileUrl = ''

    // อัปโหลดไฟล์ถ้ามีการเลือก
    if (selectedFile.value) {
      const fileName = `progress_${project.value.id}_${Date.now()}.pdf`
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(fileName, selectedFile.value)

      if (error) {
        throw new Error(`อัปโหลดไฟล์ไม่สำเร็จ: ${error.message}`)
      }

      const { data: publicUrlData } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName)
      
      fileUrl = publicUrlData.publicUrl
    }

    const res = await $fetch('/api/student/submit-progress', {
      method: 'POST',
      body: {
        projectId: project.value.id,
        reportType: 'progress',
        title: newReport.value.title,
        description: newReport.value.description,
        fileUrl: fileUrl || undefined
      }
    })
    
    if (res.success) {
      alertSuccess('สำเร็จ', 'ส่งรายงานความก้าวหน้าเรียบร้อยแล้ว')
      showAddModal.value = false
      newReport.value = { title: '', description: '' }
      selectedFile.value = null
      refresh()
    }
  } catch (error) {
    alertError('ข้อผิดพลาด', error.message || error.statusMessage || 'เกิดข้อผิดพลาด')
  } finally {
    submitting.value = false
  }
}

// UI Helpers
const formatDate = (date) => new Date(date).toLocaleDateString('th-TH', { 
  day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
})

const getStatusText = (status) => {
  const maps = { 'pending': 'รอการตรวจสอบ', 'seen': 'อ่านแล้ว', 'approved': 'รับทราบแล้ว' }
  return maps[status] || status
}

const getStatusBadgeClass = (status) => {
  if (status === 'approved') return 'bg-emerald-50 text-emerald-600 border-emerald-200'
  if (status === 'seen') return 'bg-blue-50 text-blue-600 border-blue-200'
  return 'bg-amber-50 text-amber-600 border-amber-200'
}
</script>
