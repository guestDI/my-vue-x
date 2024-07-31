<template>
  <div class="h-screen bg-gray-900 text-gray-300 flex flex-col">
    <!-- Main Content -->
    <div class="flex-1 flex flex-col h-full overflow-hidden">
      <div class="sticky top-0 bg-gray-900 p-4 z-10">
        <h1 class="text-3xl font-bold text-white mb-4">Explore</h1>
        <div>
          <input
            type="text"
            class="w-full p-2 mb-4 bg-gray-800 text-white rounded-lg"
            placeholder="Search Twitter"
          />
        </div>
        <div class="flex space-x-4 border-b border-gray-700 pb-2">
          <button
            @click="setActiveTab('Trending')"
            :class="
              activeTab === 'Trending'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400'
            "
            class="py-2 px-4 border-b-2 focus:outline-none"
          >
            Trending
          </button>
          <button
            @click="setActiveTab('News')"
            :class="
              activeTab === 'News'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400'
            "
            class="py-2 px-4 border-b-2 focus:outline-none"
          >
            News
          </button>
          <button
            @click="setActiveTab('Sports')"
            :class="
              activeTab === 'Sports'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400'
            "
            class="py-2 px-4 border-b-2 focus:outline-none"
          >
            Sports
          </button>
          <button
            @click="setActiveTab('Entertainment')"
            :class="
              activeTab === 'Entertainment'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400'
            "
            class="py-2 px-4 border-b-2 focus:outline-none"
          >
            Entertainment
          </button>
        </div>
      </div>
      <div class="flex-1 overflow-y-auto p-4 space-y-6">
        <div v-if="activeTab === 'Trending'" class="bg-gray-800 p-4 rounded-lg">
          <!-- Trending content -->
          <p>Trending content goes here...</p>
        </div>
        <div v-if="activeTab === 'News'" class="bg-gray-800 p-4 rounded-lg">
          <!-- News content -->
          <p>News content goes here...</p>
        </div>
        <div v-if="activeTab === 'Sports'" class="bg-gray-800 p-4 rounded-lg">
          <!-- Sports content -->
          <p>Sports content goes here...</p>
        </div>
        <div
          v-if="activeTab === 'Entertainment'"
          class="bg-gray-800 p-4 rounded-lg"
        >
          <!-- Entertainment content -->
          <p>Entertainment content goes here...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ExplorePage",
  data() {
    return {
      activeTab: "Trending",
    };
  },
  methods: {
    setActiveTab(tab) {
      this.activeTab = tab;
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
