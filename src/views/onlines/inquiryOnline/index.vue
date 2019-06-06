<!--在线问诊 -->
<template>
  <div class="inquiry-online ">
    <Navigation type="onlineNav" :title="$route.query.name">
      <span class="mu-secondary-text-color" @click="endInquiry">结束问诊</span>
    </Navigation>
    <!-- 聊天内容区域 -->
    <div class="inquiry-online-content" ref="chatContent" @click="toolType=''">
      <ul class="online-content-warp">
        <li v-for="(item, index) in  chat.historyNews" :key="index" class="online-content-list" :class="item.from != userInfo.id ? '' : 'right'">
          <!-- <img class="online-content-list-head" src="@/assets/images/3.jpg" v-if="item.from != userInfo.id" alt="" />
          <img class="online-content-list-head" src="@/assets/images/3.jpg" v-else alt="" /> -->

          <img class="online-content-list-head" src="@/assets/images/head1.png" v-if="item.from != userInfo.id" alt="" />
          <img class="online-content-list-head" src="@/assets/images/head.png" v-else alt="" />
          <div class="online-content-list-text" v-if="item.msgType == 0">
            <em></em>
            <div v-html="item.content"></div>
          </div>
          <div class="online-content-list-text" v-if="item.msgType == 7">
            <em></em>
            <div class="describe">
              <p>姓名：{{item.content.patientName}}</p>
              <p>性别：{{item.content.sex|examSex}}</p>
              <p>年龄：{{item.content.age}}</p>
              <p>问题描述：{{item.content.questionDes}}</p>
              <p>既往病史：{{item.content.anamnesisDes}}</p>
            </div>
            <div class="content">
              <img src="@/assets/images/head1.png" alt="">
              <img src="@/assets/images/head1.png" alt="">
              <img src="@/assets/images/head1.png" alt="">
            </div>
          </div>
          <div class="online-content-list-text" v-if="item.msgType == 1">
            <img :src="'http://192.168.0.22:8888'+item.content" alt="" style="width:100px;" @click="showViewer('http://192.168.0.22:8888'+item.content)">
          </div>
        </li>
      </ul>
    </div>
    <!-- 聊天工具栏 -->
    <div class="inquiry-online-tool">
      <div class="inquiry-online-tool-voice">
        <span class="yuyiin">
          <i class="iconfont icon-yuyin"></i>
        </span>
        <div contentEditable="true" class="input" @click="e => e.target.focus()" @input="changeVal" ref="inputModel">
        </div>
        <span class="send" @click="send" :class="inputValue ? 'active' : ''">发送</span>
      </div>
      <div class="inquiry-online-tool-detail">
        <span @click="tool('img')">
          <input class="upload-img" ref="uploadImg" type="file" @change="upload" accept="image/*">
          <i class="iconfont icon-tupian"></i>
        </span>
        <span @click="tool('video')">
          <i class="iconfont icon-shipin"></i>
        </span>
        <span @click="tool('drug')">
          <i class="iconfont icon-yaopin"></i>
        </span>
        <span @click="tool('emoji')" :class="toolType == 'emoji' ? 'active' :''">
          <i class="iconfont icon-biaoqing1"></i>
        </span>
        <!-- <span @click="tool('more')" :class="toolType == 'more' ? 'active' :''">
          <i class="iconfont icon-jiahao"></i>
        </span> -->
      </div>
      <ul class="inquiry-online-tool-add" v-if="toolType == 'more'">
        <!-- <router-link tag="li" to="/quickReply">
          <span class="icon-span">
            <md-icon name="authentication"></md-icon>
          </span>
          <span>快捷回复</span>
        </router-link> -->

        <!-- <router-link tag="li" to="/diagnosticRecord">
          <span class="icon-span">
            <i class="iconfont icon-xinxi"></i>
          </span>
          <span>诊疗记录</span>
        </router-link> -->
      </ul>

      <ul class="emoji-list" v-if="toolType == 'emoji'">
        <li v-for="(item,index) in emojiList" :key="index" @click="emojiAdd(item)">{{item}}</li>
      </ul>
    </div>
    <div v-show="isQeustion" @click="closeMask" class="md-popup-mask"></div>
    <div v-show="isQeustion" class="inquiry-online-tool-aa">
      <p class="inquiry-online-tool-ab">
        <span style="color:#FF9900"> 是否结束问诊?</span>
        <span class="mu-secondary-text-color">00:{{timeH}}</span>
      </p>
      <p class="inquiry-online-tool-cotent">感谢您的信任与支持，如结束咨询，请对我的服务进行评价</p>
      <p class="inquiry-online-tool-ab">
        <span class="questionBtn" @click="isQeustion=false">继续问诊</span>
        <span class="questionBtn" @click="overConfirm">结束问诊</span>
      </p>
    </div>
    <div v-show="isQeustionOver" class="inquiry-online-tool-aa">
      <p class="inquiry-online-tool-ab">
        <span style="color:#FF9900">问诊已结束</span>
      </p>
      <p class="inquiry-online-tool-cotent">感谢您的信任与支持，本次问诊已结束，请对我的服务进行评价。</p>
      <p class="inquiry-online-tool-ab">
        <span class="questionBtn" @click="medicalEva">立即评价</span>
        <span class="questionBtn">再次问诊</span>
      </p>
    </div>

    <!-- 编辑弹窗 -->
    <md-dialog :closable="true" layout="column" v-model="dialogOpen">
      <img src="@/assets/images/user.png" alt="">
      <div class="edit-dialog-item">
        <p>张丽&nbsp;&nbsp;女&nbsp;&nbsp;30岁</p>
        <div>
          <span>分组</span>
          <span class="edit-dialog-item-content">门诊</span>
          <i class="iconfont icon-iconfontjiantou5"></i>
        </div>
        <div>
          <span>备注</span>
          <span class="edit-dialog-item-content">感冒</span>
          <i class="iconfont icon-iconfontjiantou5"></i>
        </div>
      </div>
    </md-dialog>
    <!-- 图片显示器 -->
    <md-image-viewer v-model="isViewerShow" :list="currentImg" :has-dots="false" :initial-index="0">
    </md-image-viewer>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import websocketConfig from '../../../service/websocket.js'
let updateOrder = "/app/bizOnlineServiceRecord/updateOrder"
import { Dialog } from 'mand-mobile'
export default {
  data() {
    return {
      timeH: '',
      TIME_COUNT: 15,
      toolType: '', // 底部工具栏类型 img 图片 video 视频 drug 开药 emoji 表情 more 更多
      inputValue: "",
      socket: "",
      isQeustion: false,
      isQeustionOver: false,
      height: null,
      currentImg: [], // 当前图片
      dialogOpen: false,
      isViewerShow: false, // 是否大图显示
      clickViewer: false, // 是否点击的是图片，true点击，用于不让滚动条滚动到指定位置
      emojiList: ['😀', '😁', '😂', '😃', '😄', '😅', '😆', '😉', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '😇', '😐', '😑', '😶', '😏', '😣', '😥', '😮', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '😒', '😓', '😔', '😕', '😲', '😷', '😖', '😞', '😟', '😤', '😢', '😭', '😦', '😧', '😨', '😬', '😰', '😱', '😳', '😵', '😡', '😠'],
    };
  },
  // 
  computed: {
    // ...mapState(["chat", "userInfo"])
    ...mapState({
      chat: state => state.chat,
      userInfo: state => state.userInfo
    }),
  },
  async mounted() {
    // 让滚动条滚动到指定位置
    this.scrollBottom();
    // this.height =this.$refs.inputModel.getBoundingClientRect().height
    // websocketConfig();
    //  用于演示临时加得
    let obj = {}
    obj.id = 125;
    // this.updateUser(obj)
    websocketConfig();
  },
  updated: function () {
    if (this.isViewerShow) {
      return false
    } else if (!this.isViewerShow && this.clickViewer) {
      this.clickViewer = false
      return false
    }
    this.scrollBottom();
  },
  methods: {

    ...mapActions(['chat/setFriendId', 'updateUser']),
    closeMask() {
      this.isQeustion = false;

      clearInterval(this.timer);
    },
    endInquiry() {
      if (this.isQeustion) return
      this.isQeustion = true;
      this.timeH = this.TIME_COUNT;
      this.timer = setInterval(() => {
        if (this.timeH > 1 && this.timeH <= this.TIME_COUNT) {
          this.timeH--;
        } else {
          this.isQeustion = false;
          this.overQuestion();
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },


    overConfirm() {
      this.isQeustionOver = true;
    },

    medicalEva() {
      this.$router.push({
        name: 'medicalEva',
        query: {
          id: this.$route.query.id, name: this.$route.query.name
        }
      });
    },

    // 结束问诊订单

    async  overQuestion() {
      // 查询评论
      try {
        let res = await this.$axios.post(updateOrder, {
          id: Number(this.$route.query.orderId),
          status: 4,
        });
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }
        if (res.data.code == 200) {
          this.medicalEva();
        }

      } catch (error) {
        console.log(error.message);
      }
    },
    ...mapActions(["chat/updateChatQueue", "chat/setHistoryNews", "chat/setChatQueue"]),
    scrollBottom() { // 内容区在底部
      this.$nextTick(function () {
        var ele = this.$refs.chatContent;
        ele.scrollTop = ele.scrollHeight;
      });
    },
    showViewer(index) {
      this.isViewerShow = true
      this.clickViewer = true
      this.currentImg = [index]
    },
    changeVal(val) {
      console.log("Aaa")
      this.inputValue = this.$refs.inputModel.innerHTML
    },

    tool(val) {
      // 重复点击相同的则视为取消选择
      if (this.toolType == val) {
        this.toolType = ''
        return false
      }
      this.toolType = val

      if (val === 'img') {

      }
    },
    async upload() {
      try {
        var formData = new FormData();
        var file = this.$refs.uploadImg.files[0];
        formData.append("file", file);
        let res = await httpService({
          method: "post",
          url: "/api/upload",
          headers: {
            Authorization: "",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: formData
        });
        if (res.code != 200) {
          throw Error(res.msg);
        }
        let createTime = new Date().getTime();
        let msg = {
          // 发送消息传的数据
          from: this.userInfo.id,
          to: Number(this.$route.params.fromId),
          cmd: 11,
          createTime: createTime,
          msgType: 1,
          chatType: 2,
          content: "/api/file?img=" + res.data[file.name]
        };
          console.log(msg+"把当前发送的消息添加到历史消息去")
        // 把当前发送的消息添加到历史消息去
        let arr = JSON.parse(JSON.stringify(this.chat.historyNews));
        arr.push(msg);
        this["chat/setHistoryNews"](arr);
        this.chat.websocket.send(JSON.stringify(msg));
      } catch (error) {
        console.log(error);
      }
    },
    // 发送消息
    send() {
    console.log(this.chat.historyNews+"xxxxxxx")
      console.log("我是ya亚男")
      if (this.inputValue == 0) {
        this.$toast.info("请输入消息");
        return
      }
      let createTime = new Date().getTime();
      let msg = {
        // 发送消息传的数据
        from: this.userInfo.id,
        to: 12,
        cmd: 11,
        createTime: createTime,
        msgType: 0,
        chatType: 2,
        content: this.inputValue
      };
      console.log(msg.from+"from:")
      // 把当前发送的消息添加到历史消息去
      let arr = JSON.parse(JSON.stringify(this.chat.historyNews))
      arr.push(msg)
      this['chat/setHistoryNews'](arr)
      this.chat.websocket.send(JSON.stringify(msg));
      this.inputValue = "";
      // 清空输入框的数据
      this.$refs.inputModel.innerHTML = "";

      // let msg = {
      //   cmd: 19,
      //   type: 1,
      //   fromUserId: 12,
      //   userId: 125
      //   //userId:item.from  == 125 ? 123 :125
      // };
      // console.log("有趣")
      // this.chat.websocket.send(JSON.stringify(msg));

    },
    // 添加消息
    emojiAdd(val) {
      console.log(val, "我是白哦")
      this.$refs.inputModel.innerHTML = this.inputValue + val
      this.inputValue = this.inputValue + val
    },
  },
  beforeRouteLeave(to, from, next) {
    let id = this.$route.params.fromId;
    let index = this.chat.chatQueue.findIndex(msg => msg.from == id);
    let arr = JSON.parse(JSON.stringify(this.chat.chatQueue))
    if (index != -1) {
      arr[index].newNews = 0
      this["chat/setChatQueue"](arr);
    }
    next();
  }
};
</script>
<style lang="scss" scoped>
.inquiry-online {
  box-sizing: border-box;
  padding-top: 100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  overflow: hidden;
  .user-describe {
    // position: fixed;
    // z-index: 4;
    width: 670px;
    background: #fff;
    // left: 40px;
    // top: 120px;
    border-radius: 10px;
    box-shadow: 0 0 18px rgba(131, 179, 208, 0.3);
    box-sizing: border-box;

    .item {
      padding: 0 30px 20px;
      i {
        float: right;
        color: var(--primary);
      }
    }
  }
  .inquiry-online-tool {
    border-top: 1px solid #d2d2d2;
    background: #f2f2f2;
  }
  .inquiry-online-tool-voice {
    display: flex;
    align-items: flex-end;
    padding: 16px 0;
    .icon-yuyin {
      font-size: 48px;
      color: #000;
    }
    .yuyiin,
    .send {
      margin: 0 20px;
      height: 52px;
    }
    .send {
      line-height: 52px;
      border-radius: 8px;
      padding: 0 27px;
      background: #ccc;
      color: #fff;
      &.active {
        background: var(--primary);
      }
    }
    .input {
      flex: 1;
      outline: none;
      padding: 10px;
      background: #fff;
      border-radius: 8px;
      // height: 32px;
      overflow: auto;
      max-height: 152px;
    }
  }
  .inquiry-online-tool-detail {
    display: flex;
    border-bottom: 1px solid #d2d2d2;
    > span {
      flex: 1;
      text-align: center;
      padding: 10px 0;
      position: relative;
      &:active i {
        color: var(--primary);
      }
      &.active i {
        color: var(--primary);
      }
    }
    .iconfont {
      font-size: 48px;
      color: #8a8a8a;
    }
    .upload-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0;
    }
  }
  .inquiry-online-tool-add {
    padding: 40px 0;
    display: flex;
    justify-content: space-around;
    .iconfont {
      font-size: 56px;
    }
    li {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .icon-span {
      width: 80px;
      height: 80px;
      line-height: 80px;
      text-align: center;
      background: #fff;
      border-radius: 20px;
      margin-bottom: 20px;
    }
  }
  .emoji-list {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    li {
      margin: 10px;
    }
  }
  .inquiry-online-content {
    // box-sizing: border-box;
    flex: 1;
    overflow: auto;
    background: var(--primary--line);
    .online-content-warp {
      padding: 30px 40px 40px;
    }
    .online-content-list {
      display: flex;
      margin-bottom: 30px;

      .describe {
        padding: 5px 20px 10px;
        border-bottom: 1px solid var(--primary--line);
        line-height: 36px;
      }
      .content {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        img {
          width: 120px;
          height: 126px;
        }
      }
      // position: relative;
      .online-content-list-head {
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    .online-content-list-text {
      padding: 20px 10px;
      background: #fff;
      border-radius: 10px;
      border: 1px solid #e4e4e4;
      margin: 0 40px;
      max-width: 500px;
      white-space: normal;
      word-break: break-all;
      word-wrap: break-word;
      line-height: 46px;
      em {
        position: relative;
        float: left;
        margin-left: -30px;
        margin-top: 2px;
        display: block;
        width: 0;
        height: 0;
        border-width: 20px 20px 20px 0;
        border-style: solid;
        border-color: transparent #e4e4e4 transparent transparent; /*透明 灰 透明 透明 */

        &:before {
          position: absolute;
          content: "";
          display: block;
          width: 0;
          height: 0;
          border-width: 18px 18px 18px 0;
          border-style: solid;
          border-color: transparent #fff transparent transparent; /*透明 灰 透明 透明 */
          top: -18px;
          left: 4px;
        }
      }
      // .item {
      //   display:flex;
      //   justify-content: space-between;
      //   height: 70px;
      //   align-items: center;
      //   &:nth-of-type(1){
      //    border-bottom:1px solid #f4f4f4;
      //   }
      //   i{
      //     color:var(--primary);
      //   }
      // }
    }
    .online-content-list-report {
      padding-bottom: 0;
    }
    .online-content-list.right {
      flex-direction: row-reverse;
      .online-content-list-text {
        em {
          float: right;
          margin-right: -30px;
          border-width: 20px 0 20px 20px;
          border-color: transparent transparent transparent #e4e4e4;
          &:before {
            left: -22px;
            border-width: 18px 0 18px 18px;
            border-color: transparent transparent transparent #fff;
          }
        }
      }
    }
  }
}
.md-dialog {
  /deep/ .md-dialog-body {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      margin-right: 40px;
    }
    .edit-dialog-item {
      flex: 1;
      p {
        font-size: 32px;
        margin-bottom: 40px;
      }
      > div {
        position: relative;
        width: 100%;
        padding-right: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        height: 60px;
        border-bottom: 1px solid #f4f4f4;
        .edit-dialog-item-content {
          max-width: 200px;
          text-align: right;
          display: inline-block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      i {
        position: absolute;
        top: 10px;
        right: 4px;
      }
    }
  }
}

.inquiry-online-tool-aa {
  padding: 27px 24px;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 1;
}
.inquiry-online-tool-ab {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
}
.inquiry-online-tool-ab .questionBtn {
  font-size: 28px;
  color: #ffffff;
  background: var(--primary);
  border-radius: 40px;
  letter-spacing: 1px;
  padding: 7px 70px;
  text-align: center;
}
.inquiry-online-tool-ab .questionBtn:first-child {
  color: var(--primary);
  background: #ffffff;
  border: 1px solid var(--primary);
  box-sizing: border-box;
}
.inquiry-online-tool-aa p {
  line-height: 40px;
}
.inquiry-online-tool-cotent {
  font-size: 26px;
}
</style>
