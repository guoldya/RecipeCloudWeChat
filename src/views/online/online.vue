<template>
  <div class="online">
    <div :class="{'outCarint':true, }">

      <div class="onlineheader">在线问诊</div>
      <Search></Search>
      <div class="tools">
        <div class="nav2">
          <span @click="aa"><img src="@/assets/images/online1.png" alt="">内科</span>
          <span @click="aa"><img src="@/assets/images/online2.png" alt="">外科</span>
          <span @click="aa"><img src="@/assets/images/online3.png" alt="">妇科</span>
          <span @click="aa"><img src="@/assets/images/online4.png" alt="">产科</span>
        </div>
        <div class="nav2">
          <span><img src="@/assets/images/online5.png" alt="">儿科</span>
          <span><img src="@/assets/images/online6.png" alt="">五官科</span>
          <span><img src="@/assets/images/online7.png" alt="">骨科</span>
          <span><img src="@/assets/images/online8.png" alt="">皮肤科</span>
        </div>
      </div>
      <div class="tabA">
        <div class="tabAdiv">
          <div class="yellowWarn">关注的医生</div>
          <div class="tabAdivright">
            <img src="@/assets/images/online9.png" alt="">
          </div>
        </div>
        <div class="tabAdiv">
          <div class="yellowWarn">问诊记录</div>
          <div class="tabAdivright">
            <img src="@/assets/images/online10.png" alt="">
          </div>
        </div>

      </div>
      <h2>药品资讯</h2>
      <div class="yaobutton">
        <div class="yaoActive">科室
          <span class="downImg"><img src="@/assets/images/top11.png"></span>
        </div>
        <div>排序
          <span class="downImg"><img src="@/assets/images/icon_down.png"></span>
        </div>
        <div>筛选
          <span class="downImg"><img src="@/assets/images/icon_down.png"></span>
        </div>
      </div>
      <div class="fast-consult-card-item">
        <div class="comment-info">
          <div class="header"><img src="@/assets/images/3.jpg"></div>
          <div class="comment-right">
            <p class="introduce">
              <span class="name">何某</span>&nbsp;
              <span>主任医师</span>&nbsp;
              <span>内科</span>&nbsp;
            </p>
            <p class="colo13">
              <span class="picture">图文</span>&nbsp;
              <span class="picture">电话</span>&nbsp;
              <span class="video">视频</span>&nbsp;
              <span class="reputation">好评率 98%</span>&nbsp;
            </p>
            <p class="content"> 擅长：儿科常见病、多发病 #先天性心脏病</p>
            <p class="colo13">
              <span>咨询数：66 </span>&nbsp;
              <span>平均回复时长：1小时</span>&nbsp; </p>
            <p class="price"> ￥20起 </p>
            <em>已满</em>
          </div>
        </div>
        <div class="comment-info">
          <div class="header"><img src="@/assets/images/3.jpg"></div>
          <div class="comment-right">
            <p class="introduce">
              <span class="name">何某</span>&nbsp;
              <span>主任医师</span>&nbsp;
              <span>内科</span>&nbsp;
            </p>
            <p class="colo13">
              <span class="picture">图文</span>&nbsp;
              <span class="picture">电话</span>&nbsp;
              <span class="video">视频</span>&nbsp;
              <span class="reputation">好评率 98%</span>&nbsp;
            </p>
            <p class="content"> 擅长：儿科常见病、多发病 #先天性心脏病</p>
            <p class="colo13">
              <span>咨询数：66 </span>&nbsp;
              <span>平均回复时长：1小时</span>&nbsp; </p>
            <p class="price"> ￥20起 </p>
            <em>已满</em>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>

</template>
<script type="text/babel">
export default {
  data() {
    return {
      isWeixin: false,

    };
  },
  created() {

  },
  mounted() {
    document.title = '在线问诊';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    }
  },
  methods: {
    aa() {

    },


  },
  computed: {

  },

};
</script>
 <style scoped>
@import url("./online.css");
</style>