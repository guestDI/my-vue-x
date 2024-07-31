<script setup></script>

<template>
  <div class="h-screen bg-gray-900 text-gray-300 flex">
    <div
      class="w-2/6 p-4 h-full overflow-y-auto font-medium text-lg ml-14 mt-12"
    >
      <div class="mb-8 text-left">
        <h2 class="text-2xl font-bold text-white">Profile</h2>
        <router-link to="/profile" class="mt-2 text-blue-400"
          >@johndoe</router-link
        >
      </div>
      <div class="mb-8 text-left flex flex-col">
        <h2 class="text-2xl font-bold text-white">Menu</h2>
        <button class="bg-gray-900 pl-0 text-left">
          <router-link to="/" class="text-blue-400">Home</router-link>
        </button>
        <button class="bg-gray-900 pl-0 text-left">
          <router-link to="/explore" class="text-blue-400">Explore</router-link>
        </button>
      </div>
      <div class="text-left">
        <h2 class="text-2xl font-bold text-white">Trends</h2>
        <ul class="mt-2 space-y-2">
          <li>#VueJS</li>
          <li>#TailwindCSS</li>
          <li>#JavaScript</li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
