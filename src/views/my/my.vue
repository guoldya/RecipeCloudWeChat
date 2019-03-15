<template>
  <div class="gp-profile-index">
    <div class="aui-head-yellow">
      <div class="aui-head-box">
        <div class="aui-head-user"><img :src="headURL" alt=""></div>
        <p>{{name}}</p>
      </div>
    </div>
    <div class="outCarint">
      <div class="tools">
        <h2>就医信息</h2>
        <div class="nav2">
          <span @click="registrecord"><img src="@/assets/images/icon_registerMy.png" alt="">挂号记录</span>
          <span @click="feerecord"><img src="@/assets/images/icon_pay.png" alt="">缴费记录</span>
          <span @click="appoint"><img src="@/assets/images/icon_appointment.png" alt="">预约记录</span>
          <span @click="reportrecord" monitor="my_subject"><img src="@/assets/images/icon_report.png" alt="">报告记录</span>
        </div>
        <div class="nav2">
          <span><img src="@/assets/images/icon_hospitalization.png" alt="">我的住院</span>
          <span @click="recipeRecord"><img src="@/assets/images/icon_prescription.png" alt="">处方记录</span>
          <span @click="business"><img src="@/assets/images/icon_copy.png" alt="">复印记录</span>
          <span @click="askorder"><img src="@/assets/images/icon_order.png" alt="">问诊订单</span>
        </div>
      </div>
      <div class="tools">
        <h2>个人信息</h2>
        <div class="nav2">
          <span @click="idcardlist"><img src="@/assets/images/icon_Visitingcard.png" alt="">就诊卡</span>
          <span @click="adress"><img src="@/assets/images/icon_address.png" alt="">地址管理</span>
          <span @click="medicalEva"><img src="@/assets/images/icon_evaluate.png" Falt="">就医评价</span>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
let sysUserselectUserByAccount = '/app/sysPatient/read/myDetailed';

import pg_positive from '@/assets/images/user.png'
export default {
  data() {
    return {
      userInfo: '',
      outInfo: '',
      id: '',
      name: '',
      headURL: pg_positive,
    }
  },
  created() {
    this.$store.commit('feeActiveFun', 1);
  },
  mounted() {
    document.title = '个人中心';
    let _this = this;
    this.$axios.put(sysUserselectUserByAccount, {
    }).then(function (res) {
      if (res.data.code == '200') {
        console.log(res.data.data.name, "ss");
        _this.name = res.data.data.name;
        if (res.data.data.headUrl) {
          _this.headURL = _this.$conf.constant.img_base_url + res.data.data.headUrl;
        }

      }
    }).catch(function (err) {
      console.log(err);
    });


  },
  methods: {
    registrecord() {
      let argu = {}
      this.$router.push({
        name: 'registrecord',
        query: argu
      });
    },
    // 缴费记录
    feerecord() {
      let argu = {}
      this.$router.push({
        name: 'feerecord',
        query: argu
      });
    },
    appoint() {
      let argu = {}
      this.$router.push({
        name: 'appoint',
        query: argu
      });
    },
    // 报告查询
    reportrecord() {
      let argu = {}
      this.$router.push({
        name: 'reportrecord',
        query: argu
      });
    },
    // 处方记录
    recipeRecord() {
      let argu = {}
      this.$router.push({
        name: 'recipeRecord',
        query: argu
      });
    },
    // 处方记录
    business() {
      let argu = {}
      this.$router.push({
        name: 'business',
        query: argu
      });
    },
    askorder() {
      let argu = {}
      this.$router.push({
        name: 'askorder',
        query: argu
      });
    },
    // 就诊卡
    idcardlist() {
      let argu = {}
      this.$router.push({
        name: 'idcardlist',
        query: argu
      });
    },
    // 就医评价
    medicalEva() {
      let argu = {}
      this.$router.push({
        name: 'medicalEva',
        query: argu
      });
    },
    // 地址
    adress() {
      let argu = {}
      this.$router.push({
        name: 'adress',
        query: argu
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
