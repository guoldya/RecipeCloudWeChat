<template>

  <div style=" text-align: center;">
    <input class="oc_val" placeholder="搜索医生、科室" value="" type="text" @click="searchT()" />
  </div>
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
    searchT: function () {
      // let argu = { selected3: this.selected3 };
      this.$router.push({
        name: 'result',
        // query: argu,
      });
    },


  },
}
</script>
<style>
input {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font-weight: normal;
  vertical-align: baseline;
}
.oc_val {
  /* position: fixed; */
  width: 95%;
  height: 90px;
  border-radius: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-left: 70px;
  background: #f0f3fa url(./search.png) 3% 50% no-repeat !important;
  background-size: auto 50% !important;
  opacity: 1;
  outline: none;
  font-size: 26px !important;
  color: #000;
  z-index: 999;
}
</style>
