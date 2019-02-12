
<template>
  <div id="product-info">
    <header class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;" class="aui-navBar-item" @click="back">
        <img src="@/assets/images/icon_back.png">
      </a>
      <div class="aui-center">
        <span :class="{ 'aui-title':true ,'active':isdelice}" @click="isdelice=!isdelice">药品</span>
        <span :class="{ 'aui-title':true ,'active':!isdelice}" @click="isdelice=!isdelice">详情</span>
      </div>
      <a href="javascript:;" class="aui-navBar-item">

      </a>
    </header>
    <div v-show="isdelice">
      <div class="swiper-container">
        <div class="swiper-wrapper">

        </div>
        <div class="swiper-pagination"></div>
      </div>
      <div class="btn tagsbtn">
        <button class="abtn" v-for="(item,index) in drugInfo.tags" :key="'tags'+index">{{item}} </button>
      </div>
      <div class="content">
        <div class="cainter border1">
          <h1>{{drugInfo.name}}</h1>
          <p class="colo13">快递：0</p>
          <p class="price">￥ 10 </p>
          <p class="colob13">规格：{{drugInfo.packSpec}}</p>
          <p class="colob13">批准文号：{{drugInfo.authNo}}</p>
          <p class="colob13">生产厂商：{{drugInfo.factory}}</p>
          <p class="colob13 mb13">
            数量：
            <span class="addValue ">
              <img src="@/assets/images/icon_reduce@2x(1).png" @click="num--">
              <span> {{num}}</span>
              <img src="@/assets/images/icon_add@2x.png" @click="num++">
            </span>
          </p>
        </div>
      </div>
      <div class="content contentDrug">
        <div class="cainter">
          <div class="cainterDrug">
            <div class="drugHead">
              <img src="@/assets/images/3.jpg" alt="店铺头像">
            </div>
            <div class="headRight">
              <div class="starleft">
                <div class="startop">
                  <span class="drugStoreName">{{drugStoreName}}&nbsp;</span>
                </div>
                <div class="star staraa">
                  <img src="@/assets/images/icon_star@2x.png" v-for="(item5, index5) in drugstore5" :key="'aa' + index5">

                </div>
              </div>
              <div class="dateRight" @click="intoStore">
                <button class="abtn abtnBIG">进入店铺</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="cainter cainterOUt border1">
          <div class="cainterAA">
            <p class="colo13">客户服务</p>
            <p class="fenshu">{{drugstore1}}分</p>
          </div>
          <div class="cainterAA">
            <p class="colo13">发货速度</p>
            <p class="fenshu">{{drugstore2}}分</p>
          </div>
          <div class="cainterAA">
            <p class="colo13">物流速度</p>
            <p class="fenshu">{{drugstore3}}分</p>
          </div>
          <div class="cainterAA">
            <p class="colo13">商品包装</p>
            <p class="fenshu">{{drugstore4}}分</p>
          </div>
        </div>
      </div>
      <div class="content" style="margin-bottom:60px">
        <div class="cainter">
          <h1 class="pingjia" style="width:100%;">用户评价</h1>
          <ul v-show="!loadingtrue" v-if="goodsList.length!=0" id="newsList" class="news-list">
            <li v-for="(item2,index) in goodsList" :key='index' class="border1" style="width:100%">
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
                      <span class="colo13">{{item2.createTime}} </span>
                    </div>
                    <div class="dateRight">
                      <div class="star">
                        <img v-if="item2.score" src="@/assets/images/icon_star@2x.png" v-for="(item3, index3) in item2.score" :key="'aa' + index3">
                      </div>
                    </div>
                  </div>
                  <p>{{item2.evaContent}}</p>
                </div>
              </div>
            </li>
            <p v-show="nomore" class="noMore">没有更多数据了</p>
          </ul>
          <div v-show="!loadingtrue" v-else class="nullDurg">
            <img src="@/assets/images/null.png" alt="">
          </div>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="clearfix">
            <span v-if="goodsList.length!=0&&!nomore">
              <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
            </span>
          </div>

        </div>
      </div>
    </div>
    <!-- 详情 -->
    <div v-show="!isdelice">
      <div class="content margin120">
        <div class="cainter">
          <div class="btn" style="width:95%;display: flex; flex-direction:row; justify-content:space-between">
            <button v-for="(item, index) in time" :key="'time' + index" @click="switchTo(index)" :class="timeIndex === index ? 'abtninfo activebtn' : 'abtninfo' ">
              {{item.title}}
            </button>
          </div>
          <div class="cainterSize" v-show="timeIndex==0">
            <div v-for="(item,index) in drugInfo.thumbnailUrl" :key="'thumbnailUrl'+index">
              <img :src="$conf.constant.img_base_url+item" alt="">
            </div>
          </div>
          <div class="cainterSize" v-show="timeIndex==1">
            药品名称 999 感冒灵颗粒 10g*9袋 主要成分 三叉苦、金盏银盘、野菊花、岗梅、咖啡因、对乙酰氨基酚、马来酸氯苯那敏、薄荷油。辅料为蔗糖粉。 性 状 本品为浅棕色至深棕色颗粒；味甜、微苦。 适应症/主治功能 解热镇痛。用于感冒引起的头痛，发热，鼻塞，流涕，咽痛。 规格型号 10g*9袋（999） 用法用量 开水冲服，一次10克(1袋)，一日3次。 贮 藏 密封。 包 装 复合膜；每盒装9袋。 有效期 24 个月 执行标准 国家药典委员会药典业发（1998）第11 批准文号 国药准字Z44021940 生产企业 华润三九医药股份有限公司 不良反应 偶见皮疹、荨麻疹、药热及粒细胞减少；可见困倦、嗜睡、口渴、虚弱感；长期大量用药会导致肝肾功能异常。 禁 忌 严重肝肾功能不全者禁用。 药物互相作用 1.与其他解热镇痛药并用，有增加肾毒性的危险。 2.与其他药物同时使用可能会发生药物相互作用，详情请咨询医师或药师。 注意事项 1.忌烟、酒及辛辣、生冷、油腻食物。 2.不宜在服药期间同时服用滋补性中成药。 3.本品含对乙酰氨基酚、马来酸氯苯那敏、咖啡因。服用本品期间不得饮酒或含有酒精的饮料；不能同时服用与本品成份相似的其他抗感冒药；肝、肾功能不全者慎用；膀胱颈梗阻、甲状腺功能亢进、青光眼、高血压和前列腺肥大者慎用；孕妇及哺乳期妇女慎用；服药期间不得驾驶机、车、船、从事高空作业、机械作业及操作精密仪器。 4.脾胃虚寒，症见腹痛、喜暖、泄泻者慎用。 5.糖尿病患者及有心脏病等慢性病严重者应在医师指导下服用。 6.儿童、年老体弱者应在医师指导下服用。 7.服药3天后症状无改善，或症状加重，或出现新的严重症状如胸闷、心悸等应立即停药，并去医院就诊。
          </div>
          <div class="cainterSize" v-show="timeIndex==2">
            规格型号 10g*9袋（999） 用法用量 开水冲服，一次10克(1袋)，一日3次。 贮 藏 密封。 包 装 复合膜；每盒装9袋。 有效期 24 个月 执行标准 国家药典委员会药典业发（1998）第11 批准文号 国药准字Z44021940 生产企业 华润三九医药股份有限公司
          </div>
        </div>
      </div>
    </div>
    <div class="aui-footer">
      <a href="javascript:;" class="aui-tabBar-item" @click="intoIndex">
        <img src="@/assets/images/icon_pharmacy.png" alt="">
      </a>
      <a v-show="isCollection==0" @click="select" href="javascript:;" class="aui-tabBar-item">
        <img src="@/assets/images/icon_collect.png" alt="">
      </a>
      <a v-show="isCollection==1" @click="cancleselect" href="javascript:;" class="aui-tabBar-item">
        <img src="@/assets/images/icon_collect_pre.png" alt="">
      </a>
      <a href="javascript:;" class="aui-tabBar-item " @click="intoCar">
        <img src="@/assets/images/icon_car2.png" alt="">
      </a>
      <a href="javascript:;" class="aui-tabBar-item2" @click="addCar">
        <button class="abtn car">加入购物车</button>
      </a>
      <a href="javascript:;" class="aui-tabBar-item2" @click="payNow">
        <button class="abtn">立即下单</button>
      </a>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mand-mobile';
let bdProductreaddetail = '/app/bdProduct/read/detail';
let appbizCollectionaddCollection = 'app/bizCollection/addCollection';
let appbizCollectiondeleteCollection = 'app/bizCollection/deleteCollection';
let appbizProductEvaluatereadpage = "/app/bizProductEvaluate/read/page";
export default {
  data() {
    return {
      busy: true,
      nomore: false,
      loadingtrue: true,
      goodsList: '',
      page: 1,
      pageSize: 10,
      num: 1,
      drugStoreId: '',
      IOS: false,
      isAndroid: false,
      isdelice: true,
      isPicture: true,
      isSpecific: false,
      isSize: false,
      timeIndex: 0,
      isCollection: 0,
      titleCollection: '',
      drugstore1: 0,
      drugstore2: 0,
      drugstore3: 0,
      drugstore4: 0,
      drugstore5: 0,
      TOKEN: '',
      UUID: '',
      time: [
        { title: '图文详情' },
        { title: '说明书' },
        { title: '规格参数' }
      ],
      drugId: 0,
      drugInfo: '',
      drugStoreName: '未知',
      test: [{ filename: "https://kano.guahao.cn/IvZ2706441_image140.jpg?timestamp=1469427168922" },
      { filename: "https://kano.guahao.cn/REk2640164_image140.jpg" },
      { filename: "https://kano.guahao.cn/elarge_E2w2711261.jpg?timestamp=1538979619031" },
      { filename: "http://192.168.0.150:40080/res/e11e8d39-eb75-48b5-af69-92fc1db0eb15.jpg" }],
      picUrl: '',
    }
  },
  created() {

  },
  watch: {
    num(newValue) {
      if (newValue < 1) this.num = 1
    }
  },
  mounted() {

    document.title = '药品详情';
    // 注册方法

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
          responseCallback(window.payNow());
        });
      }
      bridge.registerHandler("payNow", function (data, responseCallback) {
        responseCallback(window.payNow());
      });
    });

    function UrlSearch() {
      let name, value;
      // let str = location.href;
      let str = "http://192.168.0.26:8080/?drugId=30&TOKEN=f2567e7382504422a684166a1ee7b934&UUID=fdafaa584aea7545"; //取得整个地址栏
      let num = str.indexOf("?");
      str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
      _this.drugId = str.match(/drugId=[^&]+/)[0].split("=")[1] * 1;
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




    this.$axios.put(bdProductreaddetail, {
      id: _this.drugId
    }, {
        headers: {
          'TOKEN': `${_this.TOKEN}`,
          'UUID': `${_this.UUID}`
        },
      }).then((res) => {
        if (res.data.code == '200') {
          _this.drugInfo = res.data.data.drug;
          _this.drugStoreId = res.data.data.drugStoreId;
          res.data.data.drug.thumbnailUrl = res.data.data.drug.thumbnailUrl.split(',');
          res.data.data.drug.picUrl = res.data.data.drug.picUrl.split(',');
          _this.drugStoreName = res.data.data.drugStoreName;
          _this.isCollection = res.data.data.isCollection;
          _this.titleCollection = res.data.data.drug.varietyName;
          _this.drugstore3 = res.data.data.drugstoreEvaluate.logisticsScore;
          _this.drugstore2 = res.data.data.drugstoreEvaluate.deliveryScore;
          _this.drugstore4 = res.data.data.drugstoreEvaluate.packageScore;
          _this.drugstore1 = res.data.data.drugstoreEvaluate.serviceScore;
          _this.drugstore5 = parseInt(res.data.data.drugstoreEvaluate.totalScore);
          _this.lunbo(res.data.data.drug.picUrl);
        } else {
          console.log(res.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });

    this.getGoodslist()
    window.payNow = this.payNow;

  },
  methods: {
    getGoodslist(flag) {
      const params = {};
      params.page = this.page;
      params.pageSize = this.pageSize;
      params.productId = this.drugId;
      this.$axios.put(appbizProductEvaluatereadpage, {
        params
      }, {
          headers: {
            'TOKEN': `${this.TOKEN}`,
            'UUID': `${this.UUID}`
          },
        }).then((res) => {
          if (res.data.rows) {
            this.loadingtrue = false;
            for (let i = 0; i < res.data.rows.length; i++) {
              res.data.rows[i].createTime = res.data.rows[i].createTime.split(' ')[0];
            };
            if (flag) {

              this.goodsList = this.goodsList.concat(res.data.rows);  //concat数组串联进行合并
              if (this.page <= Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                this.busy = false;
                this.nomore = false;
              } else {
                this.busy = true;
                this.nomore = true;
              };
              console.log(this.nomore, "就是这里")
            } else {
              this.goodsList = res.data.rows;
              this.busy = true;
              if (res.data.total < 10) {
                this.busy = true;
                this.nomore = true;
              } else {
                this.busy = false;
                this.nomore = false;
              }
            }
          } else {
            this.goodsList = []
          }
        })
    },
    sortGoods() {
      this.page = 1;
      this.getGoodslist();
    },
    //当属性滚动的时候  加载  滚动加载
    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.getGoodslist(true);
      }, 500);
    },
    select() {
      let _this = this;
      this.$axios.post(appbizCollectionaddCollection, {
        contentId: _this.drugId,
        collectType: 1,
        title: _this.titleCollection,
      }, {
          headers: {
            'TOKEN': `${_this.TOKEN}`,
            'UUID': `${_this.UUID}`
          },
        }).then((res) => {
          if (res.data.code == '200') {
            Toast.succeed("收藏成功");
            this.isCollection = 1;
          } else {
            console.log(res.msg);
          }
        }).catch(function (err) {
          console.log(err);
        });
    },
    cancleselect() {
      let _this = this;
      this.$axios.delete(appbizCollectiondeleteCollection + '?id=' + _this.drugId, {
        headers: {
          'TOKEN': `${_this.TOKEN}`,
          'UUID': `${_this.UUID}`
        },
      }).then((res) => {
        if (res.data.code == '200') {
          Toast.succeed("取消收藏");
          _this.isCollection = 0;
        } else {
          Toast.succeed(res.data.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    switchTo(aa) {
      this.timeIndex = aa
    },
    intoStore() {
      WebViewJavascriptBridge.callHandler(
        'intoStore'
        , this.drugStoreId
        , function (responseData) {

        }
      );
    },
    intoCar() {
      WebViewJavascriptBridge.callHandler(
        'intoCar'
        , {}
        , function (responseData) {

        }
      );
    },
    intoIndex() {
      WebViewJavascriptBridge.callHandler(
        'intoIndex'
        , {}
        , function (responseData) {

        }
      );
    },
    back() {
      WebViewJavascriptBridge.callHandler(
        'back'
        , {}
        , function (responseData) {

        }
      );
    },
    payNow() {
      WebViewJavascriptBridge.callHandler(
        'payNow'
        , this.num
        , function (responseData) {

        }
      );
    },
    addCar() {

    },
    lunbo(data) {
      let mySwiper = new Swiper('.swiper-container', {
        // freeMode: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        loop: true,
        loopedSlides: 10,
        initialSlide: 2,
        roundLengths: true,
        slidesPerView: "auto",
        centeredSlides: true,
        followFinger: false,
      });
      for (let i = 0; i < data.length; i++) {
        mySwiper.appendSlide(this.slidedata(data[i]));
      };
    },
    slidedata(i) {
      let _this = this;
      return '<div class="swiper-slide"><div class="wannianli-info"><img src="' + this.$conf.constant.img_base_url + i + '" alt="轮播图"> </div></div>';
    },

  },
}
</script>
<style scoped>
@import url("./product.css");
</style>
 
 