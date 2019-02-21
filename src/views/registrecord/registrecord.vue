<template>
   <div :class="{'outCarint':true,'margin45':isWeixin}" class="registrecord">
      <Header post-title="挂号记录" v-show="isWeixin"></Header>
      <div class="demo-text margin16">
         <div class="card cardcc">
            <p class="appTitle">
               <span>西药费</span>
               <span class="mu-secondary-text-color">99元</span>
            </p>
            <div class="cordText">
               <p>患者：李华</p>
               <p>医院：演示医院</p>
               <p>开单时间：2019-12-05 12:30:00</p>
            </div>
         </div>
      </div>
      <div class="demo-text margin16">
         <div class="card cardcc">
            <p class="appTitle">
               <span>中药费</span>
               <span class="mu-secondary-text-color">99元</span>
            </p>
            <div class="cordText">
               <p>患者：李华</p>
               <p>医院：演示医院</p>
               <p>开单时间：2019-12-05 12:30:00</p>
            </div>
         </div>
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
      document.title = '挂号记录';
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
    .registrecord .cordText{
       padding-top: 10px;
    }
    .registrecord .cordText p{
       line-height: 60px;
    }
</style>