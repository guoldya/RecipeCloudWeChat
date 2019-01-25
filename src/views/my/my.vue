<template>
  <div id="illegal">
    <Title post-title="个人中心"></Title>
    <div class="aui-scrollView">
      <div class="aui-head-yellow">
        <div class="aui-head-box">
          <div class="aui-head-user">
            <img src="@/assets/images/user.png" alt="">
          </div>
          <p> </p>
        </div>
      </div>
      <div class="divHeight"></div>
      <div class="aui-card-list">
        <div class="aui-panel-cell">
          <div class="aui-panel-cell-bd">
            <h4>姓名</h4>
          </div>
          <div class="aui-panel-cell-fr">{{userInfo.name}}</div>
        </div>
        <div class="aui-panel-cell">
          <div class="aui-panel-cell-bd">
            <h4>账号</h4>
          </div>
          <div class="aui-panel-cell-fr">{{userInfo.account}}</div>
        </div>
        <div class="aui-panel-cell" @click="changMobile">
          <div class="aui-panel-cell-bd">
            <h4 style="padding:1px 0">手机</h4>
          </div>
          <div class="aui-panel-cell-fr">
            <span>{{userInfo.mobile}}</span>
            <i class="cubeic-arrow" style="position: absolute; right: 12px;top:18px"></i>
          </div>
        </div>
        <div class="aui-panel-cell">
          <div class="aui-panel-cell-bd">
            <h4>性别</h4>
          </div>
          <div class="aui-panel-cell-fr">
            <span v-if="userInfo.gender==1">男</span>
            <span v-if="userInfo.gender==2">女</span>
            <span v-else>未知</span>
          </div>
        </div>
        <div class="aui-panel-cell">
          <div class="aui-panel-cell-bd">
            <h4>科室</h4>
          </div>
          <div class="aui-panel-cell-fr">{{userInfo.deptname}}</div>
        </div>
        <div class="aui-panel-cell" @click="showBtnDiog">
          <div class="aui-panel-cell-bd">
            <h4>检测更新</h4>
          </div>
        </div>
        <div class="divHeight"></div>
        <div class="aui-panel-cell-bt" @click="showBtn">
          <h4 style="text-align:center">退出登录</h4>
        </div>
        <!-- <div class="line"></div> -->
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
let logout = '/logout';
let sysUserselectUserByAccount = 'sysUser/selectUserByAccount';
export default {
  data() {
    return {
      userInfo: '',
      outInfo: '',
      id: '',
      account: '',
    }
  },
  created() { },
  mounted() {
    document.title = '个人中心';
    this.account = localStorage.getItem("account");
    let _this = this;
    this.$axios.put(sysUserselectUserByAccount, {
      account: this.account,
    }).then(function (res) {
      if (res.data.code == '200') {
        _this.userInfo = res.data.data;
        _this.id = res.data.data.id;
      }
    }).catch(function (err) {
      console.log(err);
    });

    var u = navigator.userAgent;
    this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    this.IOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    // 注册方法
    function connectWebViewJavascriptBridge(callback) {
      if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
      }
      else {
        if (!_this.IOS) {
          window.document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , function () {
              callback(WebViewJavascriptBridge)
            },
            false
          );
        } else {
          if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
          }
          window.WVJBCallbacks = [callback];
          var WVJBIframe = document.createElement('iframe');
          WVJBIframe.style.display = 'none';
          WVJBIframe.src = 'https://__bridge_loaded__';
          document.documentElement.appendChild(WVJBIframe);
          setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0);
        }
      }
    }
    window.userLoginOut = this.userLoginOut;
  },
  methods: {
    userLoginOut(data) {
      WebViewJavascriptBridge.callHandler(
        'userLoginOut'
        , data
        , function (responseData) {
          bridgeLog('来自原生回传数据： ' + responseData);
        }
      );
    },
    showBtn() {
      this.$createActionSheet({
        active: 0,
        data: [
          {
            content: '确认退出'
          },
        ],
        onSelect: (item, index) => {
          this.loginOut()
        },
        onCancel: () => {
          this.$createToast({
            txt: `取消`,
            type: 'warn',
            time: 1000
          }).show()
        }
      }).show()

    },
    showBtnDiog() {
      this.$createDialog({
        type: 'confirm',
        icon: 'cubeic-alert',
        title: '检测提示',
        content: '已是最新版本',
        confirmBtn: {
          text: '确定按钮',
          active: true,
          disabled: false,
          href: 'javascript:;'
        },
        cancelBtn: {
          text: '取消按钮',
          active: false,
          disabled: false,
          href: 'javascript:;'
        },
        onConfirm: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '点击确认按钮'
          }).show()
        },
        onCancel: () => {
          this.$createToast({
            type: 'warn',
            time: 1000,
            txt: '点击取消按钮'
          }).show()
        }
      }).show()
    },
    loginOut: function () {
      this.$router.replace({
        name: 'login',
      });
      this.userLoginOut(1);


      var logindata = {};
      // localStorage.setItem('logindata', JSON.stringify(logindata));

    },
    changMobile: function () {
      let argu = { id: this.id, account: this.account };
      this.$router.push({
        name: 'change',
        query: argu,
      });
    },

  }
}
</script>
<style scoped>
@import url("./my.css");

.index {
  height: 100%;
}
.bottomBar {
  height: 100px;
  width: 100%;
  border: 1px solid #ccc;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  position: fixed;
  bottom: 0;
}
.bottomBar ul {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.bottomBar ul li img {
  margin: 8px 0;
}
.bottomBar ul li p {
  font-family: "PingFangSC-Regular";
  font-size: 20px;
  color: #d2d7e8;
  letter-spacing: 0;
  line-height: 20px;
}
.mainContent {
  height: -webkit-calc(100% - 100px);
  height: -moz-calc(100% - 100px);
  height: calc(100% - 100px);
}
.bottomBarColorActive {
  color: #4d81ee !important;
}
.aui-left {
  margin-left: 19px;
}
.aui-right {
  margin-left: 400px;
}
.changMobile {
  border-bottom: 1px solid #f0f3fa;
}
</style>
