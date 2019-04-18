<template>
  <div class="paySuccess">
    <div class="feesucces examineDetail page-loadmore">
      <div class="navigation">
        <i class="icon-iconfontjiantou" @click="$router.go(-2)">
          <img src="@/assets/images/icon_back.png">
        </i>
        <div class="navigation-content">
          处方记录
        </div>
        <div class="right">
          <slot></slot>
        </div>
      </div>
      <div class="flatCard margin55">
        <div class="successImg">
          <img src="@/assets/images/icon_success.png" alt="">
          <p>支付成功</p>
        </div>
        <div class="outCarint">
          <div class="margin16">
            <div class="listData">
              <span>支付方式</span>
              <span class="mu-secondary-text-color">{{payWay.text}}</span>
            </div>
            <div class="listData">
              <span>支付金额</span>
              <span class="mu-secondary-text-color">￥198.00</span>
            </div>
            <div v-if="acceptIndex==1" class="listData">
              <span>自提地址</span>
              <span style="width: 74%" class="mu-secondary-text-color">重庆市渝北区加州路88号（和平大药房）</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flatCard margin16">
      <div class="outCarint">
        <div class="margin16" style="padding:20px 0">
          <p>温馨提示：您已提交续方申请，现在请与在线医师完成病情评估，以便医生能够尽快审核通过您的续方申请。</p>
        </div>
      </div>
    </div>
    <p class="addbTN" @click="send">点击在线评估</p>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      payWay: [],
      acceptIndex: null,
    };
  },

  computed: {
    ...mapState({
      // 这里用于测试 实际上要区分
      chat: state => state.chat,
      userInfo: state => state.userInfo
    }),
  },
  mounted() {
    this.payWay.push(this.$store.state.payWay[0]);
    this.acceptIndex = this.$store.state.payWay[1];
    document.title = '支付成功';
  },
  methods: {
    ...mapActions(["chat/setPatienDetail", "chat/setHistoryNews", 'updateUser']),
    // 发送消息
    send() {

      
      let createTime = new Date().getTime();
      let msg = {
        // 发送消息传的数据
        from: this.userInfo.id,
        to: Number(this.$route.query.id),
        cmd: 11,
        createTime: createTime,
        msgType: 0,
        chatType: 2,
        content: "咨询药品的测试"
      };
   
      // 把当前发送的消息添加到历史消息去
      let arr = JSON.parse(JSON.stringify(this.chat.historyNews))
      arr.push(msg)
      this['chat/setHistoryNews'](arr)
      this.chat.websocket.send(JSON.stringify(msg));
     
    },
  },


};
</script>
<style   scoped>
.headimg {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  float: left;
  text-align: center;
  margin-right: 10px;
}
.lineheight50 {
  line-height: 50px;
  border-bottom: 1px solid #f5f5f5;
}
.headimg img {
  width: 100%;
  border-radius: 50%;
  height: 100%;
  text-align: center;
}
.grid-cell span {
  font-weight: 700;
}
.titleh1 {
  font-size: 17px;
}

.card {
  margin-top: 14px;
}
.card:first-child {
  margin-top: 64px;
}
.cardText {
  padding: 0 16px;
  font-size: 14px;
  color: var(--primary--title);
}
.card p {
  line-height: 25px;
}
.mu-raised-button {
  height: 45px;
}

.examineDetail .successImg {
  text-align: center;
  margin-top: 110px;
  background-color: #fff;
  padding: 80px 0;
}
.examineDetail .successImg img {
  width: 160px;
  height: 160px;
}
.examineDetail .successImg p {
  font-size: 30px;
  margin-top: 18px;
}
.examineDetail .successWord p {
  padding: 80px 28px;
  text-indent: 7%;
  font-size: 26px;
  word-break: normal;
}
.examineDetail .backH {
  margin-top: 60px;
}
.examineDetail .bacCenter {
  background-color: #ffffff;
  padding-bottom: 10px;
  line-height: 52px;
}
.feesucces .bacCenter div div {
  width: 60%;
  margin: 0 auto;
}
</style>