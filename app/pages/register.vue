<template>
  <div class="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] ">
    
    <div class="bg-white w-full max-w-[800px] p-[30px] md:p-[45px] rounded-[20px] shadow-[0_15px_35px_rgba(0,0,0,0.1)] my-10">
      
      <h2 class="text-[#1a1a40] font-bold text-center mb-[30px] text-[2rem]">
        <span class="material-symbols-rounded align-middle mr-2">person_add</span> ลงทะเบียน
      </h2>

      <form @submit.prevent="handleRegister">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">รหัสนักศึกษา (Username)</label>
            <input v-model="form.username" type="text" name="username" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="เช่น 65xxxxxx">
          </div>
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">อีเมล</label>
            <input v-model="form.email" type="email" name="email" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="student@university.ac.th">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">รหัสผ่าน</label>
            <input v-model="form.password" type="password" name="password" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="กำหนดรหัสผ่าน">
          </div>
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">ชื่อ-นามสกุล</label>
            <input v-model="form.fullname" type="text" name="fullname" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="นาย/นางสาว...">
          </div>
        </div>

        <div class="relative border-t border-dashed border-[#ddd] my-[30px]">
          <span class="absolute top-[-12px] left-1/2 -translate-x-1/2 bg-white px-[15px] text-[#888] text-[0.85rem] font-medium">ข้อมูลติดต่อและที่อยู่</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">เบอร์โทรศัพท์</label>
            <input v-model="form.tel" type="text" name="tel" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="08x-xxx-xxxx">
          </div>
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">Line ID</label>
            <input v-model="form.lineId" type="text" name="line_id" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" placeholder="ไอดีไลน์">
          </div>
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">ปีการศึกษา</label>
            <select v-model="form.academicYear" name="academic_year" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none appearance-none" required>
              <option value="">เลือกปี</option>
              <option v-for="year in academicYears" :key="year" :value="year">{{ year }}</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div class="md:col-span-1">
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">บ้านเลขที่</label>
            <input v-model="form.addressNo" type="text" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none">
          </div>
          <div class="md:col-span-1">
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">หมู่ที่</label>
            <input v-model="form.moo" type="text" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none">
          </div>
          <div class="md:col-span-1">
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">ซอย</label>
            <input v-model="form.soi" type="text" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none">
          </div>
          <div class="md:col-span-1">
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">ถนน</label>
            <input v-model="form.road" type="text" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">จังหวัด</label>
            <select v-model="form.province" @change="handleProvinceChange" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none appearance-none" required>
              <option value="">-- เลือกจังหวัด --</option>
              <option v-for="p in provinces" :key="p" :value="p">{{ p }}</option>
            </select>
          </div>
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">อำเภอ/เขต</label>
            <select v-model="form.district" @change="handleDistrictChange" :disabled="!form.province" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none appearance-none disabled:opacity-50" required>
              <option value="">-- เลือกอำเภอ --</option>
              <option v-for="d in districts" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">ตำบล/แขวง</label>
            <select v-model="form.subdistrict" @change="handleSubdistrictChange" :disabled="!form.district" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none appearance-none disabled:opacity-50" required>
              <option value="">-- เลือกตำบล --</option>
              <option v-for="s in subdistricts" :key="s.subdistrict" :value="s.subdistrict">{{ s.subdistrict }}</option>
            </select>
          </div>
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">รหัสไปรษณีย์</label>
            <input v-model="form.zipcode" type="text" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#eee] transition-all duration-200 outline-none font-bold" readonly placeholder="จะแสดงอัตโนมัติ">
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">โทรศัพท์บ้าน</label>
            <input v-model="form.homePhone" type="text" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" placeholder="ถ้ามี">
          </div>
          <div>
            <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">เบอร์โทรกรณีฉุกเฉิน</label>
            <input v-model="form.emergencyContact" type="text" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" placeholder="เบอร์โทรติดต่อฉุกเฉิน">
          </div>
        </div>

        <div class="mb-4">
          <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">รูปโปรไฟล์ <small class="text-gray-400 font-normal">(ถ้ามี)</small></label>
          <input @change="handleFileUpload" type="file" name="profile_image" class="w-full rounded-[12px] p-[10px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#1a1a40] file:text-white hover:file:bg-[#2c2c54] file:cursor-pointer cursor-pointer" accept="image/png, image/jpeg, image/jpg">
        </div>

        <button :disabled="loading" type="submit" class="w-full bg-[#1a1a40] text-white p-[14px] rounded-full text-[1.1rem] font-semibold mt-[20px] transition-all duration-200 hover:bg-[#2c2c54] hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(26,26,64,0.2)] disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน' }}
        </button>

        <div class="text-center mt-[25px] text-[0.95rem] text-[#666]">
          มีบัญชีอยู่แล้ว? <NuxtLink to="/login" class="text-[#1a1a40] font-semibold no-underline hover:underline">เข้าสู่ระบบที่นี่</NuxtLink>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
const supabase = useSupabaseClient()
const loading = ref(false)
const profileFile = ref(null)

const currentYear = new Date().getFullYear() + 543
const academicYears = computed(() => {
  return Array.from({ length: 6 }, (_, i) => currentYear - i + 3) // allow future years as well like +3, wait it was 2569 which is current year + 3 if current year is 2566. Let's just do +2 to -3
})

const form = ref({
  username: '',
  email: '',
  password: '',
  fullname: '',
  academicYear: '',
  tel: '',
  lineId: '',
  profileImage: '',
  addressNo: '',
  moo: '',
  soi: '',
  road: '',
  subdistrict: '',
  district: '',
  province: '',
  zipcode: '',
  homePhone: '',
  emergencyContact: ''
})

// Address Auto-fill logic
import { getProvinces, getDistricts, getSubdistricts } from '~/utils/thaiAddress'

const provinces = computed(() => getProvinces())
const districts = ref([])
const subdistricts = ref([])

const handleProvinceChange = () => {
  form.value.district = ''
  form.value.subdistrict = ''
  form.value.zipcode = ''
  districts.value = getDistricts(form.value.province)
  subdistricts.value = []
}

const handleDistrictChange = () => {
  form.value.subdistrict = ''
  form.value.zipcode = ''
  subdistricts.value = getSubdistricts(form.value.province, form.value.district)
}

const handleSubdistrictChange = () => {
  const selected = subdistricts.value.find(s => s.subdistrict === form.value.subdistrict)
  if (selected) {
    form.value.zipcode = selected.zipcode
  }
}


const handleFileUpload = (event) => {
  profileFile.value = event.target.files[0]
}

const handleRegister = async () => {
  loading.value = true
  try {
    let profileImageUrl = ''

    // 1. Upload Profile Image if exists
    if (profileFile.value) {
      try {
        const lastDotIndex = profileFile.value.name.lastIndexOf('.')
        const extension = lastDotIndex !== -1 ? profileFile.value.name.substring(lastDotIndex) : ''
        const fileName = `${Date.now()}${extension}`
        const { data, error } = await supabase.storage
          .from('profiles')
          .upload(fileName, profileFile.value)

        if (error) {
          console.warn('Supabase upload failed:', error.message)
          // Continue without profile image if bucket is missing or fails
        } else {
          const { data: publicUrlData } = supabase.storage
            .from('profiles')
            .getPublicUrl(fileName)
          
          profileImageUrl = publicUrlData.publicUrl
        }
      } catch (uploadError) {
        console.warn('Supabase upload failed:', uploadError)
      }
    }

    // 2. Register via API
    try {
      const result = await $fetch('/api/register', {
        method: 'POST',
        body: {
          ...form.value,
          profileImage: profileImageUrl
        }
      })

      Swal.fire({ icon: 'success', title: 'สำเร็จ', text: 'ลงทะเบียนสำเร็จ!', confirmButtonColor: '#1a1a40' })
      navigateTo('/login')
    } catch (apiError) {
      throw new Error(apiError.data?.statusMessage || 'การลงทะเบียนล้มเหลว')
    }
  } catch (error) {
    console.error(error)
    Swal.fire({ icon: 'error', title: 'ข้อผิดพลาด', text: error.message, confirmButtonColor: '#1a1a40' })
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: false 
})
</script>