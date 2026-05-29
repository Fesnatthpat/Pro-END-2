<template>
  <div class="flex flex-col min-h-screen bg-[#f8f9fa]">
    
    <nav class="sticky top-0 z-50 bg-[#252243] py-3 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <div class="w-full xl:max-w-[1400px] mx-auto px-4 md:px-8 flex flex-wrap items-center justify-between">
        
        <NuxtLink to="/student" class="text-white font-bold text-[1.4rem] flex items-center gap-2 no-underline shrink-0">
          <span class="material-symbols-rounded">school</span> Student Panel
        </NuxtLink>

        <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden text-white text-2xl focus:outline-none">
          <span class="material-symbols-rounded">{{ isMenuOpen ? 'close' : 'menu' }}</span>
        </button>

        <div :class="isMenuOpen ? 'flex' : 'hidden'" class="w-full lg:flex lg:w-auto lg:flex-grow flex-col lg:flex-row items-start lg:items-center mt-4 lg:mt-0">
          
          <ul class="flex flex-col lg:flex-row lg:mr-auto lg:ml-10 w-full lg:w-auto gap-2 lg:gap-2 mb-4 lg:mb-0">
            <li>
              <NuxtLink to="/procedures" active-class="bg-white/20 text-white" class="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-[18px] py-[8px] rounded-full transition-all duration-300 font-medium text-[0.95rem]">
                <span class="material-symbols-rounded">account_tree</span> ขั้นตอนการทำโครงงาน
              </NuxtLink>
            </li>

            <li v-if="isApproved">
              <NuxtLink to="/student" active-class="bg-white/20 text-white" class="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-[18px] py-[8px] rounded-full transition-all duration-300 font-medium text-[0.95rem]">
                <span class="material-symbols-rounded">folder</span> โครงงานของฉัน
              </NuxtLink>
            </li>

            <li>
              <NuxtLink to="/senior-projects" active-class="bg-white/20 text-white" class="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-[18px] py-[8px] rounded-full transition-all duration-300 font-medium text-[0.95rem]">
                <span class="material-symbols-rounded">video_library</span> โครงงานรุ่นพี่
              </NuxtLink>
            </li>

            <li>
              <a href="/thesis_manual.pdf" target="_blank" class="flex items-center gap-2 text-white/80 hover:text-white hover:bg-white/10 px-[18px] py-[8px] rounded-full transition-all duration-300 font-medium text-[0.95rem]">
                <span class="material-symbols-rounded">menu_book</span> คู่มือทำเล่ม
              </a>
            </li>
          </ul>

          <div class="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-3 w-full lg:w-auto shrink-0 py-4 lg:py-0 border-t border-white/10 lg:border-none mt-2 lg:mt-0">
            
            <NuxtLink v-if="user" to="/student/profile" class="flex items-center gap-[10px] text-white bg-white/10 hover:bg-white/20 cursor-pointer transition-colors duration-300 pr-[18px] pl-[6px] py-[6px] rounded-full no-underline w-full lg:w-auto">
              <div class="w-[32px] h-[32px] bg-white text-[#1a1a40] rounded-full flex items-center justify-center font-bold text-[0.9rem] overflow-hidden">
                <img v-if="user.profileImage" :src="user.profileImage" alt="Profile" class="w-full h-full object-cover">
                <span v-else>{{ user.fullname?.charAt(0) || 'U' }}</span>
              </div>
              <span class="text-[0.95rem] font-medium">{{ user.fullname }}</span>
            </NuxtLink>

            <NuxtLink v-if="!user" to="/login" class="flex items-center gap-2 text-white border border-white/30 hover:bg-[#ffc107] hover:border-[#ffc107] hover:text-[#1a1a40] px-[20px] py-[8px] rounded-full text-[0.9rem] font-medium transition-colors duration-300 w-full lg:w-auto justify-center lg:justify-start cursor-pointer">
              <span class="material-symbols-rounded">login</span> Login
            </NuxtLink>

            <button v-else @click="handleLogout" type="button" class="flex items-center gap-2 text-white border border-white/30 hover:bg-[#dc3545] hover:border-[#dc3545] px-[20px] py-[8px] rounded-full text-[0.9rem] font-medium transition-colors duration-300 w-full lg:w-auto justify-center lg:justify-start cursor-pointer">
              <span class="material-symbols-rounded">logout</span> Logout
            </button>
          </div>

        </div>
      </div>
    </nav>

    <main class="flex-grow w-full py-6">
      <slot />
    </main>

    <!-- <footer class="bg-[#1a1a40] text-white mt-auto">
      <div class="max-w-[1140px] mx-auto px-4 py-10">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div class="lg:col-span-2">
            <h5 class="uppercase font-bold text-[#ffc107] mb-4 text-lg flex items-center gap-2">
              <span class="material-symbols-rounded">school</span> Computer Science Project
            </h5>
            <p class="text-sm text-gray-300 leading-relaxed">
              ระบบบริหารจัดการโครงงานคอมพิวเตอร์<br />
              สาขาวิชาวิทยาการคอมพิวเตอร์ มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา
            </p>
          </div>

          <div>
            <h5 class="uppercase font-bold text-base mb-4">เมนูหลัก</h5>
            <ul class="text-sm space-y-2">
              <li><NuxtLink to="/student" class="text-gray-300 hover:text-[#ffc107] hover:underline transition-colors">หน้าหลัก</NuxtLink></li>
              <li><NuxtLink to="/procedures" class="text-gray-300 hover:text-[#ffc107] hover:underline transition-colors">ขั้นตอนโครงงาน</NuxtLink></li>
              <li><NuxtLink to="/senior-projects" class="text-gray-300 hover:text-[#ffc107] hover:underline transition-colors">โครงงานรุ่นพี่</NuxtLink></li>
              <li><a href="/thesis_manual.pdf" target="_blank" class="text-gray-300 hover:text-[#ffc107] hover:underline transition-colors">คู่มือทำเล่มบัณฑิตนิพนธ์</a></li>
            </ul>
          </div>

          <div>
            <h5 class="uppercase font-bold text-base mb-4">ติดต่อ</h5>
            <ul class="text-sm space-y-3">
              <li class="flex items-start gap-2 text-gray-300">
                <span class="material-symbols-rounded mt-1">location_on</span> อาคาร 4 ห้อง 412 สาขาวิชาวิทยาการคอมพิวเตอร์
              </li>
              <li class="flex items-center gap-2 text-gray-300">
                <span class="material-symbols-rounded">phone</span> 02-xxx-xxxx
              </li>
              <li class="text-[#ffc107] mt-3 font-medium">
                ผู้จัดทำ: คุณหนูเต้ย (Front-end)
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="bg-black/20 text-center p-4 text-sm">
        © 2026 Copyright:
        <a href="#" class="text-white hover:text-[#ffc107] hover:underline transition-colors">BSRU Computer Science</a>
      </div>
    </footer> -->
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { ref, computed } from "vue";

const isMenuOpen = ref(false);
const { $pinia } = useNuxtApp()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

// ตรวจสอบสิทธิ์การเข้าใช้งานจากข้อมูลจริง
const isApproved = computed(() => user.value?.isApproved || false)

const handleLogout = async () => {
  const result = await Swal.fire({ title: 'ยืนยันการดำเนินการ', text: "คุณต้องการออกจากระบบใช่หรือไม่?", icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc3545', cancelButtonColor: '#6c757d', confirmButtonText: 'ยืนยัน', cancelButtonText: 'ยกเลิก' });
  if (result.isConfirmed) {
    await authStore.logout()
  }
};


</script>