<script>
import { ADD_COMMENT } from "../graphql/mutations.js";
import { TWEETS_QUERY } from "../graphql/queries.js";

export default {
  name: "Modal",
  props: ['tweet', 'me'],
  data: () => ({
    comment: ""
  }),
  methods: {
    close() {
      this.$emit('close');
    },
    addComment() {
      // Mutation
      this.$apollo
        .mutate({
          mutation: ADD_COMMENT,
          variables: {
            userId: this.me.recordId,
            text: this.comment,
            tweetId: this.tweet.tweetId,
          },
          refetchQueries: [
            TWEETS_QUERY, // DocumentNode object parsed with gql
            'TweetsQuery' // Query name
          ],
        })
        .then((data) => {
          this.comment = "";
          this.close();
          console.log("Done.", data);
        });
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

      <section class="relative px-6 min-w-600 max-h-90vh max-w-70vw flex flex-col">
        <div class="flex">
          <div class="w-20">
            <div
              v-if="tweet?.author?.image"
              class="bg-gray-600 rounded-full w-12 h-12"
            >
              <img
                alt="image"
                class="bg-gray-600 rounded-full"
                :src="tweet?.author?.image"
              />
            </div>
          </div>
          <div>
            <div class="flex">
              <span class="font-bold mr-2">{{this.tweet?.author?.name}}</span>
              <span class="text-gray-500">@{{this.tweet?.author?.username}}</span>
            </div>
            <div class="pb-4 flex text-left flex-col">
              <p class="pb-3">{{this.tweet?.text}}</p>
              <span class="text-gray-500">Replying to
              <span class="font-bold text-blue-500">@{{ this.tweet?.author?.username }}</span>
            </span>
            </div>
          </div>
        </div>
        <div class="flex">
<!--          <div class="w-20">-->
<!--            <div-->
<!--              v-if="tweet?.author?.image"-->
<!--              class="bg-gray-600 rounded-full w-12 h-12"-->
<!--            >-->
<!--              <img-->
<!--                alt="image"-->
<!--                class="bg-gray-600 rounded-full"-->
<!--                :src="tweet?.author?.image"-->
<!--              />-->
<!--            </div>-->
<!--          </div>-->
          <textarea
            class="w-full p-2 bg-gray-800 text-white rounded-lg"
            rows="3"
            placeholder="Post you reply"
            v-model="comment"
          ></textarea>
        </div>
      </section>

      <footer class="flex justify-end p-4">
        <button
          type="button"
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full"
          @click="addComment"
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
  width: 45px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}
</style>