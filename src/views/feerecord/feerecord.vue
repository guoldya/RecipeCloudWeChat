<template>
  <div class="feerecord">
    <Header post-title="预约记录" v-show="isWeixin"></Header>
    <div :class="{'outCarint':true,'margin45':isWeixin}">
      <div class="appTab">
        <span v-for="(item, index) in time" :key="'time' + index" @click="switchTo(index)" :class="active1 === index ? 'appTabAcitive' : '' ">
          {{item.title}}
        </span>
      </div>
      <div class="demo-text" v-if="active1 === 0" @click="appointinfo">
        <div class="card">
          <p class="appTitle">
            <span>西药费</span>
            <span class="mu-secondary-text-color">99元</span>
          </p>
          <div class="cardText">
            <p>患者：艘船大学华西</p>
            <p>医院：艘船大学华西</p>
            <p>开单时间：艘船大学华西</p>
            <div style="height:30px;  text-align: right;">
              <span class="payatnow">立即支付</span>
            </div>
          </div>
        </div>
      </div>
      <div class="demo-text" v-if="active1 === 1">
        <div class="card">
          <p class="appTitle">
            <span>西药费</span>
            <span class="mu-secondary-text-color">99元</span>
          </p>
          <div class="cardText">
            <p>患者：艘船大学华西</p>
            <p>医院：艘船大学华西</p>
            <p>开单时间：艘船大学华西</p>
          </div>
        </div>
      </div>
      <div class="demo-text" v-if="active1 === 2">
        <div class="card">
          <p class="appTitle">
            <span>张三（预约失败）</span>
            <span class="mu-secondary-text-color">预约关闭</span>
          </p>
          <div class="cardText">
            <p>医院：艘船大学华西</p>
            <p>医院：艘船大学华西</p>
            <p>医院：艘船大学华西</p>
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
        { title: '已支付' },
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


  },
  computed: {

  },

};
</script>
 <style   scoped>
.feerecord {
  font-size: 28px;
}
.feerecord .appTab {
  width: 80%;
  margin-left: 10%;
}

.feerecord .cardText {
  padding: 10px 0 30px;
}
.feerecord .cardText p {
  line-height: 50px;
  font-size: 28px;
  color: #5c5c5c;
}

.feerecord.appTitle {
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
</style>