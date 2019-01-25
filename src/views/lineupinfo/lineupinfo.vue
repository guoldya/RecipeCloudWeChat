<template>

  <div class="lineupnow">
    <Header post-title="预约记录" v-show="isWeixin"></Header>
    <div :class="{margin45:isWeixin,outCarint:true}">
      <div class="card margin16">
        <div class="cardHEADER">
          <div class="fleft lineheight50" style="width:100%;border-bottom:1px solid #ededed">
            <img src="@/assets/images/icon_line_up.png" alt="">
            <span>我的排队号</span>
          </div>
          <p class="lineheight50">我的号码：119</p>
          <p class="lineheight50">排队类目：集体体检</p>
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
          <p class="lineheight50">当前正在受理的号是121号</p>
          <p class="lineheight50">您前面还有
            <span class="mu-secondary-text-color">1</span>位在等候，预计等待
            <span class="mu-secondary-text-color">10</span>分钟</p>
        </div>
      </div>

      <md-button class="margin16" type="primary" @click="payment" round>刷新</md-button>
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

.lineupnow .md-button-content {
  color: #ffffff !important;
}
</style>