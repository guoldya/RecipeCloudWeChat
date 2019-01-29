<template>
   <div :class="{'outCarint':true,'margin45':isWeixin}">
      <Header post-title="注册电子就诊卡" v-show="isWeixin"></Header>
      <md-steps :steps="steps" :current="currentStep" transition>
      </md-steps>
   </div>
</template>
<script type="text/babel">
export default {
   data() {
      return {
         isWeixin: false,
         steps: [
            {
               name: '手机验证',
            },
            {
               name: '身份验证',
            },
            {
               name: '资料确认',
            },
         ],
         currentStep: 0,
      };
   },
   created() {

   },
   mounted() {
      document.title = '注册电子就诊卡';
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