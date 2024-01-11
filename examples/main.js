import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import demoBlock from "./components/demo-block.vue";
import hljs from 'highlight.js';
import './assets/styles/common.css';
import './assets/styles/highlight.css';
import E2ePageBuilder from "@src/coreui/index.js";
import E2ePageEditor from "@src/editor/index.js";
Vue.component("demo-block", demoBlock);
Vue.use(ElementUI);
Vue.use(E2ePageBuilder);
Vue.use(E2ePageEditor);

router.afterEach(route => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
});
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
