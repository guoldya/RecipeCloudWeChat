<template>
  <div class="search">
    <input class="oc_val" :placeholder="postPlaceholder" value="" type="text" @click="searchT()" />
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
  props: ['postPlaceholder', 'type'],
  mounted() {

  },
  methods: {
    searchT: function () {
        console.log(this.type);
      if (this.type == "onlines") {
        this.$router.push({
          path: "/resultDoctor"
        });
      } else if (this.type == "choosehospital") {
        this.$store.commit("searchTypeFun", this.type);
        this.$router.push({
          path: "/hospitalsearch"
        });
      } else {
        this.$store.commit("searchTypeFun", this.type);
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
.search {
  padding: 0 24px 16px;
  background: #ffffff;
  text-align: center;
}
.search .oc_val {
  /* position: fixed; */
  width: 100%;
  /* height: 75px; */
  border-radius: 10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  padding-left: 70px;
  background: #f0f3fa url(./search.png) 3% 50% no-repeat !important;
  background-size: auto 40% !important;
  opacity: 1;
  outline: none;
  font-size: 28px !important;
  color: #000;
  z-index: 999;
  border-radius: 5px;
}
</style>
