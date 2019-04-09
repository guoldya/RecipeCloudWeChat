<template>

   <div class="navigation">
      <i class="icon-iconfontjiantou" @click="back">
         <img src="@/assets/images/icon_back.png">
      </i>
      <div class="navigation-content">
         {{postTitle}}
      </div>
      <div class="right">
         <slot></slot>
      </div>
   </div>
</template>
<script>

export default {
   data() {
      return {
         TOKEN: '',
         UUID: '',
         IOS: false,
         isAndroid: false,
         isWin: false,
      }
   },
   props: ['postTitle'],
   created() {

   },
   mounted() {


      var u = navigator.userAgent;
      this.isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
      this.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
      this.IOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      let _this = this;
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
      // 初始化注册方法
      // 初始化注册方法
      connectWebViewJavascriptBridge(function (bridge) {
         if (!_this.IOS) {
            bridge.init(function (message, responseCallback) {
               responseCallback();
            });
         }
         bridge.registerHandler("getNumber", function (data, responseCallback) {
            responseCallback();
         });
      })

      function UrlSearch() {
         let name, value;
         let str = location.href;
         // let str = "http://192.168.0.26:8080/choosedepart?TOKEN=6fb89730a632451394edd93c6b1993d1&UUID=f04b86567903f9de"; //取得整个地址栏
         let num = str.indexOf("?");
         str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
         let arr = str.split("&"); //各个参数放到数组里
         for (let i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > -1) {
               name = arr[i].substring(0, num);
               value = arr[i].substr(num + 1);
               this[name] = value;
            }
         }
      };
      let Request = new UrlSearch(); //实例化
      this.TOKEN = Request.TOKEN;
      this.UUID = Request.UUID;
      var storage = window.localStorage;
      if (this.TOKEN && !this.isWin) {
         storage.setItem("token7", this.TOKEN);
         storage.setItem("UUID7", this.UUID);
        //  原生没有选中 卡 写死 用于测试
        //  this.$store.commit('cardIdFun', 39);
        //  this.$store.commit('cardNnameFun', "冉有钱");
      }
   },
   methods: {
      back() {
         if (this.TOKEN && !this.isWin) {
            this.$toast.info("第二次");
            WebViewJavascriptBridge.callHandler(
               'back'
               , {}
               , function (responseData) {
               }
            );
         } else {
            this.$router.go(-1)
         }
      },


   },
}
</script>

<style lang="scss" scoped>
.navigation {
  position: fixed;
  width: 100%;
  height: 100px;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  align-items: center;
  background: #fff;
  color: var(--primary--title);
  z-index: 99;
  img {
    width: 20px;
    height: 35px;
  }
  .navigation-content {
    font-size: 32px;
    text-align: center;
    p {
      font-size: 28px;
    }
  }
  .icon-iconfontjiantou {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 24px;
  }
  .icon-iconfontjiantou img {
    width: 20px;
    height: 35px;
  }
  .right {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 30px;
  }
}
</style>
