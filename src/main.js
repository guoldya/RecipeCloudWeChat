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
import filters from './filter/filter';
import * as mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'
Vue.prototype.$conf = Config;
Vue.use(mandMobile)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
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
//const BASE_URL = '/api';
 const BASE_URL = '/api/biz';
axios.defaults.baseURL = BASE_URL;

axios.interceptors.request.use(function (config) {
  let url = config.url;
  // console.log(localStorage.getItem("token1"), "我是缓存的token哦")
  // 如果是登陆 
  if (url.indexOf("/appLogin/login") > -1 || (url.indexOf("appLoginlogin") > -1)) {
    localStorage.setItem('token', "");
    config.headers.TOKEN = "";
  } else {
    config.headers.TOKEN = localStorage.getItem("token1");
    config.headers.UUID = "AAA";

    // if (this.$store.state.TOKEN) {
    //   config.headers.TOKEN = this.$store.state.TOKEN;
    //   config.headers.UUID = this.$store.state.UUID;
    // } else {
    //   console.log("一二善思", localStorage.getItem("token"))
    //   config.headers.TOKEN = localStorage.getItem("token");
    //   config.headers.UUID = "AAA";
    // }
  }
  return config;
}, function (err) {
  return Promise.reject(err);
});
// 添加一个响应拦截器
axios.interceptors.response.use(function (res) {
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
