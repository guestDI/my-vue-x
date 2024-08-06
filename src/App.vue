<template>
  <div class="h-screen bg-gray-900 text-gray-300 flex">
    <Sidebar/>
    <router-view />
  </div>
</template>

<script >
import Sidebar from "./components/Sidebar.vue";

export default {
  components: { Sidebar }
};
</script>

<style scoped>
</style>
