<template>
  <div class="all">
    <img src="@/assets/images/logo.png" alt="logo" style="width:50%;margin-top:20%">
    <div class="invited">
    </div>
    <div class="order">
      <span class="line"></span>
      <span class="txt">做人民健康的护航者</span>
      <span class="line"></span>
    </div>
    <p class="warn">全之道由上海医药集团、贵州神奇药业有限公司和重庆居家易科技有限公司（以下简称“居家易”）共同投资成立，并与国内多家生产药企达成战略合作，拥有多个独家产品全国总代理与运营权具有独特的产品竞争优势。</p>
    <p class="warn" style="font-size:12px;text-align:center;margin-top:100px"> Copyright © 2018.渝ICP备18009525号-1 </p>
    <p class="warn" style="font-size:12px;text-align:center; "> 重庆全之道医药有限公司 版权所有</p>
  </div>
</template>

<script>
export default {
  name: "invite",
  data() {
    return {
      webTitle: "关于我们",
    }
  },
  created() {

  },
  mounted() {
    document.title = '关于我们';
  },
  methods: {
  },
}
</script>

<style>
.all {
  margin: 12px;
  text-align: center;
}
.invited {
  width: 100%;
}
.invited p {
  font-size: 13px;
  line-height: 30px;
  margin-top: -10px;
}
.mint-msgbox-cancel {
  width: 50%;
  border-right: 1px solid #ddd !important;
}
.order {
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.order .line {
  display: inline-block;
  width: 60px;
  border-top: 1px solid #ccc;
}
.order .txt {
  color: #686868;
  vertical-align: middle;
  font-size: 12px;
  line-height: 20px;
}
.warn {
  margin-bottom: 20px;
  color: #999999;
  line-height: 26px;
  /* text-indent: 2em; */
  margin: 0 0 10px;
  font-size: 14px;
  letter-spacing: 0.5px;
  text-align: left;
  margin: 0 30px;
}
</style>
 
