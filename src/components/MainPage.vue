<template>
  <div class="min-h-screen bg-gray-900 text-gray-300 flex">
    <!-- Sidebar -->
    <div class="w-1/4 p-4 bg-gray-800 flex flex-col">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-white">Profile</h2>
        @johndoe
      </div>
      <div>
        <h2 class="text-2xl font-bold text-white">Trends</h2>
        <ul class="mt-2 space-y-2">
          <li>#VueJS</li>
          <li>#TailwindCSS</li>
          <li>#JavaScript</li>
          <li>#typescript</li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-4 flex flex-col">
      <div class="sticky top-0 bg-gray-900 pb-4 z-10">
        <h1 class="text-3xl font-bold text-white">Home</h1>
      </div>
      <div class="mb-6 sticky top-12 bg-gray-900 py-4">
        <textarea
          class="w-full p-2 bg-gray-800 text-white rounded-lg"
          rows="3"
          placeholder="What's happening?"
        ></textarea>
        <div class="flex w-full justify-end mt-2">
          <button
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
          >
            Tweet
          </button>
        </div>
      </div>
      <h3 v-if="loading">Loading...</h3>
      <div v-else class="flex-1 overflow-y-auto space-y-6 mt-4">
        <div
          v-for="user in users"
          :key="user.id"
          class="bg-gray-800 p-4 rounded-lg"
        >
          <div class="flex items-center mb-2">
            <div v-if="user.image" class="bg-gray-600 rounded-full h-10 w-10">
              <img
                class="bg-gray-600 rounded-full h-10 w-10"
                :src="user.image"
              />
            </div>
            <div v-else class="bg-gray-600 rounded-full h-10 w-10">JD</div>
            <div class="ml-2">
              <div class="flex items-center">
                <p class="text-white font-bold mr-2">{{ user.name }}</p>
                <div
                  class="w-2 h-2 rounded-full"
                  :style="{ backgroundColor: getDotColor(user.status) }"
                ></div>
              </div>
              <p class="text-gray-400 mr-0">
                <router-link :to="`/profile/users/${Number(user.id)}`">{{
                  `@${user.username}`
                }}</router-link>
              </p>
            </div>
          </div>

          <p class="text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { USERS_QUERY } from "../graphql/queries";
import { showUserName } from "../utils";

export default {
  data: () => ({
    users: [],
    loading: 0,
    showUserName,
  }),
  methods: {
    getDotColor(status = "") {
      if (status.toLowerCase() === "alive") {
        return "green";
      } else if (status.toLowerCase() === "dead") {
        return "red";
      }
      return "gray";
    },
  },
  // Apollo GraphQL
  apollo: {
    users: {
      // GraphQL query
      query: USERS_QUERY,
      // Will update the 'loading' attribute
      // +1 when a new query is loading
      // -1 when a query is completed
      loadingKey: "loading",
    },
  },
};
</script>

<style scoped></style>
