<script setup>

</script>

<template>
  <button class="bg-gray-800 w-10 h-10 flex items-center justify-center hover:outline-none border-none">
    <span>
      <slot></slot>
    </span>
    <span class="text-gray-500 ml-1">
      <slot name="count"></slot>
    </span>
  </button>
</template>

<style scoped>

</style>