import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import "normalize.css/normalize.css";
import Element, { Message } from "element-ui";
import "./permission.js";
import "@/styles/common.scss";
import "@/components";
Vue.use(Element, { size: 'small' });
let $message = (options) => {
  return Message(Object.assign(options, { duration: 1000 }));
};
$message.success = (message, onClose) =>
  $message({ message, type: "success", onClose });
$message.info = (message, onClose) =>
  $message({ message, type: "info", onClose });
$message.warning = (message, onClose) =>
  $message({ message, type: "warning", onClose });
$message.error = (message, onClose) =>
  $message({ message, type: "error", onClose });
Vue.prototype.$message = $message;
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
