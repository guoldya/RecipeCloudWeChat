<template>
  <div class="page-loadmore">
    <Header post-title="选择科室" v-show="isWeixin"></Header>
    <div style="margin-top:45px">
      <div class="swiper-container">
        <div class="swiper-wrapper">

        </div>
      </div>
      <div class="appTab">
        <span v-for="(item, index) in time" :key="'time' + index" @click="switchTo(index)" :class="active1 === index ? 'appTabAcitive' : '' ">
          {{item.title}}
        </span>
      </div>
      <div class="outCarint" v-if="active1 === 0">
        <div class="card">
          <div class="cardHEADER" style="display:flex;">
            <div class="fleft">
              <img src="@/assets/images/icon_calendar.png" alt="">
              <span class="mu-secondary-text-color">12月14日</span>
            </div>
            <div class="fright">
              <span>屏蔽过号提醒</span>
            </div>
          </div>
        </div>
        <div class="card margin16">
          <div class="cardText">
            <mu-row class="lineheight30">
              <mu-col span="6">
                <div class="grid-cell">
                  <span>等待时间：
                    <span class="mu-secondary-text-color">20分钟</span>
                  </span>
                </div>
              </mu-col>
              <mu-col span="6" style="text-align: right;">
                <div class="grid-cell">
                  <span>排队号码：
                    <span class="mu-secondary-text-color">20号</span>
                  </span>
                </div>
              </mu-col>
            </mu-row>
            <mu-row class="lineheight30">
              <mu-col span="6">
                <div class="grid-cell">
                  排队科室：姗姗科
                </div>
              </mu-col>
              <mu-col span="6" style="text-align: right;">
                <div class="grid-cell   ">
                  <span>当前号码：
                    <span class="mu-secondary-text-color">20号</span>
                  </span>
                </div>
              </mu-col>
            </mu-row>
            <p>您前面还有：
              <span class="mu-secondary-text-color">5位</span>
            </p>
            <p class="learnMore" @click="intolineupinfo">
              详情 <img class="icon_more" src="@/assets/images/icon_more.png" alt="">
            </p>
          </div>
        </div>
      </div>
      <div class="outCarint" v-if="active1 === 1">
        <div class="card">
          <div class="cardHEADER" style="display:flex;">
            <div class="fleft">
              <img src="@/assets/images/icon_calendar.png" alt="">
              <span class="mu-secondary-text-color">12月14日</span>
            </div>
            <div class="fright">
              <span>仅看报告已出</span>
            </div>
          </div>
        </div>
        <div class="card margin16">
          <p class="appTitle">
            <span>等待时间：
              <span class="mu-secondary-text-color">20分钟</span>
            </span>
            <span class="mu-secondary-text-color">报告已出</span>
          </p>
          <div class="cardText">
            <p>检查科室：艘船大学华西</p>
            <p>检查项目：艘船大学华西</p>
            <p class="learnMore" @click="intoreportinfo">
              查看报告 <img class="icon_more" src="@/assets/images/icon_more.png" alt="">
            </p>
          </div>
        </div>
        <div class="card margin16">
          <p class="appTitle">
            <span>等待时间：
              <span class="mu-secondary-text-color">20分钟</span>
            </span>
            <span class="mu-secondary-text-color">报告待出</span>
          </p>
          <div class="cardText">
            <p>检查科室：艘船大学华西</p>
            <p>检查项目：艘船大学华西</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      isWeixin: false,
      test: [{ filename: "2.jpg" }, { filename: "banner.png" }, { filename: "1.jpg" }, { filename: "4.jpg" }],
      active1: 0,
      time: [
        { title: '排队提醒' },
        { title: '报告提醒' }
      ],
    };
  },
  created() {

  },
  mounted() {
    this.lunbo();
    document.title = '就诊队列';
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
    switchTo(num) {
      this.active1 = num;
    },
    intolineupinfo() {
      let argu = {}
      this.$router.push({
        name: 'lineupinfo',
        query: argu
      });
    },
    intoreportinfo() {
      let argu = {}
      this.$router.push({
        name: 'reportinfo',
        query: argu
      });
    },
    lunbo() {
      let mySwiper = new Swiper('.swiper-container', {
        // freeMode: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        loop: true,
        loopedSlides: 10,
        initialSlide: 2,
        roundLengths: true,
        slidesPerView: "auto",
        centeredSlides: true,
        followFinger: false,
      });
      for (let i = 0; i < this.test.length; i++) {
        mySwiper.appendSlide(this.slidedata(this.test[i]));
      };
    },
    slidedata(i) {
      return '<div class="swiper-slide"> <div class="card"><div class="cardTextslider"><a class="headimg"> <img src="http://apipic.boomake.com/banner/13.png" alt="店铺头像"></a> <h1 class="titleh1">四川大学华西医院</h1> <p>地址：成都市武侯区</p>   </div></div></div>';
    },
  },
  computed: {

  },

};
</script>
 <style   scoped>
@import url("./lineupnow.css");
</style>