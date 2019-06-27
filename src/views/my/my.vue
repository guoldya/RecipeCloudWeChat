<template>
  <div class="gp-profile-index">
    <header class="aui-navBar aui-navBar-fixed">
      <div class="aui-center">
        <span class="aui-center-title">我的</span>
      </div>
    </header>
    <section class="aui-scrollView">
      <div class="aui-user">
        <div class="aui-user-cell">
          <div class="aui-user-cell-logo" @click="acctest">
            <img v-if="_accountinfo.headUrl" :src="$conf.constant.img_base_url + _accountinfo.headUrl" alt="">
            <img v-else-if="_accountinfo.sex==1" src="@/assets/images/user.jpg">
            <img v-else src="@/assets/images/31.jpg">
          </div>
          <div class="aui-user-cell-title">
            <p>{{_accountinfo.name}}</p>
            <p class="aui-user-info">{{_accountinfo.account}}</p>
          </div>
          <div class="aui-user-row"></div>
        </div>
      </div>
      <div class="aui-list-cell">
        <a href="javascript:;" class="aui-list-item" @click="registrecord">
          <div class="aui-list-item-fl">
            <i class="icon icon-item01"></i>
            挂号记录
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
            <!-- 点击查看 -->
          </div>
        </a>
      </div>
      <div class="divHeight"></div>
      <div class="aui-list-cell">
        <a href="javascript:;" class="aui-list-item" @click="feerecord">
          <div class="aui-list-item-fl">
            <i class="icon icon-item02"></i>
            缴费记录
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
        <a href="javascript:;" class="aui-list-item" @click="appoint">
          <div class="aui-list-item-fl">
            <i class="icon icon-item03"></i>
            预约记录
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
        <a href="javascript:;" class="aui-list-item" @click="reportrecord">
          <div class="aui-list-item-fl">
            <i class="icon icon-item04"></i>
            报告记录
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
        <a href="javascript:;" class="aui-list-item" @click="visitingrecord">
          <div class="aui-list-item-fl">
            <i class="icon icon-item07"></i>
            诊疗记录
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
      </div>
      <div class="divHeight"></div>
      <div class="aui-list-cell">
        <a href="javascript:;" class="aui-list-item" @click="myhospital">
          <div class="aui-list-item-fl">
            <i class="icon icon-item05"></i>
            我的住院
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
        <a href="javascript:;" class="aui-list-item" @click="recipeRecord">
          <div class="aui-list-item-fl">
            <i class="icon icon-item06"></i>
            处方记录
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
        <a href="javascript:;" class="aui-list-item" @click="business">
          <div class="aui-list-item-fl">
            <i class="icon icon-item07"></i>
            复印记录
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>

        <a href="javascript:;" class="aui-list-item" @click="askorder">
          <div class="aui-list-item-fl">
            <i class="icon icon-item08"></i>
            问诊订单
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
      </div>
      <div class="divHeight"></div>
      <div class="aui-list-cell">
        <a href="javascript:;" class="aui-list-item" @click="idcardlist">
          <div class="aui-list-item-fl">
            <i class="icon icon-item09"></i>
            就诊卡
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
        <a href="javascript:;" class="aui-list-item" @click="adress">
          <div class="aui-list-item-fl">
            <i class="icon icon-item10"></i>
            地址管理
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
        <a href="javascript:;" class="aui-list-item" @click="valuationList">
          <div class="aui-list-item-fl">
            <i class="icon icon-item10"></i>
            就医评价
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
        <a href="javascript:;" class="aui-list-item" @click="suggestion">
          <div class="aui-list-item-fl">
            <i class="icon icon-item10"></i>
            意见收集
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
          </div>
        </a>
      </div>
      <div class="divHeight"></div>
    </section>
    <!-- 底部 -->
    <Footer :foot-number="$store.state.homeList"></Footer>
  </div>
</template>
<script>
import { mapState } from "vuex";

import pg_positive from "@/assets/images/3.jpg";
export default {
  data() {
    return {
      outInfo: "",
      id: "",
      headURL: ''
    };
  },
  computed: {
    ...mapState({
      _accountinfo: state => state.my.accountinfo,
      _cardlist: state => state.home.cardList,
    }),
  },
  created() {
    sessionStorage.setItem('feeActiveFun', 1)
  },
  async mounted() {
    await this.$store.dispatch('getAccount');
    await this.$store.dispatch('getCards', );
  },
  methods: {

    testRegist() {
      // if (!this._accountinfo.idCard) {
      //   this.$toast.info("请先实名")
      //   return false
      // }
      // if (this._cardlist.length == 0) {
      //   this.$toast.info("请绑定就诊卡")
      //   return false
      // }
      return true

    },
    registrecord() {
      if (!this.testRegist()) {
        return
      }
      let argu = {};
      this.$router.push({
        name: "registrecord",
        query: argu
      });
    },
    // 用户设置
    acctest() {

      let argu = {};
      this.$router.push({
        name: "acctest",
        query: argu
      });
    },
    // 缴费记录
    feerecord() {
      if (!this.testRegist()) {
        return
      }
      let argu = {};
      this.$router.push({
        name: "feerecord",
        query: argu
      });
    },
    appoint() {
      if (!this.testRegist()) {
        return
      }
      let argu = {};
      this.$router.push({
        name: "appoint",
        query: argu
      });
    },
    // 报告查询
    reportrecord() {
      if (!this.testRegist()) {
        return
      }
      let argu = {};
      this.$router.push({
        name: "reportquery",
        query: argu
      });
    },
    visitingrecord() {
      if (!this.testRegist()) {
        return
      }
      let argu = {}
      this.$router.push({
        name: 'visitingrecord',
        query: argu
      });
    },
    // 我的住院
    myhospital() {
      let argu = {};
      this.$router.push({
        name: "myhospitalfirst",
        query: argu
      });
    },
    // 处方记录
    recipeRecord() {
      if (!this.testRegist()) {
        return
      }
      let argu = {};
      this.$router.push({
        name: "recipeRecord",
        query: argu
      });
    },
    // 处方记录
    business() {
      if (!this.testRegist()) {
        return
      }
      let argu = {};
      this.$router.push({
        name: "businssrecord",
        query: argu
      });
    },
    askorder() {
      if (!this.testRegist()) {
        return
      }
      let argu = {};
      this.$router.push({
        name: "askorder",
        query: argu
      });
    },
    // 就诊卡
    idcardlist() {
      if (!this._accountinfo.idCard) {
        this.$toast.info("请先实名")
        return
      }
      let argu = {};
      this.$router.push({
        name: "idcardlist",
        query: argu
      });
    },
    // 就医评价
    valuationList() {
      if (!this.testRegist()) {
        return
      }
      let argu = {};
      this.$router.push({
        name: "valuationList",
        query: argu
      });
    },
    // 地址
    adress() {
      if (!this.testRegist()) {
        return
      }
      let argu = {};
      this.$router.push({
        name: "adress",
        query: argu
      });
    },
    //意见收集
    suggestion() {
      if (!this.testRegist()) {
        return
      }
      let argu = {};
      this.$router.push({
        name: "suggestion",
        query: argu
      });
    },
  }
};
</script>
<style scoped>
.aui-navBar {
  height: 88px;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  background-color: rgba(27, 130, 210, 1);
}

.aui-navBar-fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}

.aui-center {
  text-align: center;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  text-overflow: ellipsis;
  font-size: 32px;
  color: #fff;
  line-height: 88px;
}

.aui-scrollView {
  width: 100%;
  height: 100%;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
  margin-bottom: -1px;
  margin-top: 88px;
}

.aui-user {
  background-color: rgba(27, 130, 210, 1);
  padding: 10px 20px 30px 30px;
}

.aui-user-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.aui-user-cell-logo img {
  width: 130px;
  height: 130px;
  margin-right: 20px;
  display: block;
  border-radius: 8px;
  border: 4px solid #5ea6df;
}

.aui-user-cell-title {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}

.aui-user-cell-title p {
  color: #fff;
  font-size: 30px;
}

.aui-user-cell-title .aui-user-info {
  color: #aed3ef;
  font-size: 26px;
  padding-top: 15px;
}

/* .aui-user-row:after { */
/* background-image: ; */
/* width: 32px;
  height:32x;
  background-size: 32px;
  display: block;
  color: #c9c9c9;
  content: " >";
} */

.aui-list-cell {
  background-color: #fff;
  position: relative;
  z-index: 1;
}

.aui-list-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  padding-left: 24px;
  padding-right: 12px;
  overflow: hidden;
  background-color: #fff;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  text-decoration: none;
  color: inherit;
}

.aui-list-item:active {
  background: #d9d9d9;
}

.aui-list-item:after {
  margin-left: 24px;
  content: "";
  position: absolute;
  z-index: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  border-bottom: 2px solid #f0f0f0;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
}

.aui-list-item-fl {
  color: #303030;
  font-size: 28px;
  white-space: nowrap;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
}

.aui-list-item-fr {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
  min-height: 100px;
  color: #9c9c9c;
  text-align: right;
  font-size: 26px;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}

.divHeight {
  width: 100%;
  height: 20px;
  background: #f8f8f8;
}

.aui-list-item-fr:after {
  width: 40px;
  height: 40px;
  background-size: 40px;
  display: block;
  color: #c9c9c9;
  content: " ";
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAADQUlEQVRoQ+3ZTWsTQRgH8OfZTVIagrZg8VBQUIoHD2lsmt1ml7YRpEgPRfCsCHoV+k168aYQP4GK+AbWtMZdQxptqLSXHCoePKQU0qBt0zQ7sthAs32hJfNGuoFcws7O/Ob/ZHZ2F+GMffCMecEHd3rifsJ+wh02A35Jd1igBzh+wn7Cp5gBy8oPAmAGEXoAYCaZHJ4+RXMuh1ItacvKFxEx2hw5ISRtGIkHXCQn7IQyeOElIkzt71s2NGVwfhAR5wDgvBcdDgenY7FY5YRBMDuMKtgdpfs/PgJdDIeDKdFo6mDZ0UzAMqOZgZtoAEjvX7nd3wkhwsqbKdjFLS4u9mxu1udkQTMHy4bmApYJzQ18HBqA/CQE7hhGosjsArx3Yq7g45OGCgBJsUZzB4tGCwGLRAsDN9FbW/UZALzfuvdmV95CwU2kbefTvNBSgF14K5oAALo7Mvf70DS1Z7RWb2nA/9ELzwHgnufWsmoYiZbbzXbw0oAzmUwgFIq4DxAmPaBqMjncWeBCoRCs1ciLQ7DgOM4j09SetpPq/rbCEy6VSl3lcuU1ItzyrNQ1RDKZTCZmaWHd8wgFu9i1tcp7ABhvRZEtx1EnTHMoSxMrFGzbdjdA8O0h2KqiqBO6PpSjjRUGXl5ejmxsbH4AgKR3w6GqypiuDy2xwAoB53K5c46jfATAYU8ZrytKYFTXb6ywwnIHu9hGQ5lHxEHPtbasqkFT12Mllliu4Gx2qVdRtj8dxMLvQMAxNU1bZY3lBi4UChdqNcd9rnXdU8arjqOMm2b8Fw8sF3Au9+Nio7E9jwjXPNgSIV2mYUTLvLDMwXtYGxGueLArqkpGNU1b54llCrbtYj8h9c8HsbDU3R0YE/XKhclOy7K+XwZouNhLngS/KUrjpq7rVd7JNvujDnaxiLsWAPZ7Lj3ZSKTrdjQa/SsKS72kLatwFdGZ92IByGxfX+/kwMBATSSWOti2F74AgOFBvQuFcCoej9dFY6mDLSv/FRH1JowQeLWz8+duKpXalQHLAjwKgG8QIQIAT0ZG4o8R0ZEFSx0sE+yosVBfpWVH+2DZE2p3fH7C7c6g7O39hGVPqN3x+Qm3O4Oytz9zCf8DYh50TPjMNLAAAAAASUVORK5CYII=");
}

.icon {
  width: 70px;
  height: 50px;
  background-size: 42px;
  display: block;
  background-repeat: no-repeat;
}
.icon-item01 {
  background-image: url("~@/assets/images/7nn1.png");
}

.icon-item02 {
  background-image: url("~@/assets/images/7nn2.png");
}
.icon-item03 {
  background-image: url("~@/assets/images/7nn3.png");
}

.icon-item04 {
  background-image: url("~@/assets/images/7nn4.png");
}

.icon-item05 {
  background-image: url("~@/assets/images/7nn5.png");
}

.icon-item06 {
  background-image: url("~@/assets/images/7nn6.png");
}

.icon-item07 {
  background-image: url("~@/assets/images/7nn7.png");
}

.icon-item08 {
  background-image: url("~@/assets/images/7nn8.png");
}

.icon-item09 {
  background-image: url("~@/assets/images/7nn9.png");
}

.icon-item10 {
  background-image: url("~@/assets/images/7nn10.png");
}

.icon-item11 {
  background-image: url("~@/assets/images/7nn10.png");
}
</style>
