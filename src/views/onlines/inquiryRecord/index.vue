<template>
  <div class="onlines margin50">
    <Header post-title="问诊记录"></Header>
    <div class="online-item" v-if="waitPayData.length!=0" v-show="!loadingtrue">
      <!-- 列表waitPayData -->
      <div class="inquiry-list" @click="routerTo(item)" v-for="(item, index) in waitPayData" :key="index">
        <div class="inquiry-list-head"><img src="@/assets/images/head1.png" />
          <span v-if="item.newNews">{{ item.newNews }}</span>
        </div>
        <div class="inquiry-list-info">
          <div class="inquiry-list-title">
            <span class="name"> {{ item.name }}</span>
            <span>{{item.level|level}}</span>
            <span>{{item.orgName}}</span>
            <span class="inquiry-list-title-date">{{ item.createTime | inquiryTime }}</span>
          </div>
          <div class="inquiry-list-content">
            <p class="content-info" v-if="item.msgType == 0" v-html="item.content"></p>
            <i class="iconfont icon-tupian" v-if="item.msgType == 1"></i>
          </div>
        </div>
      </div>
      <p v-show="nomore" class="noMore">没有更多数据了</p>
    </div>
    <div v-show="!loadingtrue" class="nullDiv" v-else>
      <img src="@/assets/images/null1.png">
    </div>
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
import { mapState, mapActions } from "vuex";
import { setTimeout } from "timers";
import websocketConfig from '../../../service/websocket.js'
let pay_list_url = "/app/bizOnlineServiceRecord/read/page";
export default {
  data() {
    return {
      waitPayData: [],
      busy: true,
      nomore: false,
      loadingtrue: true,
      disType: 1,
      id: '',
      page: 1,
      pageSize: 10,
    };
  },
  mounted() {

    this.WaitPay(false);
    //  用于演示临时加得
    let obj = {}
    obj.id = 125;
    this.updateUser(obj)
    websocketConfig()
  },
  methods: {
    ...mapActions(['chat/setFriendId', 'updateUser']),
    routerTo(item) {
      this.$router.push({
        name: 'inquiryOnline',
        query: {
          id: item.id, name: item.name
        }
      })


    },


    WaitPay(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      params.status = 4;
      this.$axios.put(pay_list_url, params).then((res) => {
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


  },
  computed: {
    ...mapState(["chat", "userInfo"])
  }
};
</script>

<style lang="scss" scoped>
.inquiry-record {
  box-sizing: border-box;
  padding-top: 1rem;
}
.inquiry-list {
  display: flex;
  background: #ffffff;
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
  .inquiry-list-head {
    position: relative;
    height: 100px;
    margin-right: 20px;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
    }
    span {
      position: absolute;
      top: -4px;
      right: -6px;
      display: inline-block;
      width: 32px;
      height: 32px;
      border-radius: 16px;
      background: red;
      text-align: center;
      line-height: 32px;
      font-size: 24px;
      color: #fff;
    }
  }
  .inquiry-list-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    .inquiry-list-title {
      color: #999;
      .name {
        color: #000;
      }
      span {
        margin-right: 20px;
      }
    }
    .inquiry-list-title-date {
      float: right;
      color: #000;
    }
    .inquiry-list-content {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 55%;
    }
  }
}
</style>

