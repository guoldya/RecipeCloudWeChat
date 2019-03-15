<template>
   <div class="inhospital">
      <Header post-title="一日清单"></Header>
      <div>

      </div>
   </div>
</template>
<script type="text/babel">
export default {
   data() {
      return {

      };
   },
   created() {
   },
   mounted() {
      document.title = '一日清单';
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