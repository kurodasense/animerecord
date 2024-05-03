import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import * as Icons from "@element-plus/icons-vue";
import "@/utils/index.js";
const app = createApp(App);
for (let i in Icons) {
  app.component(i, Icons[i]);
}

app.use(store).use(router).use(ElementPlus).mount("#app");
