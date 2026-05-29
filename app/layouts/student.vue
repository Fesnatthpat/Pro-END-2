<template>
  <div class="flex flex-col min-h-screen bg-[#f8f9fa]">
    
    <nav v-if="!hideNav" class="sticky top-0 z-50 bg-[#1a1a40]/95 backdrop-blur-md py-3 lg:py-4 shadow-[0_4px_25px_rgba(0,0,0,0.1)] border-b border-white/5 transition-all duration-300 print:hidden">
      <div class="w-full xl:max-w-[1450px] mx-auto px-4 md:px-8 flex flex-wrap lg:flex-nowrap items-center justify-between">
        
        <!-- 1. Logo (Left) -->
        <div class="flex-1 flex justify-start z-20">
          <NuxtLink to="/student" class="text-white font-extrabold text-xl flex items-center gap-3 no-underline shrink-0 group">
            <div class="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <i class="bi bi-mortarboard-fill"></i>
            </div>
            <span class="tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-200">Student Panel</span>
          </NuxtLink>
        </div>

        <!-- Mobile Toggle -->
        <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden text-indigo-200 hover:text-white text-3xl focus:outline-none z-20 transition-colors">
          <i class="bi" :class="isMenuOpen ? 'bi-x' : 'bi-list'"></i>
        </button>

        <!-- Wrapper for Desktop & Mobile Menu -->
        <div :class="isMenuOpen ? 'max-h-[400px] opacity-100 py-4 mt-2 border-t border-white/10' : 'max-h-0 opacity-0 lg:max-h-full lg:opacity-100 lg:py-0 lg:mt-0 lg:border-none'" 
             class="w-full lg:w-auto lg:flex-1 lg:flex justify-center items-center overflow-hidden lg:overflow-visible transition-all duration-300 ease-in-out">
          
          <!-- 2. Navigation (Center) -->
          <ul class="flex flex-col lg:flex-row items-center gap-2 w-full lg:w-auto m-0 p-0">
            <li class="w-full lg:w-auto">
              <NuxtLink @click="isMenuOpen = false" to="/procedures" active-class="bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-500/30" 
                        class="flex items-center justify-center lg:justify-start gap-2 text-slate-300 hover:text-white hover:bg-white/10 px-5 py-2.5 rounded-2xl transition-all duration-300 font-medium text-[15px] w-full whitespace-nowrap">
                <i class="bi bi-diagram-3-fill"></i> ขั้นตอนโครงงาน
              </NuxtLink>
            </li>

            <li v-if="isApproved" class="w-full lg:w-auto">
              <NuxtLink @click="isMenuOpen = false" to="/student" active-class="bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-500/30" 
                        class="flex items-center justify-center lg:justify-start gap-2 text-slate-300 hover:text-white hover:bg-white/10 px-5 py-2.5 rounded-2xl transition-all duration-300 font-medium text-[15px] w-full whitespace-nowrap">
                <i class="bi bi-folder-fill"></i> โครงงานของฉัน
              </NuxtLink>
            </li>

            <li v-if="isApproved" class="w-full lg:w-auto">
              <NuxtLink @click="isMenuOpen = false" to="/student/activity" active-class="bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-500/30" 
                        class="flex items-center justify-center lg:justify-start gap-2 text-slate-300 hover:text-white hover:bg-white/10 px-5 py-2.5 rounded-2xl transition-all duration-300 font-medium text-[15px] w-full whitespace-nowrap">
                <i class="bi bi-clock-history"></i> ประวัติกิจกรรม
              </NuxtLink>
            </li>

            <li class="w-full lg:w-auto">
              <NuxtLink @click="isMenuOpen = false" to="/senior-projects" active-class="bg-indigo-500/20 text-indigo-200 ring-1 ring-indigo-500/30" 
                        class="flex items-center justify-center lg:justify-start gap-2 text-slate-300 hover:text-white hover:bg-white/10 px-5 py-2.5 rounded-2xl transition-all duration-300 font-medium text-[15px] w-full whitespace-nowrap">
                <i class="bi bi-collection-play-fill"></i> โครงงานรุ่นพี่
              </NuxtLink>
            </li>

            <li class="w-full lg:w-auto">
              <a @click="isMenuOpen = false" href="/thesis_manual.pdf" target="_blank" 
                 class="flex items-center justify-center lg:justify-start gap-2 text-slate-300 hover:text-white hover:bg-white/10 px-5 py-2.5 rounded-2xl transition-all duration-300 font-medium text-[15px] w-full whitespace-nowrap">
                <i class="bi bi-book-half"></i> คู่มือทำเล่ม
              </a>
            </li>
          </ul>
        </div>

        <!-- 3. Profile & Actions (Right) -->
        <div :class="isMenuOpen ? 'flex' : 'hidden'" class="lg:flex flex-1 flex-col lg:flex-row justify-end items-center gap-3 w-full lg:w-auto pt-4 lg:pt-0 mt-2 lg:mt-0 border-t border-white/10 lg:border-none pb-4 lg:pb-0">
          
          <NuxtLink @click="isMenuOpen = false" v-if="user" to="/student/profile" class="flex items-center gap-3 text-white bg-white/5 hover:bg-white/10 ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300 pr-4 pl-1.5 py-1.5 rounded-full w-full lg:w-auto justify-center lg:justify-start">
            <div class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-sm overflow-hidden shrink-0">
              <img v-if="user.profileImage" :src="user.profileImage" alt="Profile" class="w-full h-full object-cover">
              <span v-else>{{ user.fullname?.charAt(0) || 'U' }}</span>
            </div>
            <div class="flex flex-col items-start leading-tight min-w-0">
              <span class="text-[13px] font-bold tracking-wide truncate max-w-[120px] xl:max-w-[180px]">{{ user.fullname }}</span>
              <span class="text-[10px] text-indigo-300 font-medium">นักศึกษาปัจจุบัน</span>
            </div>
          </NuxtLink>

          <button @click="handleLogout" type="button" class="flex items-center justify-center gap-2 text-rose-300 bg-rose-500/10 hover:bg-rose-500 hover:text-white px-5 py-2 rounded-full text-[14px] font-bold transition-all duration-300 w-full lg:w-auto shrink-0 mt-2 lg:mt-0 whitespace-nowrap">
            <i class="bi bi-box-arrow-right"></i> ออกจากระบบ
          </button>
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
              <i class="bi bi-mortarboard-fill"></i> Computer Science Project
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
                <i class="bi bi-geo-alt-fill mt-1"></i> อาคาร 4 ห้อง 412 สาขาวิชาวิทยาการคอมพิวเตอร์
              </li>
              <li class="flex items-center gap-2 text-gray-300">
                <i class="bi bi-telephone-fill"></i> 02-xxx-xxxx
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
import { ref, computed } from "vue";

const isMenuOpen = ref(false);
const route = useRoute();
const hideNav = computed(() => route.query.hideNav === 'true');

const { $pinia } = useNuxtApp()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

// ตรวจสอบสิทธิ์การเข้าใช้งานจากข้อมูลจริง
const isApproved = computed(() => user.value?.isApproved || false)

// 🌟 ฟังก์ชันจัดการตอนกดปุ่มออกจากระบบ 🌟
const { confirm: confirmAlert } = useAlerts()
const handleLogout = async () => {
  const result = await confirmAlert("ออกจากระบบ", "คุณต้องการออกจากระบบใช่หรือไม่?", "warning")
  if (result.isConfirmed) {
    await authStore.logout()
  }
};

useHead({
  titleTemplate: "%s | BSRU Computer Project",
  link: [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css",
    },
  ],
});
</script>