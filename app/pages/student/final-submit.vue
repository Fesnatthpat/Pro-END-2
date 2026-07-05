<template>
  <div class="min-h-screen py-8 px-4  bg-[#f8f9fa] dark:bg-slate-900">
    <div class="max-w-[800px] mx-auto w-full">
      
      <div class="mb-8">
        <NuxtLink to="/student" class="flex items-center gap-2 text-gray-500 dark:text-slate-400 hover:text-[#1a1a40] transition-colors mb-2 font-medium w-fit">
          <span class="material-symbols-rounded">arrow_back</span> กลับหน้าหลัก
        </NuxtLink>
        <h2 class="md: text-[#1a1a40] dark:text-white flex items-center gap-3 text-2xl md:text-3xl font-bold">
          <span class="material-symbols-rounded text-blue-600">inventory_2</span> ส่งเล่มและโปรแกรมฉบับสมบูรณ์
        </h2>
        <p class="text-gray-500 dark:text-slate-400 mt-1">ขั้นตอนสุดท้าย: อัปโหลดลิงก์ไฟล์เอกสารรูปเล่มและซอร์สโค้ดโปรแกรมฉบับสมบูรณ์</p>
      </div>

      <div v-if="pending" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>

      <div v-else class="bg-white dark:bg-slate-800 rounded-[32px] p-6 md:p-10 shadow-sm border border-gray-100 dark:border-slate-700">
        
        <!-- ส่วนที่ 1: แสดงประวัติการส่งงาน (History List) -->
        <div v-if="showHistory" class="animate-[fadeIn_0.5s_ease-out]">
          <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-100 dark:border-slate-700">
            <div>
              <h3 class="text-xl text-[#1a1a40] dark:text-white text-xl md:text-2xl font-bold">รายการประวัติการส่งงาน</h3>
              <p class="text-sm text-gray-500 dark:text-slate-400">ข้อมูลล่าสุดที่จัดเก็บในระบบ</p>
            </div>
            <div :class="project?.step >= 6 ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'" class="px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-current animate-pulse"></span>
              {{ project?.step >= 6 ? 'เสร็จสมบูรณ์' : 'รอการตรวจสอบ' }}
            </div>
          </div>

          <div class="space-y-4">
            <!-- รายการที่ 1: เล่มวิทยานิพนธ์ -->
            <div class="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[24px] bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-blue-200 hover:shadow-md transition-all">
              <div class="flex items-center gap-5 mb-4 md:mb-0">
                <div class="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110">
                  <span class="material-symbols-rounded">picture_as_pdf</span>
                </div>
                <div>
                  <div class="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">ประเภท: เอกสาร PDF</div>
                  <div class="text-base font-bold text-[#1a1a40] dark:text-white">เล่มปริญญานิพนธ์ (Final Thesis)</div>
                  <div class="text-xs text-gray-400 font-medium">ส่งเมื่อ: {{ formatDate(project.updatedAt) }}</div>
                </div>
              </div>
              <a :href="project.thesisUrl" target="_blank" class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-rose-50 text-rose-600 font-bold text-sm hover:bg-rose-600 hover:text-white transition-all">
                <span class="material-symbols-rounded text-base">visibility</span> เรียกดูไฟล์
              </a>
            </div>

            <!-- รายการที่ 2: ซอร์สโค้ด -->
            <div class="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[24px] bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-emerald-200 hover:shadow-md transition-all">
              <div class="flex items-center gap-5 mb-4 md:mb-0">
                <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110">
                  <span class="material-symbols-rounded">code</span>
                </div>
                <div>
                  <div class="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">ประเภท: ซอร์สโค้ด/โปรแกรม</div>
                  <div class="text-base font-bold text-[#1a1a40] dark:text-white">ซอร์สโค้ดโปรแกรม (Source Code)</div>
                  <div class="text-xs text-gray-400 font-medium">ส่งเมื่อ: {{ formatDate(project.updatedAt) }}</div>
                </div>
              </div>
              <a :href="project.programUrl" target="_blank" class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-50 text-emerald-600 font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all">
                <span class="material-symbols-rounded text-base">open_in_new</span> ตรวจสอบลิงก์/ไฟล์
              </a>
            </div>

            <!-- รายการที่ 3: คู่มือ -->
            <div class="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-[24px] bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 hover:border-amber-200 hover:shadow-md transition-all">
              <div class="flex items-center gap-5 mb-4 md:mb-0">
                <div class="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shrink-0 transition-transform group-hover:scale-110">
                  <span class="material-symbols-rounded">menu_book</span>
                </div>
                <div>
                  <div class="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">ประเภท: คู่มือการใช้งาน</div>
                  <div class="text-base font-bold text-[#1a1a40] dark:text-white">คู่มือการใช้งาน (User Manual)</div>
                  <div class="text-xs text-gray-400 font-medium">ส่งเมื่อ: {{ formatDate(project.updatedAt) }}</div>
                </div>
              </div>
              <a :href="project.manualUrl" target="_blank" class="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-50 text-amber-600 font-bold text-sm hover:bg-amber-600 hover:text-white transition-all">
                <span class="material-symbols-rounded text-base">visibility</span> เรียกดูไฟล์
              </a>
            </div>
          </div>

          <!-- สถานะการอนุมัติ -->
          <div v-if="project?.step >= 6" class="p-8 rounded-[32px] bg-emerald-50 border border-emerald-100 text-center mt-10">
            <div class="w-20 h-20 bg-white dark:bg-slate-800 text-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-sm border border-emerald-50">
              <span class="material-symbols-rounded">military_tech</span>
            </div>
            <h3 class="text-xl text-emerald-800 mb-2 text-xl md:text-2xl font-bold">โครงงานเสร็จสมบูรณ์เรียบร้อยแล้ว</h3>
            <p class="text-emerald-600 text-sm">ขอแสดงความยินดีด้วย! คุณได้ดำเนินการสำเร็จการศึกษาในรายวิชาโครงงานแล้ว</p>
          </div>
        </div>
        
        <!-- ส่วนที่ 2: ฟอร์มการส่ง (เฉพาะตอนที่ยังไม่ได้ส่ง หรือส่งไม่ผ่าน) -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-12">
          <!-- 1. Thesis PDF -->
          <div>
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h3 class="text-[#1a1a40] dark:text-white flex items-center gap-2 text-xl md:text-2xl font-bold">
                <span class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-black">1</span>
                เล่มปริญญานิพนธ์ (Final PDF)
              </h3>
              
              <div class="flex p-1 bg-gray-100 dark:bg-slate-700 rounded-xl w-fit ml-0 md:ml-10 shrink-0">
                <button type="button" class="bg-white dark:bg-slate-800 text-blue-600 shadow-sm px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-default">
                  <span class="material-symbols-rounded text-base">link</span> ลิงก์
                </button>
              </div>
            </div>

            <div class="ml-0 md:ml-10">
              <div class="animate-[fadeIn_0.3s_ease-out]">
                <input v-model="form.thesisUrl" type="url" required placeholder="https://drive.google.com/..." class="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 focus:border-blue-600 outline-none transition-all text-sm bg-gray-50/50 font-medium">
                <p class="text-xs text-gray-400 mt-2 font-bold uppercase tracking-widest px-1">แนบลิงก์ที่สามารถเข้าถึงเพื่อดาวน์โหลดไฟล์ได้</p>
              </div>
            </div>
          </div>

          <hr class="border-gray-100 dark:border-slate-700">

          <!-- 2. Source Code -->
          <div>
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h3 class="text-[#1a1a40] dark:text-white flex items-center gap-2 text-xl md:text-2xl font-bold">
                <span class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm font-black">2</span>
                ซอร์สโค้ดโปรแกรม (Source Code)
              </h3>
              
              <div class="flex p-1 bg-gray-100 dark:bg-slate-700 rounded-xl w-fit ml-0 md:ml-10 shrink-0">
                <button type="button" class="bg-white dark:bg-slate-800 text-emerald-600 shadow-sm px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-default">
                  <span class="material-symbols-rounded text-base">link</span> ลิงก์
                </button>
              </div>
            </div>

            <div class="ml-0 md:ml-10">
              <div class="animate-[fadeIn_0.3s_ease-out]">
                <input v-model="form.programUrl" type="url" required placeholder="https://github.com/... หรือ Google Drive" class="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 focus:border-emerald-600 outline-none transition-all text-sm bg-gray-50/50 font-medium">
              </div>
            </div>
          </div>

          <hr class="border-gray-100 dark:border-slate-700">

          <!-- 3. Manual -->
          <div>
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h3 class="text-[#1a1a40] dark:text-white flex items-center gap-2 text-xl md:text-2xl font-bold">
                <span class="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-black">3</span>
                คู่มือการใช้งาน (Manual)
              </h3>
              
              <div class="flex p-1 bg-gray-100 dark:bg-slate-700 rounded-xl w-fit ml-0 md:ml-10 shrink-0">
                <button type="button" class="bg-white dark:bg-slate-800 text-amber-600 shadow-sm px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-default">
                  <span class="material-symbols-rounded text-base">link</span> ลิงก์
                </button>
              </div>
            </div>

            <div class="ml-0 md:ml-10">
              <div class="animate-[fadeIn_0.3s_ease-out]">
                <input v-model="form.manualUrl" type="url" required placeholder="ระบุลิงก์คู่มือการใช้งาน..." class="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-slate-700 focus:border-amber-600 outline-none transition-all text-sm bg-gray-50/50 font-medium">
              </div>
            </div>
          </div>

          <div class="flex justify-end pt-10 border-t border-gray-50">
            <button 
              type="submit" 
              :disabled="submitting"
              class="bg-[#1a1a40] hover:bg-indigo-600 text-white font-black py-4 px-12 rounded-2xl transition-all flex items-center gap-3 shadow-xl shadow-indigo-100 dark:shadow-none disabled:opacity-50 active:scale-95"
            >
              <span class="material-symbols-rounded">rocket_launch</span> 
              <span>{{ submitting ? 'กำลังบันทึกข้อมูล...' : 'ยืนยันการส่งงานสมบูรณ์' }}</span>
            </button>
          </div>
        </form>

        <div v-if="project?.step === 5 && project?.status === 'approved'" class="mt-10 p-8 rounded-[28px] bg-emerald-50 border border-emerald-100 text-center animate-[fadeIn_0.5s_ease-out]">
          <div class="w-20 h-20 bg-white dark:bg-slate-800 text-emerald-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4 shadow-sm border border-emerald-50">
            <span class="material-symbols-rounded">military_tech</span>
          </div>
          <h3 class="text-xl text-emerald-800 mb-2 text-xl md:text-2xl font-bold">โครงงานผ่านการอนุมัติสมบูรณ์</h3>
          <p class="text-emerald-600 text-sm">ขอแสดงความยินดีด้วย! คุณได้ดำเนินการสำเร็จการศึกษาในรายวิชาโครงงานแล้ว</p>
        </div>

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
const submitting = ref(false)

const form = reactive({
  thesisUrl: '',
  programUrl: '',
  manualUrl: ''
})

// ดึงข้อมูลโปรเจค
const { data: projectData, pending, refresh } = await useFetch('/api/student/my-project', {
  query: { studentId: user?.id }
})
const project = computed(() => projectData.value?.project)

// ตรวจสอบสถานะการส่งงานของ Step 5 จากตาราง ProjectStepStatus
const step5Status = computed(() => {
  return project.value?.stepStatuses?.find(s => s.step === 5)
})

// เงื่อนไขการแสดงประวัติ (แสดงเมื่อส่งครบทั้ง 3 อย่างแล้ว และสถานะเป็นรอตรวจหรืออนุมัติ)
const showHistory = computed(() => {
  const hasAllFiles = project.value?.thesisUrl && project.value?.programUrl && project.value?.manualUrl
  return hasAllFiles && step5Status.value && (step5Status.value.status === 'pending' || step5Status.value.status === 'approved')
})

const { success: alertSuccess, error: alertError, confirm: alertConfirm } = useAlerts()

const handleSubmit = async () => {
  if (!project.value) return
  
  const result = await alertConfirm('ยืนยันการส่งงาน', 'ยืนยันการส่งงานฉบับสมบูรณ์? (ข้อมูลนี้จะถูกส่งให้อาจารย์ที่ปรึกษาตรวจสอบขั้นสุดท้าย)')
  if (!result.isConfirmed) return

  submitting.value = true
  try {
    if (!form.thesisUrl || !form.programUrl || !form.manualUrl) {
      throw new Error('กรุณาระบุลิงก์ข้อมูลให้ครบทุกช่อง')
    }

    const res = await $fetch('/api/student/final-submit', {
      method: 'POST',
      body: {
        projectId: project.value.id,
        thesisUrl: form.thesisUrl,
        programUrl: form.programUrl,
        manualUrl: form.manualUrl
      }
    })
    
    if (res.success) {
      alertSuccess('สำเร็จ', '🎉 ส่งงานฉบับสมบูรณ์เรียบร้อยแล้ว! กรุณารอการตรวจสอบขั้นสุดท้ายจากอาจารย์ครับ')
      refresh()
      navigateTo('/student')
    }
  } catch (error) {
    alertError('ข้อผิดพลาด', error.message || error.statusMessage || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    submitting.value = false
  }
}

const formatDate = (date) => {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('th-TH', { 
    day: 'numeric', month: 'long', year: 'numeric' 
  })
}
</script>