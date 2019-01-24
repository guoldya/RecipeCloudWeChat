<template>

  <div class="page-loadmore">
    <Header post-title="预约记录"></Header>
    <mu-container style="margin-top:45px;">
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
            <p>医院：艘船大学华西</p>
            <p>科室：艘船大学华西</p>
            <p>医生：艘船大学华西</p>
            <p>预约时间：艘船大学华西</p>
            <p>就诊时间：艘船大学华西</p>
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
            <p>医院：艘船大学华西</p>
            <p>医院：艘船大学华西</p>
            <p>医院：艘船大学华西</p>
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

    </mu-container>
  </div>
</template>
<script  >
export default {
  data() {
    return {
      active1: 0,
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
</style>