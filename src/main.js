// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 导入重置样式
import "./assets/css/reset.css";
// 导入element.js
import './common/element'
// 导入element-ui
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
// 导入axios
import './common/axios'
// 使用element-ui
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.imgUrl="http://localhost:3002"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// 响应拦截

