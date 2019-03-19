<template>
   <div class="outCarint margin45">
      <Header post-title="电子就诊卡需知"></Header>
      <p>XXXXX医院推出电子就诊卡，实现全流程无卡就医。解决忘记带卡、多卡、丢卡难题，提升患者就医体验，方便快捷。电子就诊卡使用规则如下：</p>

      <p>1、每位微信用户可以注册电子就诊卡最多5张；</p>

      <p>2、电子就诊卡须上传身份证实名认证；</p>

      <p>3、电子就诊卡注册成功后，无需再去现场领取实体卡；</p>

      <p>4、电子就诊卡可用于医院的全流程就医，只需要出示二维码扫描即可。</p>

      <p>5、电子就诊卡绑定3个月以上可解绑一次。</p>

      <p>如有疑问请致电：
         <span class="mu-secondary-text-color">023-66668888</span>
      </p>

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
      document.title = '电子就诊卡需知';
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