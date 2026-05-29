<template>
  <div class="p-4 md:p-10 font-['Prompt',_sans-serif]">
    
    <div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="relative">
        <h2 class="font-bold text-slate-900 text-3xl md:text-4xl mb-2 tracking-tight">ข้อมูลอาจารย์ที่ปรึกษา</h2>
        <div class="flex items-center gap-2 text-slate-500">
          <span class="w-8 h-px bg-indigo-200"></span>
          <p class="text-sm font-medium">รายชื่อและช่องทางการติดต่อของอาจารย์ทั้งหมดในระบบ</p>
        </div>
      </div>
      
      <button 
        @click="showModal = true"
        class="group relative overflow-hidden bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-200 flex items-center gap-3 w-fit active:scale-95"
      >
        <span class="material-symbols-rounded group-hover:rotate-12 transition-transform">person_add</span> 
        <span>เพิ่มอาจารย์ใหม่</span>
        <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>
    </div>

    <div class="admin-card bg-white overflow-hidden">
      
      <div class="p-8 border-b border-slate-50 bg-slate-50/30">
        <div class="w-full xl:w-[450px] relative group">
          <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <span class="material-symbols-rounded text-xl">search</span>
          </div>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ค้นหาชื่อ หรือ ชื่อผู้ใช้อาจารย์..." 
            class="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
          >
        </div>
      </div>

      <div v-if="pending" class="flex flex-col items-center justify-center py-32">
        <div class="relative w-20 h-20">
          <div class="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div class="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p class="mt-6 text-slate-400 font-bold animate-pulse">กำลังโหลดข้อมูล...</p>
      </div>

      <div v-else class="overflow-x-auto pb-4">
        <table class="w-full text-left min-w-[1000px]">
          <thead>
            <tr class="bg-slate-50/50">
              <th class="px-8 py-5 admin-table-header w-[100px] text-center">รูปโปรไฟล์</th>
              <th class="px-8 py-5 admin-table-header">ข้อมูลอาจารย์</th>
              <th class="px-8 py-5 admin-table-header">การติดต่อ</th>
              <th class="px-8 py-5 admin-table-header">LINE ID</th>
              <th class="px-8 py-5 admin-table-header text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-slate-50">
            <tr v-for="teacher in filteredTeachers" :key="teacher.id" class="admin-table-row group/row">
              
              <td class="px-8 py-6 text-center">
                <div v-if="teacher.profileImage" class="w-14 h-14 rounded-2xl mx-auto overflow-hidden border-2 border-white shadow-md group-hover/row:scale-110 transition-transform">
                  <img :src="teacher.profileImage" class="w-full h-full object-cover" />
                </div>
                <div v-else class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-600 font-bold text-xl flex items-center justify-center border border-indigo-200 mx-auto group-hover/row:scale-110 transition-transform shadow-sm">
                  {{ teacher.fullname.substring(0, 1) }}
                </div>
              </td>

              <td class="px-8 py-6">
                <div class="font-bold text-slate-800 text-base mb-0.5">{{ teacher.fullname }}</div>
                <div class="inline-flex items-center gap-1.5 text-indigo-500 font-bold text-xs bg-indigo-50 px-2 py-0.5 rounded-md">
                  <span class="material-symbols-rounded text-[14px]">alternate_email</span>
                  {{ teacher.username }}
                </div>
              </td>

              <td class="px-8 py-6">
                <div class="flex flex-col gap-1">
                  <div class="flex items-center gap-2 text-slate-600 font-medium">
                    <span class="material-symbols-rounded text-slate-400 text-sm">mail</span>
                    {{ teacher.email }}
                  </div>
                  <div class="flex items-center gap-2 text-slate-600 font-medium">
                    <span class="material-symbols-rounded text-slate-400 text-sm">call</span>
                    {{ teacher.tel || '-' }}
                  </div>
                </div>
              </td>

              <td class="px-8 py-6">
                <div class="inline-flex items-center gap-2 text-[#00B900] font-bold bg-[#00B900]/5 px-4 py-1.5 rounded-full border border-[#00B900]/10">
                  <span class="w-2 h-2 rounded-full bg-[#00B900]"></span>
                  {{ teacher.lineId || '-' }}
                </div>
              </td>

              <td class="px-8 py-6">
                <div class="flex items-center justify-center gap-3">
                  <button @click="openEditModal(teacher)" class="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-sm border border-blue-100 group-hover/row:scale-110" title="แก้ไข">
                    <span class="material-symbols-rounded text-xl">edit</span>
                  </button>
                  <button @click="confirmDelete(teacher)" class="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-sm border border-rose-100 group-hover/row:scale-110" title="ลบ">
                    <span class="material-symbols-rounded text-xl">delete</span>
                  </button>
                </div>
              </td>

            </tr>
          </tbody>
        </table>

        <div v-if="filteredTeachers.length === 0" class="py-32 text-center">
          <div class="w-24 h-24 bg-slate-50 text-slate-200 rounded-[32px] flex items-center justify-center mx-auto mb-6">
            <span class="material-symbols-rounded text-6xl">badge</span>
          </div>
          <p class="font-bold text-slate-400 text-lg">ไม่พบข้อมูลอาจารย์</p>
          <button @click="searchQuery = ''" class="mt-4 text-indigo-600 font-bold hover:underline">ล้างการค้นหา</button>
        </div>
      </div>

    </div>

    <!-- Modal เพิ่ม/แก้ไขอาจารย์ -->
    <Transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
        <div class="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden animate-[fadeIn_0.3s_ease-out] border border-white/20">
          <div class="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200">
                <span class="material-symbols-rounded">{{ isEditing ? 'edit' : 'person_add' }}</span>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 tracking-tight">{{ isEditing ? 'แก้ไขข้อมูลอาจารย์' : 'เพิ่มอาจารย์ใหม่' }}</h3>
            </div>
            <button @click="closeModal" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 text-slate-400 transition-colors">
              <span class="material-symbols-rounded">close</span>
            </button>
          </div>
          
          <form @submit.prevent="handleSaveTeacher" class="p-8 space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">ชื่อผู้ใช้ (Username)</label>
                <input v-model="form.username" type="text" required class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50" placeholder="เช่น teacher_jane">
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">
                  รหัสผ่าน {{ isEditing ? '(เว้นว่าง)' : '' }}
                </label>
                <input v-model="form.password" type="password" :required="!isEditing" class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50" placeholder="••••••••">
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">ชื่อ - นามสกุล</label>
              <input v-model="form.fullname" type="text" required class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50" placeholder="เช่น อ. สมชาย ใจดี">
            </div>

            <div class="space-y-1.5">
              <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">อีเมล</label>
              <input v-model="form.email" type="email" required class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50" placeholder="example@bsru.ac.th">
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-1.5">
                <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">เบอร์โทรศัพท์</label>
                <input v-model="form.tel" type="text" class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50" placeholder="08x-xxx-xxxx">
              </div>
              <div class="space-y-1.5">
                <label class="text-xs font-black text-slate-400 uppercase tracking-widest px-1">LINE ID</label>
                <input v-model="form.lineId" type="text" class="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-sm font-bold bg-slate-50/50" placeholder="ID LINE">
              </div>
            </div>

            <div class="pt-6 flex gap-4">
              <button 
                type="button" 
                @click="closeModal"
                class="flex-1 px-8 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all active:scale-95"
              >
                ยกเลิก
              </button>
              <button 
                type="submit" 
                :disabled="loading"
                class="flex-[1.5] px-8 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
              >
                <div v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {{ loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({ layout: 'admin' })

const alerts = useAlerts()
const searchQuery = ref('')
const showModal = ref(false)
const isEditing = ref(false)
const editingId = ref(null)
const loading = ref(false)

const form = ref({
  username: '',
  password: '',
  fullname: '',
  email: '',
  tel: '',
  lineId: ''
})

// ดึงข้อมูลอาจารย์
const { data: teachersData, pending, refresh } = await useFetch('/api/admin/teachers')
const teachers = computed(() => teachersData.value?.teachers || [])

// ฟังก์ชันค้นหา
const filteredTeachers = computed(() => {
  return teachers.value.filter(t => {
    const search = searchQuery.value.toLowerCase()
    return t.fullname.toLowerCase().includes(search) || t.username.toLowerCase().includes(search)
  })
})

const openEditModal = (teacher) => {
  isEditing.value = true
  editingId.value = teacher.id
  form.value = {
    username: teacher.username,
    password: '', // รหัสผ่านเป็นว่างไว้
    fullname: teacher.fullname,
    email: teacher.email,
    tel: teacher.tel,
    lineId: teacher.lineId
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  isEditing.value = false
  editingId.value = null
  form.value = {
    username: '',
    password: '',
    fullname: '',
    email: '',
    tel: '',
    lineId: ''
  }
}

// บันทึกข้อมูล (เพิ่ม/แก้ไข)
const handleSaveTeacher = async () => {
  loading.value = true
  try {
    const payload = isEditing.value 
      ? { id: editingId.value, ...form.value }
      : form.value

    const response = await $fetch('/api/admin/teachers', {
      method: isEditing.value ? 'PATCH' : 'POST',
      body: payload
    })

    if (response.success) {
      alerts.success('สำเร็จ!', isEditing.value ? 'อัปเดตข้อมูลอาจารย์เรียบร้อยแล้ว' : 'เพิ่มข้อมูลอาจารย์เรียบร้อยแล้ว')
      closeModal()
      refresh()
    }
  } catch (error) {
    alerts.error('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    loading.value = false
  }
}

// ลบอาจารย์
const confirmDelete = async (teacher) => {
  const result = await alerts.confirm('ยืนยันการลบ', `คุณยืนยันที่จะลบข้อมูลของ "${teacher.fullname}" ออกจากระบบใช่หรือไม่?\n* การกระทำนี้ไม่สามารถกู้คืนได้`, 'warning');
  if (result.isConfirmed) {
    try {
      const response = await $fetch(`/api/admin/teachers?id=${teacher.id}`, {
        method: 'DELETE'
      })
      if (response.success) {
        alerts.success('สำเร็จ!', 'ลบข้อมูลเรียบร้อยแล้ว')
        refresh()
      }
    } catch (error) {
      alerts.error('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาดในการลบข้อมูล')
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