<template>
  <header class="aui-navBar aui-navBar-fixed">
    <a href="javascript:;" class="aui-navBar-item" @click="$router.go(-1)">
      <img src="./icon_back.png">
    </a>
    <div class="aui-center">
      <span class="aui-center-title">{{postTitle}}</span>
    </div>
    <a href="javascript:;" class="aui-navBar-item" @click="select">

    </a>
  </header>
</template>
<script>
import Vue from 'vue';
export default {
  data() {
    return {
      selected: null,
      num: 0,
    }
  },
  props: ['postTitle'],
  created() {

  },
  mounted() {
    

  },
  methods: {
    back() {
      Toast('提示信息');
    },
    select() {
      if (this.selected == 1) {
        this.selected = 2;
      } else {
        this.selected = 1;

      }

    },

  },
}
</script>

<style>
.aui-navBar {
  height: 50px;
  position: fixed;
  display: flex;
  z-index: 9999;
}
header {
  background: #e2e2e2;
  z-index: 9999;
}
.divHeight {
  width: 100%;
  height: 10px;
  background: #f0f3fa;
}

.aui-navBar:after {
  content: "";
  position: absolute;
  z-index: 2;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
}

.aui-navBar-item {
  height: 50px;
  min-width: 25%;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 25%;
  -ms-flex: 0 0 25%;
  flex: 0 0 25%;
  padding: 0 12px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  color: #333333;
}

.aui-navBar-item:first-child {
  -webkit-box-ordinal-group: 2;
  -webkit-order: 1;
  -ms-flex-order: 1;
  order: 1;
  margin-right: -25%;
}

.aui-navBar-item:last-child {
  -webkit-box-ordinal-group: 4;
  -webkit-order: 3;
  -ms-flex-order: 3;
  order: 3;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}

.aui-navBar-item img {
  width: 13px;
  height: 23px;
}

.aui-center {
  -webkit-box-ordinal-group: 3;
  -webkit-order: 2;
  -ms-flex-order: 2;
  order: 2;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  height: 50px;
  width: 50%;
  margin-left: 25%;
}

.aui-center-title {
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  font-size: 16px;
  color: #333333;
}
a {
  text-decoration: none;
  color: #2c2c2c;
}

header {
  display: flex;
  width: 100%;
  height: 50px;
  text-align: center;
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 19;
  background: #fff;
  /* border-bottom: 1px solid #c0c0c0; */
  box-sizing: border-box;
  z-index: 9999;
}
.headin {
  margin: 12px;
  width: 100%;
}
.addValue {
  font-size: 15px;
  color: #333333;
  font-family: "PingFang-SC-Medium";
}
.back,
.share {
  width: 1.375rem;
  height: 1.1875rem;
  line-height: 2.25rem;
}
.back img,
.share img {
  width: 100%;
  height: 100%;
}
.fleft {
  float: left;
}
.fright {
  float: right;
}
.title {
  width: 70px;
  margin: 0 auto;
  text-align: center;
  color: #2c2c2c;
}
.title h1 {
  font-size: 16px;
  padding: 0;
  float: left;
  font-weight: 400;
  line-height: 1px;
  font-family: "PingFang-SC-Medium";
}
</style>
