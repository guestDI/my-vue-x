<template>
  <!-- Main Content -->
  <div class="p-4 flex flex-col">
    <div class="bg-gray-900 pb-4">
      <h1 class="text-3xl font-bold text-white">Home</h1>
    </div>
    <div class="mb-6 bg-gray-900 py-4">
      <textarea
        v-model="tweet"
        class="w-full p-2 bg-gray-800 text-white rounded-lg"
        rows="3"
        placeholder="What's happening?"
      ></textarea>
      <div class="flex w-full justify-end mt-2">
        <button
          @click="addTweet"
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
        >
          Tweet
        </button>
      </div>
    </div>
    <h3 v-if="loading">Loading...</h3>
    <div v-else class="flex-1 overflow-y-auto space-y-6 mt-4">
      <div
        v-for="tweet in tweets"
        :key="tweet.id"
        class="bg-gray-800 p-4 rounded-lg"
      >
        <div class="flex items-center mb-2">
          <div
            v-if="tweet.author.image"
            class="bg-gray-600 rounded-full h-10 w-10"
          >
            <img
              class="bg-gray-600 rounded-full h-10 w-10"
              :src="tweet.author.image"
            />
          </div>
          <div v-else class="bg-gray-600 rounded-full h-10 w-10">JD</div>
          <div class="ml-2">
            <div class="flex items-center">
              <p class="text-primary-400 mr-0">
                <router-link
                  class="text-white mr-0"
                  :to="`/profile/${tweet.author.id}`"
                  >{{ tweet.author.name }}</router-link
                >
              </p>
            </div>
            <p class="text-gray-400 mr-0">
              {{ `@${tweet.author.username}` }}
            </p>
          </div>
        </div>

        <p class="text-left">
          {{ tweet.text }}
        </p>
        <div class="grid grid-cols-4 gap-3 border-t border-gray-700 mt-4 mb-2">
          <button>
            <LikeIcon/>
          </button>
          <div>09</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CURRENT_USER_QUERY, TWEETS_QUERY } from "../graphql/queries";
import { ADD_TWEET } from "../graphql/mutations";
import { showUserName } from "../utils";
import { v4 as uuidv4 } from "uuid";
import LikeIcon from "../components/LikeIcon.vue";

export default {
  components: { LikeIcon },
  data: () => ({
    tweets: [],
    loading: 0,
    tweet: "",
    currentUser: {}
  }),
  methods: {
    addTweet() {
      // Mutation
      this.$apollo
        .mutate({
          mutation: ADD_TWEET,
          variables: {
            id: uuidv4(),
            authorId: this.currentUser.id,
            text: this.tweet,
          },
          update: (cache, { data: { addTweet } }) => {
            let data = cache.readQuery({ query: TWEETS_QUERY });
            data = {
              ...data,
              tweets: [...data.tweets, addTweet],
            };
            cache.writeQuery({ query: TWEETS_QUERY, data });
          },
        })
        .then((data) => {
          console.log("Done.", data);
        });
    },
  },
  // Apollo GraphQL
  apollo: {
    tweets: {
      // GraphQL query
      query: TWEETS_QUERY,
      loadingKey: "loading",
      prefetch: true,
    },
    currentUser: {
      query: CURRENT_USER_QUERY,
    },
  },
};
</script>

<style scoped></style>
