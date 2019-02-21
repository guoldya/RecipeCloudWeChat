<template>
   <div class="doctorList">
      <Header post-title="管理就诊卡"></Header>
      <div class="outCarint" style="margin-top:127px">
         <ul>
            <li v-for="i in num" :key="i">
               <div class="homeCard">
                  <div class="homeCardText">
                     <div class="homeCardTextLeft">
                        <p>名字<img class="renzhen" src="@/assets/images/renzhen.png" alt=""></p>
                        <p>777777777777</p>
                        <p>
                           <span class="icon_switch"> <img src="@/assets/images/icon_switch.png" alt="">切换就诊人</span>
                        </p>
                     </div>
                     <div class="towma">
                        <p><img src="@/assets/images/lili.jpg" alt=""></p>
                        <p>刷卡请出示</p>
                     </div>
                  </div>
               </div>
            </li>
         </ul>
         <md-button @click="onActConfirm2" type="primary" round>注册电子就诊卡</md-button>
         
      </div>
   </div>
</template>
<script type="text/babel">
export default {
   data() {
      return {
         isWeixin: false,
         num: 2,
      };
   },
   created() {
   },
   watch: {
      selected3: function (newselectedStatus, oldselectedStatus) {
         console.log(newselectedStatus)
      },
   },
   mounted() {
      document.title = '医生列表';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
         return true;
      } else {
         this.isWeixin = true;
         return false;
      };


   },
   methods: {
      onActConfirm2() {

         this.$router.push({
            name: 'cardwrite',
         });
      },
   },
   computed: {
   },
};
</script>
 <style   scoped>
@import "../doctorList/doctorList.css";
</style>