<template>
  <div class="min-h-screen bg-slate-50 py-10 px-4 md:px-8  text-slate-800">
    <div v-if="user" class="max-w-[900px] mx-auto w-full">
      
      <div class="mb-6">
        <NuxtLink to="/student" class="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 transition-all text-sm font-bold w-fit hover:-translate-x-1">
          <span class="material-symbols-rounded">arrow_back</span> ย้อนกลับไปหน้าหลัก
        </NuxtLink>
      </div>

      <div class="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 class="font-bold text-2xl md:text-3xl text-slate-900 tracking-tight flex items-center gap-3">
          <span class="bg-indigo-600 text-white p-2 rounded-2xl shadow-lg shadow-indigo-200">
            <span class="material-symbols-rounded text-xl">badge</span>
          </span>
          โปรไฟล์ของฉัน
        </h2>
        <button @click="isEditing = !isEditing" 
                :class="isEditing ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50'"
                class="px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm flex items-center gap-2 w-fit">
          <span class="material-symbols-rounded">{{ isEditing ? 'close' : 'edit' }}</span>
          {{ isEditing ? 'ยกเลิกการแก้ไข' : 'แก้ไขข้อมูล' }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div class="md:col-span-1 space-y-6">
          <div class="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200 text-center relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-3 bg-indigo-600"></div>
            
            <div v-if="user.profileImage" class="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-md overflow-hidden">
              <img :src="user.profileImage" alt="Profile" class="w-full h-full object-cover">
            </div>
            <div v-else class="w-24 h-24 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-4 border-white shadow-md">
              {{ user.fullname?.substring(0, 1) }}
            </div>

            <h3 class="text-xl font-bold text-slate-900 mb-1">{{ user.fullname }}</h3>
            <p class="text-slate-400 text-sm font-medium mb-6">รหัส: {{ user.username }}</p>
            
            <div class="inline-flex items-center justify-center gap-1 bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-xs font-bold border border-emerald-100">
              <span class="material-symbols-rounded text-[18px]">security</span>
              <span>นักศึกษาปัจจุบัน</span>
            </div>
          </div>

          <div class="bg-indigo-900 rounded-[32px] p-6 shadow-lg text-white relative overflow-hidden">
            <span class="material-symbols-rounded absolute -right-4 -bottom-4 text-6xl opacity-10">integration_instructions</span>
            <h4 class="text-sm font-bold text-indigo-300 mb-4 uppercase tracking-wider">โครงงานของฉัน</h4>
            <p class="text-[15px] font-medium leading-relaxed mb-4">
              {{ project?.titleTh || 'ยังไม่ได้ยื่นเสนอโครงงาน' }}
            </p>
            
            <div v-if="project" class="space-y-4 pt-4 border-t border-indigo-800/50">
              <div class="space-y-2">
                <div class="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">สมาชิกในกลุ่ม</div>
                <div class="text-[13px] text-indigo-50 flex items-center gap-2">
                  <span class="material-symbols-rounded text-base">person</span> {{ project.student1?.fullname }}
                </div>
                <div v-if="project.student2" class="text-[13px] text-indigo-50 flex items-center gap-2">
                  <span class="material-symbols-rounded text-base">person</span> {{ project.student2?.fullname }}
                </div>
              </div>

              <div class="space-y-2">
                <div class="text-[10px] text-indigo-300 font-bold uppercase tracking-wider">อาจารย์ที่ปรึกษา</div>
                <div class="text-[13px] text-indigo-50 flex items-center gap-2">
                  <span class="material-symbols-rounded text-base">person_4</span> {{ project.advisor?.fullname || '-' }}
                </div>
                <div v-if="project.coAdvisor" class="text-[13px] text-indigo-50 flex items-center gap-2">
                  <span class="material-symbols-rounded text-base text-indigo-400">person_4</span> {{ project.coAdvisor?.fullname }}
                </div>
              </div>
            </div>
            <div v-else class="text-xs text-indigo-300 italic">
              ยังไม่มีข้อมูลโครงงานในขณะนี้
            </div>
          </div>
        </div>

        <div class="md:col-span-2 space-y-6">
          <div class="bg-white rounded-[32px] p-8 md:p-10 shadow-sm border border-slate-200">
            
            <h4 class="text-lg font-bold text-slate-900 mb-8 flex items-center gap-2">
              <span class="material-symbols-rounded text-indigo-500">assessment</span> รายละเอียดข้อมูลส่วนตัว
            </h4>

            <div class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">ชื่อ-นามสกุล</label>
                  <input type="text" v-model="user.fullname" :disabled="!isEditing" 
                         :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'"
                         class="w-full border text-sm font-medium rounded-2xl px-4 py-3 outline-none transition-all">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">รหัสนักศึกษา</label>
                  <input type="text" v-model="user.username" :disabled="true" 
                         class="bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed w-full border text-sm font-medium rounded-2xl px-4 py-3 outline-none transition-all">
                </div>
              </div>

              <hr class="border-slate-100 my-4">

              <div class="space-y-6">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">เบอร์โทรศัพท์ติดต่อ</label>
                  <div class="relative">
                    <span class="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">phone</span>
                    <input type="text" v-model="user.tel" :disabled="!isEditing" 
                           :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10' : 'bg-slate-50 border-slate-200'"
                           class="w-full border text-sm font-medium text-slate-700 rounded-2xl pl-11 pr-4 py-3 outline-none transition-all">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">อีเมล (Email)</label>
                  <div class="relative">
                    <span class="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">mail</span>
                    <input type="email" v-model="user.email" :disabled="!isEditing" 
                           :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10' : 'bg-slate-50 border-slate-200'"
                           class="w-full border text-sm font-medium text-slate-700 rounded-2xl pl-11 pr-4 py-3 outline-none transition-all">
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">LINE ID</label>
                  <div class="relative">
                    <span class="material-symbols-rounded absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">chat</span>
                    <input type="text" v-model="user.lineId" :disabled="!isEditing" 
                           :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10' : 'bg-slate-50 border-slate-200'"
                           class="w-full border text-sm font-medium text-slate-700 rounded-2xl pl-11 pr-4 py-3 outline-none transition-all">
                  </div>
                </div>
              </div>

              <hr class="border-slate-100 my-4">
              <h4 class="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span class="material-symbols-rounded text-indigo-500 text-lg">location_on</span> ข้อมูลติดต่อและที่อยู่
              </h4>

              <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div class="md:col-span-1">
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">บ้านเลขที่</label>
                  <input type="text" v-model="user.addressNo" :disabled="!isEditing" 
                         :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'"
                         class="w-full border text-sm font-medium rounded-2xl px-4 py-3 outline-none transition-all">
                </div>
                <div class="md:col-span-1">
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">หมู่ที่</label>
                  <input type="text" v-model="user.moo" :disabled="!isEditing" 
                         :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'"
                         class="w-full border text-sm font-medium rounded-2xl px-4 py-3 outline-none transition-all">
                </div>
                <div class="md:col-span-1">
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">ซอย</label>
                  <input type="text" v-model="user.soi" :disabled="!isEditing" 
                         :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'"
                         class="w-full border text-sm font-medium rounded-2xl px-4 py-3 outline-none transition-all">
                </div>
                <div class="md:col-span-1">
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">ถนน</label>
                  <input type="text" v-model="user.road" :disabled="!isEditing" 
                         :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'"
                         class="w-full border text-sm font-medium rounded-2xl px-4 py-3 outline-none transition-all">
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">จังหวัด</label>
                  <select v-model="user.province" @change="handleProvinceChange" :disabled="!isEditing" 
                          :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'"
                          class="w-full border text-sm font-medium rounded-2xl px-4 py-3 outline-none appearance-none transition-all">
                    <option value="">-- เลือกจังหวัด --</option>
                    <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">อำเภอ/เขต</label>
                  <select v-model="user.district" @change="handleDistrictChange" :disabled="!isEditing || !user.province" 
                          :class="isEditing && user.province ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'"
                          class="w-full border text-sm font-medium rounded-2xl px-4 py-3 outline-none appearance-none transition-all">
                    <option value="">-- เลือกอำเภอ --</option>
                    <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">ตำบล/แขวง</label>
                  <select v-model="user.subdistrict" @change="handleSubdistrictChange" :disabled="!isEditing || !user.district" 
                          :class="isEditing && user.district ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'"
                          class="w-full border text-sm font-medium rounded-2xl px-4 py-3 outline-none appearance-none transition-all">
                    <option value="">-- เลือกตำบล --</option>
                    <option v-for="s in subdistricts" :key="s.subdistrict" :value="s.subdistrict">{{ s.subdistrict }}</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">รหัสไปรษณีย์</label>
                  <input type="text" v-model="user.zipcode" :disabled="true" 
                         class="bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed w-full border text-sm font-medium rounded-2xl px-4 py-3 outline-none transition-all" readonly>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">โทรศัพท์บ้าน</label>
                  <input type="text" v-model="user.homePhone" :disabled="!isEditing" 
                         :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'"
                         class="w-full border text-sm font-medium rounded-2xl px-4 py-3 outline-none transition-all" placeholder="ถ้ามี">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-400 uppercase mb-2 ml-1">เบอร์โทรกรณีฉุกเฉิน</label>
                  <input type="text" v-model="user.emergencyContact" :disabled="!isEditing" 
                         :class="isEditing ? 'bg-white border-indigo-200 focus:ring-4 focus:ring-indigo-500/10 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-500 cursor-not-allowed'"
                         class="w-full border text-sm font-medium rounded-2xl px-4 py-3 outline-none transition-all">
                </div>
              </div>

              <div v-if="isEditing" class="pt-6 animate-[fadeIn_0.3s_ease-in-out]">
                <button @click="saveProfile" class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2">
                  <span class="material-symbols-rounded">check_circle</span> บันทึกข้อมูลที่แก้ไข
                </button>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-[32px] p-8 shadow-sm border border-slate-200">
             <h4 class="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span class="material-symbols-rounded text-amber-500">key</span> เปลี่ยนรหัสผ่านใหม่
            </h4>
            <button class="text-sm font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-6 py-2.5 rounded-xl transition-all border border-indigo-100 w-fit">
              ดำเนินการเปลี่ยนรหัสผ่าน <span class="material-symbols-rounded ml-1">arrow_forward</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { getProvinces, getDistricts, getSubdistricts } from '~/utils/thaiAddress'

useHead({
  title: 'My Profile | Student Panel',
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700&display=swap' }
  ]
})

// บังคับใช้ Layout ของนักศึกษา
definePageMeta({
  layout: 'student'
})

const isEditing = ref(false)
const userCookie = useCookie('user_session')
const user = computed(() => userCookie.value)
const { success: alertSuccess, error: alertError } = useAlerts()

// ดึงข้อมูลโครงงานจริง
const { data: projectData } = await useFetch("/api/student/my-project")
const project = computed(() => projectData.value?.project)

const provinces = computed(() => getProvinces())
const districts = ref([])
const subdistricts = ref([])

onMounted(() => {
  if (user.value?.province) {
    districts.value = getDistricts(user.value.province)
  }
  if (user.value?.province && user.value?.district) {
    subdistricts.value = getSubdistricts(user.value.province, user.value.district)
  }
})

const handleProvinceChange = () => {
  if (user.value) {
    user.value.district = ''
    user.value.subdistrict = ''
    user.value.zipcode = ''
    districts.value = getDistricts(user.value.province)
    subdistricts.value = []
  }
}

const handleDistrictChange = () => {
  if (user.value) {
    user.value.subdistrict = ''
    user.value.zipcode = ''
    subdistricts.value = getSubdistricts(user.value.province, user.value.district)
  }
}

const handleSubdistrictChange = () => {
  if (user.value) {
    const selected = subdistricts.value.find(s => s.subdistrict === user.value.subdistrict)
    if (selected) {
      user.value.zipcode = selected.zipcode
    }
  }
}

const saveProfile = async () => {
  try {
    const data = await $fetch('/api/student/update-profile', {
      method: 'POST',
      body: {
        fullname: user.value.fullname,
        tel: user.value.tel,
        email: user.value.email,
        lineId: user.value.lineId,
        addressNo: user.value.addressNo,
        moo: user.value.moo,
        soi: user.value.soi,
        road: user.value.road,
        subdistrict: user.value.subdistrict,
        district: user.value.district,
        province: user.value.province,
        zipcode: user.value.zipcode,
        homePhone: user.value.homePhone,
        emergencyContact: user.value.emergencyContact
      }
    })

    if (data?.success) {
      alertSuccess('บันทึกสำเร็จ', 'ข้อมูลโปรไฟล์ของคุณถูกอัปเดตเรียบร้อยแล้ว')
      // Update cookie to reflect new data
      Object.assign(user.value, data.user)
      isEditing.value = false
    }
  } catch (e) {
    const errorMessage = e.data?.statusMessage || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล'
    alertError('ข้อผิดพลาด', errorMessage)
  }
}
</script>

<style>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
