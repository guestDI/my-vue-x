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
            v-if="author.image"
            :src="author.image"
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
            <h1 class="text-3xl font-bold text-white">{{ author.name }}</h1>
            <p class="text-gray-400">@{{ author.username }}</p>
          </div>
        </div>
        <button
          @click="handleFollow"
          v-if="author.recordId !== currentUserId"
          class="bg-white hover:bg-gray-100 text-gray-600 font-bold py-2 px-4 rounded"
        >
          {{getBtnTitle}}
        </button>
        <button
          @click="goBack"
          class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
      </div>
      <h3 v-if="userLoading">Loading...</h3>
      <div v-else class="p-6 space-y-4 text-left">
        <section>
          <h2 class="text-xl font-semibold text-white">Bio</h2>
          <p class="mt-2 text-gray-300 text-left">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </section>
        <div class="flex flex-row">
          <section class="mr-4">
            <p class="mt-2 text-sm text-gray-300">{{ author?.followers?.length }} followers</p>
          </section>
          <section>
            <p class="mt-2 text-sm text-gray-300">{{ author?.following?.length }} following</p>
          </section>
        </div>
      </div>
      <div class="p-6 space-y-4 text-left border-t border-gray-700">
        <div class="flex space-x-4 pb-2">
          <button
            @click="setActiveTab('Posts')"
            :class="
              activeTab === 'Posts'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400'
            "
            class="py-2 px-4 border-b-2 focus:outline-none"
          >
            Posts
          </button>
          <button
            @click="setActiveTab('Likes')"
            v-if="author.recordId === currentUserId"
            :class="
              activeTab === 'Likes'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400'
            "
            class="py-2 px-4 border-b-2 focus:outline-none"
          >
            Likes
          </button>
        </div>
        <div class="flex-1 overflow-y-auto p-2 space-y-6">
          <div v-if="activeTab === 'Posts'" class="bg-gray-800 rounded-lg">
            <h3 v-if="loading">Loading...</h3>
            <div
              v-else
              v-for="tweet in authorTweets"
              :key="tweet.tweetId"
              class="bg-gray-700 p-4 rounded-lg mb-2"
            >
              <p>{{ tweet.text }}</p>
            </div>
          </div>
          <div v-if="activeTab === 'Likes'" class="bg-gray-800 p-4 rounded-lg">
            <p>You didn't like anything so far...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AUTHOR_QUERY, AUTHOR_TWEETS } from "../graphql/queries";
import { FOLLOW, UNFOLLOW } from "../graphql/mutations.js";

export default {
  name: "ProfilePage",
  data() {
    return {
      author: {},
      id: this.$route.params.id,
      currentUserId: '60959239-a936-481b-9b6c-cc8f49aa3cd5',
      activeTab: 'Posts',
      authorTweets: [],
      loading: 0,
      userLoading: false
    };
  },
  created() {
    this.loadAuthorFromCacheOrServer();
  },
  watch: {
    '$route'() {
      this.id = this.$route.params.id;
      this.loadAuthorFromCacheOrServer();
    }
  },
  methods: {
    loadAuthorFromCacheOrServer() {
      this.userLoading = true;
      try {
        const cachedData = this.$apollo.provider.defaultClient.readQuery({
          query: AUTHOR_QUERY,
          variables: { id: this.id }
        });
        if (cachedData) {
          this.userLoading = false;
          this.author = cachedData.author;
        } else {
          this.loadAuthorFromServer();
        }
      } catch (e) {
        this.loadAuthorFromServer();
      }
    },
    loadAuthorFromServer() {
      this.$apollo.query({
        query: AUTHOR_QUERY,
        variables: { id: this.id }
      }).then((response) => {
        this.author = response.data.author;
        this.userLoading = false;
      });
    },
    setActiveTab(tab) {
      this.activeTab = tab;
    },
    goBack() {
      this.$router.push("/");
    },
    handleFollow() {
      if(this.author?.followers?.includes(this.currentUserId)) {
        this.unfollow();
      } else {
        this.follow();
      }
    },
    follow() {
      // Mutation
      this.$apollo
        .mutate({
          mutation: FOLLOW,
          variables: {
            authorId: this.id,
            id: this.currentUserId,
          },
          update: (cache, { data: { follow } }) => {
            let data = cache.readQuery({ query: AUTHOR_QUERY, variables: { id: this.id} });
            data = {
              author: {
                ...data.author,
                followers: [...data.author.followers, follow],
              },
            };

            cache.writeQuery({ query: AUTHOR_QUERY, data });
          },
        })
        .then((data) => {
          console.log("Done.", data);
        });
    },
    unfollow() {
      // Mutation
      this.$apollo
        .mutate({
          mutation: UNFOLLOW,
          variables: {
            authorId: this.id,
            id: this.currentUserId,
          },
          update: (cache, { data: { unfollow } }) => {
            let data = cache.readQuery({ query: AUTHOR_QUERY, variables: { id: this.id} });
            data = {
              author: {
                ...data.author,
                followers: data.author.followers.filter((follower) => follower !== unfollow),
              },
            };

            cache.writeQuery({ query: AUTHOR_QUERY, data });
          },
        })
        .then((data) => {
          console.log("Done.", data);
        });
    },
  },
  computed: {
    getBtnTitle() {
      return this.author?.followers?.includes(this.currentUserId) ? 'Unfollow' : 'Follow'
    }
  },
  apollo: {
    authorTweets: {
      query: AUTHOR_TWEETS,
      variables() {
        return {
          authorId: this.id,
        };
      },
      loadingKey: "loading",
    }
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
