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
body {
  background: #f8f8f8;
}
.flatCard {
  background-color: #fff;
  position: relative;
  width: 100%;
  /*padding: 6px 30px;*/
  margin-top: 12px;
}
.flatCard:first-child{
  border-top: 2px solid #e9e9e9;
}

.cardText {
  font-size: 28px;
  color: #333333;
  padding: 14px 30px;
}
.margin11 {
  margin-top: -22px;
  border-top: 2px solid #e9e9e9;
}
.margin50 {
  margin-top: 100px;
}
.margin55{
  margin-top: 110px;
}
.margin5 {
  margin-top: 10px;
}
.margin0{
  margin-top: 0;
}
.md-detail-title{
  color: #333333 !important;
}
.md-detail-content{
  color: #979797 !important;
}


/*收银台*/
.md-example-child-cashier .md-field{
  margin-bottom :30px
}
.md-cashier-channel-item .item-icon, .md-cashier-channel-item .item-image{
  width: 50px !important;
  height: 50px !important;
}
.md-cashier-channel-item .cashier-icon-2{
  background :url(./assets/images/icon_alipay.png) center no-repeat;
  background-size: 50px
}
.md-cashier-channel-item .cashier-icon-3{
  background :url(./assets/images/icon_wechatpay.png) center no-repeat;
  background-size: 50px
}
.md-cashier-channel-item{
  background-color: transparent !important;
}
.md-cashier-block-btn .md-button{
  border-radius: 60px !important;
  font-size: 30px !important;
}
.md-popup-title-bar .title-bar-title p.title{
  font-size: 32px !important;
}
.md-cashier-channel .choose-text{
  padding: 46px 0px 10px!important;
}
.md-cashier-channel .choose-channel{
  padding: 16px 60px 36px 60px !important;
}
.md-button-content{
  font-size: 28px;
}
.primary:after{
  border : transparent !important;
}
.md-cashier-channel-item .item-label{
  margin-left: 20px !important;
}
.md-cashier-channel-item .item-check-icon{
  line-height: 68px !important;
}
.md-cashier-channel-item .item-label .title{
  font-size: 28px !important;
  line-height: 48px !important;
}
/*cellitem列表*/
.md-cell-item-body{
  padding: 32px 24px;
}

/*文字两端对齐*/

 .parElem,.md-detail-item{
  text-align: justify;
}
.md-detail-item{
  line-height: 18px!important;
}
.parElem:first-child{
  padding-top: 10px;
} .parElem .sonElem,/*:first-child,*/
.md-detail-item div:first-child{
  width: 17%;
  display: inline-table;
  color: #333333;
}
.parElem .sonElem:after,/*:first-child*/
.md-detail-item div:first-child:after {
  content: "";
  display: inline-block;
  width: 100%;
  /*position: absolute;*/
}
/*医生职称边框*/
.headname .levle {
  padding: 4px 10px;
  font-size: 22px;
  color: #1da1f3;
  border: 1px solid #1da1f3;
  border-radius: 8px;
  position: relative;
  top: 6px;
  margin-left: 10px;
  vertical-align: text-top;
}
.docLevel{
  border: 2px solid #1da1f3;
  color: #1da1f3;
  padding: 4px 10px;
  border-radius: 8px;
}
.payatnow {
  height: 60px;
  text-align: right;
  margin-top: 14px;
}
.payatnow span {
  font-size: 28px;
  color: #ffffff;
  background: #1da1f3;
  border-radius: 40px;
  letter-spacing: 1px;
  padding: 15px 40px;
  text-align: center;
}
/*input-placeholder颜色*/

input::-webkit-input-placeholder {
  color: #D0DAE1;
}
input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #D0DAE1;
}
input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #D0DAE1;
}
input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #D0DAE1;
}















.warnText {
  font-size: 26px;
  color: #979797;
}
.warnText p {
  padding: 4px 0;
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
  border: 4px solid #1da1f3;
  width: 110%;
  border-radius: 50%;
}
.md-cashier .md-cashier-container .md-cashier-block .md-cashier-block-text,
.md-popup-title-bar .title-bar-title p.title {
  color: #333333 !important;
}
.add {
  background-color: #1da1f3;
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
  width: 92px;
  height: 92px;
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
  color: #979797;
  font-size: 26px;
  line-height: 70px;
}
.card + .noMore {
  line-height: 40px;
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
.aligncenter {
  text-align: center;
  color: dimgray;
}
.colo13 {
  font-size: 26px;
  color: #979797;
}
.margin16 {
  margin: 0 0 32px 0;
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
  padding: 0 24px;
}
.appTitle {
  padding: 24px 30px;
  border-bottom: 2px solid #ededed;
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
  color: #979797;
}

/**add*/
.add {
  background-color: #1da1f3;
  width: 100%;
  text-align: center;
  color: #ffffff;
  position: fixed;
  line-height: 100px;
  bottom: 0;
}
/**大大大大的**/
.methodTabAcitive {
  color: #1da1f3;
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
  color: #979797;
}
.md-switch.active {
  background-color: #1da1f3 !important;
  margin-left: 6px;
}
.md-switch {
  margin-left: 6px;
}
/* .md-icon.icon-font.md {
  font-size: 46px !important;
} */
.primary,
.default {
  background-color: #1da1f3;
  color: #fff;
  font-size: 28px;
}
/*.primary:after {*/
  /*border: 1px solid #1da1f3 !important;*/
/*}*/
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
  padding-bottom: 20px;
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
.md-dialog .md-dialog-text{
  font-size: 30px;
}
.md-dialog-btn:first-child{
  font-size: 34px;
}
.md-dialog-btn:last-child{
  color: #1da1f3 !important;
  font-size: 34px;
}
.md-check-box {
  border: 2px solid #979797;
}
.md-agree-icon .md-agree-icon-container .md-icon.md-icon-check {
  color: #1da1f3 !important;
}
.md-agree-icon.checked .md-agree-icon-container .md-icon-checked {
  -webkit-transform: scale(1);
  transform: scale(1);
  color: #1da1f3 !important;
}
.bigFont {
  color: #1da1f3;
  font-size: 44px;
  margin: 0 6px;
  vertical-align: sub;
}

.md-field-item-title {
  font-size: 28px !important;
}

/* .md-field-item-control::-webkit-input-placeholder {
  color: #aab2bd;
  font-size: 12px;
  text-align: right;
} */
.md-input-item-input {
  font-size: 28px !important;
}
.md-check-box {
  font-size: 28px !important;
}
.textCenter .md-icon.icon-svg.lg {
  margin: -8px 0;
}
 .home .md-icon.icon-font:before {
  display: none;
}
</style>
