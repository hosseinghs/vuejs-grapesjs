import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import API from "./services/api";
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import "./assets/main.css";

const app = createApp(App);

API.init();
app.use(router);
app.use(createPinia());
app.use(grapesjs);

app.mount("#app");
