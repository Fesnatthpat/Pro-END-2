<template>
  <button 
    @click="toggleTheme" 
    class="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-white dark:bg-[#1a1a40] text-[#1a1a40] dark:text-white shadow-[0_5px_15px_rgba(0,0,0,0.1)] dark:shadow-[0_5px_15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-110 flex items-center justify-center border border-gray-200 dark:border-slate-700 dark:border-gray-700 print:hidden"
    :title="isDark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'"
  >
    <span v-if="isDark" class="material-symbols-rounded block">light_mode</span>
    <span v-else class="material-symbols-rounded block">dark_mode</span>
  </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  console.log('ThemeToggle: Button clicked, current dark state:', isDark.value)
  isDark.value = !isDark.value
  updateTheme()
}

const updateTheme = () => {
  console.log('ThemeToggle: Updating theme, isDark should be:', isDark.value)
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  console.log('ThemeToggle: Mounted, saved theme:', savedTheme)
  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
  } else {
    isDark.value = false
  }
  updateTheme()
})
</script>
