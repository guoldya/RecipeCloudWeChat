<template>
  <div class="lineupnow">
    <Header post-title="就诊队列"></Header>
    <div :class="{margin45:isWeixin}">
      <div :class="{'margin45':isWeixin,'appTab':true}">
        <span v-for="(item, index) in time" :key="'time' + index" @click="switchTo(item)" :class="queryType === (index+1) ? 'appTabAcitive' : '' ">
          {{item.title}}
        </span>
      </div>
      <div class="outCarint">
        <div v-show="goodsList.length!=0 " class="card">
          <div class="cardHEADER" style="display:flex;">
            <div class="fleft">
              <img src="@/assets/images/icon_calendar.png" alt="">
              <span class="mu-secondary-text-color">{{ nowTime}}</span>
            </div>
            <div class="fright" v-show="queryType==1">
              <span class="pingbi">屏蔽过号提醒</span>
              <md-switch v-model="isActive" @change="handler('switch0', isActive, $event)"></md-switch>
            </div>
            <div class="fright" v-show="queryType==2">
              <span class="pingbi">仅看报告已出</span>
              <md-switch v-model="isActive" @change="handler('switch0', isActive, $event)"></md-switch>
            </div>
          </div>
        </div>
        <div v-show="goodsList.length!=0" class="card margin16" v-for="(item,index) in goodsList" :key="index">
          <div class="cardText">
            <p class="cardTextPP">
              <span>等待时间：
                <span class="mu-secondary-text-color">{{item.waitingTime}}分钟</span>
              </span>
              <span>排队号码：
                <span class="mu-secondary-text-color">{{item.currentNo}}号</span>
              </span>
            </p>
            <p class="cardTextPP">
              <span>排队科室：{{item.deptName}}
              </span>
              <span>当前号码：
                <span class="mu-secondary-text-color">{{item.queueNo}}号</span>
              </span>
            </p>
            <p>您前面还有：{{item.waitingNo}}位</p>
            <p class="learnMore" @click="intolineupinfo(item)">
              详情 <img class="icon_more" src="@/assets/images/icon_more.png" alt="">
            </p>
          </div>
        </div>
        <div v-show="goodsList.length==0" class="nullDiv">
          <img src="@/assets/images/null1.png">
        </div>
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
let appbizWaitingQueuereadlist = "/biz/app/bizWaitingQueue/read/list";
export default {
  data() {
    return {
      busy: true,
      nomore: false,
      loadingtrue: true,
      goodsList: [],
      page: 1,
      pageSize: 10,
      queryType: 1,
      isWeixin: false,
      isActive: false,
      nowTime: '',
      onlyWaiting: '',
      time: [
        { title: '排队提醒', queryType: 1 },
        { title: '报告提醒', queryType: 2 }
      ],
      waitingDate: '',
      // test: [{ filename: "https://kano.guahao.cn/IvZ2706441_image140.jpg?timestamp=1469427168922" },
      // { filename: "https://kano.guahao.cn/REk2640164_image140.jpg" },
      // { filename: "https://kano.guahao.cn/elarge_E2w2711261.jpg?timestamp=1538979619031" },
      // { filename: "https://kano.guahao.cn/elarge_TZF2624794.jpg" }],
    };
  },
  created() {

  },
  watch: {
    queryType: function (newqueryType, oldqueryType) {
      this.queryType = newqueryType;
      this.goodsList = [];
      this.page = 1;
      this.isActive = false;
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
    this.nowTime = today.getFullYear() + "年" + today.getMonth() + "月" + today.getDate() + "日";

    this.waitingDate = today;
    // str = str.replace(/MM/, today.getMonth() > 9 ? today.getMonth().toString() : '0' + today.getMonth());
    // console.log(str);


    var Month = (today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : "0" + (today.getMonth() + 1);
    console.log(Month)

    this.getGoodslist()


  },
  methods: {
    handler(name, active) {
      this.getGoodslist()
    },
    getGoodslist() {
      this.$axios.put(appbizWaitingQueuereadlist, {
        queryType: this.queryType,
        onlyWaiting: this.isActive ? 'Y' : undefined,
        waitingDate: "2019-02-22",
      }).then(res => {
        if (res.data.code == '200') {
          this.goodsList = res.data.rows;
          // this.nowTime = res.data.rows[0].waitingDate;
        } else if (res.data.code == '800') {

        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    switchTo(data) {

      this.queryType = data.queryType;
    },
    intolineupinfo(data) {
      let argu = {}
      this.$router.push({
        name: 'lineupinfo',
        query: { id: data.id,queryType:this.queryType }
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