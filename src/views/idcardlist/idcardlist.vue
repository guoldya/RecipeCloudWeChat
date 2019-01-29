<template>
   <div class="doctorList">
      <Header post-title="管理就诊卡" v-show="isWeixin"></Header>
      <div :class="{margin45:isWeixin,outCarint:true,'margin7':!isWeixin}">
         <ul>
            <li v-for="i in num" :key="i">
               <div class="card">
                  <div class="cardText">
                     <div>
                        <p class="headname">张三妈妈的就诊卡
                        </p>
                        <p class="headdesc">电子就诊卡号：785477fz</p>
                     </div>
                  </div>
               </div>
            </li>
         </ul>
      </div>
   </div>
</template>
<script type="text/babel">
export default {
   data() {
      return {
         isWeixin: false,
         num: 5,
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

   },
   computed: {
   },
};
</script>
 <style   scoped>
@import "../doctorList/doctorList.css";
</style>