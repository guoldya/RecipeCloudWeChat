<template>
  <div class=" copyresult  margin55 ">
    <Header post-title="复印记录详情"></Header>
    <md-field v-show="!loadingtrue">
      <div class="outCarint">
        <md-detail-item title="申请信息" bold/>
        <p class="partLine" style="margin-top: 9px"></p>
        <md-detail-item title="申请编号" :content="businssrecordinfo.code" />
        <md-detail-item title="申请人姓名" :content="bizIhRecord.name" />
        <md-detail-item title="与患者关系">
          <span v-if="businssrecordinfo.receiverType==1">本人</span>
          <span v-else>代理人</span>
        </md-detail-item>
        <md-detail-item title="证件类型">
          <span v-if="businssrecordinfo.idCard">身份证</span>
          <span v-else>医保卡</span>
        </md-detail-item>
        <md-detail-item title="证件号">
          <span v-if="businssrecordinfo.idCard">{{businssrecordinfo.idCard}}</span>
        </md-detail-item>
      </div>
      <div style="height:5px;background:#f8f8f8">
      </div>
      <div style="height:5px;background:#f8f8f8">
      </div>
      <div class="outCarint">
        <md-detail-item title="住院信息" bold/>
        <p class="partLine" style="margin-top: 9px"></p>
        <md-detail-item title="患者姓名">
          <span>{{businssrecordinfo.patientName}}</span>
        </md-detail-item>
        <md-detail-item title="入院时间">
          <span>{{businssrecordinfo.inTime|lasttime}}</span>
        </md-detail-item>
        <md-detail-item title="出院时间">
          <span>{{businssrecordinfo.outTime|lasttime}}</span>
        </md-detail-item>
        <md-detail-item title="住院号">
          <span>{{bizIhRecord.ihNo}}</span>
        </md-detail-item>
        <md-detail-item title="住院科室" :content="businssrecordinfo.dept" />
        <md-detail-item title="住院诊断" :content="businssrecordinfo.diag" />
        <md-detail-item title="住院次数" :content="bizIhRecord.renewalMum">
          <span>第 {{bizIhRecord.ihCount}} 次</span>
        </md-detail-item>
        <!-- <md-detail-item title="病历类型" content="住院病历" /> -->
        <md-detail-item title="申请日期">
          <span>{{businssrecordinfo.createTime|lasttime}}</span>
        </md-detail-item>
        <md-detail-item title="处理状态">
          <span class="mu-light-text-color">{{businssrecordinfo.status|busistatus}}</span>
        </md-detail-item>
        <md-detail-item v-show="businssrecordinfo.status==3" title="不通过原因">
          <span class="mu-light-text-color">{{businssrecordinfo.refuseReson}}</span>
        </md-detail-item>
      </div>
      <div style="height:5px;background:#f8f8f8">
      </div>
      <div class="outCarint">
        <md-detail-item title="复印用途" bold/>
        <p class="partLine" style="margin-top: 9px"></p>
        <md-detail-item :title="businssrecordinfo.usage">
          <span>{{businssrecordinfo.num}} 份</span>
        </md-detail-item>
        <md-detail-item title="用途说明" v-show="businssrecordinfo.usage=='全套复印'">
          <span>{{businssrecordinfo.usageDesc}}</span>
        </md-detail-item>
      </div>
    </md-field>
    <Loading v-show="loadingtrue"></Loading>
    <div style="height:30px">
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
let appbizCopyApplypayment = "/api/hos/bizCopyApply/read/detail"


import { Cashier } from 'mand-mobile'
export default {
  name: 'detail-item-demo',
  data() {
    return {
      bizIhRecord: '',
      businssrecordinfo: '',
      loadingtrue: true,
    };
  },
  created() {
    this.onCashierPay()
  },


  methods: {

    onCashierPay() {
      this.loadingtrue = true;
      let nowPayParams = {};
      nowPayParams.id = this.$route.query.id;
      this.$axios.put(appbizCopyApplypayment, nowPayParams).then((res) => {
        if (res.data.code == '200') {
          this.loadingtrue = false;
          this.businssrecordinfo = res.data.data;
          this.bizIhRecord = res.data.data.bizIhRecord;
        } else {
          this.loadingtrue = false;
          this.$toast.info(res.data.msg);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },



  }


}

</script>
<style>
.copyresult .addr .md-detail-item div:first-child {
  width: 32%;
}
.copyresult .payFee .md-detail-title {
  width: 20%;
}
.copyresult .outCarint {
  padding: 16px 24px;
}
.copyresult .partLine {
  height: 2px;
}
</style>
