import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      token: "",
    };
  },
  getters: {},
  mutations: {
    setToken(state, payload) {
      const { token } = payload;
      state.token = token;
    },
  },
  actions: {},
  modules: {},
});
