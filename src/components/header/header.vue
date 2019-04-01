<template>
  <div class="navigation">
    <i class="icon-iconfontjiantou" @click="$router.go(-1)">
      <img src="@/assets/images/icon_back.png">
    </i>
    <div class="navigation-content">
      {{postTitle}}
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

    }
  },
  props: ['postTitle'],
  created() {

  },
  mounted() {


  },
  methods: {

  },
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
