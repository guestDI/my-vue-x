<template>
  <div class="h-screen bg-gray-900 text-gray-300 flex">
    <div
      class="w-2/6 p-4 h-full overflow-y-auto font-medium text-lg ml-14 mt-12"
    >
      <div class="mb-8 text-left flex flex-col">
        <h2 class="text-2xl font-bold text-white">Menu</h2>
        <button @click.prevent="goToHomePage" class="bg-gray-900 pl-0 text-left focus:outline-none">
          Home
        </button>
        <button @click.prevent="goToExplorePage" class="bg-gray-900 pl-0 text-left focus:outline-none">
          Explore
        </button>
        <button @click.prevent="goToProfilePage" class="bg-gray-900 pl-0 text-left focus:outline-none hover:outline-none">
          Profile
        </button>
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
import { CURRENT_USER_QUERY } from "./graphql/queries.js";

export default {
  data: () => ({
    currentUser: {}
  }),
  methods: {
    goToProfilePage() {
      this.$router.push({ path: `/profile/${this.currentUser.id}` })
    },
    goToExplorePage() {
      this.$router.push({ path: "/explore" })
    },
    goToHomePage() {
      this.$router.push({ path: "/" })
    }
  },
  apollo: {
    currentUser: {
      // GraphQL query
      query: CURRENT_USER_QUERY,
    },
  },
}
</script>

<style scoped>
</style>
