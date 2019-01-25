<template>

   <div class="page-loadmore">
      <Header post-title="检查报告详情"></Header>
      <div :class="{margin45:isWeixin,outCarint:true}">
         <div class="card">
            <div class="cardText">
               <mu-row gutter class="lineheight50">
                  <mu-col span="6">
                     <div class="grid-cell">姓名:啊啊啊</div>
                  </mu-col>
                  <mu-col span="6">
                     <div class="grid-cell" style="text-align: left;line-height:44px">性别:女</div>
                  </mu-col>
               </mu-row>
               <mu-row gutter class="lineheight50">
                  <mu-col span="6">
                     <div class="grid-cell">检查科室:嗷嗷</div>
                  </mu-col>
                  <mu-col span="6">
                     <div class="grid-cell" style="text-align: left;">申请时间: 2018-12-08</div>
                  </mu-col>
               </mu-row>
               <mu-row gutter class="lineheight50">
                  <mu-col span="6">
                     <div class="grid-cell">检查类别:嗷嗷</div>
                  </mu-col>
                  <mu-col span="6">
                     <div class="grid-cell" style="text-align: left;">检查子类: 2018-12-08</div>
                  </mu-col>
               </mu-row>
               <mu-row gutter class="lineheight50">
                  <mu-col span="6">
                     <div class="grid-cell">检查项目:胸部正位片</div>
                  </mu-col>
                  <mu-col span="6">
                     <div class="grid-cell" style="text-align: left;">报告时间: 2018-12-08</div>
                  </mu-col>
               </mu-row>
            </div>
         </div>
         <p style="margin-top:15px;font-weight:700">检查结果</p>
         <div class="card">
            <div class="cardText">
               <mu-row class="lineheight50">
                  <mu-col span="12">
                     <div class="grid-cell">
                        检查参数:胸部正位
                     </div>
                  </mu-col>

               </mu-row>
               <mu-row class="lineheight50" >
                  <mu-col span="12">
                     <div class="grid-cell">
                        检查所见:嗷嗷嗷嗷
                     </div>
                  </mu-col>
               </mu-row>
               <mu-row class="lineheight50" >
                  <mu-col span="12">
                     <div class="grid-cell">
                        印象:嗷嗷
                     </div>
                  </mu-col>
               </mu-row>
               <mu-row class="lineheight50" >
                  <mu-col span="12">
                     <div class="grid-cell">
                        建议:嗷嗷嗷嗷
                     </div>
                  </mu-col>
               </mu-row>
               <mu-row class="lineheight50" >
                  <mu-col span="12">
                     <div class="grid-cell">
                        备注:嗷嗷嗷嗷
                     </div>
                  </mu-col>
               </mu-row>
            </div>

         </div>

         <mu-flex justify-content="center" align-items="center" class="margin16">
            <!-- <mu-button full-width round color="primary" @click="payment">立即缴费</mu-button> -->
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
      document.title = '检查报告详情';
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
.grid-cell span {
  font-weight: 700;
}
.titleh1 {
  font-size: 17px;
}

.card {
  margin-top: 14px;
}
.card:first-child {
  margin-top: 64px;
}
.cardText {
  padding: 0 16px;
  font-size: 14px;
  color: #333333;
}
.card p {
  line-height: 25px;
}
.warnText {
  font-size: 12px;
  color: #afafaf;
}
.mu-raised-button {
  height: 45px;
}
</style>