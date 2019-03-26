import Vue from 'vue'
import App from './App.vue'
import * as mandMobile from 'mand-mobile'

import 'mand-mobile/lib/mand-mobile.css'
import router from './router'
import axios from 'axios';
import Config from './config/config.js';
import store from './store/store';
import FastClick from 'fastclick'
import Header from './components/header/header.vue';
import Apptab from './components/apptab/apptab.vue';
import Search from './components/search/search.vue';
import Address from './components/address/address.vue';
import Footer from './components/footer/footer.vue';
import Loading from './components/loading/loading.vue';
import infiniteScroll from 'vue-infinite-scroll';
import Skeleton from './Skeleton.vue';


import filters from './filter/filter';



Vue.prototype.$conf = Config;
Vue.use(mandMobile)
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// 开发环境
const isDev = process.env.NODE_ENV === 'development'

// 开启chrome devtools
Vue.config.devtools = isDev;


import './assets/responsive'
import './assets/global.css'



import rater from 'w-rater'

Vue.component('Header', Header);
Vue.component('Search', Search);
Vue.component('Apptab', Apptab)
Vue.component('Loading', Loading);
Vue.component('Skeleton', Skeleton);
Vue.component('Footer', Footer);
Vue.component('Address', Address);
Vue.component('rater', rater);
Vue.config.productionTip = false;
Vue.use(infiniteScroll);
// import Vconsole from 'vconsole';
// const vConsole = new Vconsole();

// 路由拦截
router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
//重新刷新页面拦截器
// const reloadInterceptor=(to,from)=>{
//     if((from.name=='home'||from.name=='my')&&(to.name=='feerecord'||from.name=='reportquery')){
//         let isRefresh=sessionStorage.get('isRefresh');
//         console.log('isRefresh:'+isRefresh);
//         if(isRefresh=='0'){
//             sessionStorage.setItem('isRefresh',null);
//             window.location.reload();
//         }else{
//             sessionStorage.set('isRefresh',0);
//         }
//     }else if((from.name=='feerecord'||from.name=='reportquery')&&(to.name=='home'||from.name=='my')){
//         sessionStorage.set('isRefresh',0);
//     }
// };

if ('addEventListener' in document && 'ontouchstart' in window) {
    FastClick.prototype.focus = function (targetElement) {
        targetElement.focus()
    }
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body)
    }, false)
}

Vue.config.productionTip = false;

const BASE_URL = '/api/biz';
axios.defaults.baseURL = BASE_URL;



axios.interceptors.request.use(function (config) {
    let url = config.url;
    // 如果是登陆
    if (localStorage.getItem("token7")) {
        config.headers.TOKEN = localStorage.getItem("token7");
        config.headers.UUID = localStorage.getItem("UUID7");
    } else {
        if (url.indexOf("/appLogin/login") > -1 || (url.indexOf("appLoginlogin") > -1)) {
            config.headers.TOKEN = "";
        } else {
            config.headers.TOKEN = "edd169b85704410aa5219512cb6f1f00";
            config.headers.UUID = "AAA";
        };
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
        // console.log(res)
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
