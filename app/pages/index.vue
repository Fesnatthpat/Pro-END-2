<script setup>
// หน้าแรกสุด (localhost:3000) ให้เด้งไปที่หน้า Dashboard นักศึกษาทันที
onMounted(() => {
  navigateTo('/student')
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p class="text-gray-500 animate-pulse ">กำลังเข้าสู่ระบบ Student Panel...</p>
  </div>
</template>