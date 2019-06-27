<template>
  <div class="margin100">
    <Header post-title="诊疗记录"></Header>
    <div class="visitingrecordTab">
      <Timefilter type="visitingrecord" v-on:childByTime="childByTime" v-on:tabTime="tabTime" />
    </div>
    <div class="visitingrecordTabDIV"></div>
    <div v-if="waitPayData.length!=0" v-show="!loadingtrue">
      <div v-for="(item,i) in waitPayData" :key="i" class="visitingrecord-content">
        <div class="visiting-card" @click="visitinginfo(item)">
          <div class="visiting-date" :class="{'zhuyuan':item.type==2}">
            <p class="visiting-day">{{item.createTime|inquiryDDD}}</p>
            <p class="visiting-year">{{item.createTime|inquiryYaer}}</p>
            <div class="line"></div>
            <p v-if="item.type==1" class="visiting-type">门诊</p>
            <p v-if="item.type==2" class="visiting-type">住院</p>
          </div>
          <div class="visiting-content">
            <p>姓名：
              <span>{{item.name}}</span>
            </p>
            <p v-if="item.type==1">科室：
              <span>{{item.dept}}</span>
            </p>
            <p v-if="item.type==2">病区：
              <span>{{item.area}}</span>
            </p>
            <p>诊断：
              <span v-if="item.diag.length>13">{{item.diag.substring(0,13)}}...</span>
              <span v-else>{{item.diag.substring(0,13)}}</span>
            </p>
          </div>
          <div class="box-right">
            <img src="@/assets/images/icon_right.png" alt="">
          </div>
        </div>
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
</template>

<script>
let appbizOhRecordreadpage = "/api/hos/bizOhRecord/read/page"
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      busy: true,
      nomore: false,
      loadingtrue: true,
      waitPayData: [],
      type: 0,
      timeClass: 1,
    };
  },
  watch: {
    type: function (val, oldval) {
      this.page = 1;
      this.waitPayData = [];
      this.loadingtrue = true;
      this.WaitPay(false);

    },
    timeClass: function (vallevel, oldlevel) {
      this.page = 1;
      this.waitPayData = [];
      this.loadingtrue = true;
      this.WaitPay(false);
    },

  },
  async mounted() {
    this.WaitPay(false);
    if (sessionStorage.getItem('feeActiveFun')) {
      this.queryType = sessionStorage.getItem('feeActiveFun') * 1
    }
  },
  methods: {
    tabTime: function (childValue) {
      this.type = childValue;
      sessionStorage.setItem('feeActiveFun', childValue)
    },
    childByTime: function (childByTime) {
      this.timeClass = childByTime.timeClass;
    },
    visitinginfo(data) {
      this.$router.push({
        name: 'visitinginfo',
        query: { id: data.id, type: data.type }
      });
    },


    WaitPay(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      params.timeClass = this.timeClass;
      params.type = this.type != 0 ? this.type : undefined;
      this.$axios.put(appbizOhRecordreadpage, params).then((res) => {
        if (res.data.rows) {
          this.loadingtrue = false;
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
      })
    },
    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.WaitPay(true);
      }, 500);
    },


  }
}
</script>

<style lang="scss" scoped>
.visitingrecordTab {
  z-index: 99;
  background: #f8f8f8;
  position: fixed;
  width: 100%;
  padding: 24px 0;
}
.visitingrecordTabDIV {
  height: 82px;
}
.visitingrecord-content {
  margin: 24px;
  background: #ffffff;
  border-radius: 14px;
  .visiting-card {
    display: flex;
    .visiting-date {
      text-align: center;
      background: #ebf3fd;
      border-radius: 14px 0 0 14px;
      padding: 24px 15px;
      color: #149cf1;
      .line {
        height: 4px;
        background: #149cf1;
        width: 100px;
        margin: 20px;
      }
      .visiting-day {
        font-size: 34px;
        //   font-weight: 600
      }
      .visiting-year {
        font-size: 26px;
      }
      .visiting-type {
        font-size: 32px;
      }
    }
    .zhuyuan {
      color: #26c8d5;
      background: #e3f5f6;
      .line {
        background: #26c8d5;
      }
    }
    .visiting-content {
      padding: 30px 20px;
      flex: 0 0 500px;

      p:nth-child(2) {
        line-height: 70px;
      }
      p:nth-child(3) {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      span {
        color: #8d8d8d;
      }
    }
    .box-right {
      display: flex;
      align-items: center;
      margin-top: 0;

      img {
        width: 14px;
      }
    }
  }
}
</style>

