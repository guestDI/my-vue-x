<template>
  <div class="h-screen bg-gray-900 text-gray-300 flex">
    <div
      class="w-2/6 p-4 h-full overflow-y-auto font-medium text-lg ml-14 mt-12"
    >
      <div class="mb-8 text-left flex flex-col">
        <h2 class="text-2xl font-bold text-white">Menu</h2>
        <MenuItem @click.prevent="goToHomePage">
          Home
        </MenuItem>
        <MenuItem @click.prevent="goToExplorePage">
          Explore
        </MenuItem>
        <MenuItem @click.prevent="goToProfilePage">
          Profile
        </MenuItem>
      </div>
      <div class="text-left">
        <h2 class="text-2xl font-bold text-white">Trends</h2>
        <ul class="mt-2 space-y-2 text-sm">
          <li>#VueJS</li>
          <li>#TailwindCSS</li>
          <li>#JavaScript</li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script >
import MenuItem from "./components/MenuItem.vue";

export default {
  components: { MenuItem },
  data: () => ({}),
  methods: {
    goToProfilePage() {
      this.$router.push({ path: "/profile/60959239-a936-481b-9b6c-cc8f49aa3cd5"})
    },
    goToExplorePage() {
      this.$router.push({ path: "/explore" })
    },
    goToHomePage() {
      this.$router.push({ path: "/" })
    }
  }
}
</script>

<style scoped>
</style>
