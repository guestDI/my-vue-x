<template>
    <div class="min-h-screen bg-gray-900 text-gray-300 flex flex-col items-center p-6">
      <div class="bg-gray-800 shadow-md rounded-lg overflow-hidden w-full max-w-3xl">
        <div class="p-6 border-b border-gray-700 flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <img 
              src="https://via.placeholder.com/100" 
              alt="Profile"
              class="w-24 h-24 rounded-full border-4 border-gray-800"
            />
            <div>
              <h1 class="text-3xl font-bold text-white">John Doe</h1>
              <p class="text-gray-400">@johndoe</p>
            </div>
          </div>
          <button @click="goBack" class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Back
          </button>
        </div>
        <div class="p-6 space-y-4">
          <section>
            <h2 class="text-xl font-semibold text-white">Bio</h2>
            <p class="mt-2 text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
          <section>
            <h2 class="text-xl font-semibold text-white">Recent Tweets</h2>
            <div class="space-y-4 mt-2">
              <div class="bg-gray-800 p-4 rounded-lg">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </div>
              <div class="bg-gray-800 p-4 rounded-lg">
                <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
              <!-- Add more tweets as needed -->
            </div>
          </section>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProfilePage",
    methods: {
      goBack() {
        this.$router.push('/');
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add any additional styling here */
  </style>
  