<template>
  <div class="min-h-screen bg-slate-50 ">
    
    <nav class="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center shadow-sm print:hidden sticky top-0 z-50">
      
      <NuxtLink to="/teacher" class="flex items-center gap-3 text-indigo-600 no-underline">
        <span class="material-symbols-rounded text-2xl">desktop_windows</span>
        <span class="font-bold text-[18px] tracking-wide text-slate-800">Teacher<span class="text-indigo-600">Panel</span></span>
      </NuxtLink>

      <div class="flex items-center gap-4">
        
        <div v-if="teacher" class="hidden md:flex items-center gap-3 px-3 py-1.5 rounded-full border border-slate-100 bg-slate-50">
          <div class="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-inner overflow-hidden">
            <img v-if="teacher.profileImage" :src="teacher.profileImage" alt="Profile" class="w-full h-full object-cover">
            <span v-else>{{ teacher.fullname?.charAt(0) || 'T' }}</span>
          </div>
          <div class="flex flex-col pr-2">
            <span class="text-sm font-bold text-slate-800 leading-none mt-1">{{ teacher.fullname }}</span>
            <span class="text-[10px] text-slate-400 font-medium capitalize">{{ teacher.role }}</span>
          </div>
        </div>

        <button @click="handleLogout" class="flex items-center gap-2 bg-rose-50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-sm font-medium px-4 py-2 rounded-full cursor-pointer">
          <span class="material-symbols-rounded">logout</span> <span class="hidden md:inline">ออกจากระบบ</span>
        </button>

      </div>
    </nav>

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
const authStore = useAuthStore()
const user = computed(() => authStore.user)

const handleLogout = async () => {
  const result = await Swal.fire({ title: 'ยืนยันการดำเนินการ', text: "คุณต้องการออกจากระบบ Teacher ใช่หรือไม่?", icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc3545', cancelButtonColor: '#6c757d', confirmButtonText: 'ยืนยัน', cancelButtonText: 'ยกเลิก' });
  if (result.isConfirmed) {
    await authStore.logout()
  }
}

useHead({
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap' },
    
  ]
})
</script>