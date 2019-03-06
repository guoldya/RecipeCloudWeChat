<template>
  <header class="aui-navBar aui-navBar-fixed">
    <a href="javascript:;" class="aui-navBar-item" @click="$router.go(-1)">
      <img src="@/assets/images/icon_back.png">
    </a>
    <div class="aui-center">
      <span class="aui-center-title">{{postTitle}}</span>
    </div>
    <a href="javascript:;" class="aui-navBar-item" @click="select">
       <!--{{selectOption}} -->

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
  props: ['postTitle','selectOption'],
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

<style scoped>
@import "./header.css";
</style>
