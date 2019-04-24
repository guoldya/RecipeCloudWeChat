<template>
  <div class="lineupnow">
    <Headerapp post-title="复印记录"></Headerapp>
    <div class="margin50">
      <div class="upnowHead">
        <div class="cardHEADER cardText" style="display:flex;">
          <div class="fleft">
          </div>
          <div class="fright">
            <span class="pingbi">仅看通过</span>
            <md-switch v-model="isActive" @change="handler('switch0', isActive, $event)"></md-switch>
          </div>
        </div>
      </div>
      <div v-if="goodsList.length!=0 " v-show="!loadingtrue">
        <div class="flatCard margin5" v-for="(item,index) in goodsList" :key="index">
          <div class="cardText">
            <div class="appTitle">
              <span>{{item.name}}</span>
              <span class="mu-secondary-text-color">{{item.status|busistatus}}</span>
            </div>
            <p class="cardTextPP">
              <span>类型：
                <span class="mu-secondary-text-color">住院病历</span>
              </span>
              <span>科室：
                <span class="mu-secondary-text-color">{{item.dept}}</span>
              </span>
            </p>
            <div class="listData parElem">
              <span class="sonElem">申请编号</span>
              <span class="mu-light-text-color">{{item.code}}</span>
            </div>
            <div class="listData parElem">
              <span class="sonElem">入院日期：</span>
              <span class="mu-light-text-color">{{item.inTime|lasttime}}</span>
            </div>
            <div class="listData parElem">
              <span class="sonElem">出院日期：</span>
              <span class="mu-light-text-color">{{item.outTime|lasttime}}</span>
            </div>
            <p class="learnMore" @click="businssrecordinfo(item)">
              详情 <img class="icon_more" src="@/assets/images/icon_more.png" alt="">
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
let appbizWaitingQueuereadlist = "/app/bizCopyApply/read/page";
export default {
  data() {
    return {
      busy: true,
      nomore: false,
      loadingtrue: true,
      goodsList: [],
      page: 1,
      pageSize: 10,
      isActive: false,
      nowTime: '',
      onlyWaiting: '',
      waitingDate: '',

    };
  },

  mounted() {
    document.title = '复印记录';


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

    handler(name, active) {
      this.goodsList = [];
      this.loadingtrue = true;
      this.page = 1;
      this.getGoodslist();
    },

    getGoodslist(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      params.multipleStatus = this.isActive ? [2, 4] : undefined;
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

    businssrecordinfo(data) {
      let argu = {};
      this.$router.push({
        name: 'businssrecordinfo',
        query: { id: data.id, }
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
</style>