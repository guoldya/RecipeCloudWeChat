import Vue from 'vue'
import App from './App.vue'
import * as mandMobile from 'mand-mobile'
import 'mand-mobile/lib/mand-mobile.css'
import axios from 'axios';
import Config from './config/config';
import store from './store/store';
import FastClick from 'fastclick'
import Header from './components/header/header.vue';
import Navigation from '@/components/Navigation'
import Timefilter from '@/components/timefilter'
 
import Apptab from './components/apptab/apptab.vue';
import Null from './components/null';
import Search from './components/search/search.vue';
import Address from './components/address/address.vue';
import Footer from './components/footer/footer.vue';
import Loading from './components/loading/loading.vue';
import meQrcode from "./components/meQrcode/meQrcode.vue";
import Homesk from './components/homesk';
import Recordcard from './components/recordcard';
import infiniteScroll from 'vue-infinite-scroll';
import filters from './filter/filter';
import router from './router'
 
 

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



 

Vue.component('Header', Header);
Vue.component('Navigation', Navigation);
Vue.component('Timefilter', Timefilter);
 
Vue.component('Homesk', Homesk);
Vue.component('Recordcard', Recordcard);
Vue.component('meQrcode', meQrcode);

 

Vue.component('Search', Search);
Vue.component('Apptab', Apptab)
Vue.component('Null', Null)
Vue.component('Loading', Loading);
 
Vue.component('Footer', Footer);
Vue.component('Address', Address);
 
Vue.config.productionTip = false;
Vue.use(infiniteScroll);
 

 
import Vconsole from 'vconsole';
const vConsole = new Vconsole();
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
    if (sessionStorage.getItem("token7")) {
        // 李航的
        config.headers.TOKEN = "36cd8f9fe09a4c81a451498e7bd1074e";
        //开发用的token
        //config.headers.TOKEN = "edd169b85704410aa5219512cb6f1f00";
        config.headers.UUID = "AAA";
    } else {
        if (url.indexOf("/appLogin/login") > -1 || (url.indexOf("appLoginlogin") > -1)) {
            config.headers.TOKEN = "36cd8f9fe09a4c81a451498e7bd1074e";
        } else {
            // config.headers.TOKEN = "edd169b85704410aa5219512cb6f1f00";
            config.headers.TOKEN = "36cd8f9fe09a4c81a451498e7bd1074e";
            config.headers.UUID = "AAA";
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
//         config.headers.TOKEN = sessionStorage.getItem("token7");
//     } else {
//         // if (url.indexOf("/appLogin/login") > -1 || (url.indexOf("appLoginlogin") > -1)) {
//         //     config.headers.TOKEN = "";
//         // } else {
//         //     config.headers.TOKEN = "";
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
