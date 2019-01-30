<template>
  <div class="hacker-news-list article" id="scrollup">
  <div class="article" id="scrollup">
    <header class="aui-navBar aui-navBar-fixed">
      <span href="javascript:;" class="aui-navBar-item" @click="back">
        <img src="@/assets/images/icon_back.png">
      </span>
      <div class="aui-center">
        <span>文章详情</span>
      </div>
      <span class="aui-navBar-item">
        <img src="@/assets/images/icon_collect1.png" style="width:25px;margin-right:10px" @click="select">
        <img src="@/assets/images/icon_share.png" style="width:24px;height:28px" @click="share">
      </span>
    </header>
    <div class="swiper-container">
      <div class="swiper-wrapper">
      </div>
      <div class="swiper-pagination"></div>
    </div>
    <div class="content articlecontent">
      <div class="cainter">
        <h1>{{articleInfo.title}}</h1>
        <p class="colo13">
          <span>{{articleInfo.audit}} | </span>
          <span>{{articleInfo.createTime}}</span>
          <span style="float:right">阅读 45455</span>
        </p>
        <p style="overflow:hidden; word-wrap:break-word;" v-html='articleInfo.content'>
        </p>
        <img :src="'http://192.168.0.150:40080/res/'+articleInfo.photoUrl" alt="" style="width:100%">
      </div>
    </div>
    <div class="content">
      <div class="cainter" id="commentList">
        <h1 class="pingjia" style="width:100%; margin-top:25px">评价列表</h1>
        <ul class="news-list">
          <li v-for="(item,index) in cmtInfo" :key="index">
            <div class="detaileTop">
              <div class="headimg">
                <img src="@/assets/images/3.jpg" alt="店铺头像">
              </div>
              <div class="headRight headRightPJ">
                <div>
                  <div class="starleft">
                    <div class="startop">
                      <span>和平药房渝北店铺</span>
                    </div>
                    <span class="colo13">2015-12-12</span>
                  </div>
                </div>
                <p>{{item.content}}第一个评论</p>
              </div>
            </div>
          </li>
          <li v-for="i in num" :key="i">
            <div class="detaileTop">
              <div class="headimg">
                <img src="@/assets/images/3.jpg" alt="店铺头像">
              </div>
              <div class="headRight headRightPJ">
                <div>
                  <div class="starleft">
                    <div class="startop">
                      <span>和平药房渝北店铺</span>
                    </div>
                    <span class="colo13">2015-12-12</span>
                  </div>
                </div>
                <p>sssssssssssssssssss和平药房渝北店铺和平药房渝北店铺和平药房渝北店铺和平药房渝北店铺</p>
              </div>
            </div>
          </li>
          <li>
            <div class="detaileTop">
              <div class="headimg">
                <img src="@/assets/images/3.jpg" alt="店铺头像">
              </div>
              <div class="headRight headRightPJ">
                <div>
                  <div class="starleft">
                    <div class="startop">
                      <span>和平药房渝北店铺</span>
                    </div>
                    <span class="colo13">2015-12-12</span>
                  </div>
                </div>
                <p>sssssssssssssssssss和平药房渝北店铺和平药房渝北店铺和平药房渝北店铺和平药房渝北店铺</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  </div>
</template>
<script >
let bdProductreaddetail = 'bizArticle/read/detail';
let bizArticleCmtreadpage = 'bizArticleCmt/read/page'
const scrollTopList = {};
export default {
  data() {
    return {
      num: 5,
      articleId: 0,
      articleInfo: '',
      cmtInfo: '',
      ctmNumber: 0,
      test: [{ filename: "http://09imgmini.eastday.com/mobile/20190121/2019012117_3cbaf127901d43c98bc1365f1895025c_6506_mwpm_03200403.jpg" },
      { filename: "http://09imgmini.eastday.com/mobile/20190121/2019012117_3cbaf127901d43c98bc1365f1895025c_6506_mwpm_03200403.jpg" },
      { filename: "http://09imgmini.eastday.com/mobile/20190121/2019012117_3cbaf127901d43c98bc1365f1895025c_6506_mwpm_03200403.jpg" },
      { filename: "http://09imgmini.eastday.com/mobile/20190121/2019012117_3cbaf127901d43c98bc1365f1895025c_6506_mwpm_03200403.jpg" }],
    };
  },
  props: {
    id: String,
  },
  computed: {

  },
  mounted() {
    this.lunbo();

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
    connectWebViewJavascriptBridge(function (bridge) {
      if (!_this.IOS) {
        bridge.init(function (message, responseCallback) {
          responseCallback(window.getNumber());
        });
      }
      bridge.registerHandler("getNumber", function (data, responseCallback) {
        responseCallback(window.getNumber());
      });
      bridge.registerHandler("commentList", function (data, responseCallback) {
        responseCallback(window.commentList());
      });
    })
    // let str = location.href;
    let str = "http://192.168.0.26:8081/article?articleId=38"; //取得整个地址栏
    let num = str.indexOf("?");
    this.articleId = str.match(/articleId=[^&]+/)[0].split("=")[1] * 1;
    let param = {};
    this.$axios.put(bdProductreaddetail, {
      id: this.articleId
    }).then((res) => {
      if (res.data.code == '200') {
        res.data.data.createTime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data.data.createTime).shift();
        _this.articleInfo = res.data.data;
      } else {
        console.log(res.msg);
      }
    }).catch(function (err) {
      console.log(err);
    });
    this.$axios.put(bizArticleCmtreadpage, {
      articleId: this.articleId
    }).then((res) => {
      if (res.data.code == '200') {
        _this.cmtInfo = res.data.rows;
        _this.ctmNumber = res.data.total;

      } else {
        console.log(res.msg);
      }
    }).catch(function (err) {
      console.log(err);
    });
    window.getNumber = this.getNumber;
    window.commentList = this.commentList;
  },
  methods: {
    getNumber(data) {
      return this.ctmNumber
    },
    commentList() {
      document.querySelector("#commentList").scrollIntoView();
    },
    back() {
      WebViewJavascriptBridge.callHandler(
        'back'
        , {}
        , function (responseData) {

        }
      );
    },
    share() {
      WebViewJavascriptBridge.callHandler(
        'share'
        , {}
        , function (responseData) {

        }
      );
    },
    select() {

    },
    lunbo() {
      let mySwiper = new Swiper('.swiper-container', {
        loop: true,
        effect: 'coverflow',
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // 如果需要前进后退按钮
      })
      for (let i = 0; i < this.test.length; i++) {
        mySwiper.appendSlide(this.slidedata(this.test[i]));
      };
    },
    slidedata(i) {
      return '<div class="swiper-slide"><img src="' + i.filename + '" alt="文章详情"> </div>';
    },
  }
};
</script>
<style  scoped>
@import "./header.css";
.swiper-container-horizontal
  > .swiper-pagination-bullets
  .swiper-pagination-bullet {
  margin: 0 5px;
}
.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  background: #efefef;
  opacity: 1;
}
.swiper-pagination-bullet-active {
  background: #f2cf30;
  width: 22px;
  height: 10px;
  display: inline-block;
  border-radius: 10px;
}
.swiper-slide {
  border-radius: 20px !important;
}
.swiper-container img {
  width: 100%;
  border-radius: 20px;
  height: 340px;
}
.content {
  text-align: left;
}
.cainter h1 {
  font-size: 36px;
  letter-spacing: 1px;
}
.cainter {
  margin: 0 24px;
}
.articlecontent p {
  line-height: 50px;
}
.headRight {
  width: calc(100% - 92px);
  float: right;
  text-align: left;
}
.article .starleft {
  width: 100%;
  float: left;
}
.news-list li {
  border-bottom: 1px solid #f5f5f5;
}

.startop {
  width: 100%;
}
.startop {
  margin-top: 0;
}
.startop span {
  line-height: 40px;
  font-size: 28px;
}
.startop span:first-child {
  margin-right: 0.8125rem;
}
.article .star img {
  width: 92px;
}
.cainter ul li {
  display: inline-block;
  padding-bottom: 40px;
  margin-top: 40px;
}
.headRightPJ {
  width: calc(100% - 108px);
}
.headRightPJ p {
  word-break: break-all;
  width: 100%;
  overflow: auto;
}
.pingjia {
  font-size: 30px;
  padding: 0;
  float: left;
  font-weight: 400;
  line-height: 40px;
  font-family: "PingFang-SC-Medium";
}
</style>
