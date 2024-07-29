<template>
  <div
    class="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center p-6"
  >
    <div
      class="bg-gray-800 shadow-md rounded-lg overflow-hidden w-full max-w-3xl"
    >
      <div
        class="p-6 border-b border-gray-700 flex justify-between items-center"
      >
        <div class="flex items-center space-x-4">
          <img
            v-if="user.image"
            :src="user.image"
            alt="Profile"
            class="w-24 h-24 rounded-full border-4 border-gray-800"
          />
          <img
            v-else
            src="https://via.placeholder.com/100"
            alt="Profile"
            class="w-24 h-24 rounded-full border-4 border-gray-800"
          />
          <div>
            <h1 class="text-3xl font-bold text-white">{{ user.name }}</h1>
            <p class="text-gray-400">@{{ user.username }}</p>
          </div>
        </div>
        <button
          @click="goBack"
          class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
      <div class="p-6 space-y-4 text-left">
        <section>
          <h2 class="text-xl font-semibold text-white">Bio</h2>
          <p class="mt-2 text-gray-300 text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </section>
        <section>
          <h2 class="text-xl font-semibold text-white">Followers</h2>
          <p class="mt-2 text-gray-300">1234 Followers</p>
        </section>
        <section>
          <h2 class="text-xl font-semibold text-white">Following</h2>
          <p class="mt-2 text-gray-300">567 Following</p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { USER_QUERY } from "../graphql/queries";
import { showUserName } from "../utils";

export default {
  name: "ProfilePage",
  data() {
    return {
      user: {},
      id: this.$route.params.id,
      showUserName,
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
  },
  apollo: {
    // fetch user by ID
    user: {
      query: USER_QUERY,
      variables() {
        return {
          id: this.id,
        };
      },
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
