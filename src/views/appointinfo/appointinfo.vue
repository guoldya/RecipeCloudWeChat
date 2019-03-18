<template>
  <div class="appointinfo">
    <Header post-title="预约记录详情"  ></Header>
    <div class="outCarint margin45">
      <div class="card">
        <div class="cardText">
          <a class="headimg" style="margin-right:5px"> <img src="@/assets/images/3.jpg" alt="店铺头像"></a>
          <h1 class="titleh1">演示医院</h1>
          <p>地址：成都市武侯区</p>
          <p class="mu-secondary-text-color">预约成功</p>
        </div>
      </div>
      <div class="card">
        <div class="cardText">
          <p>科室：演示医院</p>
          <p>医生：演示医院</p>
          <p>姓名：演示医院</p>
          <p>日期：演示医院</p>
          <p>时段：演示医院</p>
          <p>诊号：演示医院</p>
          <p>金额：演示医院</p>
          <p>地点：演示医院</p>
          <p>预约来源：演示医院</p>
        </div>
      </div>
      <div class="cardText warnText">
        注意事项：
        <p>1、请在半个小时内完成支付，逾期记录作废</p>
        <p>2、支付成功后无需取号，请持就诊卡到护士站报道看诊</p>
        <p>3、如需退号，请提前两天进行操作</p>
        <p>4、一个自然月内只能退三次号</p>
      </div>

      <md-button type="primary" round @click="tijiao">申请退号</md-button>
    </div>
  </div>
</template>
<script  >
export default {
  data() {
    return {
      active1: 0,
      isWeixin: false,
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
    document.title = '预约记录';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    };
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
.titleh1 {
  font-size: 34px;
}

.card p {
  line-height: 50px;
}
.warnText {
  font-size: 24px;
  color: #afafaf;
}
.appointinfo .card {
  margin-bottom: 32px;
}
</style>