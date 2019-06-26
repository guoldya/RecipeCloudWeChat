 
<template>
  <div class="signsucceed">
    <Header post-title="签到成功"></Header>
    <div class="flatCard margin55 signsucceedtop ">
      <div style="text-align: center;margin-bottom: 20px">
        <div>
          <img src="@/assets/images/icon_success.png" width="60px">
        </div>
        <p>签到成功</p>
        <p>{{nowTime}}</p>
      </div>
    </div>
    <div class="linesign"></div>
    <div>
      <p class="signsucceedtitle">就诊预约情况</p>
      <div class="flatCard outCarint" v-for="(item,i) in waitList" :key="i" style="padding: 15px 12px 3px;">
        <!--<div class="cardText">-->
        <!--<p class="cardTextPPTilt">就诊项目：-->
        <!--<span class="mu-secondary-text-color">{{item.orgName}}</span>-->
        <!--</p>-->
        <!--<p class="cardTextPP">-->
        <!--<span>就诊科室：{{item.orgName}}</span>-->
        <!--<span>预约时间：{{item.regStage}}</span>-->
        <!--</p>-->
        <!--</div>-->
        <md-field>
          <md-detail-item title="就诊项目">
            <span class="mu-secondary-text-color">{{item.orgName}}</span>
          </md-detail-item>
          <md-detail-item title="就诊科室" :content=item.orgName></md-detail-item>
          <md-detail-item title="预约时间" :content=item.regStage></md-detail-item>
        </md-field>
      </div>
    </div>
  </div>
</template>
<script>
let bizExamApply = "/api/hos/bizPatientRegister/read/selectSignList";
export default {
  data() {
    return {

      waitList: [],
      nowTime: '',
    }
  },
  mounted() {

    // 获取当前时间
    var today = new Date();
    this.nowTime = today.getFullYear() + "年" + Number(today.getMonth() + 1) + "月" + today.getDate() + "日" + today.getHours() + "时" + today.getMinutes() + "分" + today.getSeconds() + "秒";


    document.title = '签到成功';

    this.$axios.put(bizExamApply, {
    }).then(res => {
      if (res.data.code == '200') {

        // for (let i = 0; i < res.data.rows.length; i++) {
        //   res.data.rows[i].signTime = res.data.rows[i].signTime.split(' ')[1];
        // }
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
.signsucceedtop {
  padding: 60px 0;
}
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

.signsucceed .cardText .cardTextPPTilt {
  display: inherit;
  padding: 25px 0;
  font-size: 28px;
  border-bottom: 1px solid #f5f5f5;
}
.signsucceed .cardText .cardTextPP:last-child {
  border: none;
}
.signsucceed /deep/.md-detail-item .md-detail-content {
  position: relative;
  top: -10px;
}
</style>
