<template>
  <div class="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] ">
    
    <div class="bg-white w-full max-w-[500px] p-[45px] rounded-[20px] shadow-[0_15px_35px_rgba(0,0,0,0.1)]">
      
      <h2 class="text-[#1a1a40] font-bold text-center mb-[30px] text-[2rem]">
        <span class="material-symbols-rounded">login</span> เข้าสู่ระบบ
      </h2>

      <form @submit.prevent="handleLogin">
        
        <div class="mb-4">
          <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">อีเมล หรือ รหัสนักศึกษา</label>
          <input v-model="credentials.email_or_id" type="text" name="email_or_id" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="กรอกข้อมูลเพื่อเข้าสู่ระบบ">
        </div>

        <div class="mb-4">
          <label class="block text-[0.95rem] text-[#333] font-medium ml-1 mb-1">รหัสผ่าน</label>
          <input v-model="credentials.password" type="password" name="password" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] bg-[#f8f9fa] transition-all duration-200 focus:bg-white focus:border-[#1a1a40] focus:ring-[4px] focus:ring-[#1a1a40]/10 outline-none" required placeholder="กรอกรหัสผ่าน">
        </div>

        <button :disabled="loading" type="submit" class="w-full bg-[#1a1a40] text-white p-[14px] rounded-full text-[1.1rem] font-semibold mt-[20px] transition-all duration-200 hover:bg-[#2c2c54] hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(26,26,64,0.2)] disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
        </button>

        <div class="text-center mt-[25px] text-[0.95rem] text-[#666]">
          ยังไม่มีบัญชีใช่ไหม? <NuxtLink to="/register" class="text-[#1a1a40] font-semibold no-underline hover:underline">สมัครสมาชิกที่นี่</NuxtLink>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
const router = useRouter()
const loading = ref(false)
const { $pinia } = useNuxtApp()
const authStore = useAuthStore()
const credentials = ref({
  email_or_id: '',
  password: ''
})

definePageMeta({
  layout: false
})

const handleLogin = async () => {
  loading.value = true
  try {
    const user = await authStore.login(credentials.value)
    
    if (user) {
      // นำทางตาม Role
      if (user.role === 'admin') {
        router.push('/admin')
      } else if (user.role === 'teacher') {
        router.push('/teacher')
      } else {
        router.push('/student')
      }
    }
  } catch (error) {
    console.error(error)
    Swal.fire({ icon: 'error', title: 'ข้อผิดพลาด', text: error.message, confirmButtonColor: '#1a1a40' })
  } finally {
    loading.value = false
  }
}


</script>