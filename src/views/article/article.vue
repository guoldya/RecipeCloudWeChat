<template>
  <div class="hacker-news-list article" id="scrollup">
    <header class="aui-navBar aui-navBar-fixed">
      <span href="javascript:;" class="aui-navBar-item">
        <img src="@/assets/images/icon_back.png">
      </span>
      <div class="aui-center">
        <span>文章详情</span>
      </div>
      <span class="aui-navBar-item">
        <img src="@/assets/images/icon_collect1.png" style="width:25px;margin-right:10px">
        <img src="@/assets/images/icon_share.png" style="width:24px;height:28px">
      </span>
    </header>
    <div class="swiper-container">
      <div class="swiper-wrapper">
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="content articlecontent">
      <div class="cainter  ">
        <h1> 每天蒸饭放一把，远离三高，心脏病！</h1>
        <p class="colo13">
          <span>药师说 | </span>
          <span>2018-12-18</span>
          <span style="float:right">阅读 45455</span>
        </p>
        <p>
          想要远离冠心病、心梗、脑梗、脑出血吗？ 想要远离高血压、高血脂、高血糖吗？ 想要排便通畅，骨骼结实吗？ 想要健康到老，延年益寿吗？ 能带给您这些的东西，您一定听说过，它就是燕麦！
        </p>
      </div>
    </div>
    <div class="content">
      <div class="cainter">
        <h1 class="pingjia" style="width:100% ; margin-top:25px">评价列表</h1>
        <ul id="newsList" class="news-list">
          <li>
            <div class="detaileTop">
              <div class="headimg">
                <img src="@/assets/images/3.jpg" alt="店铺头像">
              </div>
              <div class="headRight headRightPJ">
                <div>
                  <div class="starleft">
                    <div class="startop">
                      <span>和平药房渝北店铺&nbsp;</span>
                    </div>
                    <span class="colo13">2015-12-12</span>
                  </div>
                </div>
                <p>sssssssssssssddddddd15484ssssss111111111111111111111111111111111111111</p>
              </div>
            </div>
          </li>
          <li>
            <div class="detaileTop">
              <div class="headimg">
                <img src="@/assets/images/3.jpg" alt="店铺头像">
              </div>
              <div class="headRight headRightPJ">
                <div>
                  <div class="starleft">
                    <div class="startop">
                      <span>和平药房渝北店铺&nbsp;</span>
                    </div>
                    <span class="colo13">2015-12-12</span>
                  </div>
                </div>
                <p>sssssssssssssssssss和平药房渝北店铺和平药房渝北店铺和平药房渝北店铺和平药房渝北店铺</p>
              </div>
            </div>
          </li>
          <li>
            <div class="detaileTop">
              <div class="headimg">
                <img src="@/assets/images/3.jpg" alt="店铺头像">
              </div>
              <div class="headRight headRightPJ">
                <div>
                  <div class="starleft">
                    <div class="startop">
                      <span>和平药房渝北店铺&nbsp;</span>
                    </div>
                    <span class="colo13">2015-12-12</span>
                  </div>
                </div>
                <p>sssssssssssssssssss和平药房渝北店铺和平药房渝北店铺和平药房渝北店铺和平药房渝北店铺</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script >

const scrollTopList = {};

export default {
  props: {
    id: String,
  },
  computed: {

  },
  data() {
    return {
      test: [{ filename: "http://09imgmini.eastday.com/mobile/20190121/2019012117_3cbaf127901d43c98bc1365f1895025c_6506_mwpm_03200403.jpg" },
      { filename: "http://09imgmini.eastday.com/mobile/20190121/2019012117_3cbaf127901d43c98bc1365f1895025c_6506_mwpm_03200403.jpg" },
      { filename: "http://09imgmini.eastday.com/mobile/20190121/2019012117_3cbaf127901d43c98bc1365f1895025c_6506_mwpm_03200403.jpg" },
      { filename: "http://09imgmini.eastday.com/mobile/20190121/2019012117_3cbaf127901d43c98bc1365f1895025c_6506_mwpm_03200403.jpg" }],
    };
  },
  mounted() {
    this.lunbo()
  },
  methods: {

    lunbo() {
      let mySwiper = new Swiper('.swiper-container', {
        loop: true,
        effect: 'coverflow',
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // 如果需要前进后退按钮
      })
      for (let i = 0; i < this.test.length; i++) {
        mySwiper.appendSlide(this.slidedata(this.test[i]));
      };
    },
    slidedata(i) {
      return '<div class="swiper-slide"><img src="' + i.filename + '" alt="文章详情"> </div>';
    },
  }
};
</script>
<style  scoped>
@import "./header.css";
.swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 0 5px;
}
.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: #efefef;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background: #f2cf30;
  width: 22px;
  height: 10px;
  display: inline-block;
  border-radius: 10px;
}
.swiper-slide {
  border-radius: 20px !important;
}
.swiper-container img {
  width: 100%;
  border-radius: 20px;
  height: 340px;
}
.content {
  text-align: left;
}
.cainter h1 {
  font-size: 36px;
  letter-spacing: 1px;
}
.cainter {
  margin: 0 24px;
}
.articlecontent p {
  line-height: 50px;
}
.headRight {
  width: calc(100% - 92px);
  float: right;
  text-align: left;
}
.starleft {
  width: 60%;
  float: left;
}
.news-list li {
  border-bottom: 1px solid #f5f5f5;
}

.startop {
  width: 100%;
}
.startop {
  margin-top: 0;
}
.startop span {
  line-height: 40px;
  font-size: 28px;
}
.startop span:first-child {
  margin-right: 0.8125rem;
}
.article .star img {
  width: 92px;
} 
.cainter ul li {
  display: inline-block;
  padding-bottom: 40px;
  margin-top: 40px;
}
.headRightPJ {
  width: calc(100% - 108px);
}
.headRightPJ p {
  word-break: break-all;
  width: 100%;
  overflow: auto;
}
.pingjia {
  font-size: 30px;
  padding: 0;
  float: left;
  font-weight: 400;
  line-height: 40px;
  font-family: "PingFang-SC-Medium";
}
</style>
