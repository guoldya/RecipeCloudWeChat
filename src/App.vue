<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
  },
  data() {
    return {
    }
  },
    created () {
             //在页面加载时读取sessionStorage里的状态信息
             if (sessionStorage.getItem("store") ) {
            //this.$store.replaceState()替换 store 的根状态
                     this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
                }
        //在页面刷新时将vuex里的信息保存到sessionStorage里
             window.addEventListener("beforeunload",()=>{
                     sessionStorage.setItem("store",JSON.stringify(this.$store.state))
                 })
    }
}
</script>

<style  >
.headimg {
  width: 92px;
  height: 92px;
  border-radius: 50%;
  float: left;
  text-align: center;
}
.headimg img {
  width: 100%;
  border-radius: 50%;
  height: 100%;
  text-align: center;
}
input,
button,
select,
textarea {
  outline: none;
}
body {
  background: #ffffff;
}
.noMore {
  text-align: center;
}
#app {
  font-family: "PingFang-SC-Medium";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  font-size: 28px;
  max-width: 777px;
  margin: 0 auto;
}
.md-button.primary {
  background: #1da1f3 !important;
}
.md-radio.is-checked .md-radio-icon {
  color: #1da1f3 !important;
}
a {
  text-decoration: none;
}
li {
  list-style: none;
}
p {
  word-wrap: break-word;
  word-break: break-all;
}
input::-webkit-input-placeholder {
  color: #c5cad5;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #c5cad5;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #c5cad5;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #c5cad5;
}
.aligncenter {
  text-align: center;
}
.colo13 {
  font-size: 26px;
  color: #979797;
}
.margin16 {
  margin: 32px 0;
}
.margin45 {
  margin-top: 110px;
}
.margin7 {
  margin-top: 14px;
}

.margin120 {
  margin-top: 120px;
}
.outCarint {
  padding: 0 24px;
}

/* 轮播图样式 */ /* 全局样式 */
.swiper-container {
  margin-top: 120px !important;
  padding-bottom: 30px;
}

.swiper-slide-next .wannianli-info,
.swiper-slide-prev .wannianli-info {
  height: 320px;
  margin-top: 10px;
}

.wannianli-info img {
  border-radius: 10px;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
}

.swiper-slide {
  width: 82%;
  padding: 0 2%;
}

.wannianli-info {
  height: 340px;
  background: #ffffff;
  /* box-shadow: 0 0 10px rgba(79, 94, 105, 0.301); */
  text-align: center;
  overflow: hidden;
  border-radius: 10px;
}
.swiper-container img {
  width: 100%;
  border-radius: 20px;
  height: 340px;
}
.wannianli-info > * {
  margin: 0;
  padding: 0;
  font-weight: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 1.5rem;
}

.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 0;
  left: 0;
  width: 100%;
}
.swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 0 2px;
}
.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: #efefef;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background: #f2cf30;
  width: 22px;
  height: 10px;
  display: inline-block;
  border-radius: 10px;
}

.card {
  box-shadow: 0 0 17px #c8dff7;
  background-color: #fff;
  position: relative;
  border-radius: 20px;
  width: 100%;
  margin: 0px auto;
  padding: 6px 30px;
}
.cardText {
  font-size: 28px;
  color: #333333;
}
.mu-light-text-color {
  color: #979797;
}
/**tab样式*/

.appTitle {
  padding: 32px;
  border-bottom: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
}
.appTab {
  display: flex;
  justify-content: space-between;
  padding: 32px 100px;
}
.appTab span {
  padding: 0 8px 8px;
  font-size: 28px;
}

.appTabAcitive {
  color: #1da1f3;
  border-bottom: 2px solid #1da1f3;
}
.methodTabAcitive {
  color: #1da1f3;
}
.partLine {
  border-bottom: 2px solid #e9e9e9;
  width: 100%;
  margin: 20px 0px;
}
textarea {
  border: none;
  font-size: 28px;
  outline: none;
  font-family: "PingFang-SC-Medium";
}
textarea::-webkit-input-placeholder {
  /*WebKit browsers*/
  color: #979797;
}
.md-switch.active {
  background-color: #1da1f3 !important;
  margin-left: 6px;
}
.md-switch {
  margin-left: 6px;
}
.md-icon.icon-font.md {
  font-size: 46px !important;
}
.primary,
.default {
  background-color: #1da1f3;
  color: #fff !important;
  font-size: 28px;
}
.primary:after {
  border: 1px solid #1da1f3 !important;
}
.default {
  background-color: #43484b;
}
.default:after {
  border: 1px solid #43484b !important;
}
.textCenter {
  text-align: center;
}
</style>
