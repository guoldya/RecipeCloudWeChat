<!-- 购买服务 -->
<template>
  <div class="buy-service">
    <Header post-title="购买服务"></Header>
    <div class="buy-service-info">
      <div class="buy-service-info-content">
        <img src="../images/icon_teletext.png" alt="">
        <p>医生-{{$route.query.name}}</p>
        <p class="money">￥20.00/次</p>
      </div>
      <div class="buy-service-info-tips">
        服务承诺：医生在24小时内进行回复，如未回复自动取消订单并全额退款。退款时间为7日内。
        <p class="ways">通过文字、图片等进行咨询</p>
      </div>
    </div>
    <div class="pay-money">共需支付
      <span class="total-money">20元</span>
    </div>
    <!-- <div class="buy-service-btn">
      <md-button type="primary" round @click="isCashierhow=true">立即支付</md-button>
    </div> -->
    <p class="addbTN" @click="payNow">立即支付</p>
    <md-cashier ref="cashier" @pay="onCashierPay" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :default-index=0 :payment-amount="cashierAmount"></md-cashier>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
let appbizOnlineServiceRecordnowPay = "/app/bizOnlineServiceRecord/nowPay";
let appbizOnlineServiceRecordupdate = "/app/bizOnlineServiceRecord/createOrder";
export default {
  data() {
    return {
      id: '',
      isCashierhow: false,
      cashierAmount: '20',
      cashierChannels: [
        {
          icon: 'cashier-icon-2',
          text: '支付宝支付',
          value: '1',
        },
        {
          icon: 'cashier-icon-3',
          text: '微信支付',
          value: '2',
        },
        {
          icon: 'cashier-icon-3',
          text: '医保支付',
          value: '3',
        },
      ]
    }
  },
  methods: {

    ...mapActions(["chat/setPatienDetail"]),
    payNow() {
      let nowPayParams = {};
      nowPayParams.doctorId = this.$route.query.id;
      nowPayParams.type = 1;
      this.$axios.post(appbizOnlineServiceRecordupdate, nowPayParams).then((res) => {
        if (res.data.code == '200') {
          this.isCashierhow = true;
          this.id = res.data.data;
        } else {

        }
      }).catch(function (err) {
        console.log(err);
      });


    },

    onCashierPay(item) {
      this["chat/setPatienDetail"]({
        name: "点击选择就诊人",
        id: null
      });
      this.$router.push({
        name: "pictureConsult",
        query: { name: this.$route.query.name, id: this.$route.query.id }
      });
      let nowPayParams = {};
      nowPayParams.payType = Number(item.value);
      nowPayParams.id = this.id;
      // 状态  1--新建  2--支付 3--接诊  4--完成  5--退费  6--关闭
      nowPayParams.status = 2;
      nowPayParams.type = 1;
      nowPayParams.total = 20;
      this.$axios.post(appbizOnlineServiceRecordnowPay, nowPayParams).then((res) => {
        if (res.data.code == '200') {

        } else {

        }
      }).catch(function (err) {
        console.log(err);
      });
    },


  }
}
</script>
<style lang="scss" scoped>
$border: 1px solid #f1f3f1;
$yellow: var(--primary);
.buy-service {
  padding-top: 100px;
  .buy-service-info {
    padding: 20px 40px;
    border-bottom: $border;
    background: #ffffff;
  }
  .buy-service-info-content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 30px 0 80px;
    border-bottom: $border;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      overflow: hidden;
      margin: 10px;
    }
    p {
      width: 100%;
      text-align: center;
      line-height: 70px;
    }
    .money {
      // color: $yellow;
      font-size: 50px;
    }
    .ways {
      color: #999;
    }
  }
  .buy-service-info-tips {
    color: red;
    padding-top: 20px;
  }
  .pay-money {
    background: #ffffff;
    padding: 20px;
    margin-top: 10px;
    border-bottom: $border;
    overflow: hidden;
    line-height: 50px;
    .total-money {
      float: right;
      color: $yellow;
      font-size: 50px;
    }
  }
  .buy-service-btn {
    width: 90%;
    position: relative;
    margin: 120px auto 0;
  }
  .md-button {
    height: 0.84rem;
  }
}
</style>
