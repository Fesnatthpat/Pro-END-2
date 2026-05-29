<template>
  <div class="relative flex items-center justify-center flow-decision-wrapper my-8">
    <div class="flow-decision-diamond"></div>
    <span class="relative z-10 font-bold text-[#1a1a40] text-center px-4 leading-tight">
      <span v-html="text"></span>
    </span>
  </div>
</template>

<script setup>
defineProps({
  text: String
})
</script>

<style scoped>
.flow-decision-wrapper {
  width: 140px;
  height: 140px;
}

.flow-decision-diamond {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px; /* ขนาดของสี่เหลี่ยมก่อนหมุน */
  height: 100px;
  background-color: white;
  border: 2px solid #1a1a40;
  /* จุดสำคัญ: เลื่อนกลับมาตรงกลางแล้วหมุน 45 องศา */
  transform: translate(-50%, -50%) rotate(45deg); 
  z-index: 0;
}
</style>