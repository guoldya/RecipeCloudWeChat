<template>
   <div class="orderrecord">
      <Header post-title="预约记录" v-show="isWeixin"></Header>
      <div :class="{'outCarint':true,'margin45':isWeixin}">
         <div class="appTab">
            <span v-for="(item, index) in time" :key="'time' + index" @click="switchTo(index)" :class="active1 === index ? 'appTabAcitive' : '' ">
               {{item.title}}
            </span>
         </div>

         <div class="demo-text" v-if="active1 === 0" @click="appointinfo">
            <div class="card cardcc">
               <p class="appTitle">
                  <span>西药费</span>
                  <span class="mu-secondary-text-color">待付款</span>
               </p>
               <div class="cardText">
                  <p>患者：李华</p>
                  <p>医院：演示医院</p>
                  <p>开单时间：2019-12-05 12:30:00</p>
                  <div style="height:30px;  text-align: right;">
                     <span class="payatnow">立即支付</span>
                  </div>
               </div>
            </div>
         </div>
         <div class="demo-text" v-if="active1 === 1">
            <div class="card cardcc">
               <p class="appTitle">
                  <span>中药费</span>
                  <span class="mu-secondary-text-color">预约成功</span>
               </p>
               <div class="cardText">
                  <p>患者：李华</p>
                  <p>医院：演示医院</p>
                  <p>开单时间：2019-12-05 12:30:00</p>
                  <p class="learnMore" @click="intoorderinfo(1)">
                     详情 <img class="icon_more" src="@/assets/images/icon_more.png" alt="">
                  </p>
               </div>
            </div>
         </div>
         <div class="demo-text" v-if="active1 === 2">
            <div class="card cardcc">
               <p class="appTitle">
                  <span>张三（预约关闭）</span>
                  <span class="mu-secondary-text-color">预约关闭</span>
               </p>
               <div class="cardText">
                  <p>患者：李华</p>
                  <p>医院：演示医院</p>
                  <p>开单时间：2019-12-05 12:30:00</p>
                  <p class="learnMore" @click="intoorderinfo(2)">
                     详情 <img class="icon_more" src="@/assets/images/icon_more.png" alt="">
                  </p>
               </div>
            </div>
         </div>

      </div>
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
            { title: '预约成功' },
            { title: '预约关闭' },
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

      intoorderinfo: function (value) {
         let argu = {};
         argu.aa = value;
         this.$router.push({
            name: 'orderinfo',
            query: argu
         });
      },


   },
   computed: {

   },

};
</script>
 <style   scoped>
.orderrecord {
  font-size: 28px;
}

.orderrecord .cardText {
  padding: 10px 0 30px;
}
.orderrecord .cardText p {
  line-height: 50px;
  font-size: 28px;
  color: #5c5c5c;
}
.orderrecord .cardcc .appTitle {
  padding: 32px 0px;
}
.orderrecord .appTitle {
  padding: 32px;
  border-bottom: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
}
.payatnow {
  font-size: 28px;
  color: #ffffff;
  float: right;
  background: #1da1f3;
  border-radius: 40px;
  letter-spacing: 1px;
  padding: 15px 40px;
  text-align: center;
}
.orderrecord .cardText .learnMore {
  height: 60px;
  text-align: right;
  margin-top: -30px;
}

.orderrecord .icon_more {
  width: 12px;
  position: relative;
  top: 2px;
}
</style>