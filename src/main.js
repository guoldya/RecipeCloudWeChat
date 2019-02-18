import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import Config from './config/config.js';
import store from './store/store';
import FastClick from 'fastclick'
import Header from './components/header/header.vue';
import Search from './components/search/search.vue';
import Footer from './components/footer/footer.vue';
import Loading from './components/loading/loading.vue';
import infiniteScroll from 'vue-infinite-scroll';
import * as mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'
Vue.prototype.$conf = Config;
Vue.use(mandMobile)
// import 'normalize.css'

import './assets/responsive'
import './assets/global.css'
import rater from 'w-rater'

Vue.component('Header', Header);
Vue.component('Search', Search);
Vue.component('Loading', Loading);
Vue.component('Footer', Footer);
Vue.component('rater', rater);
Vue.config.productionTip = false;
Vue.use(infiniteScroll);


if ('addEventListener' in document && 'ontouchstart' in window) {
  FastClick.prototype.focus = function (targetElement) {
    targetElement.focus()
  }
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}

Vue.config.productionTip = false


const BASE_URL = '/api';
axios.defaults.baseURL = BASE_URL;

let AUTH_TOKEN = (function () {
  return localStorage.getItem("token");
})();
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
// 添加一个判断石佛存在需要token的拦截器
console.log("我是将就", localStorage.getItem("token"))
axios.interceptors.request.use(function (config) {
  let url = config.url;
  // 如果是登陆
  if (url.indexOf("/appLogin/login") > -1) {
    localStorage.setItem('token', "");
    config.headers.Authorization = "";
  }
  if (url.indexOf("user") > -1 && url.indexOf("register") < 0) {
    config.headers.Authorization = localStorage.getItem("token");

  }
  return config;
}, function (err) {
  return Promise.reject(err);
});
// 添加一个响应拦截器
axios.interceptors.response.use(function (res) {
  // config => {
  //   // if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
  //   //   config.headers.Authorization = `token ${store.state.token}`;
  //   // }
  //   config.headers.TOKEN = `edd169b85704410aa5219512cb6f1f00`;
  //   config.headers.UUID = `AAA`;
  //   return config;
  // }
  if (res.data.code == 401 && res.data.msg && res.data.msg.indexOf('未登录') || (res.data.code == 402) || (res.data.code == 800)) {
    // 未登录操作npm
    // router.replace('/login?back=1');
    console.log(res)
    // router.replace('/control');
  }
  return res;
});
Vue.prototype.$axios = axios;


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});
