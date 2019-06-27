<template>
  <div class="onlines margin50">
    <Header post-title="问诊记录"></Header>
    <div class="online-item" v-if="waitPayData.length!=0" v-show="!loadingtrue">
      <!-- 列表waitPayData -->
      <div class="inquiry-list" @click="routerTo(item)" v-for="(item, index) in chat.chatQueue" :key="index">
        <div class="inquiry-list-head"><img src="@/assets/images/head1.png" />
          <span v-if="item.newNews">{{ item.newNews }}</span>
        </div>
        <div class="inquiry-list-info">
          <div class="inquiry-list-title">
            <span class="name"> {{ item.name + "  id:" + item.id }}</span>
            <span>{{item.level|level}}</span>
            <span>{{item.orgName}}</span>
            <span class="inquiry-list-title-date">{{ item.createTime | inquiryTime }}</span>
          </div>
          <div class="inquiry-list-content">
            <p class="content-info" v-html="item.content"></p>
            <!-- <p class="content-info" v-if="item.msgType == 0" v-html="item.content"></p> -->
            <!-- <i class="iconfont icon-tupian" v-if="item.msgType == 1"></i> -->
          </div>
        </div>
      </div>
      <div>
        <md-button type="warning" round @click="close">退出</md-button>
      </div>
      <p v-show="nomore" class="noMore">没有更多数据了</p>
    </div>
     <Null :loading-true="!loadingtrue "></Null>
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
import { Promise } from 'q';
// import { resolve } from 'dns';
let pay_list_url = "/api/hos/bizOnlineServiceRecord/read/page";
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
  computed: {
    ...mapState(["chat", "userInfo"])
  },
 async mounted() {
    // console.log(1)
    await this.WaitPay(false);
    // console.log(3)
    //连接websocket
    if(typeof(this.chat.websocket.url) == "undefined") {
      websocketConfig();
      //接口插入队列
      for (let i in this.waitPayData) {
        this.waitPayData[i].newNews = 0;
        this.waitPayData[i].content = '';
      }
      let arr = JSON.parse(JSON.stringify(this.waitPayData))
      this['chat/updatePayChatQueue'](arr);
      // console.log("chatQueue:"+JSON.stringify(this.chat.chatQueue))
    }
  },
  methods: {
    ...mapActions(['chat/setFriendId', 'updateUser','chat/updatePayChatQueue']),
    routerTo(item) {
      let msg = {
        cmd: 19,
        type: 1,
        fromUserId: item.id,
        userId: this.userInfo.id,
      };
      this['chat/setFriendId'](item.id)
      this.chat.websocket.send(JSON.stringify(msg));
      this.$router.push({
        name: 'inquiryOnline',
        query: {
          id: item.id,
        }
      });
    },
    close() {
      this.chat.websocket.close();
    },
    WaitPay(flag) {
      return new Promise(( resolve, reject)=>
      {
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
            // console.log(2)
            resolve(res)
            //2、
          } else {
            this.waitPayData = [];
            reject()
          }
        })
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
};
</script>

<style lang="scss" scoped>
.navigation {
  color:  var(--primary--title);
}
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

