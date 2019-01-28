<template>
   <div class="cardmy">
      <Header post-title="管理就诊卡" v-show="isWeixin"></Header>
      <div :class="{ 'margin45':isWeixin}">
         <div class="tiptop">
            <div class="tiptopwarn">
               <md-notice-bar>
                  <md-icon slot="left" class="md-notice-demo-icon md-notice-demo-icon-left" name="security"></md-icon>
                  您还可以绑定社保卡哦！
               </md-notice-bar>
               <!-- <span>您还可以绑定社保卡哦！</span> -->
               <span class="tiptopwarnbtn">
                  开通医保支付
               </span>
            </div>
         </div>
         <div class="tiptop2">
            <p class="tiptopwarn2">
               您还可以新建5张电子就诊卡
            </p>
         </div>
         <div class="tiptop3">
            <img src="@/assets/images/nocard.png" alt="">
            <md-button type="warning" size="small" inline>注册电子就诊卡</md-button>
         </div>
         <p class="warnbot">
            温馨提示：您累计可注册5张电子就诊卡，如已办理实体就诊卡，可在注册时进行绑定
            <span class="warnbottom">(电子就诊卡需知)</span>
         </p>
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
      document.title = '管理就诊卡';
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
      blidcard() {
         let argu = {}
         this.$router.push({
            name: 'blidcard',
            query: argu
         });
      },
   },
   computed: {

   },

};
</script>
 <style scoped>
@import url("./cardmy.css");
</style>