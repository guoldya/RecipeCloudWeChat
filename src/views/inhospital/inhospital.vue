<template>
   <div :class="{'outCarint':true,'margin45':isWeixin}">
      <Header post-title="住院服务" v-show="isWeixin"></Header>
      
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
</style>