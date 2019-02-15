<template>

  <div class="appoint">
    <Header post-title="预约记录" v-show="isWeixin"></Header>
    <div :class="{'outCarint':true,'margin45':isWeixin,'margin7':!isWeixin}">
      <div class="appTab">
        <span v-for="(item, index) in time" :key="'time' + index" @click="switchTo(index)" :class="active1 === index ? 'appTabAcitive' : '' ">
          {{item.title}}
        </span>
      </div>
      <div class="demo-text" v-if="active1 === 0" @click="appointinfo">
        <div class="card">
          <p class="appTitle">
            <span>张三（待支付）</span>
            <span class="mu-secondary-text-color">待支付</span>
          </p>
          <div class="cardText">
            <p>医院：演示医院</p>
            <p>科室：演示医院</p>
            <p>医生：演示医院</p>
            <p>预约时间：演示医院</p>
            <p>就诊时间：演示医院</p>
          </div>
        </div>
      </div>
      <div class="demo-text" v-if="active1 === 1">
        <div class="card">
          <p class="appTitle">
            <span>张三（预约成功）</span>
            <span class="mu-secondary-text-color">预约成功</span>
          </p>
          <div class="cardText">
            <p>医院：演示医院</p>
            <p>医院：演示医院</p>
            <p>医院：演示医院</p>
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
            <p>医院：演示医院</p>
            <p>医院：演示医院</p>
            <p>医院：演示医院</p>
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
    appointinfo: function (value) {
      this.$router.push({
        name: 'appointinfo',
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
.appoint .card {
  margin-bottom: 32px;
}
</style>