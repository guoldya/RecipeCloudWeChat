<template>
  <div class="lineupnow">
    <Header post-title="就诊队列"></Header>
    <div :class="{margin45:isWeixin}">
      <!-- <div class="swiper-container">
        <div class="swiper-wrapper">

        </div>
      </div> -->
      <div :class="{'margin45':isWeixin,'appTab':true}">
        <span v-for="(item, index) in time" :key="'time' + index" @click="switchTo(item)" :class="type === (index+1) ? 'appTabAcitive' : '' ">
          {{item.title}}
        </span>
      </div>
      <div class="outCarint">
        <div class="card">
          <div class="cardHEADER" style="display:flex;">
            <div class="fleft">
              <img src="@/assets/images/icon_calendar.png" alt="">
              <span class="mu-secondary-text-color">12月14日</span>
            </div>
            <div class="fright">
              <span class="pingbi">屏蔽过号提醒</span>
              <md-switch v-model="isActive" @change="handler('switch0', isActive, $event)"></md-switch>
            </div>
          </div>
        </div>
        <div class="card margin16" v-for="(item,index) in 12" :key="index">
          <div class="cardText">
            <p class="cardTextPP">
              <span>等待时间：
                <span class="mu-secondary-text-color">20分钟</span>
              </span>
              <span>排队号码：
                <span class="mu-secondary-text-color">119号</span>
              </span>
            </p>
            <p class="cardTextPP">
              <span>排队科室：耳鼻喉门诊
              </span>
              <span>当前号码：
                <span class="mu-secondary-text-color">119号</span>
              </span>
            </p>
            <p>您前面还有：5位</p>
            <p class="learnMore" @click="intolineupinfo(item)">
              详情 <img class="icon_more" src="@/assets/images/icon_more.png" alt="">
            </p>
          </div>
        </div>
        <!-- <div v-show="!loadingtrue" class="nullDiv" v-else>
          <img src="@/assets/images/null1.png">
        </div> -->
        <!-- <div class="card margin16">
          <div class="cardText">
            <p class="cardTextPP">
              <span>等待时间：
                <span class="mu-secondary-text-color">20分钟</span>
              </span>
              <span>排队号码：
                <span class="mu-secondary-text-color">119号</span>
              </span>
            </p>
            <p class="cardTextPP">
              <span>排队科室：耳鼻喉门诊
              </span>
              <span>当前号码：
                <span class="mu-secondary-text-color">119号</span>
              </span>
            </p>
            <p>您前面还有：5位</p>
            <p class="learnMore" @click="intolineupinfo">
              详情 <img class="icon_more" src="@/assets/images/icon_more.png" alt="">
            </p>
          </div>
        </div> -->
      </div>
      <!-- <div class="outCarint" v-if="type === 2">
        <div class="card">
          <div class="cardHEADER" style="display:flex;">
            <div class="fleft">
              <img src="@/assets/images/icon_calendar.png" alt="">
              <span class="mu-secondary-text-color">12月14日</span>
            </div>
            <div class="fright">
              <span class="pingbi">仅看报告已出</span>
              <md-switch v-model="isActive" @change="handler('switch0', isActive, $event)"></md-switch>
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
            <p>检查科室：演示医院</p>
            <p>检查项目：演示医院</p>
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
            <p>检查科室：演示医院</p>
            <p>检查项目：演示医院</p>
          </div>
        </div>
      </div> -->

    </div>
  </div>
</template>
<script type="text/babel">
let appbizWaitingQueuereadlist = "/app/bizWaitingQueue/read/list";
export default {
  data() {
    return {
      busy: true,
      nomore: false,
      loadingtrue: true,
      goodsList: '',
      page: 1,
      pageSize: 10,
      type: 1,
      isWeixin: false,
      isActive: true,
      time: [
        { title: '排队提醒', type: 1 },
        { title: '报告提醒', type: 2 }
      ],

      // test: [{ filename: "https://kano.guahao.cn/IvZ2706441_image140.jpg?timestamp=1469427168922" },
      // { filename: "https://kano.guahao.cn/REk2640164_image140.jpg" },
      // { filename: "https://kano.guahao.cn/elarge_E2w2711261.jpg?timestamp=1538979619031" },
      // { filename: "https://kano.guahao.cn/elarge_TZF2624794.jpg" }],
    };
  },
  created() {

  },
  watch: {
    type: function (newType, oldType) {
      this.type = newType;
      this.goodsList = [];
      this.page = 1;
      this.loadingtrue = true;
      this.getGoodslist();
    },
  },
  mounted() {

    document.title = '就诊队列';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    }

    var today = new Date();
    this.nowTime = today.getFullYear() + "年" + today.getMonth() + "月" + today.getDate() + "日" + today.getHours() + "时" + today.getMinutes() + "分" + today.getSeconds() + "秒";


    this.getGoodslist()


  },
  methods: {
    getGoodslist() {
      this.$axios.put(appbizWaitingQueuereadlist, {
        type: this.type,
      }).then(res => {
        if (res.data.code == '200') {
          for (let i = 0; i < res.data.rows.length; i++) {
            this.selectorValue = res.data.rows[0].patientName;
            // this.id = String(res.data.rows[0].id);
            let neslist = {
              text: res.data.rows[i].patientName,
              value: res.data.rows[i].id
              // value: String(res.data.rows[i].id)
            }
            this.optionsData.push(neslist);
          }

        } else if (res.data.code == '800') {

        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    switchTo(data) {

      this.type = data.type;
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
    // lunbo() {
    //   let mySwiper = new Swiper('.swiper-container', {
    //     // freeMode: false,
    //     pagination: {
    //       el: '.swiper-pagination',
    //       clickable: true,
    //     },
    //     onInit: function (swiper) {
    //       //Swiper初始化了
    //       alert(swiper.activeIndex);
    //     },
    //     loop: true,
    //     loopedSlides: 10,
    //     initialSlide: 2,
    //     roundLengths: true,
    //     slidesPerView: "auto",
    //     centeredSlides: true,
    //     followFinger: false,

    //   });
    //   for (let i = 0; i < this.test.length; i++) {
    //     mySwiper.appendSlide(this.slidedata(this.test[i]));
    //   };
    // },
    // slidedata(i) {
    //   return '<div class="swiper-slide"> <div class="card"><div class="cardTextslider"><a class="headimg"> <img src="' + i.filename + '" alt="文章详情"> </a> <h1 class="titleh1">演示医院</h1> <p>地址：成都市武侯区</p>   </div></div></div>';
    // },
  },
  computed: {

  },

};
</script>
 <style   scoped>
@import url("./lineupnow.css");
</style>