<template>
   <div :class="{'outCarint':true,'margin45':isWeixin}">
      <Header post-title="选择科室" v-show="isWeixin"></Header>
      
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
      document.title = '选择科室';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
         return true;
      } else {
         this.isWeixin = true;
         return false;
      }
   },
   methods: {

   },
   computed: {

   },

};
</script>
 <style scoped>
</style>