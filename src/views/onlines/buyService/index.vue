<!-- 购买服务 -->
<template>
  <div class="buy-service">
    <Header post-title="购买服务"></Header>
    <div class="buy-service-info">
      <div class="buy-service-info-content">
        <img src="../images/icon_teletext.png" alt="">
        <p class="money">￥20.00/次</p>
        <p>医生-周扬</p>
        <p class="ways">通过文字、图片等进行咨询</p>
      </div>
      <div class="buy-service-info-tips">
        服务承诺：医生在24小时内进行回复，如未回复自动取消订单并全额退款。退款时间为7日内。
      </div>
    </div>
    <div class="pay-money">共需支付
      <span>20元</span>
    </div>
    <div class="buy-service-btn">
      <md-button type="primary" round @click="isCashierhow=true">立即支付</md-button>
    </div>
    <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :default-index=0 :payment-amount="cashierAmount"></md-cashier>
  </div>
</template>
<script>
export default {
  data() {
    return {
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
  }
}
</script>
<style lang="scss" scoped>
$border: 1px solid #f1f3f1;
$yellow: #ff9b00;
.buy-service {
  padding-top: 100px;
  .buy-service-info {
    padding: 20px 40px;
    border-bottom: $border;
  }
  .buy-service-info-content {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding-bottom: 40px;
    border-bottom: $border;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      overflow: hidden;
    }
    p {
      width: 100%;
      text-align: center;
      line-height: 50px;
    }
    .money {
      color: $yellow;
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
    padding: 20px;
    border-bottom: $border;
    overflow: hidden;
    span {
      float: right;
      color: $yellow;
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
