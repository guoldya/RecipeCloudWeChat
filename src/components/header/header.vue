<template>
  <header class="aui-navBar aui-navBar-fixed">
    <a href="javascript:;" class="aui-navBar-item" @click="$router.go(-1)">
      <img src="@/assets/images/icon_back.png">
    </a>
    <div class="aui-center">
      <span class="aui-center-title">{{postTitle}}</span>
    </div>
    <a href="javascript:;" class="aui-navBar-item" >
       <!--{{selectOption}} -->

    </a>
  </header>
</template>
<script>

export default {
  data() {
    return {

    }
  },
  props: ['postTitle'],
  created() {

  },
  mounted() {


  },
  methods: {

  },
}
</script>

<style scoped>
@import "./header.css";
</style>
