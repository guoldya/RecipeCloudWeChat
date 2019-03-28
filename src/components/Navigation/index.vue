
<!-- 导航栏 -->
<!--       
    @props
          type        导航栏类型 默认普通 type="onlineNav" 则为问诊导航类型
          title       普通导航类型 显示得title
-->
<template>
  <div class="navigation">
    <i class="iconfont icon-iconfontjiantou1" @click="goBack"></i>
    <div class="navigation-content" v-if="type === 'onlineNav'">
      <p>张医生</p>
      <p class="time">问诊中
        <span>10:20:10</span>
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

  props: ['type', 'title'],
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
  .iconfont {
    font-size: 40px;
  }
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
  .icon-iconfontjiantou1 {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 30px;
  }
  .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
  }
}
</style>
