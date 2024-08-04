<script>
export default {
  name: "Modal",
  props: ['tweet'],
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>

<template>
  <div class="modal-backdrop">
    <div class="bg-gray-900 overflow-x-auto flex rounded-2xl flex-col">
      <header class="relative flex p-4">
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>

      <section class="relative px-6 min-w-600 max-h-90vh max-w-70vw">
        <div
          v-if="tweet?.author?.image"
          class="bg-gray-600 rounded-full h-10 w-10"
        >
          <img
            alt="image"
            class="bg-gray-600 rounded-full h-10 w-10"
            :src="tweet?.author?.image"
          />
        </div>
        <div class="flex">
          <span class="font-bold mr-2">{{this.tweet?.author?.name}}</span>
          <span class="text-gray-500">@{{this.tweet?.author?.username}}</span>

        </div>
        <div class="pb-4 flex text-left flex-col">
          <p class="pb-3">{{this.tweet?.text}}</p>
          <span>Replying to {{ this.tweet?.author?.username }}</span>
        </div>
        <div>
          <textarea
            class="w-full p-2 bg-gray-800 text-white rounded-lg"
            rows="3"
            placeholder="Post you reply"
          ></textarea>
        </div>
      </section>

      <footer class="flex justify-end p-4">
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full"
        >
          Reply
        </button>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.23);
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}
</style>