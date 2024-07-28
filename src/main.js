import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { apolloProvider } from "./graphql/apollo";

createApp(App).use(apolloProvider).use(router).mount("#app");
