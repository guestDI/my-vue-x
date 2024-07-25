import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
    cache,
    uri: 'https://rickandmortyapi.com/graphql',
})

const apolloProvider = createApolloProvider({
    defaultClient: apolloClient,
  })

createApp(App).use(apolloProvider).use(router).mount('#app')
