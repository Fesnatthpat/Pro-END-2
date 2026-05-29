<template>
  <NuxtLayout :name="layoutName">
    <div class="min-h-screen bg-gray-100 py-8 px-4  print:bg-white print:py-0 print:px-0">
      
      <div class="max-w-[210mm] mx-auto mb-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
        <button @click="$router.back()" class="flex items-center gap-2 text-gray-600 hover:text-[#1a1a40] transition-colors font-medium bg-white px-4 py-2 rounded-full shadow-sm w-full md:w-auto justify-center">
          <span class="material-symbols-rounded">arrow_back</span> ย้อนกลับ
        </button>
        
        <div class="flex flex-wrap justify-center gap-2 md:gap-3">
          <button v-if="!isAdmin" @click="clearDraft" class="bg-rose-50 text-rose-600 border border-rose-200 px-4 md:px-6 py-2 rounded-full font-medium hover:bg-rose-100 transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base">
            <span class="material-symbols-rounded text-base">delete_sweep</span> ล้างฉบับร่าง
          </button>
          <button v-if="!isAdmin" @click="saveDraft" class="bg-blue-50 text-blue-600 border border-blue-200 px-4 md:px-6 py-2 rounded-full font-medium hover:bg-blue-100 transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base">
            <span class="material-symbols-rounded">save</span> บันทึกข้อมูล
          </button>
          <button @click="printDocument" class="bg-[#1a1a40] text-white px-4 md:px-6 py-2 rounded-full font-medium hover:bg-[#2a2a5c] transition-colors shadow-sm flex items-center gap-2 text-sm md:text-base">
            <span class="material-symbols-rounded">print</span> พิมพ์เอกสาร (CP2)
          </button>
        </div>
      </div>

      <div class="flex flex-col items-center print:block print:w-full print:m-0 print:p-0">
        
        <div class="w-full overflow-x-auto flex justify-center pb-4 print:overflow-visible print:pb-0">
          
          <div class="paper-a4 bg-white shadow-lg relative text-black text-[16px] leading-relaxed print:shadow-none">
            
            <div class="text-center mb-6">
              <img src="/bsru_logo.jpg" alt="BSRU Logo" class="w-[80px] mx-auto mb-2 print:w-[70px]">
              <h2 class="font-bold text-[18px]">แบบสอบโครงงานคอมพิวเตอร์</h2>
              <h3 class="font-bold text-[16px]">สาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี</h3>
              <h3 class="font-bold text-[16px]">มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา</h3>
            </div>

            <div class="flex items-end justify-end mb-5 gap-2 w-full">
              <span class="shrink-0">ภาคเรียนที่</span>
              <input type="text" v-model="form.semester" class="form-dotted text-center w-12 min-w-0">
              <span class="shrink-0 ml-2">ปีการศึกษา</span>
              <input type="text" v-model="form.academicYear" class="form-dotted text-center w-20 min-w-0">
            </div>

            <div class="mb-6">
              <div class="flex items-end gap-2 w-full mb-3">
                <span class="font-bold shrink-0">ชื่อเรื่อง (ภาษาไทย)</span>
                <input type="text" v-model="form.projectTitleTh" class="form-dotted flex-1 min-w-0">
              </div>
              <div class="flex items-end gap-2 w-full">
                <input type="text" v-model="form.projectTitleTh2" class="form-dotted flex-1 min-w-0">
              </div>
            </div>

            <div class="mb-5">
              <div class="font-bold text-center mb-2">คนที่ 1</div>
              <div class="flex items-end mb-2 gap-2 w-full">
                <span class="shrink-0">ชื่อนักศึกษา (นาย/นาง/นางสาว)</span>
                <input type="text" v-model="s1.name" class="form-dotted flex-1 min-w-0 text-center">
                <span class="shrink-0">รหัสนักศึกษา</span>
                <input type="text" v-model="s1.studentId" class="form-dotted w-40 min-w-0 text-center">
              </div>
              <div class="flex items-end gap-2 w-full">
                <span class="shrink-0">โทรศัพท์มือถือ</span>
                <input type="text" v-model="s1.phone" class="form-dotted flex-1 min-w-0 text-center">
                <span class="shrink-0">E-mail</span>
                <input type="email" v-model="s1.email" class="form-dotted flex-1 min-w-0 text-center">
                <span class="shrink-0">Line Id</span>
                <input type="text" v-model="s1.lineId" class="form-dotted flex-1 min-w-0 text-center">
              </div>
            </div>

            <div class="mb-8">
              <div class="font-bold text-center mb-2">คนที่ 2</div>
              <div class="flex items-end mb-2 gap-2 w-full">
                <span class="shrink-0">ชื่อนักศึกษา (นาย/นาง/นางสาว)</span>
                <input type="text" v-model="s2.name" class="form-dotted flex-1 min-w-0 text-center">
                <span class="shrink-0">รหัสนักศึกษา</span>
                <input type="text" v-model="s2.studentId" class="form-dotted w-40 min-w-0 text-center">
              </div>
              <div class="flex items-end gap-2 w-full">
                <span class="shrink-0">โทรศัพท์มือถือ</span>
                <input type="text" v-model="s2.phone" class="form-dotted flex-1 min-w-0 text-center">
                <span class="shrink-0">E-mail</span>
                <input type="email" v-model="s2.email" class="form-dotted flex-1 min-w-0 text-center">
                <span class="shrink-0">Line Id</span>
                <input type="text" v-model="s2.lineId" class="form-dotted flex-1 min-w-0 text-center">
              </div>
            </div>

            <div class="flex justify-between px-8 mb-8 mt-6 w-full break-inside-avoid">
              <div class="flex flex-col items-center min-w-[250px]">
                <div class="flex items-end gap-2 w-full mb-1">
                  <span class="shrink-0">ลงชื่อ</span>
                  <input type="text" class="form-dotted flex-1 min-w-0 text-center" readonly>
                  <span class="shrink-0">นักศึกษา</span>
                </div>
                <div class="flex items-end gap-1 w-full justify-center">
                  <span class="shrink-0">(</span>
                  <span class="form-dotted min-w-[150px] px-2 text-center text-gray-700">{{ s1.name }}</span>
                  <span class="shrink-0">)</span>
                </div>
              </div>
              
              <div class="flex flex-col items-center min-w-[250px]">
                <div class="flex items-end gap-2 w-full mb-1">
                  <span class="shrink-0">ลงชื่อ</span>
                  <input type="text" class="form-dotted flex-1 min-w-0 text-center" readonly>
                  <span class="shrink-0">นักศึกษา</span>
                </div>
                <div class="flex items-end gap-1 w-full justify-center">
                  <span class="shrink-0">(</span>
                  <span class="form-dotted min-w-[150px] px-2 text-center text-gray-700">{{ s2.name }}</span>
                  <span class="shrink-0">)</span>
                </div>
              </div>
            </div>

            <div class="border-[1.5px] border-black relative mt-10 break-inside-avoid">
              
              <div class="absolute top-0 right-0 border-l-[1.5px] border-b-[1.5px] border-black px-6 py-1 bg-white text-center text-[14px] font-bold">
                สำหรับอาจารย์ที่ปรึกษา
              </div>
              
              <div class="p-6 pt-10">
                <div class="mb-5 font-bold text-[16px]">ความเห็นอาจารย์ที่ปรึกษาโครงงานคอมพิวเตอร์</div>
                
                <div class="flex justify-between items-start px-2">
                  <div class="flex flex-col gap-3 pt-2">
                    <div class="flex items-center gap-3">
                      <span class="shrink-0">( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span> 
                      <span class="shrink-0">อนุมัติให้สอบได้</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <span class="shrink-0">( &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; )</span> 
                      <span class="shrink-0">ไม่อนุมัติให้สอบ</span>
                    </div>
                  </div>

                  <div class="flex flex-col items-center min-w-[350px]">
                    <div class="flex items-end gap-2 w-full mb-2">
                      <span class="shrink-0">ลงชื่อ</span>
                      <input type="text" class="form-dotted flex-1 min-w-0 text-center" readonly>
                      <span class="shrink-0">อาจารย์ที่ปรึกษาหลัก</span>
                    </div>
                    
                    <div class="flex items-end gap-1 w-full justify-center mb-6">
                      <span class="shrink-0">(</span>
                      <span class="form-dotted min-w-[220px] px-2 text-center text-gray-600">{{ form.advisorName }}</span>
                      <span class="shrink-0">)</span>
                    </div>

                    <div class="flex justify-center items-end gap-2 w-full">
                      <span class="shrink-0">วันที่</span>
                      <input type="text" value="      /        /      " class="form-dotted w-[150px] min-w-0 text-center text-gray-400" readonly>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div> 
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { reactive, onMounted, watchEffect, computed, ref } from 'vue'

const userCookie = useCookie('user_session')
const user = computed(() => userCookie.value)
const route = useRoute()
const projectIdParam = route.query.projectId
const isAdmin = computed(() => user.value?.role === 'admin' || user.value?.role === 'teacher')

definePageMeta({
  layout: false
})

const layoutName = computed(() => {
  if (user.value?.role === 'admin') return 'admin'
  if (user.value?.role === 'teacher') return 'teacher'
  return 'student'
})

useHead({
  title: 'แบบขอสอบจบโครงงาน (CP2)',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Sarabun:wght@400;700&display=swap' }
  ]
})

const form = reactive({
  semester: '',
  academicYear: '',
  projectTitleTh: '',
  projectTitleTh2: '',
  advisorName: ''
})

const s1 = reactive({
  name: '', 
  studentId: '',
  phone: '', 
  email: '',
  lineId: ''
})

const s2 = reactive({
  name: '', 
  studentId: '',
  phone: '', 
  email: '',
  lineId: ''
})

// Fetch project data
const fetchUrl = (isAdmin.value && projectIdParam) ? '/api/admin/project-detail' : '/api/student/my-project'
const fetchQuery = (isAdmin.value && projectIdParam) ? { id: projectIdParam } : undefined

const { data: projectData } = await useFetch(fetchUrl, {
  query: fetchQuery
})
const project = computed(() => projectData.value?.project)

watchEffect(() => {
  if (project.value) {
    form.semester = project.value.semester || ''
    form.academicYear = project.value.academicYear || ''
    form.projectTitleTh = project.value.titleTh || ''
    form.advisorName = project.value.advisor?.fullname || ''

    if (project.value.student1) {
      s1.name = project.value.student1.fullname || ''
      s1.studentId = project.value.student1.username || ''
      s1.phone = project.value.student1.tel || ''
      s1.email = project.value.student1.email || ''
      s1.lineId = project.value.student1.lineId || ''
    }

    if (project.value.student2) {
      s2.name = project.value.student2.fullname || ''
      s2.studentId = project.value.student2.username || ''
      s2.phone = project.value.student2.tel || ''
      s2.email = project.value.student2.email || ''
      s2.lineId = project.value.student2.lineId || ''
    }
    
    // หลังจากโหลดจาก DB แล้ว ค่อยลองดึงจาก draft เฉพาะส่วนที่ยังว่างอยู่
    const saved = localStorage.getItem('cp2_draft')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        // สำหรับข้อมูลโปรเจค/ฟอร์ม: ถ้าใน DB ไม่มี ให้ใช้จาก draft
        if (!form.semester && data.form?.semester) form.semester = data.form.semester
        if (!form.academicYear && data.form?.academicYear) form.academicYear = data.form.academicYear
        if (!form.projectTitleTh && data.form?.projectTitleTh) form.projectTitleTh = data.form.projectTitleTh
        
        // สำหรับนักศึกษา: ถ้าใน DB ไม่มีชื่อ (เช่น เปลี่ยนกลุ่มใหม่) ให้ใช้จาก draft เฉพาะบางฟิลด์ที่ DB ไม่มี
        // แต่ถ้ามีชื่อใน DB แล้ว (มีค่าตอบกลับมาจาก API) ให้เชื่อถือ DB เป็นหลัก
      } catch (e) {
        console.error('Failed to merge draft:', e)
      }
    }
  }
})

const printDocument = () => {
  window.print()
}

const { success: alertSuccess, error: alertError, confirm: alertConfirm } = useAlerts()
const submitting = ref(false)

const clearDraft = async () => {
  const result = await alertConfirm('ล้างข้อมูลฉบับร่าง', 'คุณต้องการล้างข้อมูลที่บันทึกไว้ในเครื่องนี้ใช่หรือไม่? (ข้อมูลในฐานข้อมูลจะไม่ถูกลบ)')
  if (result.isConfirmed) {
    localStorage.removeItem('cp2_draft')
    window.location.reload()
  }
}

const saveDraft = async () => {
  submitting.value = true
  try {
    const response = await $fetch('/api/student/save-cp-data', {
      method: 'POST',
      body: {
        projectId: project.value?.id,
        titleTh: form.projectTitleTh,
        semester: form.semester,
        academicYear: form.academicYear,
        student1: s1,
        student2: s2.studentId ? s2 : null
      }
    })

    if (response.success) {
      // Also save to localStorage for fallback
      const draftData = { form, s1, s2 }
      localStorage.setItem('cp2_draft', JSON.stringify(draftData))
      alertSuccess('บันทึกสำเร็จ', 'บันทึกข้อมูลลงระบบเรียบร้อยแล้ว อาจารย์สามารถเห็นการเปลี่ยนแปลงได้ทันที')
    }
  } catch (error) {
    alertError('ข้อผิดพลาด', error.statusMessage || 'ไม่สามารถบันทึกข้อมูลลงเซิร์ฟเวอร์ได้ แต่บันทึกในเครื่องแล้ว')
    // Fallback save to localStorage anyway
    const draftData = { form, s1, s2 }
    localStorage.setItem('cp2_draft', JSON.stringify(draftData))
  } finally {
    submitting.value = false
  }
}
</script>
<style scoped>
/* ================= CSS สำหรับฟอร์ม (หน้าจอ) ================= */
.paper-a4 {
  width: 210mm;
  min-height: 297mm;
  padding: 15mm 20mm; 
  box-sizing: border-box;
  margin: 0 auto;
}

.form-dotted {
  border: none;
  border-bottom: 1.5px dotted #000;
  background-color: transparent !important;
  outline: none !important;
  box-shadow: none !important;
  font-family: 'Sarabun', sans-serif;
  color: #1a1a40;
  border-radius: 0;
  line-height: 1.2;
  padding-bottom: 2px;
}

/* ================= CSS สำหรับสั่ง Print ================= */
@media print {
  @page {
    size: A4 portrait;
    margin: 0cm; /* ตั้งค่าขอบกระดาษเป็น 0 ป้องกันเบราว์เซอร์แทรก Footer */
  }

  html, body {
    margin: 0 !important;
    padding: 0 !important;
    background-color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .paper-a4 {
    width: 210mm !important;
    height: 297mm !important; /* บังคับให้เป็น 1 หน้าเป๊ะๆ */
    margin: 0 !important;
    padding: 15mm 20mm !important; 
    border: none !important;
    box-shadow: none !important;
    box-sizing: border-box !important;
    overflow: hidden !important; 
    page-break-after: avoid !important; 
  }

  .break-inside-avoid {
    page-break-inside: avoid !important;
    break-inside: avoid !important;
  }

  .print\:hidden {
    display: none !important;
  }

  .form-dotted {
    border-bottom: 1px dotted #000 !important;
    color: #000 !important;
  }
  
  .form-dotted::placeholder {
    color: transparent !important; 
  }
}
</style>