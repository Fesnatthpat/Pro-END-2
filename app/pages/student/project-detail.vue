<script setup>
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'student'
})

const route = useRoute()
const projectId = route.query.id

useHead({
  title: 'รายละเอียดโครงงาน'
})

// === โครงสร้างเมนู 3 ปุ่ม ===
const menuTabs = [
  { id: 'details', label: 'รายละเอียด' },
  { id: 'thesis', label: 'บัณฑิตนิพนธ์' },
  { id: 'program', label: 'โปรแกรม' }
]

const activeTab = ref('details')

// === ข้อมูลจริงจาก API ===
const { data: result, pending: loading } = await useFetch('/api/admin/project-detail', {
  query: { id: projectId }
})

const project = computed(() => result.value?.project)

const formatDate = (date) => new Date(date).toLocaleDateString('th-TH', { 
  day: 'numeric', month: 'long', year: 'numeric'
})
</script>

<template>
  <div class="max-w-[1140px] mx-auto w-full py-8">
    
    <div class="mb-6">
      <button @click="$router.back()" class="flex items-center gap-2 text-gray-500 hover:text-[#1a1a40] transition-colors font-medium">
        <span class="material-symbols-rounded text-xl">arrow_circle_left</span> ย้อนกลับไปหน้าก่อนหน้า
      </button>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a1a40]"></div>
    </div>

    <div v-else-if="project" class="bg-white rounded-[20px] shadow-[0_4px_25px_rgba(0,0,0,0.05)] p-6 md:p-10 flex flex-col md:flex-row gap-8 min-h-[600px]">
      
      <div class="w-full md:w-[250px] flex-shrink-0">
        <div class="flex flex-col gap-3 sticky top-[100px]">
          <h4 class="font-bold text-[#1a1a40] mb-2 px-2 flex items-center gap-2">
            <span class="material-symbols-rounded text-[#ffc107]">book</span> ข้อมูลโครงงาน
          </h4>
          
          <button 
            v-for="tab in menuTabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'px-5 py-4 rounded-xl font-bold transition-all duration-300 flex justify-between items-center text-[0.95rem]',
              activeTab === tab.id 
                ? 'bg-[#1a1a40] text-white shadow-md transform scale-[1.02]' 
                : 'bg-[#f8f9fa] text-gray-600 hover:bg-gray-200 hover:text-[#1a1a40]'
            ]"
          >
            <span>{{ tab.label }}</span>
            <span class="material-symbols-rounded text-sm opacity-70">chevron_right</span>
          </button>
        </div>
      </div>

      <div class="hidden md:block w-[1px] bg-gray-100"></div>

      <div class="flex-grow">
        
        <div class="text-center mb-10 pb-8 border-b border-gray-100">
          <h2 class="text-2xl md:text-[28px] font-bold text-[#1a1a40] leading-snug">
            {{ project.titleTh }}
          </h2>
          <p class="text-gray-500 mt-2">{{ project.titleEn }}</p>
        </div>

        <div v-if="activeTab === 'details'" class="animate-fade-in">
          <div class="grid grid-cols-1 gap-6">
            
            <div class="bg-gray-50 rounded-2xl p-5 flex flex-col md:flex-row md:items-center gap-2 md:gap-6 border border-gray-100 hover:shadow-sm transition-shadow">
              <span class="text-sm font-bold text-gray-500 md:w-[150px] flex-shrink-0">ชื่อโครงงาน</span>
              <span class="text-[#1a1a40] font-semibold text-lg">{{ project.titleTh }}</span>
            </div>

            <div class="bg-gray-50 rounded-2xl p-5 flex flex-col md:flex-row gap-2 md:gap-6 border border-gray-100 hover:shadow-sm transition-shadow">
              <span class="text-sm font-bold text-gray-500 md:w-[150px] flex-shrink-0 pt-1">ชื่อผู้วิจัย</span>
              <div class="flex flex-col gap-2">
                <span class="text-[#1a1a40] font-medium">
                  1. {{ project.student1.fullname }} (รหัสนักศึกษา: {{ project.student1.username }})
                </span>
                <span v-if="project.student2" class="text-[#1a1a40] font-medium">
                  2. {{ project.student2.fullname }} (รหัสนักศึกษา: {{ project.student2.username }})
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-gray-50 rounded-2xl p-5 flex flex-col gap-1 border border-gray-100 hover:shadow-sm transition-shadow">
                <span class="text-sm font-bold text-gray-500">อาจารย์ที่ปรึกษาหลัก</span>
                <span class="text-[#1a1a40] font-medium">{{ project.advisor?.fullname || '-' }}</span>
              </div>
              <div class="bg-gray-50 rounded-2xl p-5 flex flex-col gap-1 border border-gray-100 hover:shadow-sm transition-shadow">
                <span class="text-sm font-bold text-gray-500">อาจารย์ที่ปรึกษาร่วม</span>
                <span class="text-[#1a1a40] font-medium">{{ project.coAdvisor?.fullname || '-' }}</span>
              </div>
            </div>

            <div class="bg-gray-50 rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center border border-gray-100 gap-4 hover:shadow-sm transition-shadow">
              <span class="text-sm font-bold text-gray-500">สถานะโครงงาน</span>
              <span class="bg-green-100 text-green-700 px-4 py-1.5 rounded-full font-bold text-[0.95rem] flex items-center gap-2">
                <span class="material-symbols-rounded">check_circle</span> ผ่านการสอบจบโครงงานสมบูรณ์
              </span>
            </div>

          </div>
        </div>

        <div v-else-if="activeTab === 'thesis'" class="animate-fade-in">
          <div v-if="project.thesisUrl" class="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl">
            <div class="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <span class="material-symbols-rounded text-4xl text-red-500">picture_as_pdf</span>
            </div>
            <h3 class="text-xl font-bold text-[#1a1a40] mb-2">เอกสารบัณฑิตนิพนธ์ฉบับสมบูรณ์</h3>
            <p class="text-gray-500 mb-6">เผยแพร่เมื่อ: {{ formatDate(project.updatedAt) }}</p>
            <a :href="project.thesisUrl" target="_blank" class="bg-[#1a1a40] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2c2c54] transition-colors shadow-md flex items-center gap-2">
              <span class="material-symbols-rounded">cloud_download</span> ดาวน์โหลด PDF
            </a>
          </div>
          <div v-else class="py-20 text-center text-gray-400">
            <span class="material-symbols-rounded text-5xl mb-4 block opacity-30">lock</span>
            ยังไม่มีการแนบไฟล์เอกสารสมบูรณ์
          </div>
        </div>

        <div v-else-if="activeTab === 'program'" class="animate-fade-in">
          <div v-if="project.programUrl" class="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 rounded-2xl">
            <div class="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
              <span class="material-symbols-rounded text-4xl text-indigo-500">integration_instructions</span>
            </div>
            <h3 class="text-xl font-bold text-[#1a1a40] mb-2">ซอร์สโค้ดและโปรแกรม</h3>
            <p class="text-gray-500 mb-6">ลิงก์ไปยัง GitHub Repository หรือไฟล์โปรแกรมที่ถูกบีบอัด</p>
            <a :href="project.programUrl" target="_blank" class="bg-[#1a1a40] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2c2c54] transition-colors shadow-md flex items-center gap-2">
              <span class="material-symbols-rounded">open_in_new</span> ไปยังลิงก์โปรแกรม
            </a>
          </div>
          <div v-else class="py-20 text-center text-gray-400">
            <span class="material-symbols-rounded text-5xl mb-4 block opacity-30">code</span>
            ยังไม่มีการแนบลิงก์โปรแกรม
          </div>
        </div>

      </div>
    </div>
    <div v-else class="text-center py-20">
      <h4 class="text-xl font-bold text-gray-700">ไม่พบข้อมูลโครงงาน</h4>
    </div>
  </div>
</template>

<style scoped>
/* คลาสสำหรับทำแอนิเมชันให้ตอนสลับหน้าไปมาดูนุ่มนวลขึ้น */
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>