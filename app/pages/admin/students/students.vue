<template>
  <div class="p-4 md:p-10">
    
    <div class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div class="relative">
        <h2 class="font-bold text-slate-900 text-3xl md:text-4xl mb-2 tracking-tight">ข้อมูลนักศึกษา</h2>
        <div class="flex items-center gap-2 text-slate-500">
          <span class="w-8 h-px bg-indigo-200"></span>
          <p class="text-sm font-medium">รายชื่อนักศึกษาทั้งหมดที่ได้รับการอนุมัติสิทธิ์เข้าใช้งานแล้ว</p>
        </div>
      </div>
    </div>

    <div class="admin-card bg-white overflow-hidden">
      
      <div class="p-8 border-b border-slate-50 bg-slate-50/30 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div class="w-full lg:w-[450px] relative group">
          <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <span class="material-symbols-rounded text-xl">search</span>
          </div>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="ค้นหาชื่อ หรือ รหัสนักศึกษา..." 
            class="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
          >
        </div>

        <div class="relative w-full sm:w-[220px] group">
          <div class="absolute inset-y-0 left-5 flex items-center pointer-events-none text-indigo-500 group-focus-within:scale-110 transition-transform">
            <span class="material-symbols-rounded">calendar_month</span>
          </div>
          <select 
            v-model="selectedYear" 
            class="w-full bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-2xl pl-14 pr-12 py-4 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none cursor-pointer shadow-sm"
          >
            <option value="">ทุกปีการศึกษา</option>
            <option v-for="year in availableYears" :key="year" :value="year">ปีการศึกษา {{ year }}</option>
          </select>
          <div class="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
            <span class="material-symbols-rounded font-bold">expand_more</span>
          </div>
        </div>
      </div>

      <div v-if="pending" class="p-8 space-y-4">
        <!-- Skeleton Table -->
        <div v-for="i in 5" :key="i" class="flex items-center gap-6 animate-pulse border-b border-slate-50 pb-4">
          <div class="w-12 h-12 bg-slate-100 rounded-2xl"></div>
          <div class="h-4 w-24 bg-slate-100 rounded"></div>
          <div class="h-4 w-48 bg-slate-100 rounded"></div>
          <div class="h-4 w-16 bg-slate-100 rounded"></div>
          <div class="h-4 w-32 bg-slate-100 rounded ml-auto"></div>
        </div>
      </div>

      <div v-else class="overflow-x-auto pb-4 animate-[fadeIn_0.3s_ease-out]">
        <table class="w-full text-left min-w-[1000px]">
          <thead>
            <tr class="bg-slate-50/50">
              <th class="px-8 py-5 admin-table-header w-[100px] text-center">โปรไฟล์</th>
              <th class="px-8 py-5 admin-table-header">รหัสนักศึกษา</th>
              <th class="px-8 py-5 admin-table-header">ชื่อ - นามสกุล</th>
              <th class="px-8 py-5 admin-table-header text-center">ปีการศึกษา</th>
              <th class="px-8 py-5 admin-table-header">เบอร์โทรศัพท์</th>
              <th class="px-8 py-5 admin-table-header">LINE ID</th>
              <th class="px-8 py-5 admin-table-header text-center">สถานะ</th>
              <th class="px-8 py-5 admin-table-header text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody class="text-sm divide-y divide-slate-50">
            <tr v-for="student in filteredStudents" :key="student.id" class="admin-table-row group/row mobile-optimize">
              <td class="px-8 py-6 text-center">
                <div v-if="student.profileImage" class="w-12 h-12 rounded-2xl mx-auto overflow-hidden border-2 border-white shadow-md group-hover/row:scale-110 transition-transform">
                  <img :src="student.profileImage" class="w-full h-full object-cover" loading="lazy" />
                </div>
                <div v-else class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-500 font-black text-lg flex items-center justify-center border border-indigo-200 mx-auto group-hover/row:scale-110 transition-transform">
                  {{ student.fullname.substring(0, 1) }}
                </div>
              </td>
              <td class="px-8 py-6 font-bold text-slate-500 tracking-tight">{{ student.username }}</td>
              <td class="px-8 py-6 font-black text-slate-800 text-base">{{ student.fullname }}</td>
              <td class="px-8 py-6 text-center">
                <span class="inline-flex items-center px-3 py-1 rounded-xl bg-slate-100 text-slate-600 font-black text-[10px] tracking-widest border border-slate-200 uppercase">
                  {{ student.academicYear }}
                </span>
              </td>
              <td class="px-8 py-6 text-slate-600 font-medium italic">{{ student.tel || '-' }}</td>
              <td class="px-8 py-6">
                <div class="inline-flex items-center gap-2 text-[#00B900] font-bold bg-[#00B900]/5 px-4 py-1.5 rounded-full border border-[#00B900]/10">
                  <span class="w-2 h-2 rounded-full bg-[#00B900]"></span>
                  {{ student.lineId || '-' }}
                </div>
              </td>
              <td class="px-8 py-6 text-center">
                <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  Approved
                </span>
              </td>
              <td class="px-8 py-6 text-center">
                <button 
                  @click="confirmDelete(student)" 
                  class="w-10 h-10 flex items-center justify-center rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-white transition-all duration-300 shadow-sm border border-rose-100 group-hover/row:scale-110" 
                  title="ลบข้อมูล"
                >
                  <span class="material-symbols-rounded text-xl">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredStudents.length === 0" class="py-32 text-center">
          <div class="w-24 h-24 bg-slate-50 text-slate-200 rounded-[32px] flex items-center justify-center mx-auto mb-6">
            <span class="material-symbols-rounded text-6xl">person_off</span>
          </div>
          <p class="font-bold text-slate-400 text-lg">ไม่พบข้อมูลนักศึกษา</p>
          <button @click="searchQuery = ''; selectedYear = ''" class="mt-4 text-indigo-600 font-black hover:underline">ล้างการค้นหา</button>
        </div>
      </div>

      <!-- Pagination Controls -->
      <div v-if="result?.pagination && result.pagination.totalPages > 1" class="px-8 py-6 border-t border-slate-50 flex items-center justify-center gap-2">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
        >
          <span class="material-symbols-rounded text-xl">chevron_left</span>
        </button>
        
        <div class="flex items-center gap-1">
          <button 
            v-for="p in result.pagination.totalPages" 
            :key="p"
            @click="currentPage = p"
            class="w-10 h-10 rounded-xl font-bold text-sm transition-all"
            :class="currentPage === p ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'bg-white border border-slate-200 text-slate-500 hover:border-indigo-300'"
          >
            {{ p }}
          </button>
        </div>

        <button 
          @click="currentPage++" 
          :disabled="currentPage === result.pagination.totalPages"
          class="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
        >
          <span class="material-symbols-rounded text-xl">chevron_right</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useAlerts } from '~/composables/useAlerts'

definePageMeta({ layout: 'admin' })

const alerts = useAlerts()
const searchQuery = ref('')
const selectedYear = ref('')
const currentPage = ref(1)

// ดึงข้อมูลนักศึกษาจาก API พร้อม Pagination
const { data: result, pending, refresh } = await useFetch('/api/admin/students', {
  query: {
    page: currentPage,
    limit: 10
  },
  watch: [currentPage]
})

// Reset page when filtering
watch([searchQuery, selectedYear], () => {
  currentPage.value = 1
})

const students = computed(() => result.value?.students || [])

// ดึงรายการปีการศึกษาที่มีทั้งหมดมาทำเป็น filter (ดึงจากข้อมูลที่มีในหน้านั้น)
const availableYears = computed(() => {
  const years = students.value.map(s => s.academicYear)
  return [...new Set(years)].sort((a, b) => b.localeCompare(a))
})

// กรองข้อมูลตาม search และ ปีการศึกษา
const filteredStudents = computed(() => {
  return students.value.filter(s => {
    const search = searchQuery.value.toLowerCase()
    const matchSearch = s.fullname.toLowerCase().includes(search) || s.username.includes(search)
    const matchYear = selectedYear.value === '' || s.academicYear === selectedYear.value
    return matchSearch && matchYear
  })
})

const confirmDelete = async (student) => {
  const confirmResult = await alerts.confirm('ยืนยันการลบ', `คุณยืนยันที่จะลบข้อมูลของ "${student.fullname}" ทิ้งถาวรหรือไม่?\n* การกระทำนี้ไม่สามารถกู้คืนได้`, 'warning');
  if (confirmResult.isConfirmed) {
    try {
      const response = await $fetch(`/api/admin/students?id=${student.id}`, {
        method: 'DELETE'
      })
      if (response.success) {
        alerts.success('สำเร็จ!', 'ลบข้อมูลนักศึกษาเรียบร้อยแล้ว')
        refresh()
      }
    } catch (error) {
      alerts.error('ข้อผิดพลาด', error.statusMessage || 'เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .mobile-optimize {
    box-shadow: none !important;
    transform: none !important;
  }
}
</style>