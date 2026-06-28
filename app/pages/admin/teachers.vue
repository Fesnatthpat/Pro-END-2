<template>
  <div class="p-4 md:p-8 font-['PROMPT',_sans-serif]">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h2 class="font-bold text-slate-900 text-2xl md:text-3xl mb-1">ข้อมูลอาจารย์ที่ปรึกษา</h2>
        <p class="text-slate-500 text-sm">รายชื่อและช่องทางการติดต่อของอาจารย์ทั้งหมดในระบบ</p>
      </div>
      
      <button 
        @click="showModal = true"
        class="bg-[#1a1a40] hover:bg-[#2c2c54] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 text-sm"
      >
        <i class="bi bi-person-plus-fill text-lg"></i> 
        <span>เพิ่มอาจารย์ใหม่</span>
      </button>
    </div>

    <div class="bg-white rounded-[24px] p-6 shadow-sm border border-slate-100 min-h-[70vh] animate-[fadeIn_0.3s_ease-in-out]">
      
      <div class="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8">
        <div class="w-full xl:w-[400px] relative">
          <div class="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
            <i class="bi bi-search text-lg"></i>
          </div>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ค้นหาชื่อ หรือ ชื่อผู้ใช้อาจารย์..." 
            class="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl pl-11 pr-4 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-all"
          >
        </div>
      </div>

      <div v-if="pending" class="flex flex-col items-center justify-center py-20 text-slate-400">
        <i class="bi bi-arrow-repeat animate-spin text-4xl mb-4"></i>
        <p class="font-medium text-slate-500">กำลังโหลดข้อมูล...</p>
      </div>

      <div v-else class="overflow-x-auto pb-4">
        <table class="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr class="border-b-2 border-slate-100 text-slate-400 text-sm">
              <th class="pb-4 px-4 w-[80px] text-center">รูป</th>
              <th class="pb-4 font-medium">ข้อมูลอาจารย์</th>
              <th class="pb-4 font-medium">การติดต่อ</th>
              <th class="pb-4 font-medium">LINE ID</th>
              <th class="pb-4 font-medium text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="teacher in filteredTeachers" :key="teacher.id" class="border-b border-slate-50 hover:bg-slate-50 transition-colors">
              
              <td class="py-4 px-2 text-center">
                <img v-if="teacher.profileImage" :src="teacher.profileImage" alt="Profile" class="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm mx-auto" />
                <div v-else class="w-10 h-10 rounded-full bg-slate-100 text-slate-500 font-bold text-sm flex items-center justify-center border border-slate-200 shadow-inner mx-auto">
                  {{ teacher.fullname.replace(/^(อ\.|ดร\.|ผศ\.|รศ\.|ศ\.)\s*/, '').substring(0, 1) }}
                </div>
              </td>

              <td class="py-4">
                <div class="font-bold text-slate-800">{{ teacher.fullname }}</div>
                <div class="text-[13px] text-slate-500">
                  @{{ teacher.username }}
                </div>
              </td>

              <td class="py-4">
                <div class="flex flex-col gap-1">
                  <div class="flex items-center gap-2 text-slate-600 text-[14px]">
                    <i class="bi bi-envelope text-slate-400"></i>
                    {{ teacher.email }}
                  </div>
                  <div class="flex items-center gap-2 text-slate-600 text-[14px]">
                    <i class="bi bi-telephone text-slate-400"></i>
                    {{ teacher.tel || '-' }}
                  </div>
                </div>
              </td>

              <td class="py-4 text-[14px] text-indigo-600 font-medium">
                {{ teacher.lineId || '-' }}
              </td>

              <td class="py-4 text-center space-x-2">
                <button @click="openEditModal(teacher)" class="text-slate-300 hover:text-blue-500 transition-colors p-2" title="แก้ไข"><i class="bi bi-pencil text-lg"></i></button>
                <button @click="confirmDelete(teacher)" class="text-slate-300 hover:text-rose-500 transition-colors p-2" title="ลบ"><i class="bi bi-trash text-lg"></i></button>
              </td>

            </tr>
          </tbody>
        </table>

        <div v-if="filteredTeachers.length === 0" class="py-20 text-center text-slate-400">
          <i class="bi bi-people text-5xl opacity-20"></i>
          <p class="mt-4 font-medium text-slate-500">ไม่พบข้อมูลอาจารย์</p>
          <button @click="searchQuery = ''" class="mt-2 text-[#1a1a40] text-sm hover:underline">ล้างการค้นหา</button>
        </div>
      </div>

    </div>

    <!-- Modal เพิ่ม/แก้ไขอาจารย์ -->
    <div v-if="showModal" class="fixed inset-0 z-[101] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-[fadeIn_0.2s_ease-out]">
      <div class="bg-white w-full max-w-[600px] rounded-[32px] p-8 md:p-10 shadow-2xl relative" @click.stop>
        
        <button @click="closeModal" class="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-rose-600 transition-all">
          <i class="bi bi-x-lg text-xl"></i>
        </button>

        <div class="text-center mb-8">
          <h3 class="font-bold text-2xl text-slate-900">{{ isEditing ? 'แก้ไขข้อมูลอาจารย์' : 'เพิ่มอาจารย์ใหม่' }}</h3>
          <p class="text-slate-500 mt-2">{{ isEditing ? 'อัปเดตข้อมูลรายละเอียดของอาจารย์' : 'เพิ่มข้อมูลอาจารย์ท่านใหม่เข้าสู่ระบบ' }}</p>
        </div>

        <form @submit.prevent="handleSaveTeacher" class="space-y-6 text-left">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="font-bold text-slate-700 text-sm">ชื่อผู้ใช้ (Username)</label>
              <input v-model="form.username" type="text" required class="w-full bg-slate-50 border-2 border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-colors" placeholder="เช่น teacher_jane">
            </div>
            <div class="flex flex-col gap-2">
              <label class="font-bold text-slate-700 text-sm">
                รหัสผ่าน {{ isEditing ? '(เว้นว่างหากไม่เปลี่ยน)' : '' }}
              </label>
              <input v-model="form.password" type="password" :required="!isEditing" class="w-full bg-slate-50 border-2 border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-colors" placeholder="••••••••">
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-bold text-slate-700 text-sm">ชื่อ - นามสกุล</label>
            <input v-model="form.fullname" type="text" required class="w-full bg-slate-50 border-2 border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-colors" placeholder="เช่น อ. สมชาย ใจดี">
          </div>

          <div class="flex flex-col gap-2">
            <label class="font-bold text-slate-700 text-sm">อีเมล</label>
            <input v-model="form.email" type="email" required class="w-full bg-slate-50 border-2 border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-colors" placeholder="example@bsru.ac.th">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex flex-col gap-2">
              <label class="font-bold text-slate-700 text-sm">เบอร์โทรศัพท์</label>
              <input v-model="form.tel" type="text" class="w-full bg-slate-50 border-2 border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-colors" placeholder="08x-xxx-xxxx">
            </div>
            <div class="flex flex-col gap-2">
              <label class="font-bold text-slate-700 text-sm">LINE ID</label>
              <input v-model="form.lineId" type="text" class="w-full bg-slate-50 border-2 border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 outline-none focus:border-[#1a1a40] focus:bg-white transition-colors" placeholder="ID LINE">
            </div>
          </div>

          <div class="flex gap-4 pt-4">
            <button 
              type="button" 
              @click="closeModal"
              class="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 rounded-xl transition-all text-sm"
            >
              ยกเลิก
            </button>
            <button 
              type="submit" 
              :disabled="loading"
              class="flex-[2] bg-[#1a1a40] hover:bg-[#2c2c54] text-white font-bold text-sm py-3 rounded-xl shadow-md flex justify-center items-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <i v-if="loading" class="bi bi-arrow-repeat animate-spin text-lg"></i>
              <i v-else class="bi bi-save-fill"></i> 
              <span>{{ loading ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>

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