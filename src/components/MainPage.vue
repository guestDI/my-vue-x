
<template>
  <div class="min-h-screen bg-gray-900 text-gray-300 flex">
    <!-- Sidebar -->
    <div class="w-1/4 p-4 bg-gray-800">
      <div class="mb-8">
        <h2 class="text-2xl font-bold text-white">Profile</h2>
        <p class="mt-2">John Doe</p>
        <router-link to="/profile">@johndoe</router-link>
        <!-- <p class="text-gray-400"></p> -->
      </div>
      <div>
        <h2 class="text-2xl font-bold text-white">Trends</h2>
        <ul class="mt-2 space-y-2">
          <li>#VueJS</li>
          <li>#TailwindCSS</li>
          <li>#JavaScript</li>
        </ul>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-4">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">Home</h1>
      </div>
      <div class="mb-6">
        <textarea
          class="w-full p-2 bg-gray-800 text-white rounded-lg"
          rows="3"
          placeholder="What's happening?"
        ></textarea>
        <div class="flex justify-end mt-2">
          <button class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded">
            Tweet
          </button>
        </div>
      </div>
      <div class="space-y-6">
        <div class="bg-gray-800 p-4 rounded-lg">
          <div class="flex items-center mb-2">
            <div class="bg-gray-600 rounded-full h-10 w-10"></div>
            <div class="ml-2">
              <p class="text-white font-bold">Jane Smith</p>
              <p class="text-gray-400">@janesmith</p>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            odio. Praesent libero. Sed cursus ante dapibus diam.
          </p>
        </div>
        <div class="bg-gray-800 p-4 rounded-lg">
          <div class="flex items-center mb-2">
            <div class="bg-gray-600 rounded-full h-10 w-10"></div>
            <div class="ml-2">
              <p class="text-white font-bold">Alex Johnson</p>
              <p class="text-gray-400">@alexjohnson</p>
            </div>
          </div>
          <p>
            Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis
            ipsum. Praesent mauris.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
