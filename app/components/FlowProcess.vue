<template>
  <div class="flow-process">
    <span v-html="text" class="px-4"></span>
  </div>
</template>

<script setup>
defineProps({
  text: String
})
</script>

<style scoped>
.flow-process {
  border: 2px solid #1a1a40;
  background: white;
  color: #1a1a40;
  /* ปรับ padding บน-ล่างให้พอดี */
  padding: 1rem 0; 
  width: 100%;
  
  /* --- ส่วนที่แก้เพื่อให้ไม่เบียดตัวอักษร --- */
  /* เพิ่ม max-width ให้กว้างขึ้นมากพอสำหรับข้อความยาวๆ */
  max-width: 700px; 
  
  /* หรือถ้าอยากให้มันยืดหยุ่นตามเนื้อหาจริงๆ โดยไม่มี max-width ก็ลบบรรทัดบนออก */
  /* แล้วเปิดบรรทัดนี้แทน (แต่กล่องแต่ละอันจะกว้างไม่เท่ากันตามเนื้อหา) */
  /* width: fit-content; */ 
  /* ------------------------------------- */

  border-radius: 0 !important; /* สี่เหลี่ยมขอบคมเป๊ะ */
  text-align: center;
  font-weight: 500;
  margin-bottom: 0.25rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.03);
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.6; /* เพิ่มช่องไฟระหว่างบรรทัด */
}
</style>