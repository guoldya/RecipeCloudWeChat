<template>
   <div class="page-loadmore">
      <Header post-title="预约记录" v-show="isWeixin"></Header>
      <mu-container :class="{margin45:isWeixin}">
         <div class="appTab">
            <span v-for="(item, index) in time" :key="'time' + index" @click="switchTo(index)" :class="active1 === index ? 'appTabAcitive' : '' ">
               {{item.title}}
            </span>
         </div>
         <div class="demo-text" v-if="active1 === 0" @click="appointinfo">
            <div class="card">
               <p class="appTitle">
                  <span>西药费</span>
                  <span class="mu-secondary-text-color">99元</span>
               </p>
               <div class="cardText">
                  <p>患者：艘船大学华西</p>
                  <p>医院：艘船大学华西</p>
                  <p>开单时间：艘船大学华西</p>
                  <p style="height:30px;  text-align: right;">
                     <mu-button round color="primary" style="height:30px; ">立即支付</mu-button>
                  </p>
               </div>
            </div>
         </div>
         <div class="demo-text" v-if="active1 === 1">
            <div class="card">
               <p class="appTitle">
                  <span>西药费</span>
                  <span class="mu-secondary-text-color">99元</span>
               </p>
               <div class="cardText">
                  <p>患者：艘船大学华西</p>
                  <p>医院：艘船大学华西</p>
                  <p>开单时间：艘船大学华西</p>
               </div>
            </div>
         </div>
         <div class="demo-text" v-if="active1 === 2">
            <div class="card">
               <p class="appTitle">
                  <span>张三（预约失败）</span>
                  <span class="mu-secondary-text-color">预约关闭</span>
               </p>
               <div class="cardText">
                  <p>医院：艘船大学华西</p>
                  <p>医院：艘船大学华西</p>
                  <p>医院：艘船大学华西</p>
               </div>
            </div>
         </div>

      </mu-container>
   </div>
</template>
<script  >
export default {
   data() {
      return {
         active1: 0,
         isWeixin: false,
         time: [
            { title: '待支付' },
            { title: '已支付' },
         ],
      };
   },
   created() {

   },
   mounted() {
      document.title = '缴费记录';
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
      appointinfo: function (value) {
         this.$router.push({
            name: 'feeinfo',
            // query: argu
         });
      },
      switchTo(num) {
         this.active1 = num;
      },


   },
   computed: {

   },

};
</script>
 <style   scoped>
.appTab {
  width: 80%;
  margin-left: 10%;
}
</style>