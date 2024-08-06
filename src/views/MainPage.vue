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
          <IconButton @click="handleLike(tweet.tweetId)">
            <LikeIconFilled v-if="me?.liked?.includes(tweet.tweetId)"/>
            <LikeIconOutlined v-else/>
            <template #count>
              {{tweet.likes}}
            </template>
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
import { ME, TWEETS_QUERY } from "../graphql/queries";
import { ADD_TWEET, LIKE, UNLIKE } from "../graphql/mutations";
import LikeIconOutlined from "../components/LikeIconOutlined.vue";
import CommentsIconOutlined from "../components/CommentsIconOutlined.vue";
import ShareIcon from "../components/ShareIcon.vue";
import RepostIcon from "../components/RepostIcon.vue";
import IconButton from "../components/IconButton.vue";
import Modal from "../components/Modal.vue";
import LikeIconFilled from "../components/LikeIconFilled.vue";

export default {
  components: { LikeIconFilled, IconButton, RepostIcon, ShareIcon, CommentsIconOutlined, LikeIconOutlined, Modal },
  data: () => ({
    tweets: [],
    loading: 0,
    tweet: "",
    currentUserId: '60959239-a936-481b-9b6c-cc8f49aa3cd5',
    me: {},
    isModalVisible: false,
    selectedTweet: null
  }),
  methods: {
    handleLike(tweetId) {
      if(this.me?.liked?.includes(tweetId)) {
        this.unlike(tweetId);
      } else {
        this.like(tweetId);
      }
    },
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
            authorId: this.me.recordId,
            text: this.tweet,
          },
          refetchQueries: [
            TWEETS_QUERY, // DocumentNode object parsed with gql
            'TweetsQuery' // Query name
          ],
        })
        .then((data) => {
          console.log("Done.", data);
        });
    },
    like(tweetId){
      this.$apollo
        .mutate({
          mutation: LIKE,
          variables: {
            tweetId: tweetId,
            userId: this.me.recordId,
          },
          update: (cache, { data: { like } }) => {
            // Update the tweets cache
            const tweetsData = cache.readQuery({ query: TWEETS_QUERY });
            const updatedTweets = tweetsData.tweets.map(tweet =>
              tweet.tweetId === tweetId
                ? { ...tweet, likes: like }
                : tweet
            );
            cache.writeQuery({
              query: TWEETS_QUERY,
              data: { tweets: updatedTweets }
            });

            // Update the me cache
            const meData = cache.readQuery({ query: ME });
            const updatedMe = {
              ...meData.me,
              liked: [...meData.me.liked, tweetId]
            };
            cache.writeQuery({
              query: ME,
              data: { me: updatedMe }
            });
          }
        })
        .then((data) => {
          console.log("Liked.", data);
        });
    },
    unlike(tweetId){
      this.$apollo
        .mutate({
          mutation: UNLIKE,
          variables: {
            tweetId: tweetId,
            userId: this.me.recordId,
          },
          update: (cache, { data: { unlike } }) => {
            // Update the tweets cache
            const tweetsData = cache.readQuery({ query: TWEETS_QUERY });
            const updatedTweets = tweetsData.tweets.map(tweet =>
              tweet.tweetId === tweetId
                ? { ...tweet, likes: unlike }
                : tweet
            );
            cache.writeQuery({
              query: TWEETS_QUERY,
              data: { tweets: updatedTweets }
            });

            // Update the me cache
            const meData = cache.readQuery({ query: ME });
            const updatedMe = {
              ...meData.me,
              liked: meData.me.liked.filter(id => id !== tweetId)
            };
            cache.writeQuery({
              query: ME,
              data: { me: updatedMe }
            });
          }
        })
        .then((data) => {
          console.log("Unliked.", data);
        });
    }
  },
  // Apollo GraphQL
  apollo: {
    tweets: {
      // GraphQL query
      query: TWEETS_QUERY,
      loadingKey: "loading",
      prefetch: true,
    },
    me: {
      query: ME,
      prefetch: true,
    }
  },
};
</script>

<style scoped></style>
