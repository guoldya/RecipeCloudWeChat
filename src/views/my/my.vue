<template>
  <div class="gp-profile-index">

    <div class="aui-head-yellow">
      <div class="aui-head-box">
        <div class="aui-head-user"><img src="@/assets/images/user.png" alt=""></div>
        <p>李医生</p>
      </div>
    </div>
    <div class="outCarint">
      <div class="tools">
        <h2>就医信息</h2>
        <div class="nav2">
          <span monitor="my_family"><img src="https://static.guahao.cn/front/portal-h5-static/img/usercenter/icon-patients.png" alt="">挂号记录</span>
          <span monitor="my_favorite"><img src="https://static.guahao.cn/front/portal-h5-static/img/usercenter/icon-star.png" alt="">缴费记录</span>
          <span monitor="Homepage_Personal_instrument_my_doctor"><img src="https://static.guahao.cn/front/portal-h5-static/img/usercenter/icon-doctor.png" alt="">预约记录</span>
          <span monitor="my_subject"><img src="https://static.guahao.cn/front/portal-h5-static/img/usercenter/icon-channel.png" alt="">报告记录</span>
        </div>
        <div class="nav2">
          <span monitor="my_course"><img src="https://static.guahao.cn/front/portal-h5-static/img/usercenter/icon-course.png" alt="">我的住院</span>
          <span monitor="my_memberbenefit"><img src="https://static.guahao.cn/front/portal-h5-static/img/usercenter/icon-member.png" alt="">处方记录</span>
          <span monitor="my_help"><img src="https://static.guahao.cn/front/portal-h5-static/img/usercenter/icon-help.png" alt="">复印记录</span>
          <span monitor="Homepage_Personal_instrument_more"><img src="https://static.guahao.cn/front/portal-h5-static/img/usercenter/icon-more.png" alt="">问诊记录</span>
        </div>
      </div>
      <div class="tools">
        <h2>个人信息</h2>
        <div class="nav2">
          <span monitor="my_family"><img src="https://static.guahao.cn/front/portal-h5-static/img/usercenter/icon-patients.png" alt="">就诊卡</span>
          <span monitor="my_favorite"><img src="https://static.guahao.cn/front/portal-h5-static/img/usercenter/icon-star.png" alt="">地址管理</span>
          <span><img src="https://static.guahao.cn/front/portal-h5-static/img/usercenter/icon-doctor.png" alt="">就医评价</span>
        </div>
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


  },
  methods: {


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
