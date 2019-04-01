
<!-- 导航栏 -->
<!--       
    @props
          type        导航栏类型 默认普通 type="onlineNav" 则为问诊导航类型
          title       普通导航类型 显示得title
-->
<template>
  <div class="navigation">
    <i class="  icon-iconfontjiantou" @click="goBack">
      <img src="@/assets/images/icon_back.png">
    </i>
    <div class="navigation-content" v-if="type === 'onlineNav'">
      <p>张医生</p>
      <p class="time">问诊中
        <span>{{timeH}}</span>
      </p>
    </div>
    <div class="navigation-content" v-else>
      {{title}}
    </div>
    <div class="right">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      timeH: ''
    };
  },
  props: ['type', 'title'],


  async mounted() {
    // 让滚动条滚动到指定位置


    let _this = this;
    var m = 9;  //分
    var s = 59;  //秒
    getCountdown();
    setInterval(function () { getCountdown() }, 1000);
    function getCountdown() {
      _this.timeH = "0" + m + ":" + s;
      if (m == 0 && s == 0) {
        m = 9;
        s = 59;
      } else if (m >= 0) {
        if (s > 0) {
          s--;
        } else if (s == 0) {
          m--;
          s = 59;
        }
      }
    }

  },
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  width: 100%;
  height: 100px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  background: #fff;
  color: #333333;
  z-index: 99;

  img {
    width: 20px;
    height: 35px;
  }
  .navigation-content {
    font-size: 32px;
    text-align: center;
    p {
      font-size: 28px;
    }
  }
  .icon-iconfontjiantou {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 24px;
  }
  .icon-iconfontjiantou img {
    width: 20px;
    height: 35px;
  }
  .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
  }
}
</style>
