<template>
  <div class="p-4 md:p-10 font-['Prompt',_sans-serif]">
    
    <div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="relative">
        <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">จัดการผู้ดูแลระบบ</h1>
        <div class="flex items-center gap-2 text-slate-500">
          <span class="w-8 h-px bg-indigo-200"></span>
          <p class="text-sm font-medium">จัดการข้อมูลบัญชีผู้ดูแลระบบและกำหนดสิทธิ์การใช้งาน</p>
        </div>
      </div>
      
      <button 
        @click="openModal()"
        class="group relative overflow-hidden bg-slate-900 hover:bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-slate-200 flex items-center gap-3 w-fit active:scale-95"
      >
        <span class="material-symbols-rounded group-hover:rotate-12 transition-transform">admin_panel_settings</span> 
        <span>เพิ่มผู้ดูแลระบบ</span>
        <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>
    </div>

    <!-- Table Section -->
    <div class="admin-card bg-white overflow-hidden">
      
      <div v-if="pending" class="flex flex-col items-center justify-center py-32">
        <div class="relative w-20 h-20">
          <div class="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p class="mt-6 text-slate-400 font-bold animate-pulse">กำลังโหลดข้อมูลผู้ดูแล...</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left min-w-[900px]">
          <thead>
            <tr class="bg-slate-50/50">
              <th class="px-8 py-5 admin-table-header">ชื่อ-นามสกุล</th>
              <th class="px-8 py-5 admin-table-header">Username / Email</th>
              <th class="px-8 py-5 admin-table-header">บทบาท</th>
              <th class="px-8 py-5 admin-table-header text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-50 text-sm">
            <tr v-for="admin in admins" :key="admin.id" class="admin-table-row group/row">
              <td class="px-8 py-6">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg border border-indigo-200 shadow-sm group-hover/row:scale-110 transition-transform">
                    {{ admin.fullname.charAt(0) }}
                  </div>
                  <span class="font-bold text-slate-800 text-base">{{ admin.fullname }}</span>
                </div>
              </td>
              <td class="px-8 py-6">
                <div class="flex flex-col gap-1">
                  <div class="font-bold text-slate-700">{{ admin.username }}</div>
                  <div class="text-slate-400 font-medium text-xs">{{ admin.email }}</div>
                </div>
              </td>
              <td class="px-8 py-6">
                <span 
                  :class="admin.role === 'superadmin' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'"
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="admin.role === 'superadmin' ? 'bg-purple-600' : 'bg-blue-600'"></span>
                  {{ admin.role }}
                </span>
              </td>
              <td class="px-8 py-6">
                <div class="flex items-center justify-center gap-3">
                  <button 
                    @click="openModal(admin)"
                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-sm border border-amber-100 group-hover/row:scale-110"
                    title="แก้ไข"
                  >
                    <span class="material-symbols-rounded text-xl">edit</span>
                  </button>
                  <button 
                    @click="confirmDelete(admin)"
                    class="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-sm border border-rose-100 group-hover/row:scale-110"
                    title="ลบ"
                  >
                    <span class="material-symbols-rounded text-xl">delete</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="admins?.length === 0">
              <td colspan="4" class="px-8 py-20 text-center">
                <div class="w-20 h-20 bg-slate-50 text-slate-200 rounded-[28px] flex items-center justify-center mx-auto mb-6">
                  <span class="material-symbols-rounded text-5xl">admin_panel_settings</span>
                </div>
                <p class="font-bold text-slate-400 text-lg">ไม่พบข้อมูลผู้ดูแลระบบ</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Admin Modal -->
    <Transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <div class="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-[fadeIn_0.3s_ease-out] border border-white/20">
          <div class="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                <span class="material-symbols-rounded">{{ editingId ? 'edit' : 'person_add' }}</span>
              </div>
              <h3 class="font-bold text-2xl text-slate-900 tracking-tight">{{ editingId ? 'แก้ไขผู้ดูแลระบบ' : 'เพิ่มผู้ดูแลระบบ' }}</h3>
            </div>
            <button @click="closeModal" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
              <span class="material-symbols-rounded">close</span>
            </button>
          </div>
          
          <form @submit.prevent="handleSubmit" class="p-8 space-y-6">
            <div class="space-y-1.5">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">ชื่อ-นามสกุล</label>
              <input v-model="form.fullname" type="text" required class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50" placeholder="กรอกชื่อ-นามสกุล">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Username</label>
                <input v-model="form.username" type="text" required class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50" placeholder="กรอกชื่อผู้ใช้">
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">บทบาท</label>
                <div class="relative">
                  <select v-model="form.role" class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50 appearance-none">
                    <option value="admin">Admin</option>
                    <option value="superadmin">Super Admin</option>
                  </select>
                  <span class="material-symbols-rounded absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">Email</label>
              <input v-model="form.email" type="email" required class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50" placeholder="admin@example.com">
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">
                Password {{ editingId ? '(เว้นว่างไว้หากไม่ต้องการเปลี่ยน)' : '' }}
              </label>
              <input v-model="form.password" type="password" :required="!editingId" class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50" placeholder="••••••••">
            </div>

            <div class="pt-6 flex gap-4">
              <button type="button" @click="closeModal" class="flex-1 px-8 py-4 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all active:scale-95"> ยกเลิก </button>
              <button type="submit" :disabled="submitting" class="flex-[1.5] bg-slate-900 hover:bg-indigo-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-slate-200 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2">
                <div v-if="submitting" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {{ submitting ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({
  layout: 'admin'
})

const alerts = useAlerts()
const { data: admins, pending, refresh } = useFetch('/api/admin/admins')

const showModal = ref(false)
const submitting = ref(false)
const editingId = ref(null)

const form = ref({
  fullname: '',
  username: '',
  email: '',
  password: '',
  role: 'admin'
})

const openModal = (admin = null) => {
  if (admin) {
    editingId.value = admin.id
    form.value = {
      fullname: admin.fullname,
      username: admin.username,
      email: admin.email,
      password: '',
      role: admin.role
    }
  } else {
    editingId.value = null
    form.value = {
      fullname: '',
      username: '',
      email: '',
      password: '',
      role: 'admin'
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingId.value = null
}

const handleSubmit = async () => {
  submitting.value = true
  try {
    const url = '/api/admin/admins'
    const method = editingId.value ? 'PATCH' : 'POST'
    const body = editingId.value ? { id: editingId.value, ...form.value } : form.value

    const res = await $fetch(url, {
      method,
      body
    })

    if (res.success) {
      alerts.success('สำเร็จ!', editingId.value ? 'แก้ไขข้อมูลสำเร็จ' : 'เพิ่มผู้ดูแลระบบสำเร็จ')
      closeModal()
      refresh()
    }
  } catch (error) {
    alerts.error('ข้อผิดพลาด', error.data?.statusMessage || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    submitting.value = false
  }
}

const confirmDelete = async (admin) => {
  const result = await alerts.confirm('ยืนยันการลบ', `คุณต้องการลบผู้ดูแลระบบ "${admin.fullname}" ใช่หรือไม่?`, 'warning');
  if (result.isConfirmed) {
    try {
      const res = await $fetch(`/api/admin/admins?id=${admin.id}`, {
        method: 'DELETE'
      })
      if (res.success) {
        alerts.success('สำเร็จ!', 'ลบข้อมูลสำเร็จ')
        refresh()
      }
    } catch (error) {
      alerts.error('ข้อผิดพลาด', error.data?.statusMessage || 'เกิดข้อผิดพลาดในการลบข้อมูล')
    }
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

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
