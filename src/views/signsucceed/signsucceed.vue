 
<template>
  <div class="signsucceed">
    <Header post-title="签到成功" v-show="isWeixin"></Header>
    <div :class="{margin45:isWeixin,signsucceedtop:true,margin16:!isWeixin}">
      <div style="text-align: center;margin-bottom: 20px">
        <div>
          <img src="@/assets/images/icon_success.png" width="60px">
        </div>
        <p>签到成功</p>
        <p>2018-10-31 12：00</p>
      </div>
    </div>
    <div class="linesign"></div>
    <div class="outCarint">
      <p class="signsucceedtitle">就诊预约情况</p>
      <div class="card">
        <div class="cardText">
          <p class="cardTextPP">就诊项目：
            <span class="mu-secondary-text-color">血液分析</span>
          </p>
          <p class="cardTextPP">
            <span>就诊科室：检查科</span>
            <span>预约时间：25：00~14：30</span>
          </p>
        </div>
      </div>
      <div class="card">
        <div class="cardText">
          <p class="cardTextPP">就诊项目：
            <span class="mu-secondary-text-color">血液分析</span>
          </p>
          <p class="cardTextPP">
            <span>就诊科室：检查科</span>
            <span>预约时间：25：00~14：30</span>
          </p>
        </div>
      </div>

    </div>
  </div>

</template>
<script>
let appbizWaitingQueuereadlist = "/app/bizWaitingQueue/read/list";
export default {
  data() {
    return {
      isWeixin: false,
      waitList: []
    }
  },
  mounted() {
    document.title = '签到成功';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    }


    this.$axios.put(appbizWaitingQueuereadlist, {
      hospitalId: localStorage.getItem("hospitalId"),
    }).then(res => {
      if (res.data.code == '200') {
        this.waitList = res.data.rows;
      } else {
        this.$toast.info(res.data.msg)
      }
    }).catch(function (err) {
      console.log(err);
    });


  },
  methods: {
    choosedepart() {
      let argu = {}
      this.$router.push({
        name: 'choosedepart',
        query: argu
      });
    },

    feerecord() {
      let argu = {}
      this.$router.push({
        name: 'feerecord',
        query: argu
      });
    },
    sign() {
      let argu = {}
      this.$router.push({
        name: 'sign',
        query: argu
      });
    },
    blidcard() {
      let argu = {}
      this.$router.push({
        name: 'cardmy',
        query: argu
      });
    },
    // 报告查询
    reportquery() {
      let argu = {}
      this.$router.push({
        name: 'reportquery',
        query: argu
      });
    },
    // 我的排队
    lineupnow() {
      let argu = {}
      this.$router.push({
        name: 'lineupnow',
        query: argu
      });
    },
    // 医生排班
    workdepart() {
      let argu = {}
      this.$router.push({
        name: 'workdepart',
        query: argu
      });
    },

    // 我的处方
    myinspectionCheck() {
      let argu = {}
      this.$router.push({
        name: 'inspectionCheck',
        query: argu
      });
    },
  }

}
</script>
<style scoped>
.signsucceedtop p {
  line-height: 70px;
  color: #5a5a5a;
}
.linesign {
  height: 20px;
  background: #f5f5f5;
}
.signsucceedtitle {
  text-align: center;
  line-height: 100px;
  font-size: 32px;
}
.signsucceed .card {
  margin-bottom: 40px;
}
.signsucceed .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  padding: 25px 0;
  font-size: 28px;
  border-bottom: 1px solid #e9e9e9;
}
.signsucceed .cardText .cardTextPP:last-child {
  border: none;
}
</style>
