import axios from "axios";
import store from "@/store";

const env = process.env.NODE_ENV;
let baseURL = "";
if (env == "development") {
  baseURL = "http://localhost:8091";
} else if (env == "production") {
  baseURL = "http://8.134.217.191:8091";
}

export function request(config) {
  const instance = axios.create({
    baseURL: baseURL,
  });
  instance.interceptors.request.use((config) => {
    if (store.state) config.headers.Authorization = store.state.token;
    return config;
  });
  return instance(config);
}
