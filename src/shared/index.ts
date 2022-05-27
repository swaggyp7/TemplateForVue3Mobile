import store from "../store/index";

export function setToken(token: string) {
  store.dispatch("setToken", token);
}

export function getToken() {
  return store.getters.getToken;
}

export function clearToken() {
  store.dispatch("clearToken");
}
