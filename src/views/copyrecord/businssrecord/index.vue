<template>
  <div class="lineupnow">
    <Header post-title="复印记录"></Header>
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
      <div class="upnowHeaddiv"> </div>
      <div v-if="goodsList.length!=0 " v-show="!loadingtrue">
        <Recordcard v-for="(item,i) in goodsList" :key="i" :content="item" :type="3"></Recordcard>
        <p v-show="nomore" class="noMore">没有更多数据了</p>
      </div>
      <Null :loading-true="!loadingtrue&&goodsList.length==0"></Null>
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
let appbizWaitingQueuereadlist = "/api/hos/bizCopyApply/read/page";
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
    };
  },

  mounted() {
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
      // params.payStatus = 2;
      params.queryType = this.isActive ? 2 : 3;
      // params.queryType = 3;
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
    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.getGoodslist(true);
      }, 500);
    },

  },


};
</script>
 <style   scoped>
@import url("../../lineupnow/lineupnow.css");
.upnowHead {
  position: fixed;
  z-index: 99;
  background: #ffffff;
  position: fixed;
  width: 100%;
  top: 80px;
  border-top: 10px solid #f8f8f8;
  border-bottom: 5px solid #f8f8f8;
}
.upnowHeaddiv {
  height: 60px;
}
</style>