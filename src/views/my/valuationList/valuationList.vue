<template>
  <div class="recipeRecord  valuationList">
    <Header post-title="就医评价"></Header>
    <div class="margin50">
      <div class="reportqueryTab">
        <Apptab :tab-title="departs" v-on:childByValue="childByValue"></Apptab>
      </div>
      <div class="reportqueryTabDIV2"></div>
      <div v-if="waitPayData.length!=0" v-show="!loadingtrue">
        <div class="recordcard" v-for="(item,i) in waitPayData" :key="i">
          <ValuationCard :waitData="item" :queryType="queryType"></ValuationCard>
        </div>
        <p v-show="nomore" class="noMore">没有更多数据了</p>
      </div>
      <Null :loading-true="!loadingtrue&&waitPayData.length==0"></Null>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
        <span v-if="waitPayData.length!=0&&!nomore">
          <span class="mu-light-text-color">加载中</span>
          <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
        </span>
      </div>
      <Loading v-show="loadingtrue"></Loading>
    </div>
  </div>
</template>
<script type="text/babel">
let bizLisReportreadpage = '/app/bizPatientEvaluate/read/page';

export default {
  data() {
    return {
      departs: [
        { title: '待评价', type: 1 },
        { title: '已评价', type: 2 },
      ],
      noDataTitle: "已评价",
      waitPayData: [],
      queryType: 1,
      page: 1,
      pageSize: 10,
      busy: true,
      nomore: false,
      loadingtrue: true,
    };
  },
  created() {
    if (sessionStorage.getItem('feeActiveFun')) {
      this.status = sessionStorage.getItem('feeActiveFun') * 1
    }
  },
  async mounted() {

    await this.WaitPay(false);

  },
  watch: {
    queryType: function (val, oldval) {
      this.page = 1;
      this.waitPayData = [];
      this.loadingtrue = true;
      this.departs[0].loading = true;
      this.WaitPay(false);
    },


  },
  methods: {

    childByValue: function (childValue) {
      this.queryType = childValue.type;
      this.noDataTitle = childValue.title;
      sessionStorage.setItem('feeActiveFun', childValue.type)
    },
    async  WaitPay(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      params.evaluateStatus = this.queryType - 1;
      this.$axios.put(bizLisReportreadpage, params).then((res) => {
        if (res.data.code == 200) {
          this.loadingtrue = false;
          this.departs[0].loading = false;
          if (res.data.rows) {
            if (flag) {
              this.waitPayData = this.waitPayData.concat(res.data.rows);  //concat数组串联进行合并
              if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                this.busy = false;
                this.nomore = false;
              } else {
                this.busy = true;
                this.nomore = true;
              }
            } else {
              this.waitPayData = res.data.rows;
              this.busy = true;
              if (res.data.total < 10) {
                this.busy = true;
                this.nomore = true;
              } else {
                this.busy = false;
                this.nomore = false;
              }
            }
            //2、
          } else {
            this.waitPayData = []
          }
        } else {
          console.log(res.data.msg);
        }

      }).catch(function (err) {
        console.log(err);
      });

    },

    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.WaitPay(true);
      }, 500);
    },


    intoDetail(val) {
      let aa = {};
      aa.id = val.id;
      aa.type = val.type;
      aa.evaluateStatus = this.queryType - 1;
      if (this.queryType - 1 == 0) {
        aa.time = val.outTime;
      } else {
        aa.time = val.createTime;
      }
      if (val.type == 1) {
        aa.title = val.area
      } else if (val.type == 2) {
        aa.title = val.dept
      }
      this.$router.push({
        name: 'valuationList',
        query: aa,
      });
    },

  },

};
</script>
<style>
.reportqueryTab {
  z-index: 70;
  background: #f8f8f8;
  position: fixed;
  width: 100%;
}
.reportqueryTabDIV2 {
  height: 70px;
}
</style>