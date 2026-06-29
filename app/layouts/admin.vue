<template>
  <!-- โครงสร้าง Layout หลักของผู้ดูแลระบบ (Admin Panel) -->
  <div class="flex min-h-screen bg-[#f8fafc] dark:bg-slate-900 text-slate-800 dark:text-slate-200 transition-colors duration-300">

    <!-- 1. แถบเมนูด้านซ้ายสำหรับหน้าจอคอมพิวเตอร์ (Desktop Sidebar) -->
    <aside
      class="w-[280px] bg-gradient-to-b from-[#0f0c29] to-[#302b63] text-white flex flex-col shadow-2xl shrink-0 hidden lg:flex sticky top-0 h-screen overflow-hidden print:hidden">

      <!-- ข้อมูลผู้ใช้ผู้ดูแลระบบที่กำลังล็อกอิน -->
      <div v-if="admin" class="relative z-10 p-8 mb-4 border-b border-white/5 flex items-center gap-4">
        <div class="w-14 h-14 rounded-full bg-white text-[#0f0c29] flex items-center justify-center font-black text-2xl shadow-lg shrink-0 overflow-hidden">
          {{ admin.fullname?.charAt(0) || 'A' }}
        </div>
        <div class="overflow-hidden">
          <span class="block font-bold truncate text-base tracking-tight text-white">{{ admin.fullname }}</span>
          <span class="block text-slate-300 text-xs mt-0.5">{{ admin.role === 'admin' ? 'Administrator' : admin.role }}</span>
        </div>
      </div>

      <!-- รายการนำทางหลัก (Navbar Menu List) -->
      <nav class="relative z-10 flex-grow p-4 space-y-1.5 overflow-y-auto">
        <div class="px-4 mb-2 text-[11px] font-bold text-white/30 uppercase tracking-widest">Main Menu</div>
        
        <NuxtLink v-for="link in navigationLinks" :key="link.to" :to="link.to" 
          exact-active-class="bg-white !text-[#0f0c29] !font-bold shadow-md"
          class="flex items-center gap-3 text-slate-300 hover:text-white px-4 py-3 rounded-xl transition-all duration-300 group relative">
          <span class="material-symbols-rounded text-[22px] group-hover:scale-110 transition-transform duration-300" :class="$route.path === link.to ? 'text-[#0f0c29]' : ''">{{ link.icon }}</span>
          <span class="text-[14px]">{{ link.label }}</span>
          <!-- ตัวแจ้งเตือนแบบตัวเลขกลมๆ สีแดงแสดงรายการค้างรออนุมัติ (Notification Badge) -->
          <span v-if="link.badgeKey && badges[link.badgeKey] > 0" class="ml-auto bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {{ badges[link.badgeKey] }}
          </span>
        </NuxtLink>
      </nav>

      <!-- ปุ่มออกจากระบบด้านล่าง Sidebar -->
      <div class="relative z-10 p-4 mt-auto">
        <button @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 bg-slate-200 hover:bg-white text-[#0f0c29] font-bold px-4 py-3.5 rounded-xl transition-all duration-300 group shadow-sm">
          <span class="material-symbols-rounded text-lg group-hover:rotate-12 transition-transform">logout</span> ออกจากระบบ
        </button>
      </div>
    </aside>

    <!-- 2. แถบนำทางด้านบนสำหรับมือถือ (Mobile Header) -->
    <div
      class="lg:hidden fixed top-0 left-0 right-0 z-[100] bg-[#0f172a] text-white px-4 h-16 flex items-center justify-between shadow-lg border-b border-white/5 print:hidden">
      <div class="flex items-center gap-3">
        <!-- ปุ่มเปิดลิ้นชักแถบนำทาง (Menu Trigger) -->
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

    <!-- แผ่นสกรีนดำด้านหลังเมื่อเปิดลิ้นชักเมนูบนมือถือ (Mobile Sidebar Drawer Overlay) -->
    <Transition name="fade">
      <div v-if="isMobileMenuOpen" @click="isMobileMenuOpen = false"
        class="fixed inset-0 z-[101] bg-slate-900/40 lg:hidden transition-opacity">
      </div>
    </Transition>

    <!-- 3. ลิ้นชักนำทางสำหรับมือถือ (Mobile Sidebar Drawer) -->
    <aside :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
      class="fixed top-0 left-0 bottom-0 z-[102] w-[300px] bg-gradient-to-b from-[#0f0c29] to-[#302b63] text-white flex flex-col transition-transform duration-300 ease-out lg:hidden shadow-2xl">

      <div v-if="admin" class="relative z-10 p-8 mb-4 border-b border-white/5 flex items-center gap-4">
        <div class="w-14 h-14 rounded-full bg-white text-[#0f0c29] flex items-center justify-center font-black text-2xl shadow-lg shrink-0 overflow-hidden">
          {{ admin.fullname?.charAt(0) || 'A' }}
        </div>
        <div class="overflow-hidden">
          <span class="block font-bold truncate text-base tracking-tight text-white">{{ admin.fullname }}</span>
          <span class="block text-slate-300 text-xs mt-0.5">{{ admin.role === 'admin' ? 'Administrator' : admin.role }}</span>
        </div>
      </div>

      <nav class="flex-grow p-4 space-y-2 overflow-y-auto" @click="isMobileMenuOpen = false">
        <NuxtLink v-for="link in navigationLinks" :key="'mob-' + link.to" :to="link.to" 
          exact-active-class="bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
          class="flex items-center gap-3 text-slate-400 hover:text-white hover:bg-white/5 px-4 py-3.5 rounded-xl transition-all duration-300">
          <span class="material-symbols-rounded text-[22px]">{{ link.icon }}</span>
          <span class="text-[15px]">{{ link.label }}</span>
          <span v-if="link.badgeKey && badges[link.badgeKey] > 0" class="ml-auto bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {{ badges[link.badgeKey] }}
          </span>
        </NuxtLink>
      </nav>

      <div class="p-6 mt-auto border-t border-white/5">
        <button @click="handleLogout"
          class="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-600 text-rose-500 hover:text-white font-bold px-4 py-4 rounded-2xl transition-all duration-300">
          <span class="material-symbols-rounded">logout</span> ออกจากระบบ
        </button>
      </div>
    </aside>

    <!-- พื้นที่แสดงผลส่วนหลัก (Main content slots) -->
    <main class="flex-grow w-full max-w-full overflow-x-hidden pt-16 lg:pt-0">
      <div class="w-full min-h-screen relative">
        <slot />
      </div>
    </main>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

const router = useRouter()
const alerts = useAlerts()
const { $pinia } = useNuxtApp()
const authStore = useAuthStore()

// คำนวณข้อมูลผู้ใช้งานปัจจุบันที่เป็นผู้ดูแลระบบ
const admin = computed(() => authStore.user)
const route = useRoute()

// ดึงจำนวนตัวแจ้งเตือนไอคอนแต่ละแถบเมนู (เช่น นักศึกษารออนุมัติ, คำร้องขอสอบหัวข้อ, คำร้องขอสอบจบ)
const { data: badgesData, refresh: refreshBadges } = useFetch('/api/admin/menu-badges')
const badges = computed(() => badgesData.value?.data || {})

// คอยรีเฟรชจำนวนตัวเลขแจ้งเตือนทุกครั้งที่ผู้ดูแลสลับหน้าไปมา
watch(() => route.path, () => {
  refreshBadges()
})

// เปิด-ปิดเมนูบนหน้าจอมือถือ
const isMobileMenuOpen = ref(false)

// โครงสร้างหัวข้อรายการการทำงานนำทาง (Navigation structure links)
const navigationLinks = [
  { to: '/admin', label: 'Dashboard', icon: 'grid_view' },
  { to: '/admin/students/approve', label: 'อนุมัตินักศึกษาใหม่', icon: 'person_add', badgeKey: 'pendingStudents' },
  { to: '/admin/exam-topic', label: 'คำร้องขอสอบหัวข้อ', icon: 'assignment_turned_in', badgeKey: 'pendingTopicExams' },
  { to: '/admin/exam-final', label: 'คำร้องขอสอบจบ', icon: 'assessment', badgeKey: 'pendingFinalExams' },
  { to: '/admin/projects', label: 'ข้อมูลโครงงาน', icon: 'folder' },
  { to: '/admin/students/students', label: 'ข้อมูลนักศึกษา', icon: 'group' },
  { to: '/admin/teachers', label: 'ข้อมูลอาจารย์', icon: 'badge' },
  { to: '/admin/reports', label: 'รายงาน', icon: 'insert_chart' },
  { to: '/admin/admins', label: 'จัดการผู้ดูแล', icon: 'admin_panel_settings' },
]

// ฟังก์ชันยืนยันการลงชื่อออกจากระบบ
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
/* เอฟเฟกต์การสลับปรากฏตัวของแผ่นสกรีนด้านหลังเมนูมือถือ */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
