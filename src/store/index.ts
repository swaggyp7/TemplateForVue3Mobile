import { createStore } from "vuex";

export default createStore({
  state: {
    token: "",
  },
  getters: {
    getToken: (state) => {
      const session_token = sessionStorage.getItem("session_token");
      return state.token || session_token || "";
    },
  },
  mutations: {
    updateToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    setToken({ commit }, token) {
      sessionStorage.setItem("session_token", token);
      commit("updateToken", token);
    },
    clearToken({ commit }) {
      sessionStorage.removeItem("session_token");
      commit("updateToken", "");
    },
  },
  modules: {},
});
