<template>
  <div class="hacker-news-list article" id="scrollup">
    <div class="article" id="scrollup">
      <header class="aui-navBar aui-navBar-fixed">
        <span v-show="!isout" href="javascript:;" class="aui-navBar-item" @click="back">
          <img src="@/assets/images/icon_back.png">
        </span>
        <div class="aui-center">
          <span>文章详情</span>
        </div>
        <span v-show="!isout" class="aui-navBar-item">
          <img v-show="isCollect==0" @click="select" src="@/assets/images/icon_collect1.png" style="width:22px;margin-right:10px">
          <img v-show="isCollect==1" @click="cancleselect" src="@/assets/images/icon_collect1_pre.png" style="width:23px;margin-right:10px">
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
        <div class="cainter " id="commentList">
          <h1 class="pingjia" style="width:100%; margin-top:25px">评价列表</h1>
          <div class="comment-info">
            <div class="header"><img src="@/assets/images/3.jpg"></div>
            <div class="comment-right">
              <h3>匿名</h3>
              <p class="colo13">2015-12-12</p>
              <p class="content">到菜市场买菜，看到一个孩子在看摊，我问：“一只鸡多少钱？” 那孩子回答：“23。” 我又问：“两只鸡多少钱？” 孩子愣了一下，一时间没算过来，急中生智大吼一声：“一次只能买一只！”</p>
            </div>
          </div>
          <div class="comment-info">
            <div class="header"><img src="@/assets/images/3.jpg"></div>
            <div class="comment-right">
              <h3>匿名</h3>
              <p class="colo13">2015-12-12</p>
              <p class="content">1111111111111111111111111111111111111aaaa111111111111111111111111111111111</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import { Toast } from 'mand-mobile';
let bdProductreaddetail = '/api/hos/bizArticle/read/detail';
let bizArticleCmtreadpage = '/api/hos/bizArticleCmt/read/page';
let appbizCollectionaddCollection = '/api/hos/bizCollection/addCollection';
let appbizCollectiondeleteCollection = '/api/hos/bizCollection/deleteCollection';
const scrollTopList = {};
export default {
  data() {
    return {
      num: 5,
      articleId: 0,
      articleInfo: '',
      cmtInfo: '',
      ctmNumber: 0,
      isCollect: 0,
      titleCollection: '',
      TOKEN: '',
      UUID: '',
      IOS: false,
      isAndroid: false,
      isWin: false,
      isout: false,
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

    function UrlSearch() {
      let name, value;
      let str = location.href;
      //let str = "http://192.168.0.26:8080/article?articleId=38&TOKEN=6fb89730a632451394edd93c6b1993d1&UUID=f04b86567903f9de"; //取得整个地址栏
      let num = str.indexOf("?");
      str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
      _this.articleId = str.match(/articleId=[^&]+/)[0].split("=")[1] * 1;
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
    console.log(this.TOKEN)
    if (this.TOKEN && this.TOKEN.length != 0) {
      this.isout = false;
    } else {
      this.isout = true;
    };
    let param = {};
    this.$axios.put(bdProductreaddetail, {
      id: _this.articleId
    }, {
        headers: {
          'TOKEN': `${_this.TOKEN}`,
          'UUID': `${_this.UUID}`
        },
      }).then((res) => {
        if (res.data.code == '200') {
          res.data.data.createTime = /\d{4}-\d{1,2}-\d{1,2}/g.exec(res.data.data.createTime).shift();
          _this.articleInfo = res.data.data;
          _this.isCollect = res.data.data.isCollect;
          _this.titleCollection = res.data.data.title;
        } else {
          console.log(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    this.$axios.put(bizArticleCmtreadpage, {
      articleId: this.articleId
    }
    ).then((res) => {
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
    select() {
      let _this = this;
      this.$axios.post(appbizCollectionaddCollection, {
        contentId: _this.articleId,
        collectType: 2,
        title: _this.titleCollection,
      }, {
          headers: {
            'TOKEN': `${_this.TOKEN}`,
            'UUID': `${_this.UUID}`
          },
        }).then((res) => {
          if (res.data.code == '200') {
            Toast.succeed("收藏成功");
            this.isCollect = 1;
          } else {
            console.log(res.msg);
          }
        }).catch(function (err) {
          console.log(err);
        });
    },
    cancleselect() {
      // alert("aaaaaaa")
      let _this = this;
      this.$axios.delete(appbizCollectiondeleteCollection + '?id=' + _this.articleId, {
        headers: {
          'TOKEN': `${_this.TOKEN}`,
          'UUID': `${_this.UUID}`
        },
      }).then((res) => {
        if (res.data.code == '200') {
          Toast.succeed("取消收藏");
          _this.isCollect = 0;
        } else {
          Toast.succeed(res.data.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
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
  font-size: 34px;
  letter-spacing: 1px;
}
.cainter {
  margin: 0 24px;
}
.articlecontent p {
  line-height: 50px;
}
.comment-right h3 {
  text-align: left;
}
</style>
