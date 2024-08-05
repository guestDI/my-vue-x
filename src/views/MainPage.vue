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
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-full"
        >
          Tweet
        </button>
      </div>
    </div>
    <h3 v-if="loading">Loading...</h3>
    <div v-else class="flex-1 overflow-y-auto space-y-6 mt-4">
      <div
        v-for="(tweet, index) in tweets"
        :key="tweet.tweetId"
        class="bg-gray-800 p-4 rounded-lg"
      >
        <div class="flex items-center mb-2">
          <div
            v-if="tweet.author.image"
            class="bg-gray-600 rounded-full h-10 w-10"
          >
            <img
              alt="image"
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
                  :to="`/profile/${tweet.author.recordId}`"
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
        <div class="grid grid-cols-4 gap-4 place-items-center border-t border-gray-700 pt-1 mt-4 px-4">
          <IconButton>
            <LikeIconOutlined/>
          </IconButton>
          <IconButton>
            <RepostIcon/>
          </IconButton>
          <IconButton @click="addComment(index)">
            <CommentsIconOutlined/>
          </IconButton>
          <IconButton>
            <ShareIcon/>
          </IconButton>
        </div>
      </div>

      <Modal
        v-show="isModalVisible"
        @close="closeModal"
        :tweet="tweets[selectedTweet]"
      />
    </div>
  </div>
</template>

<script>
import { TWEETS_QUERY } from "../graphql/queries";
import { ADD_TWEET } from "../graphql/mutations";
import { v4 as uuidv4 } from "uuid";
import LikeIconOutlined from "../components/LikeIconOutlined.vue";
import CommentsIconOutlined from "../components/CommentsIconOutlined.vue";
import ShareIcon from "../components/ShareIcon.vue";
import RepostIcon from "../components/RepostIcon.vue";
import IconButton from "../components/IconButton.vue";
import Modal from "../components/Modal.vue";

export default {
  components: { IconButton, RepostIcon, ShareIcon, CommentsIconOutlined, LikeIconOutlined, Modal },
  data: () => ({
    tweets: [],
    loading: 0,
    tweet: "",
    currentUserId: '60959239-a936-481b-9b6c-cc8f49aa3cd5',
    isModalVisible: false,
    selectedTweet: null
  }),
  methods: {
    closeModal() {
      this.isModalVisible = false;
    },
    addComment(tweetId){
      this.isModalVisible = true;
      this.selectedTweet = tweetId;
    },
    addTweet() {
      // Mutation
      this.$apollo
        .mutate({
          mutation: ADD_TWEET,
          variables: {
            id: uuidv4(),
            authorId: this.currentUserId,
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
  },
};
</script>

<style scoped></style>
