<template>
  <div class="flow-terminator">
    <span>{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  text: String
})
</script>

<style scoped>
.flow-terminator {
  border: 2px solid #1a1a40;
  background: white;
  color: #1a1a40;
  border-radius: 9999px; /* ovale perfect */
  padding: 1rem 2.5rem;
  font-weight: 700;
  display: inline-block;
  text-align: center;
  margin-bottom: 0.25rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
</style>