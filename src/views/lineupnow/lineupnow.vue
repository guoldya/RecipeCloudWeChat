<template>
  <div class="lineupnow">
    <Headerapp post-title="就诊队列"></Headerapp>
    <div class="margin50">
      <Apptab :tab-title="time" v-on:childByValue="childByValue"></Apptab>
      <div class="upnowHead">
        <div class="cardHEADER cardText" style="display:flex;">
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
            <md-switch v-model="isActive2" @change="handler2('switch0', isActive2, $event)"></md-switch>
          </div>
        </div>
      </div>
      <div v-if="goodsList.length!=0 " v-show="!loadingtrue">
        <div class="flatCard margin5" v-for="(item,index) in goodsList" :key="index">
          <div class="cardText" v-show="queryType==1">
            <p class="cardTextPP">
              <span>等待时间：
                <span class="mu-secondary-text-color" v-if="item.waitingTime>=0">{{item.waitingTime}}分钟</span>
                <span class="mu-secondary-text-color" v-else>过时</span>
              </span>
              <span>当前号码：
                <span class="mu-secondary-text-color">{{item.currentNo}}号</span>
              </span>
            </p>
            <p class="cardTextPP">
              <span>排队科室：{{item.deptName}}
              </span>
              <span>排队号码：
                <span class="mu-secondary-text-color">{{item.queueNo}}号</span>
              </span>
            </p>
            <p v-if="item.waitingNo<0">您已经过号，请重新排队</p>
            <p v-else>您前面还有：{{item.waitingNo}}位</p>
            <p class="learnMore" @click="intolineupinfo(item)">
              详情 <img class="icon_more" src="@/assets/images/icon_more.png" alt="">
            </p>
          </div>
          <div class="cardText" v-show="queryType==2">
            <p class="cardTextPP">
              <span>报告时间：
                <span class="mu-secondary-text-color">{{item.reportTime|lasttime}} </span>
              </span>
              <span class="mu-secondary-text-color" v-if="item.reportId">报告已出</span>
              <span class="mu-secondary-text-color" v-else>报告未出</span>
            </p>
            <p class="cardTextPP">
              <span>检查科室：{{item.examDept}}</span>
            </p>
            <p>检查项目：{{item.className}}</p>
            <p v-if="item.reportId" class="learnMore" @click="intoreportinfo(item)">
              查看报告 <img class="icon_more" src="@/assets/images/icon_more.png" alt="">
            </p>
          </div>
        </div>
        <p v-show="nomore" class="noMore">没有更多数据了</p>
      </div>
      <div v-show="!loadingtrue" class="nullDiv" v-else>
        <img src="@/assets/images/null1.png">
      </div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
        <span v-if="goodsList.length!=0&&!nomore">
          <span class="mu-light-text-color">加载中</span>
          <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
        </span>
      </div>
      <Loading v-show="loadingtrue"></Loading>
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
      goodsList: [],
      page: 1,
      pageSize: 10,
      queryType: 1,
      isActive: false,
      isActive2: false,
      nowTime: '',
      onlyWaiting: '',
      time: [
        { title: '排队提醒', type: 1 },
        { title: '报告提醒', type: 2 }
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
  mounted() {
    document.title = '就诊队列';
    if (this.$store.state.feeActiveId) {
      this.queryType = this.$store.state.feeActiveId
    }

    var today = new Date();
    var m = today.getMonth() + 1;
    m = m <= 9 ? "0" + m : m;
    var newDate = today.getDate();
    newDate = newDate <= 9 ? "0" + newDate : newDate;
    this.nowTime = today.getFullYear() + "年" + m + "月" + newDate + "日";
    this.waitingDate = today;
    this.getGoodslist()

  },
  methods: {
    childByValue: function (childValue) {
      this.queryType = childValue.type;
      this.$store.commit('feeActiveFun', childValue.type);
      this.goodsList = [];
      this.loadingtrue = true;
      this.page = 1;
      this.getGoodslist();
    },
    handler(name, active) {

      this.goodsList = [];
      this.loadingtrue = true;
      this.page = 1;
      this.getGoodslist();
    },
    handler2(name, active) {
      this.goodsList = [];
      this.loadingtrue = true;
      this.page = 1;
      this.getGoodslist();
    },
    getGoodslist(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;

      if (this.queryType * 1 == 2) {
        params.isUsable = this.isActive2 ? 1 : undefined;
      } else {
        params.isShield = this.isActive ? 1 : undefined;
      }

      params.queryType = this.queryType;
      // params.waitingDate = "2019-02-22";
      this.$axios.put(appbizWaitingQueuereadlist, params).then((res) => {
        if (res.data.rows) {
          this.loadingtrue = false;
          if (flag) {
            this.goodsList = this.goodsList.concat(res.data.rows);  //concat数组串联进行合并
            if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
              this.busy = false;
              this.nomore = false;
            } else {
              this.busy = true;
              this.nomore = true;
            };
          } else {
            this.goodsList = res.data.rows;
            this.busy = true;
            if (res.data.total < 10) {
              this.busy = true;
              this.nomore = true;
            } else {
              this.busy = false;
              this.nomore = false;
            }
          }
        } else {
          this.goodsList = []
        }
      })
    },

    // switchTo(data) {
    //   this.queryType = data.queryType;
    //   this.getGoodslist();
    // },
    intolineupinfo(data) {
      let argu = {};
      this.$router.push({
        name: 'lineupinfo',
        query: { id: data.id, queryType: this.queryType }
      });
    },
    intoreportinfo(data) {

      let argu = { id: data.reportId, lineupnow: 1 };
      this.$router.push({
        name: 'reportinfo',
        query: argu
      });
    },
    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.getGoodslist(true);
      }, 500);
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