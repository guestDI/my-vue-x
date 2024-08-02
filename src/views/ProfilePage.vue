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
          v-if="currentUser.id !== id"
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
      <div class="p-6 space-y-4 text-left">
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
    </div>
  </div>
</template>

<script>
import { AUTHOR_QUERY, CURRENT_USER_QUERY } from "../graphql/queries";
import { FOLLOW, UNFOLLOW } from "../graphql/mutations.js";

export default {

  name: "ProfilePage",
  data() {
    return {
      author: {},
      id: this.$route.params.id,
      currentUser: {},
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    handleFollow() {
      if(this.author?.followers?.includes(this.currentUser.id)) {
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
            id: this.currentUser.id,
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
            id: this.currentUser.id,
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
      return this.author?.followers?.includes(this.currentUser.id) ? 'Unfollow' : 'Follow'
    }
  },
  apollo: {
    // fetch user by ID
    author: {
      query: AUTHOR_QUERY,
      variables() {
        return {
          id: this.id,
        };
      },
    },
    currentUser: {
      // GraphQL query
      query: CURRENT_USER_QUERY,
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
