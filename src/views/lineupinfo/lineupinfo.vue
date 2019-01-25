<template>

   <div class="page-loadmore">
      <Header post-title="预约记录"></Header>
      <div :class="{margin70:isWeixin,outCarint:true}">
         <div class="card">
            <div class="cardHEADER">
               <div class="fleft lineheight50" style="width:100%;border-bottom:1px solid #ededed">
                  <img src="@/assets/images/icon_line_up.png" alt="">
                  <span>我的排队号</span>
               </div>
               <p class="lineheight30">我的号码：119</p>
               <p class="lineheight30">排队类目：集体体检</p>
            </div>
         </div>
         <div class="card margin16">
            <div class="cardHEADER">
               <div class="fleft lineheight50" style="width:100%;border-bottom:1px solid #ededed">
                  <img src="@/assets/images/icon_sad.png" alt="">
                  <span>您已过号！请重新排队！</span>
               </div>
               <p class="lineheight50">当前正在受理的号是121号</p>
            </div>
         </div>
         <div class="card margin16">
            <div class="cardHEADER">
               <div class="fleft lineheight50" style="width:100%;border-bottom:1px solid #ededed">
                  <img src="@/assets/images/icon_schedule.png" alt="">
                  <span>我的排队号</span>
               </div>
               <p class="lineheight30">当前正在受理的号是121号</p>
               <p class="lineheight30">您前面还有
                  <span class="mu-secondary-text-color">1</span>位在等候，预计等待
                  <span class="mu-secondary-text-color">10</span>分钟</p>
            </div>
         </div>
         <mu-flex justify-content="center" align-items="center" class="margin16">
            <mu-button full-width round color="primary" @click="payment">刷新</mu-button>
         </mu-flex>
      </div>
   </div>
</template>
<script  >
export default {
   data() {
      return {
         isWeixin: false,
         active1: 0,
         normal: {
            checkbox: true,
            radio: 1,
            switch: false
         },
         time: [
            { title: '待支付' },
            { title: '预约成功' },
            { title: '预约关闭' }
         ],
      };
   },
   created() {

   },
   mounted() {
      document.title = '排队详情';
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
      switchTo(num) {
         this.active1 = num;
      },
      payment() {
         this.$router.push({
            name: 'payment',
         });
      },
      setStyle(rowIndex, row) {
         if (row.id === this.currentRow.id) {
            return 'background-color:#ddd'
         } else {
            return 'background-color:#abc'
         }
      }
   },
   computed: {

   },
};
</script>
 <style   scoped>
@import url("../lineupnow/lineupnow.css");
.mu-raised-button {
  height: 45px;
}
.lineheight50 {
  line-height: 50px;
}
</style>