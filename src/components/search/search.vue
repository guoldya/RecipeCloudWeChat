<template>
  <div class="search" style=" text-align: center;">
    <input
      class="oc_val"
      placeholder="搜索医生、科室"
      value=""
      type="text"
      @click="searchT()"
    />
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {
      selected: null,
      num: 0
    };
  },
  props: ["type"],
  methods: {

    searchT: function() {
      if (this.type == "onlines") {
        this.$router.push({
          path: "/resultDoctor"
        });
      } else {
        this.$store.commit("searchTypeFun",this.type);
        this.$router.push({
          path: "/result"
          // query: argu,
        });
      }
    }
  }
};
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
.search .oc_val {
  /* position: fixed; */
  width: 100%;
  height: 80px;
  border-radius: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-left: 70px;
  background: #f0f3fa url(./search.png) 3% 50% no-repeat !important;
  background-size: auto 40% !important;
  opacity: 1;
  outline: none;
  font-size: 30px !important;
  color: #000;
  z-index: 999;
}
</style>
