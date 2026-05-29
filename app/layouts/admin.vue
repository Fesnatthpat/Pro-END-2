<template>
  <div class="flex min-h-screen bg-[#f8fafc] text-slate-800">

    <!-- Desktop Sidebar -->
    <aside
      class="w-[280px] bg-[#0f172a] text-white flex flex-col shadow-2xl shrink-0 hidden lg:flex sticky top-0 h-screen overflow-hidden">
      
      <!-- Sidebar Background Decoration -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div class="absolute -top-24 -left-24 w-64 h-64 bg-indigo-600 rounded-full blur-[80px]"></div>
        <div class="absolute top-1/2 -right-24 w-48 h-48 bg-purple-600 rounded-full blur-[60px]"></div>
      </div>

      <div v-if="admin" class="relative z-10 p-8 mb-4 border-b border-white/5 flex items-center gap-4">
        <div
          class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg shrink-0 overflow-hidden border-2 border-white/10">
          {{ admin.fullname?.charAt(0) || 'A' }}
        </div>
        <div class="overflow-hidden">
          <span class="block font-bold truncate text-base tracking-tight">{{ admin.fullname }}</span>
          <span class="inline-flex items-center px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/30 mt-1">{{ admin.role }}</span>
        </div>
      </div>

      <nav class="relative z-10 flex-grow p-4 space-y-1.5 overflow-y-auto">
        <div class="px-4 mb-2 text-[11px] font-bold text-white/30 uppercase tracking-widest">Main Menu</div>
        
        <NuxtLink v-for="link in navigationLinks" :key="link.to" :to="link.to" 
          exact-active-class="bg-white/10 text-white !font-semibold shadow-sm border-r-4 border-indigo-500"
          class="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 px-4 py-3 rounded-xl transition-all duration-300 group relative">
          <span class="material-symbols-rounded text-[22px] group-hover:scale-110 transition-transform duration-300" :class="{'text-indigo-400': $route.path === link.to}">{{ link.icon }}</span>
          <span class="text-[14px]">{{ link.label }}</span>
          <div v-if="$route.path === link.to" class="absolute left-0 w-1 h-6 bg-indigo-500 rounded-r-full"></div>
        </NuxtLink>
      </nav>

      <div class="relative z-10 p-4 mt-auto border-t border-white/5 bg-white/5 backdrop-blur-sm">
        <button @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white font-bold px-4 py-3.5 rounded-xl transition-all duration-300 group">
          <span class="material-symbols-rounded text-lg group-hover:rotate-12 transition-transform">logout</span> ออกจากระบบ
        </button>
      </div>
    </aside>

    <!-- Mobile Header -->
    <div
      class="lg:hidden fixed top-0 left-0 right-0 z-[100] bg-[#0f172a] text-white px-4 h-16 flex items-center justify-between shadow-lg border-b border-white/5">
      <div class="flex items-center gap-3">
        <button @click="isMobileMenuOpen = true"
          class="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10">
          <span class="material-symbols-rounded text-2xl">menu</span>
        </button>
        <span class="font-bold tracking-tight text-lg bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Admin Panel</span>
      </div>
      <div v-if="admin"
        class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-lg overflow-hidden border border-white/10">
        {{ admin.fullname?.charAt(0) || 'A' }}
      </div>
    </div>

    <!-- Mobile Sidebar Drawer Overlay -->
    <Transition name="fade">
      <div v-if="isMobileMenuOpen" @click="isMobileMenuOpen = false"
        class="fixed inset-0 z-[101] bg-slate-900/60 backdrop-blur-md lg:hidden transition-opacity">
      </div>
    </Transition>

    <!-- Mobile Sidebar Drawer -->
    <aside :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
      class="fixed top-0 left-0 bottom-0 z-[102] w-[300px] bg-[#0f172a] text-white flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden shadow-2xl">

      <div class="p-6 border-b border-white/5 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div v-if="admin"
            class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold shadow-lg border border-white/10">
            {{ admin.fullname?.charAt(0) || 'A' }}
          </div>
          <div class="overflow-hidden">
            <span class="block font-bold truncate text-base">{{ admin?.fullname }}</span>
            <span class="text-indigo-400 text-[10px] font-bold uppercase tracking-wider">Admin Portal</span>
          </div>
        </div>
        <button @click="isMobileMenuOpen = false" class="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/50 hover:text-white">
          <span class="material-symbols-rounded">close</span>
        </button>
      </div>

      <nav class="flex-grow p-4 space-y-2 overflow-y-auto" @click="isMobileMenuOpen = false">
        <NuxtLink v-for="link in navigationLinks" :key="'mob-' + link.to" :to="link.to" 
          exact-active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
          class="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 px-4 py-3.5 rounded-xl transition-all duration-300">
          <span class="material-symbols-rounded text-[22px]">{{ link.icon }}</span>
          <span class="text-[15px]">{{ link.label }}</span>
        </NuxtLink>
      </nav>

      <div class="p-6 mt-auto border-t border-white/5">
        <button @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-600 text-rose-500 hover:text-white font-bold px-4 py-4 rounded-2xl transition-all duration-300">
          <span class="material-symbols-rounded">logout</span> ออกจากระบบ
        </button>
      </div>
    </aside>

    <main class="flex-grow w-full max-w-full overflow-x-hidden pt-16 lg:pt-0">
      <div class="max-w-7xl mx-auto min-h-screen relative">
        <!-- Page Transition Wrapper -->
        <slot />
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

const router = useRouter()
const alerts = useAlerts()
const { $pinia } = useNuxtApp()
const authStore = useAuthStore()
const admin = computed(() => authStore.user)

const isMobileMenuOpen = ref(false)

const navigationLinks = [
  { to: '/admin', label: 'Dashboard', icon: 'grid_view' },
  { to: '/admin/students/approve', label: 'อนุมัตินักศึกษาใหม่', icon: 'person_add' },
  { to: '/admin/exam-topic', label: 'คำร้องขอสอบหัวข้อ', icon: 'assignment_turned_in' },
  { to: '/admin/exam-final', label: 'คำร้องขอสอบจบ', icon: 'assessment' },
  { to: '/admin/projects', label: 'ข้อมูลโครงงาน', icon: 'folder' },
  { to: '/admin/students/students', label: 'ข้อมูลนักศึกษา', icon: 'group' },
  { to: '/admin/teachers', label: 'ข้อมูลอาจารย์', icon: 'badge' },
  { to: '/admin/reports', label: 'รายงาน', icon: 'insert_chart' },
  { to: '/admin/admins', label: 'จัดการผู้ดูแล', icon: 'admin_panel_settings' },
]

const handleLogout = async () => {
  const result = await alerts.confirm('ยืนยันการออกจากระบบ', 'คุณต้องการออกจากระบบ Admin ใช่หรือไม่?', 'warning');
  if (result.isConfirmed) {
    isMobileMenuOpen.value = false
    await authStore.logout()
    alerts.toast('ออกจากระบบสำเร็จ')
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
