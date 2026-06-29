<template>
  <!-- โครงสร้าง Layout หลักสำหรับอาจารย์ รองรับการสลับโหมดสีและอนิเมชัน -->
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">
    
    <!-- แถบนำทางด้านบน (Navbar) ดึงเฉพาะหน้าจอและจะซ่อนเมื่อสั่งพิมพ์ (print:hidden) -->
    <nav class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-3 flex justify-between items-center shadow-sm print:hidden sticky top-0 z-50">
      
      <!-- โลโก้และชื่อแถบเมนูนำทางหลักของอาจารย์ -->
      <NuxtLink to="/teacher" class="flex items-center gap-3 text-indigo-600 no-underline">
        <span class="material-symbols-rounded text-2xl">desktop_windows</span>
        <span class="font-bold text-[18px] tracking-wide text-slate-800 dark:text-slate-200">Teacher<span class="text-indigo-600">Panel</span></span>
      </NuxtLink>

      <div class="flex items-center gap-4">
        
        <!-- ข้อมูลโปรไฟล์ของผู้ใช้งานประเภทอาจารย์ (ซ่อนบนหน้าจอมือถือขนาดเล็ก) -->
        <div v-if="teacher" class="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
          <div class="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-inner overflow-hidden">
            <img v-if="teacher.profileImage" :src="teacher.profileImage" alt="Profile" class="w-full h-full object-cover">
            <span v-else>{{ teacher.fullname?.charAt(0) || 'T' }}</span>
          </div>
          <div class="flex flex-col pr-2">
            <span class="text-sm font-bold text-slate-800 dark:text-slate-200 leading-none mt-1">{{ teacher.fullname }}</span>
            <span class="text-[10px] text-slate-400 font-medium capitalize">{{ teacher.role }}</span>
          </div>
        </div>

        <!-- ปุ่มออกจากระบบ (Logout) -->
        <button @click="handleLogout" class="flex items-center gap-2 bg-rose-50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm font-medium px-4 py-2 rounded-full cursor-pointer">
          <span class="material-symbols-rounded">logout</span> <span class="hidden md:inline">ออกจากระบบ</span>
        </button>

      </div>
    </nav>

    <!-- ส่วนเนื้อหาของหน้าเพจต่าง ๆ ที่จะถูกโหลดเข้ามาภายใน Layout -->
    <main>
      <slot />
    </main>

  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { computed } from 'vue'
const router = useRouter()
const { $pinia } = useNuxtApp()

// เชื่อมต่อระบบจัดการสถานะข้อมูล (Auth Store) ผ่าน Pinia
const authStore = useAuthStore()

// คำนวณหาค่าข้อมูลผู้ใช้งานที่ผ่านการยืนยันแล้ว
const teacher = computed(() => authStore.user)

// ฟังก์ชันเปิดแจ้งเตือนยืนยันก่อนล็อกเอาต์ออกจากระบบ
const handleLogout = async () => {
  const result = await Swal.fire({ 
    title: 'ยืนยันการดำเนินการ', 
    text: "คุณต้องการออกจากระบบ Teacher ใช่หรือไม่?", 
    icon: 'warning', 
    showCancelButton: true, 
    confirmButtonColor: '#dc3545', 
    cancelButtonColor: '#6c757d', 
    confirmButtonText: 'ยืนยัน', 
    cancelButtonText: 'ยกเลิก' 
  });
  
  if (result.isConfirmed) {
    await authStore.logout()
  }
}

// โหลดฟอนต์สไตล์ Kanit สำหรับภาษาไทยที่หน้าเพจ
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap' },
  ]
})
</script>