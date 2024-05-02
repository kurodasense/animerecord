import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import * as Icons from "@element-plus/icons-vue";
import "@/utils/index.js";
const app = createApp(App);
const pinia = createPinia();
for (let i in Icons) {
  app.component(i, Icons[i]);
}

app.use(pinia).use(router).use(ElementPlus).mount("#app");
