<template>

  <div class="reportinfo">
    <Header post-title="检查报告详情" v-show="isWeixin"></Header>
    <div :class="{margin45:isWeixin,outCarint:true}">
      <div class="card margin16">
        <div class="cardText">
          <p class="cardTextPP">
            <span>姓名:啊啊啊 </span>
            <span>性别:女 </span>
          </p>
          <p class="cardTextPP">
            <span>检查科室:啊啊啊 </span>
            <span>申请时间:2018-12-08</span>
          </p>
          <p class="cardTextPP">
            <span>检查类别:嗷嗷 </span>
            <span>检查时间:2018-12-08</span>
          </p>
          <p class="cardTextPP">
            <span>检查项目:胸部正位片</span>
            <span>报告时间:2018-12-08</span>
          </p>
        </div>
      </div>
      <p style="margin-top:15px;font-weight:700">检查结果</p>
      <div class="card margin16">
        <div class="cardText">

          <p class="cardTextPP">
            <span>检查参数:胸部正位</span>
          </p>
          <p class="cardTextPP">
            <span> 检查所见:嗷嗷嗷嗷</span>
          </p>
          <p class="cardTextPP">
            <span> 印象:嗷嗷 </span>
          </p>
          <p class="cardTextPP">
            <span> 建议:嗷嗷嗷嗷</span>
          </p>
          <p class="cardTextPP">
            <span>检查类别:嗷嗷 </span>
          </p>
          <p class="cardTextPP">
            <span>检查时间:2018-12-08</span>
          </p>
          <p class="cardTextPP">
            <span>检查项目:胸部正位片</span>
          </p>
          <p class="cardTextPP">
            <span> 备注:嗷嗷嗷嗷</span>
          </p>
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
.reportinfo .cardText {
  padding: 0;
}
.reportinfo .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  padding: 45px 0;
  font-size: 28px;
  border-bottom: 1px solid #c5c5c5;
}

.reportinfo .cardText .cardTextPP:last-child {
  border: none;
}
</style>