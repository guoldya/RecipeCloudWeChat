<template>
  <div class="listDatatop recordcard-content">
    <template v-if="type==1">
      <p class="parElem listData">
        <span class="sonElem">科室
        </span>
        <span>{{content.deptName}}</span>
      </p>
      <p class="parElem listData ">
        <span v-if="content.regType==2||content.regType==1" class="sonElem">就诊时间</span>
        <span style="color: var(--primary--content);" v-if="content.regType==2">{{content.regDate |time}} {{content.regStage}} </span>
        <span style="color: var(--primary--content);" v-else>{{content.regDate |time}} {{content.regStage}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">创建时间</span>
        <span> {{content.createTime |lasttime}} </span>
      </p>
    </template>

    <!-- 复印记录 -->
    <template v-if="type==3">
      <p class="parElem listData">
        <span class="sonElem">申请编号</span>
        <span>{{content.code}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">科室 </span>
        <span>{{content.dept}}</span>
      </p>
      <p class="parElem listData ">
        <span class="sonElem">入院日期</span>
        <span>{{content.inTime|lasttime}} </span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">出院日期</span>
        <span>{{content.outTime |lasttime}}</span>
      </p>
    </template>
    <!-- 缴费记录 -->
    <template v-if="type==2">
      <p class="parElem listData">
        <span class="sonElem">患者 </span>
        <span>{{content.patientName}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">费用 </span>
        <span class="mu-secondary-text-color">￥{{content.totalMoney | keepTwoNum}}</span>
      </p>
      <template v-if="content.feeType==1 ||content.feeType==6||content.feeType==7">
        <p v-if="content.status == 1" class="parElem listData">
          <span class="sonElem">创建时间</span>
          <span>{{content.createTime|lasttime}}</span>
        </p>
        <p v-if="content.status == 2" class="parElem listData">
          <span class="sonElem">支付时间</span>
          <span>{{content.payTime|lasttime}}</span>
        </p>
        <p v-if="content.status == 3" class="parElem listData">
          <span class="sonElem">退款时间</span>
          <span>{{content.returnTime|lasttime}}</span>
        </p>
        <p v-if="content.status == 4" class="parElem listData">
          <span class="sonElem">关闭时间</span>
          <span>{{content.closeTime|lasttime}}</span>
        </p>
      </template>
      <template v-if="content.feeType==2">
        <p v-if="content.status == 1" class="parElem listData">
          <span class="sonElem">开方时间</span>
          <span>{{content.applyTime|lasttime}}</span>
        </p>
        <p v-if="content.status == 3" class="parElem listData">
          <span class="sonElem">退款时间</span>
          <span>{{content.returnTime|lasttime}}</span>
        </p>
        <p v-if="content.status == 2" class="parElem listData">
          <span class="sonElem">支付时间</span>
          <span>{{content.payTime|lasttime}}</span>
        </p>
        <p v-if="content.status == 4" class="parElem listData">
          <span class="sonElem">关闭时间</span>
          <span>{{content.closeTime|lasttime}}</span>
        </p>
      </template>
      <template v-if="content.feeType==3||content.feeType==4||content.feeType==5">
        <p v-if="content.status == 1" class="parElem listData">
          <span class="sonElem">开单时间</span>
          <span>{{content.applyTime|lasttime}}</span>
        </p>
        <p v-if="content.status == 3" class="parElem listData">
          <span class="sonElem">退款时间</span>
          <span>{{content.returnTime|lasttime}}</span>
        </p>
        <p v-if="content.status == 2" class="parElem listData">
          <span class="sonElem">支付时间</span>
          <span>{{content.payTime|lasttime}}</span>
        </p>
        <p v-if="content.status == 4" class="parElem listData">
          <span class="sonElem">关闭时间</span>
          <span>{{content.closeTime|lasttime}}</span>
        </p>
      </template>
    </template>
    <!-- 处方记录 -->
    <template v-if="type==4">
      <p class="parElem listData">
        <span class="sonElem">就诊科室
        </span>
        <span>{{content.dept}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">就诊医生</span>
        <span>{{content.doctorName}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">开方时间</span>
        <span>{{content.recipeDate|lasttime}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">处方金额</span>
        <span class="mu-secondary-text-color">￥{{content.totalMoney|keepTwoNum}}</span>
      </p>
    </template>
    <!-- 住院缴费记录 -->
    <template v-if="type==7">
      <p class="parElem listData">
        <span class="sonElem">病区</span>
        <span> {{content.area}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">床号</span>
        <span> {{content.bedNo}}床</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">缴费金额</span>
        <span class="mu-secondary-text-color">￥{{content.money|keepTwoNum}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">当前预缴款总额</span>
        <span>￥{{content.totalMoney|keepTwoNum}}</span>
      </p>
    </template>
    <!-- 就医评价 -->
    <template v-if="type==9">
      <p class="parElem listData">
        <span class="sonElem">姓名</span>
        <span>{{content.patientName}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem" v-if="queryType==1&&content.type==1">住院日期</span>
        <span class="sonElem" v-if="queryType==1&&content.type==2">就诊日期</span>
        <span class="sonElem" v-if="queryType==1&&content.type==3">报告日期</span>
        <span class="sonElem" v-if="queryType==2">评价日期 </span>
        <span v-if="queryType==2">{{content.createTime|time}}</span>
        <span v-if="queryType!=2">{{content.time|time}}</span>
      </p>
      <p class="listData" v-show="queryType==1">
        <span> </span>
        <span class="have" @click="intoDetail(content)">去评价</span>
      </p>
    </template>
    <!--  -->
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: ['content', 'type', 'queryType'],
  async mounted() {

  },
  methods: {
    intoDetail(val) {
      let aa = {};
      aa.id = val.id;
      aa.type = val.type;
      aa.evaluateStatus = this.queryType - 1;
      if (this.queryType - 1 == 0) {
        aa.time = val.outTime;
      } else {
        aa.time = val.createTime;
      }
      if (val.type == 1) {
        aa.title = val.area
      } else if (val.type == 2) {
        aa.title = val.dept
      }
      this.$router.push({
        name: 'valuation',
        query: aa,
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.listDatatop {
  padding: 24px;
  p {
    line-height: 50px;
  }
}
.recordcard-content {
  padding: 14px 0;
  .listData {
    padding: 7px 24px;
    border-bottom: none;
    span {
      padding: 0;
      max-width: 70%;
    }
    .have {
      font-size: 28px;
      color: #ffffff;
      float: right;
      background: var(--primary);
      border-radius: 40px;
      letter-spacing: 1px;
      width: 134px;
      line-height: 60px;
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
