import Vue from 'vue'
import App from './App.vue'
import * as mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'
import axios from 'axios';
import Config from './config/config';
import store from './store/store';
import FastClick from 'fastclick'
import Header from './components/header/header.vue';
import Headerwhite from './components/headerwhite/headerwhite.vue';
import Headerapp from './components/headerapp/headerapp.vue';
import Navigation from '@/components/Navigation';
import Apptab from './components/apptab/apptab.vue';
import Null from './components/null';
import ValuationCard from './components/valuationCard/valuationCard.vue';
import Search from './components/search/search.vue';
import Address from './components/address/address.vue';
import Footer from './components/footer/footer.vue';
import Loading from './components/loading/loading.vue';
import meQrcode from "./components/meQrcode/meQrcode.vue";
import Homesk from './components/homesk';
import Skeleton from './Skeleton';
import Recordcard from './components/recordcard';
import infiniteScroll from 'vue-infinite-scroll';
import filters from './filter/filter';
import router from './router'
import Timefilter from '@/components/timefilter'




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




Vue.component('Skeleton', Skeleton);
Vue.component('Header', Header);
Vue.component('Headerapp', Headerapp);
Vue.component('Headerwhite', Headerwhite);
Vue.component('Navigation', Navigation);
Vue.component('Timefilter', Timefilter);

Vue.component('Homesk', Homesk);
Vue.component('Recordcard', Recordcard);
Vue.component('meQrcode', meQrcode);



Vue.component('Search', Search);
Vue.component('Apptab', Apptab);
Vue.component('Null', Null);
Vue.component('ValuationCard', ValuationCard);
Vue.component('Loading', Loading);

Vue.component('Footer', Footer);
Vue.component('Address', Address);

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
//   const BASE_URL = '/api/hos';
 
// axios.defaults.baseURL = BASE_URL;


axios.interceptors.request.use(function (config) {
    let url = config.url;
    // 如果是登陆
    if (localStorage.getItem("token7")) {
        // config.headers.TOKEN = localStorage.getItem("token7");
        // config.headers.UUID = localStorage.getItem("UUID7");
        config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJhY2NvdW50XCI6XCJhZG1pblwiLFwiaWRcIjowLFwibmFtZVwiOlwi6LaF57qn566h55CG5ZGYXCIsXCJwYXNzd29yZFwiOlwiaS9zVjJWcFRQeTdZK3BwZXNta0NtTT09XCJ9IiwianRpIjoiZGM5Y2Y5NjItZTA5Ni00YzhmLTkxZjgtYTViYjZjZjhjMjAzIiwiaWF0IjoxNTYxMDg1MTE3LCJleHAiOjE1NjM2NzcxMTd9.Al41PuH1fe3pRD_Tv0lclawCGZRFR0qESClra3bGSEA";
    } else {
        if (url.indexOf("/appLogin/login") > -1 || (url.indexOf("appLoginlogin") > -1)) {
            config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJhY2NvdW50XCI6XCJhZG1pblwiLFwiaWRcIjowLFwibmFtZVwiOlwi6LaF57qn566h55CG5ZGYXCIsXCJwYXNzd29yZFwiOlwiaS9zVjJWcFRQeTdZK3BwZXNta0NtTT09XCJ9IiwianRpIjoiZGM5Y2Y5NjItZTA5Ni00YzhmLTkxZjgtYTViYjZjZjhjMjAzIiwiaWF0IjoxNTYxMDg1MTE3LCJleHAiOjE1NjM2NzcxMTd9.Al41PuH1fe3pRD_Tv0lclawCGZRFR0qESClra3bGSEA";
        } else {
            config.headers.Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ7XCJhY2NvdW50XCI6XCJhZG1pblwiLFwiaWRcIjowLFwibmFtZVwiOlwi6LaF57qn566h55CG5ZGYXCIsXCJwYXNzd29yZFwiOlwiaS9zVjJWcFRQeTdZK3BwZXNta0NtTT09XCJ9IiwianRpIjoiZGM5Y2Y5NjItZTA5Ni00YzhmLTkxZjgtYTViYjZjZjhjMjAzIiwiaWF0IjoxNTYxMDg1MTE3LCJleHAiOjE1NjM2NzcxMTd9.Al41PuH1fe3pRD_Tv0lclawCGZRFR0qESClra3bGSEA";
        };
    }
    return config;
}, function (err) {
    return Promise.reject(err);
});
// 南川要用的
// axios.interceptors.request.use(function (config) {
//     let url = config.url;
//     // 如果是登陆
//     if (sessionStorage.getItem("token7")) {
//         console.log(sessionStorage.getItem("token7"), "南川要用的sss")
//         config.headers.Authorization = sessionStorage.getItem("token7");
//     } else {
//         // if (url.indexOf("/appLogin/login") > -1 || (url.indexOf("appLoginlogin") > -1)) {
//         //     config.headers.Authorization = "";
//         // } else {
//         //     config.headers.Authorization = "";
//         // };
//     }
//     return config;
// }, function (err) {
//     return Promise.reject(err);
// });

// 添加一个响应拦截器
axios.interceptors.response.use(function (res) {
    // console.log(res, "总配置")
    if (res.data.code == 401 && res.data.msg && res.data.msg.indexOf('未登录') || (res.data.code == 402) || (res.data.code == 800)) {
        // 未登录操作npm
        // router.replace('/login?back=1');
        // console.log(res)
        // router.replace('/control');
    } else if (res.data.code == 500) {
        // setTimeout(() => {
        //     // router.replace('/lostpage');
        // }, 5000)
    } else if (res.data.code == 406) {
        var storage = window.sessionStorage;
        storage.setItem('token7', res.data.data.token);
        router.replace('/home')
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
