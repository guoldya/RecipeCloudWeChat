<template>
  <div class="onlines margin50">
    <Header post-title="问诊记录"></Header>
    <div class="online-item" @click="routerTo(item)" v-for="(item, index) in chat.chatQueue" :key="index">
      <!-- <div class="header">
        <img src="@/assets/images/head1.png" alt="" />
        <span v-if="item.newNews">{{ item.newNews }}</span>
      </div>
      <div class="content">
        <p>
          {{ item.from == 123 ?'张红' : '李明明' }}&nbsp;&nbsp;女&nbsp;&nbsp; {{ item.from == 123 ?'26岁' : '32岁' }}
          <span>主治医生</span>
          <span>内科</span>
        </p>
        <p class="content-info" v-if="item.msgType == 0" v-html="item.content"></p>
        <i class="iconfont icon-tupian" v-if="item.msgType == 1"></i>
      </div>
      <div>{{ item.createTime | inquiryTime }}</div> -->

      <!-- 列表 -->
      <div class="inquiry-list" @click="routerTo(item)" v-for="(item, index) in chat.chatQueue" :key="index">
        <div class="inquiry-list-head"><img src="@/assets/images/head1.png" />
          <span v-if="item.newNews">{{ item.newNews }}</span>
        </div>
        <div class="inquiry-list-info">
          <div class="inquiry-list-title">
            <span class="name"> {{ item.from == 123 ?'张红' : '李明明' }}</span>
            <span>主治医生</span>
            <span>内科</span>
            <span class="inquiry-list-title-date">{{ item.createTime | inquiryTime }}</span>
          </div>
          <div class="inquiry-list-content">
            <p class="content-info" v-if="item.msgType == 0" v-html="item.content"></p>
            <i class="iconfont icon-tupian" v-if="item.msgType == 1"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import { setTimeout } from "timers";
import websocketConfig from '../../../service/websocket.js'

export default {
  data() {
    return {};
  },
  mounted() {
    //  用于演示临时加得
    // let obj = {}
    // obj.id = 125;
    // this.updateUser(obj)
    websocketConfig()
  },
  methods: {
    ...mapActions(['chat/setFriendId', 'updateUser']),
    routerTo(item) {
      // 获取历史消息
      let msg = {
        cmd: 19,
        type: 1,
        fromUserId: item.from,
        userId: this.userInfo.id
        // userId:item.from  == 123 ? 125 :123
      };
      this['chat/setFriendId'](item.from)
      this.chat.websocket.send(JSON.stringify(msg));
    }
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

