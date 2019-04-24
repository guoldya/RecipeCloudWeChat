<template>
  <div>
    <div class="flatCard margin5 outCarint">
      <p class="title">白细胞计数
        <span class="title-desc">(10^9/L)</span>
      </p>
      <div class="indicator">
        <p>9.5 </p>
        <div class="line">
          <div class="point"></div>
          <div class="normal-value"></div>
        </div>
        <p>
          <span>4.0 </span>
          <span>正常</span>
          <span> 9.0</span>
        </p>
      </div>
    </div>
    <div class="xui-process">
      <i class="xui-icon-flag"></i>
      <div class="xui-process-static"></div>
      <div class="xui-process-active"></div>
    </div>

  </div>
</template>

<script>


export default {

  data() {
    return {
      star: 4,
      end: 9,
      value: 9.5,
    }
  },
  mounted() {

  },
  methods: {

  },
}

</script>
<style  lang="scss" scoped>
.title {
  line-height: 100px;
}
.title-desc {
  color: var(--primary--content);
  font-size: 26px;
}
.indicator {
  background: #ffffff;
  // padding: 20px;
  .line {
    background: var(--primary--content);
    height: 3px;
    width: 100%;
    position: relative;
  }
  .point {
    width: 30px;
    height: 30px;
    background: var(--primary);
    border-radius: 50%;
    position: absolute;
    top: -15px;
    margin-left: 50%;
  }

  .normal-value {
    width: 60%;
    height: 3px;
    background: var(--primary);
    position: absolute;
    // top: -30px;
    margin-left: 20%;
  }

  p {
    color: var(--primary);
    line-height: 70px;
    span {
      color: var(--primary--content);
    }
  }
}

.xui-process {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  padding: 28px 0 12px;
  width: 76%;
}
.xui-process .xui-icon-flag {
  position: absolute;
  top: 10px;
  left: 0;
  width: 12px;
  height: 18px;
  background-size: 11px;
  background-color: red;
}
.xui-process .xui-process-static {
  width: 100%;
  height: 15px;
  border-radius: 10px;
  -webkit-box-shadow: 0 0 5px rgba(0, 198, 255, 0.6);
  box-shadow: 0 0 5px rgba(0, 198, 255, 0.6);
  background-color: rgba(0, 198, 255, 0.6);
}
.xui-process .xui-process-active {
  position: absolute;
  top: 28px;
  left: 0;
  width: 0;
  height: 14px;
  border: 1px solid #4dafe2;
  border-radius: 10px;
  background-image: linear-gradient(
    60deg,
    transparent 0rem,
    transparent 0.8rem,
    #4dafe2 0.8rem,
    #4dafe2 1.6rem,
    transparent 1.6rem,
    transparent 2.4rem,
    #4dafe2 2.4rem
  );
  background-color: red;
  background-size: 20px 38px;
}
.xui-process-active:after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  border-radius: 10px; // background-image: linear-gradient(to bottom,rgba(0, 140, 213, .6), rgba(0, 140, 213, .6) 15%, transparent 60%, rgba(0, 140, 213, .6));
}
/* 动画 */
</style>
