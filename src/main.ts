import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { i18n } from "./language/index";
import { hasParent } from "lin-tools-ts";
import "@/style/index.less";
document.body.addEventListener(
  "touchmove",
  function (e: any) {
    if (hasParent(e.target, "scrollable")) return;
    // 阻止默认事件
    e.preventDefault();
  },
  {
    passive: false,
  }
);
createApp(App).use(i18n).use(store).use(router).mount("#app");
