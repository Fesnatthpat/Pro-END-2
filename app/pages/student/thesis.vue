<template>
  <div class="min-h-screen bg-[#f8f9fa] py-8 px-4 ">
    <div class="max-w-[900px] mx-auto w-full">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <NuxtLink to="/student" class="flex items-center gap-2 text-gray-500 hover:text-[#1a1a40] transition-colors mb-2 font-medium">
            <span class="material-symbols-rounded">arrow_back</span> กลับหน้าหลัก
          </NuxtLink>
          <h2 class="font-bold text-[24px] md:text-[28px] text-[#1a1a40]">
            📄 เล่มบัณฑิตนิพนธ์
          </h2>
        </div>
      </div>

      <!-- ส่วนส่งเล่มฉบับร่าง (Thesis Draft) -->
      <div class="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-purple-100 mb-10 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
        <span class="material-symbols-rounded absolute right-8 top-8 text-4xl text-purple-200">picture_as_pdf</span>

        <h3 class="text-xl font-bold text-[#1a1a40] mb-2 flex items-center gap-2">
          <span class="material-symbols-rounded text-purple-600">cloud_upload</span> ส่งเล่มวิทยานิพนธ์ (ฉบับร่าง)
        </h3>
        <p class="text-gray-500 text-sm mb-8">กรุณาแนบลิงก์ไฟล์เล่ม หรืออัปโหลดเป็นไฟล์ PDF เพื่อให้อาจารย์ที่ปรึกษาตรวจทาน</p>

        <form @submit.prevent="handleThesisSubmit" class="space-y-6">
          <!-- เลือกวิธีส่ง -->
          <div class="flex p-1.5 bg-gray-100 rounded-2xl w-fit">
            <button 
              type="button"
              @click="submitMode = 'url'"
              :class="submitMode === 'url' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
              class="px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
            >
              <span class="material-symbols-rounded text-lg">link</span> แนบลิงก์
            </button>
            <button 
              type="button"
              @click="submitMode = 'file'"
              :class="submitMode === 'file' ? 'bg-white text-purple-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
              class="px-6 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
            >
              <span class="material-symbols-rounded text-lg">upload_file</span> อัปโหลด PDF
            </button>
          </div>

          <div v-if="submitMode === 'url'" class="animate-[fadeIn_0.3s_ease-out]">
            <label class="block text-[13px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">ลิงก์ไฟล์เล่มวิทยานิพนธ์ (Google Drive / OneDrive)</label>
            <div class="flex flex-col md:flex-row gap-3">
              <input 
                v-model="thesisUrl" 
                type="url" 
                :required="submitMode === 'url'" 
                placeholder="https://drive.google.com/..." 
                class="flex-grow px-5 py-3.5 rounded-2xl border border-gray-200 focus:border-purple-600 outline-none transition-all text-sm bg-gray-50/50 font-medium"
              >
              <button 
                type="submit" 
                :disabled="submittingThesis"
                class="bg-purple-600 text-white px-10 py-3.5 rounded-2xl font-black text-sm hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 disabled:opacity-50 shrink-0 flex items-center justify-center gap-2"
              >
                <span class="material-symbols-rounded" v-if="!submittingThesis">save</span>
                <span>{{ submittingThesis ? 'กำลังบันทึก...' : 'อัปเดตลิงก์เล่ม' }}</span>
              </button>
            </div>
          </div>

          <div v-else class="animate-[fadeIn_0.3s_ease-out]">
            <label class="block text-[13px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1">อัปโหลดไฟล์ PDF (ขนาดไม่เกิน 10MB)</label>
            <div class="flex flex-col md:flex-row gap-3">
              <div class="flex-grow relative">
                <input 
                  type="file" 
                  accept=".pdf"
                  @change="onFileChange"
                  :required="submitMode === 'file'"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                >
                <div class="px-5 py-3.5 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 flex items-center gap-3 text-sm text-gray-500 overflow-hidden">
                  <span class="material-symbols-rounded text-purple-400">picture_as_pdf</span>
                  <span class="truncate">{{ selectedFile ? selectedFile.name : 'เลือกไฟล์ PDF...' }}</span>
                </div>
              </div>
              <button 
                type="submit" 
                :disabled="submittingThesis || !selectedFile"
                class="bg-purple-600 text-white px-10 py-3.5 rounded-2xl font-black text-sm hover:bg-purple-700 transition-all shadow-xl shadow-purple-100 disabled:opacity-50 shrink-0 flex items-center justify-center gap-2"
              >
                <span class="material-symbols-rounded" v-if="!submittingThesis">cloud_upload</span>
                <span>{{ submittingThesis ? 'กำลังอัปโหลด...' : 'อัปโหลดและบันทึก' }}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- บันทึกความก้าวหน้ารายครั้ง -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="font-bold text-xl text-[#1a1a40]">ประวัติการรายงานเล่ม</h3>
        <button 
          @click="showAddModal = true" 
          class="bg-white border-2 border-[#1a1a40] text-[#1a1a40] px-5 py-2 rounded-full font-bold hover:bg-[#1a1a40] hover:text-white transition-all flex items-center gap-2 text-sm"
        >
          <span class="material-symbols-rounded">add</span> เพิ่มบันทึก
        </button>
      </div>

      <div v-if="pending" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-600"></div>
      </div>

      <div v-else-if="reports.length === 0" class="bg-white rounded-[32px] p-16 text-center shadow-sm border border-gray-100">
        <div class="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">
          <span class="material-symbols-rounded">book</span>
        </div>
        <p class="text-gray-400 text-sm">ยังไม่มีประวัติการบันทึกเล่มวิทยานิพนธ์</p>
      </div>

      <div v-else class="space-y-6">
        <div v-for="report in reports" :key="report.id" class="bg-white rounded-[28px] p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
          <div class="flex justify-between items-start mb-4">
            <div>
              <div class="text-[11px] text-gray-400 font-bold mb-1 uppercase tracking-wider">
                {{ formatDate(report.createdAt) }}
              </div>
              <h3 class="text-lg font-bold text-[#1a1a40]">{{ report.title }}</h3>
            </div>
            <span :class="getStatusBadgeClass(report.status)" class="px-3 py-1 rounded-full text-[10px] font-bold border">
              {{ getStatusText(report.status) }}
            </span>
          </div>
          <p class="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{{ report.description }}</p>
          
          <div v-if="report.fileUrl" class="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2">
            <span class="material-symbols-rounded text-lg text-gray-400">link</span>
            <a :href="report.fileUrl" target="_blank" class="text-xs text-blue-600 hover:underline line-clamp-1">{{ report.fileUrl }}</a>
          </div>
          
          <div v-if="report.feedback" class="mt-6 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div class="text-[11px] font-bold text-purple-600 mb-2 flex items-center gap-2 uppercase">
              <span class="material-symbols-rounded">chat</span> อาจารย์ที่ปรึกษาตอบกลับ:
            </div>
            <p class="text-sm text-slate-700 italic">"{{ report.feedback }}"</p>
          </div>
        </div>
      </div>

    </div>

    <!-- Modal เพิ่มรายงาน -->
    <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden animate-[fadeIn_0.2s_ease-out]">
        <div class="p-8 border-b border-gray-100 flex justify-between items-center bg-purple-50/30">
          <h3 class="text-xl font-bold text-[#1a1a40]">บันทึกความก้าวหน้า</h3>
          <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600 transition-colors">
            <span class="material-symbols-rounded">close</span>
          </button>
        </div>
        
        <form @submit.prevent="handleReportSubmit" class="p-8 space-y-5">
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">หัวข้อบันทึก (เช่น แก้ไขบทที่ 2)</label>
            <input v-model="newReport.title" type="text" required class="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-purple-600 outline-none transition-all text-sm bg-gray-50" placeholder="ระบุหัวข้อ...">
          </div>
          <div>
            <label class="block text-sm font-bold text-gray-700 mb-2">รายละเอียดสิ่งที่แก้ไข</label>
            <textarea v-model="newReport.description" rows="4" required class="w-full px-5 py-3 rounded-2xl border border-gray-200 focus:border-purple-600 outline-none transition-all text-sm bg-gray-50" placeholder="อธิบายรายละเอียด..."></textarea>
          </div>

          <div class="pt-4 flex gap-3">
            <button type="button" @click="showAddModal = false" class="flex-1 px-6 py-3 rounded-full border border-gray-200 text-gray-500 font-bold text-sm hover:bg-gray-50">ยกเลิก</button>
            <button type="submit" :disabled="submittingReport" class="flex-1 px-6 py-3 rounded-full bg-[#1a1a40] text-white font-bold text-sm hover:bg-[#2c2c54] disabled:opacity-50">
              {{ submittingReport ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive, computed, watchEffect } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({ layout: 'student' })

const userCookie = useCookie('user_session')
const user = userCookie.value
const supabase = useSupabaseClient()

const thesisUrl = ref('')
const submitMode = ref('url') // 'url' or 'file'
const selectedFile = ref(null)
const submittingThesis = ref(false)
const showAddModal = ref(false)
const submittingReport = ref(false)
const newReport = ref({ title: '', description: '' })

// ดึงข้อมูลโปรเจค
const { data: projectData, refresh: refreshProject } = await useFetch('/api/student/my-project', {
  query: { studentId: user?.id }
})
const project = computed(() => projectData.value?.project)

watchEffect(() => {
  if (project.value?.thesisUrl) thesisUrl.value = project.value.thesisUrl
})

// ดึงรายงานความก้าวหน้า
const { data: reportsData, pending, refresh: refreshReports } = await useFetch('/api/student/get-progress', {
  query: { 
    projectId: computed(() => project.value?.id),
    reportType: 'thesis'
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

const handleThesisSubmit = async () => {
  if (!project.value) return
  submittingThesis.value = true
  
  try {
    let finalUrl = thesisUrl.value

    // ถ้าเป็นโหมดอัปโหลดไฟล์
    if (submitMode.value === 'file' && selectedFile.value) {
      const fileName = `thesis_${project.value.id}_${Date.now()}.pdf`
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(fileName, selectedFile.value)

      if (error) {
        console.error('Supabase upload error:', error)
        throw new Error(`ไม่สามารถอัปโหลดไฟล์ได้: ${error.message} (กรุณาตรวจสอบว่าได้สร้าง bucket ชื่อ 'documents' ใน Supabase และตั้งเป็น Public หรือยัง)`)
      }

      const { data: publicUrlData } = supabase.storage
        .from('documents')
        .getPublicUrl(fileName)
      
      finalUrl = publicUrlData.publicUrl
    }

    if (!finalUrl) {
      throw new Error('กรุณาระบุลิงก์หรืออัปโหลดไฟล์')
    }

    const res = await $fetch('/api/student/submit-thesis', {
      method: 'POST',
      body: { projectId: project.value.id, thesisUrl: finalUrl }
    })
    
    if (res.success) {
      alertSuccess('สำเร็จ', 'อัปเดตเล่มวิทยานิพนธ์เรียบร้อยแล้ว')
      selectedFile.value = null
      refreshProject()
      refreshReports()
    }
  } catch (error) {
    alertError('ข้อผิดพลาด', error.message || error.statusMessage || 'เกิดข้อผิดพลาด')
  } finally {
    submittingThesis.value = false
  }
}

const handleReportSubmit = async () => {
  if (!project.value) return
  submittingReport.value = true
  try {
    const res = await $fetch('/api/student/submit-progress', {
      method: 'POST',
      body: { 
        projectId: project.value.id, 
        reportType: 'thesis',
        ...newReport.value 
      }
    })
    if (res.success) {
      alertSuccess('สำเร็จ', 'บันทึกความก้าวหน้าเรียบร้อยแล้ว')
      showAddModal.value = false
      newReport.value = { title: '', description: '' }
      refreshReports()
    }
  } catch (error) {
    alertError('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาด')
  } finally {
    submittingReport.value = false
  }
}

// UI Helpers
const formatDate = (date) => new Date(date).toLocaleDateString('th-TH', { 
  day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' 
})
const getStatusText = (status) => ({ 'pending': 'รอตรวจ', 'seen': 'อ่านแล้ว', 'approved': 'ผ่านแล้ว' }[status] || status)
const getStatusBadgeClass = (status) => {
  if (status === 'approved') return 'bg-emerald-50 text-emerald-600 border-emerald-100'
  if (status === 'seen') return 'bg-blue-50 text-blue-600 border-blue-100'
  return 'bg-amber-50 text-amber-600 border-amber-100'
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>