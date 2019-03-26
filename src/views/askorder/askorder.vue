<template>
   <div class="askorder">
      <Header post-title="问诊订单"  ></Header>
      <div class="outCarint margin45">
         <!--<div class="appTab">-->
            <!--<span v-for="(item, index) in time" :key="'time' + index" @click="switchTo(index)" :class="active1 === index ? 'appTabAcitive' : '' ">-->
               <!--{{item.title}}-->
            <!--</span>-->
         <!--</div>-->
         <Apptab :tab-title="time" v-on:childByValue="childByValue"></Apptab>
         <div class="demo-text" v-if="active1 === 1" @click="appointinfo">
            <div class="card cardcc">
               <p class="appTitle">
                  <span>2019-12-05 12:30</span>
                  <span>等待付款
                     <span class="mu-secondary-text-color"> ￥27.0</span>
                  </span>
               </p>
               <div class="cardText">
                  <div style="width:100%;height:50px;">
                     <div class="headimg"><img src="@/assets/images/user.png" alt="医生头像"></div>
                     <p>李华
                        <span class="levle">主任医师</span>
                     </p>
                     <p>呼吸内科</p>
                  </div>
                  <div style="height:30px;  text-align: right;">
                     <span class="payatnow">立即支付</span>
                     <span class="cancle">取消订单</span>
                  </div>
               </div>
            </div>
         </div>
         <div class="demo-text" v-if="active1 === 2">
            <div class="card cardcc">
               <p class="appTitle">
                  <span>2019-12-05 12:30</span>
                  <span>已付款
                     <span class="mu-secondary-text-color"> ￥27.0</span>
                  </span>
               </p>
               <div class="cardText">
                  <div style="width:100%;height:50px;">
                     <div class="headimg"><img src="@/assets/images/user.png" alt="医生头像"></div>
                     <p>李华
                        <span class="levle">主任医师</span>
                     </p>
                     <p>呼吸内科</p>
                  </div>

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
         active1: 1,
         
         time: [
            { title: '待支付',type:1},
            { title: '已支付',type:2},
         ],
      };
   },
   created() {

   },
   mounted() {
      document.title = '问诊订单';
      
   },
   methods: {
      appointinfo: function (value) {
         // this.$router.push({
         //    name: 'feeinfo',
         //    // query: argu
         // });
      },
      switchTo(num) {
         this.active1 = num;
      },
       childByValue: function (childValue) {
           this.active1 = childValue.type;
       },

   },
   computed: {

   },

};
</script>
 <style   scoped>
.askorder {
  font-size: 28px;
}
.askorder .appTab {
  width: 80%;
  margin-left: 10%;
}
.askorder .cardText {
  padding: 10px 0 30px;
}
.askorder .cardText p {
  line-height: 50px;
  font-size: 30px;
  color: #5c5c5c;
}
.askorder .cardcc .appTitle {
  padding: 32px 0px;
}
.askorder .appTitle {
  padding: 32px;
  border-bottom: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
}
.askorder .payatnow {
  font-size: 26px;
  color: #ffffff;
  float: right;
  background: #1da1f3;
  border-radius: 40px;
  letter-spacing: 1px;
  padding: 10px 30px;
  text-align: center;
  margin-left: 20px;
  margin-top: 20px;
}
.askorder .cancle {
  font-size: 26px;
  color: #474747;
  float: right;
  background: #ffffff;
  border-radius: 40px;
  letter-spacing: 1px;
  padding: 8px 28px;
  text-align: center;
  margin-left: 20px;
  margin-top: 20px;
  border: 2px solid #474747;
  box-sizing: border-box;
}

.askorder .card .headimg {
  margin-right: 20px;
  top: 10px;
  position: relative;
}

.askorder .levle {
  padding: 2px 10px;
  font-size: 20px;
  color: #1da1f3;
  border: 2px solid #1da1f3;
  border-radius: 8px;
  position: relative;
  top: 0px;
}
</style>