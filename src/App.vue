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
  created() {

    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      //this.$store.replaceState()替换 store 的根状态
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
    }
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style  >
:root {
  /* 主题色 */
  --primary: #1da1f3;
  /* 内容字体颜色 5A5A5A*/
  --primary--content: #979797;
  --primary--right: #979797;
  /* 题目字体颜色 */
  --primary--title: #272727;
  /* 线颜色 */
  --primary--line: #ededed;
  /* 背景色 */
  --primary--body: #f8f8f8;
  /*灰色背景*/
  --primary--light: #cccbcb;
}
.payMoney {
  font-size: 50px;
}
/*冒号左边文字*/
.colon-left {
  width: 17%;
  text-align: right;
}
/*冒号右边文字颜色*/
.colon-right {
  color: var(--primary--content);
}
.dis-flex {
  display: flex;
  justify-content: space-between;
}
body {
  background: var(--primary--body);
}

.flatCard {
  background-color: #fff;
  position: relative;
  width: 100%;
  /*padding: 6px 30px;*/
  margin-top: 12px;
}
.flatCard:first-child {
  /* border-top: 2px solid #e9e9e9; */
}
input {
  background: #ffffff !important;
}
.bottomback {
  display: flex;
  justify-content: space-between;
  margin: 24px;
}

.nullTEXT {
  font-size: 26px;
  line-height: 100px;
  color: #a7a7a7;
}
.bottomback span {
  border-radius: 60px;
  height: 86px;
  line-height: 86px;
  width: 46%;
  text-align: center;
}
.bottomback .cancle {
  background-color: #ffffff;
  color: var(--primary);
  border: 1px solid var(--primary);
}

.bottomback .mainBtn {
  background: var(--primary);
  color: #ffffff;
}
.cardText {
  font-size: 28px;
  color: var(--primary--title);
  padding: 14px 30px;
}
.margin11 {
  margin-top: -22px;
  border-top: 2px solid #e9e9e9;
}
.margin50 {
  margin-top: 100px;
}
.margin55 {
  margin-top: 110px;
}
.margin55 {
  margin-top: 110px;
}
.margin5 {
  margin-top: 10px;
}
.md-detail-title {
  color: var(--primary--title) !important;
}
.md-detail-content {
  color: var(--primary--right) !important;
}

/*收银台*/
.md-example-child-cashier .md-field {
  margin-bottom: 30px;
}
.md-cashier-channel-item .item-icon,
.md-cashier-channel-item .item-image {
  width: 50px !important;
  height: 50px !important;
}
.md-cashier-channel-item .cashier-icon-2 {
  background: url(./assets/images/icon_alipay.png) center no-repeat;
  background-size: 50px;
}
.md-cashier-channel-item .cashier-icon-3 {
  background: url(./assets/images/icon_wechatpay.png) center no-repeat;
  background-size: 50px;
}
.md-cashier-channel-item {
  background-color: transparent !important;
}
.md-cashier-block-btn .md-button {
  border-radius: 60px !important;
  font-size: 30px !important;
}
.md-popup-title-bar .title-bar-title p.title {
  font-size: 32px !important;
}
.md-cashier-channel .choose-text {
  padding: 46px 0px 10px !important;
}
.md-cashier-channel .choose-channel {
  padding: 16px 60px 36px 60px !important;
}
.md-button-content {
  font-size: 28px;
}
.primary:after {
  border: transparent !important;
}
.md-cashier-channel-item .item-label {
  margin-left: 20px !important;
}
.md-cashier-channel-item .item-check-icon {
  line-height: 68px !important;
}
.md-cashier-channel-item .item-label .title {
  font-size: 28px !important;
  line-height: 48px !important;
}
/*cellitem列表*/
.md-cell-item-body {
  padding: 32px 24px;
}

/*文字两端对齐*/
.md-detail-item {
  text-align: justify;
}
.md-detail-item {
  line-height: 40px !important;
}
/*冒号左侧靠右*/
.listData {
  font-size: 28px;
  display: flex;
  justify-content: space-between;
}

.listData span {
  padding: 12px 0px;
}
.parElem span:nth-child(2) {
  /*width: 78%;*/
  /*!*text-align: right;*!*/
  /*text-align: justify;*/
  text-align: justify;
  color: var(--primary--right);
}
.parElem .sonElem {
  color: var(--primary--title);
  display: flex;
  align-items: center;
  /* width: 50%; */
  margin-right: 28px;
}
.gButton {
  background-color: var(--primary--content);
  width: 60%;
}
.page-search--cancel {
  display: inline-block;
  height: 80px;
  line-height: 80px;
}
.bButton {
  background-color: var(--primary);
  width: 40%;
}
/*医生职称边框*/
.headname .levle {
  font-size: 22px;
  border: 2px solid rgb(29, 161, 243);
  border-radius: 8px;
  color: rgb(29, 161, 243);
  margin-left: 10px;
  display: inline-block;
  height: 44px;
  padding: 4px 12px;
  line-height: 36px;
  position: relative;
  top: -2px;
}
.docLevel {
  border: 2px solid var(--primary);
  color: var(--primary);
  padding: 4px 10px;
  border-radius: 8px;
}
.payatnow {
  text-align: right;
  margin-top: 30px;
  height: 60px;
}
.payatnow span {
  font-size: 28px;
  color: #ffffff;
  background: var(--primary);
  border-radius: 40px;
  letter-spacing: 1px;
  padding: 10px 40px;
  text-align: center;
}
/*input-placeholder颜色*/

input::-webkit-input-placeholder {
  color: #d0dae1;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #d0dae1;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #d0dae1;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #d0dae1;
}

/*提示文字*/
.warnText {
  font-size: 26px;
  color: var(--primary--content);
  padding: 24px;
}
.colopor {
  color: var(--primary--content);
}
.warnText p {
  padding: 4px 0;
  line-height: 36px;
}
#app .md-field-item-right {
  color: var(--primary--right);
}
#app .md-input-item-input {
  text-align: right !important;
}
.md-field {
  padding: 0px !important;
}

.md-activity-indicator-rolling .rolling circle.stroke {
  fill: #ffffff;
}
.md-cashier .md-cashier-container .md-cashier-block .md-cashier-block-btn {
  padding: 0 24px 24px;
}
.md-activity-indicator-rolling .content {
  background-color: #ffffff;
  width: 80px;
  margin: 10px;
  border-radius: 50%;
  box-shadow: 0 0 17px #ffffff;
}
.md-cashier .md-cashier-container .md-cashier-block .md-cashier-block-text {
  margin-bottom: 102px !important;
  font-size: 28px !important;
}
.md-activity-indicator-rolling-success .right {
  background-color: #ffffff;
  border: 4px solid var(--primary);
  width: 110%;
  border-radius: 50%;
}
.md-cashier .md-cashier-container .md-cashier-block .md-cashier-block-text,
.md-popup-title-bar .title-bar-title p.title {
  color: var(--primary--title) !important;
}
.addbTN {
  background-color: var(--primary);
  width: 100%;
  text-align: center;
  color: #ffffff;
  position: fixed;
  left: 0;
  line-height: 100px;
  bottom: 0;
  z-index: 999;
}

.headimg {
  width: 108px;
  height: 108px;
  border-radius: 50%;
  float: left;
  text-align: center;
  margin-right: 20px;
  /*margin: 20px 20px 0 0;*/
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

.noMore {
  text-align: center;
  color: var(--primary--content);
  font-size: 24px;
  line-height: 70px;
}
.card + .noMore {
  line-height: 40px;
}
#app {
  font-family: "PingFang-SC-Medium";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--primary--title);
  font-size: 28px;
  max-width: 777px;
  margin: 0 auto;
}
.md-button.primary {
  background: var(--primary) !important;
}
.md-radio.is-checked .md-radio-icon {
  color: var(--primary) !important;
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
.aligncenter {
  text-align: center;
  color: dimgray;
}
.colo13 {
  font-size: 26px;
  color: var(--primary--content);
}
.margin16 {
  margin: 0 0 32px 0;
}
.margin0 {
  margin-top: 0;
}
.margin7 {
  margin-top: 14px;
}
.margin14 {
  margin-top: 28px;
}
.margin120 {
  margin-top: 120px;
}
.outCarint {
  padding: 0 30px;
}
.appTitle {
  padding: 24px 30px;
  border-bottom: 2px solid var(--primary--line);
  display: flex;
  justify-content: space-between;
}
.appTitle span:first-child {
  font-size: 30px;
}
/* 轮播图样式 */ /* 全局样式 */
.swiper-container {
  margin-top: 100px;
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
  box-shadow: 0 0 20px rgba(20, 19, 51, 0.1);
  text-align: center;
  overflow: hidden;
  border-radius: 20px;
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
.margin100 {
  margin-top: 100px;
}
.lookmore {
  padding: 14px 24px;
  display: flex;
  justify-content: space-between;
  font-size: 26px;
  color: var(--primary--content);
  border-top: 1px solid #e5e5e5;
  line-height: 50px;
}
.lookmore img {
  width: 12px;
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
.swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  position: relative;
  top: 10px;
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
  box-shadow: 0 0 17px rgba(20, 19, 51, 0.1);
  background-color: #fff;
  position: relative;
  border-radius: 20px;
  width: 100%;
  margin: 0px auto;
  padding: 6px 30px;
}
.mu-light-text-color {
  color: var(--primary--right);
}

/**add*/

/**大大大大的**/
.methodTabAcitive {
  color: var(--primary);
}
.partLine {
  border-bottom: 2px solid #e9e9e9;
  width: 100%;
  margin: 12px 0px;
}
.payfee .md-field-item-content {
  -webkit-box-align: inherit !important;
  -webkit-align-items: inherit !important;
  align-items: inherit !important;
}
textarea {
  border: none;
  font-size: 28px;
  outline: none;
  font-family: "PingFang-SC-Medium";
  text-align: justify;
}
textarea::-webkit-input-placeholder {
  /*WebKit browsers*/
  color: var(--primary--content);
}
.md-switch.active {
  background-color: var(--primary) !important;
  margin-left: 6px;
}
.md-switch {
  margin-left: 6px;
}
/* .md-icon.icon-font.md {
  font-size: 46px !important;
} */
.primary {
  background-color: var(--primary);
  color: #fff;
  font-size: 28px;
}
.default {
  background-color: #43484b;
}
.divHeight {
  width: 100%;
  height: 20px;
  background: #f0f3fa;
}
.default:after {
  border: 1px solid #43484b !important;
}
.textCenter {
  text-align: center;
  /*padding-bottom: 20px;*/
  padding: 20px 0;
}
.nullDiv {
  text-align: center;
}
.nullDiv img {
  width: 50%;
  margin-top: 150px;
}
.md-button-content {
  font-size: 28px !important;
}
.md-dialog .md-dialog-text {
  font-size: 30px;
}
.md-dialog-btn:first-child {
  font-size: 34px;
}
.md-dialog-btn:last-child {
  color: var(--primary) !important;
  font-size: 34px;
}
.md-check-box {
  border: 2px solid var(--primary--content);
}
.md-agree-icon .md-agree-icon-container .md-icon.md-icon-check {
  color: var(--primary) !important;
}
.md-agree-icon.checked .md-agree-icon-container .md-icon-checked {
  -webkit-transform: scale(1);
  transform: scale(1);
  color: var(--primary) !important;
}
.bigFont {
  color: var(--primary);
  font-size: 44px;
  margin: 0 6px;
  vertical-align: sub;
}
.md-input-item-input,
.md-field-item-title,
.md-check-box {
  font-size: 28px !important;
}
.textCenter .md-icon.icon-svg.lg {
  margin: -8px 0;
}
.home .md-icon.icon-font:before {
  display: none;
}
.md-cell-item-content .md-cell-item-brief {
  overflow: hidden !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  /* autoprefixer: off */
  -webkit-box-orient: vertical;
  /* autoprefixer: on */
}
.md-landscape .md-icon.md-landscape-close {
  display: none !important;
}
</style>
