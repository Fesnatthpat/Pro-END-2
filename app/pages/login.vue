<template>
  <div class="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-[#f5f7fa] to-[#c3cfe2] dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
    
    <div class="bg-white dark:bg-slate-800 w-full max-w-[500px] p-[45px] rounded-[20px] shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-none border dark:border-slate-700 transition-colors duration-300">
      
      <h2 class="text-[#1a1a40] dark:text-white font-bold text-center mb-[30px] text-[2rem]">
        <span class="material-symbols-rounded">login</span> เข้าสู่ระบบ
      </h2>

      <form @submit.prevent="handleLogin" method="POST">
        
        <div class="mb-4">
          <label class="block text-[0.95rem] text-[#333] dark:text-slate-300 font-medium ml-1 mb-1">อีเมล หรือ รหัสนักศึกษา</label>
          <input v-model="credentials.email_or_id" type="text" name="email_or_id" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] dark:border-slate-600 bg-[#f8f9fa] dark:bg-slate-700 dark:text-white transition-all duration-200 focus:bg-white dark:focus:bg-slate-600 focus:border-[#1a1a40] dark:focus:border-indigo-400 focus:ring-[4px] focus:ring-[#1a1a40]/10 dark:focus:ring-indigo-400/20 outline-none" required placeholder="กรอกข้อมูลเพื่อเข้าสู่ระบบ">
        </div>

        <div class="mb-4">
          <label class="block text-[0.95rem] text-[#333] dark:text-slate-300 font-medium ml-1 mb-1">รหัสผ่าน</label>
          <input v-model="credentials.password" type="password" name="password" class="w-full rounded-[12px] p-[12px_15px] border border-[#e0e0e0] dark:border-slate-600 bg-[#f8f9fa] dark:bg-slate-700 dark:text-white transition-all duration-200 focus:bg-white dark:focus:bg-slate-600 focus:border-[#1a1a40] dark:focus:border-indigo-400 focus:ring-[4px] focus:ring-[#1a1a40]/10 dark:focus:ring-indigo-400/20 outline-none" required placeholder="กรอกรหัสผ่าน">
        </div>

        <button :disabled="loading" type="submit" class="w-full bg-[#1a1a40] dark:bg-indigo-600 text-white p-[14px] rounded-full text-[1.1rem] font-semibold mt-[20px] transition-all duration-200 hover:bg-[#2c2c54] dark:hover:bg-indigo-500 hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(26,26,64,0.2)] dark:hover:shadow-[0_5px_15px_rgba(99,102,241,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">
          {{ loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ' }}
        </button>

        <div class="text-center mt-[25px] text-[0.95rem] text-[#666] dark:text-slate-400">
          ยังไม่มีบัญชีใช่ไหม? <NuxtLink to="/register" class="text-[#1a1a40] dark:text-white dark:text-indigo-400 font-semibold no-underline hover:underline">สมัครสมาชิกที่นี่</NuxtLink>
        </div>

      </form>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'

definePageMeta({
  layout: false
})

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const credentials = ref({
  email_or_id: '',
  password: ''
})

const handleLogin = async () => {
  console.log('Login attempt with:', credentials.value.email_or_id)
  loading.value = true
  try {
    const user = await authStore.login({
      email_or_id: credentials.value.email_or_id,
      password: credentials.value.password
    })
    
    console.log('Login success, user role:', user?.role)

    if (user) {
      // นำทางตาม Role
      if (user.role === 'admin') {
        await router.push('/admin')
      } else if (user.role === 'teacher') {
        await router.push('/teacher')
      } else {
        await router.push('/student')
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    Swal.fire({ 
      icon: 'error', 
      title: 'เข้าสู่ระบบล้มเหลว', 
      text: error.message || 'อีเมล/รหัสนักศึกษา หรือรหัสผ่านไม่ถูกต้อง',
      confirmButtonColor: '#1a1a40' 
    })
  } finally {
    loading.value = false
  }
}
</script>