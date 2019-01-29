<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'app',
  components: {
    HelloWorld
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
#app {
  font-family: "PingFang-SC-Medium";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  font-size: 28px;
  max-width: 777px;
  margin: 0 auto;
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
  font-size: 32px;
}

.appTabAcitive {
  color: #1da1f3;
  border-bottom: 2px solid #1da1f3;
}
.partLine{
  border-bottom: 1px solid #c5c5c5;
  width: 100%;
  padding: 8px 0px;
  margin-bottom: 28px;
}
textarea{
  border: none;
  font-size: 28px;
  outline: none;
  font-family: "PingFang-SC-Medium";
}
textarea::-webkit-input-placeholder{ /*WebKit browsers*/
  color: #979797;
}
.md-switch.active{
  background-color: #1da1f3 !important;
  margin-left: 6px;
}
.md-switch{
  margin-left: 6px;
}
</style>
