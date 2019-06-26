<template>

  <div class="appoint">
    <Header post-title="预约记录"></Header>
    <div class=" margin55">
      <div v-show="!loadingtrue" v-if="appointData.length!=0">
        <div class="flatCard margin5 outCarint" v-for="(item,i) in appointData" :key="i">
          <div>
            <div class="appTitle">
              <span>{{item.patientName}}（{{item.className}}）</span>
              <span class="mu-secondary-text-color">{{item.status | examStatus}}</span>
            </div>
            <div class="listData" style="padding-top: 6px">
              <span>预约科室</span>
              <span class="mu-light-text-color">{{item.examDept}}（{{item.hospital}}）</span>
            </div>
            <div class="listData">
              <span>预约项目</span>
              <span class="mu-light-text-color">{{item.className}}</span>
            </div>
            <div class="listData">
              <span>预约日期</span>
              <span class="mu-light-text-color">{{item.serialTime}}</span>
            </div>
          </div>
        </div>
        <p v-show="nomore" class="noMore">没有更多数据了</p>
      </div>
      <div v-show="!loadingtrue" class="nullDiv" v-else>
        <img src="@/assets/images/null1.png">
      </div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
        <span v-if="appointData.length!=0&&!nomore">
          <span class="mu-light-text-color">加载中</span>
          <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
        </span>
      </div>
      <Loading v-show="loadingtrue"></Loading>
    </div>
  </div>
</template>
<script  >
let appoint_order_url = "/api/hos/bizExamApply/read/page";
export default {
  data() {
    return {
      active1: 0,
      appointData: [],
      loadingtrue: true,
      busy: true,
      nomore: false,
      page: 1,
      pageSize: 10,
      payType: 0,
    };
  },
  created() {

  },
  mounted() {
    this.appointFun();
    document.title = '预约记录';
   
  },
  methods: {
    appointFun(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      params.applyRecord = "Y";
      this.$axios.put(appoint_order_url, params).then((res) => {
        if (res.data.rows) {
          this.loadingtrue = false;
          if (flag) {
            this.appointData = this.appointData.concat(res.data.rows);  //concat数组串联进行合并
            if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
              this.busy = false;
              this.nomore = false;
            } else {
              this.busy = true;
              this.nomore = true;
            }
          } else {
            this.appointData = res.data.rows;
            this.busy = true;
            if (res.data.total <= 10) {
              this.busy = true;
              this.nomore = true;
            } else {
              this.busy = false;
              this.nomore = false;
            }
          }
        } else {
          this.appointData = []
        }
      })
    },
    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.appointFun(true);
      }, 500);
    },
  },
  computed: {

  },

};
</script>
 <style   scoped>
    .appoint .card {
      margin-bottom: 32px;
    }
    .appoint .appointText {
      padding-top: 10px;
    }
    .appoint .appointText p {
      line-height: 60px;
    }
    .appoint .flatCard{
      border-top: none;
    }
   .appoint .listData:last-child{
     padding-bottom: 12px;
   }
   .appoint .appTitle{
     padding: 24px 0;
   }
   .appoint .listData span{
     padding: 14px 0;
   }
</style>