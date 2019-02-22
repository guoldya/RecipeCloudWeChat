<template>
   <div class="inhospital">
      <Header post-title="住院服务" v-show="isWeixin"></Header>
      <img src="@/assets/images/hospital.png" alt="" width="100%">
      <div class="inhospitalcontent">
         <img src="@/assets/images/hh1.png" alt="" width="94%">
         <img src="@/assets/images/hh2.png" alt="" width="94%">
         <img src="@/assets/images/hh3.png" alt="" width="94%">
      </div>

   </div>
</template>
<script type="text/babel">
export default {
   data() {
      return {
         isWeixin: false,

      };
   },
   created() {

   },
   mounted() {
      document.title = '住院服务';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
      } else {
         this.isWeixin = true;
      }
   },
   methods: {

   },
   computed: {

   },

};
</script>
 <style scoped>
@import url("./inhospital.css");
</style>