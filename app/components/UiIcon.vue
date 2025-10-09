<template>
  <div class="flex items-center justify-center">
    <Icon :name="icon" :class="customClass" />
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  customClass: {
    type: String,
    default: "",
  },
});
</script>
