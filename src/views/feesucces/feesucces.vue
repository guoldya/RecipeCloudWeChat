<template>

  <div class="page-loadmore">
    <Header post-title="预约记录"></Header>
    <div class="outCarint margin45">
      <div style="text-align: center;margin:80px  0 40px">
        <div>
          <img src="@/assets/images/icon_success.png" width="60px">
        </div>
        <p>支付成功</p>
      </div>

      <div class="card">
        <div class="cardText">
            <div class="listData">
              <span>付款总额</span>
              <span>￥{{jumpPar.money |keepTwoNum}}</span>
            </div>
          <div class="listData">
            <span>支付时间</span>
            <span>{{jumpPar.payTime}}</span>
          </div>
          <div class="listData">
            <span>订单单号</span>
            <span>{{jumpPar.orderCode}}</span>
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
        jumpPar:{},
    };
  },
  created() {

  },
  mounted() {
      this.jumpPar=this.$route.query;
    document.title = '支付结果';
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
.headimg {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  float: left;
  text-align: center;
  margin-right: 10px;
}
.lineheight50 {
  line-height: 50px;
  border-bottom: 1px solid #f5f5f5;
}
.headimg img {
  width: 100%;
  border-radius: 50%;
  height: 100%;
  text-align: center;
}
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