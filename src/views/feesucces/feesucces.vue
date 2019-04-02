<template>

  <div class=" feesucces examineDetail page-loadmore">
    <Header post-title="预约记录"></Header>
    <div class="flatCard margin55">
      <div class="successImg">
        <img src="@/assets/images/icon_success.png" alt="">
        <p>支付成功</p>
      </div>
      <div class="bacCenter">
        <div class="margin16">
          <div>
            <span>付款总额： </span>
            <span class="mu-secondary-text-color">￥{{jumpPar.money |keepTwoNum}}</span>
          </div>
          <div>
            <span>支付时间</span>：
            <span class="mu-secondary-text-color">{{jumpPar.payTime}}</span>

          </div>
          <div>
            <span>订单单号：</span>
            <span class="mu-secondary-text-color">{{jumpPar.orderCode}}</span>
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
      jumpPar: {},
    };
  },
  created() {

  },
  mounted() {
    this.jumpPar = this.$route.query;
    document.title = '支付结果';

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
  color:  var(--primary--title);
}
.card p {
  line-height: 25px;
}
.mu-raised-button {
  height: 45px;
}

.examineDetail .successImg{
  text-align: center;
  margin-top: 110px;
  background-color: #fff;
  padding: 80px 0;
}
.examineDetail .successImg img{
  width: 160px;
  height: 160px;
}
.examineDetail .successImg p{
  font-size: 30px;
  margin-top: 18px;
}
.examineDetail .successWord p{
  padding: 80px 28px;
  text-indent: 7%;
  font-size: 26px;
  word-break : normal;
}
.examineDetail .backH{
  margin-top: 60px;
}
.examineDetail .bacCenter{
  background-color: #ffffff;
  padding-bottom: 10px;
  line-height: 52px;
}
.feesucces .bacCenter div div{
  width: 60%;
  margin: 0 auto;
}
</style>