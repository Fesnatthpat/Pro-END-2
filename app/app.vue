<template>
  <div>
    <NuxtLoadingIndicator color="#4f46e5" :height="4" />
    
    <!-- Full Screen Loader during navigation/data fetching -->
    <div v-if="isLoading" class="fixed inset-0 z-[99999] bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-300">
      <div class="relative w-24 h-24 mb-6">
        <div class="absolute inset-0 border-4 border-indigo-100 dark:border-indigo-900/50 rounded-full"></div>
        <div class="absolute inset-0 border-4 border-indigo-600 dark:border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <span class="material-symbols-rounded text-indigo-600 dark:text-indigo-400 text-3xl animate-pulse">cloud_sync</span>
        </div>
      </div>
      <div class="text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase flex items-center gap-2">
        กำลังโหลดข้อมูล<span class="flex space-x-1"><span class="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce"></span><span class="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 0.1s"></span><span class="w-1.5 h-1.5 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></span></span>
      </div>
    </div>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ThemeToggle />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isLoading = ref(false)
const nuxtApp = useNuxtApp()
const router = useRouter()

// Use router hooks for guaranteed execution on navigation end/error
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    isLoading.value = true
  }
  next()
})

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 100)
})

router.onError(() => {
  isLoading.value = false
})

// Fallback hooks
nuxtApp.hook('page:start', () => {
  isLoading.value = true
})
nuxtApp.hook('page:finish', () => {
  isLoading.value = false
})
nuxtApp.hook('vue:error', () => {
  isLoading.value = false
})
nuxtApp.hook('app:error', () => {
  isLoading.value = false
})

onMounted(() => {
  // Ensure it's hidden when mounted initially
  isLoading.value = false
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

body {
  font-family: 'Kanit', sans-serif !important;
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Layout Transitions */
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.3s ease;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>