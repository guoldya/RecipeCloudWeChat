<template>
  <div class="outpatientinfo">
    <Header post-title="门诊缴费明细"></Header>
    <div class="margin55" v-show="!loadingtrue">
      <div class="outpatien-card">
        <md-field>
          <md-detail-item title="姓名" :content=feeDetailData.patientName></md-detail-item>
          <md-detail-item title="性别">
            <span>{{feeDetailData.sex}}</span>
          </md-detail-item>
          <md-detail-item title="年龄" :content=feeDetailData.age></md-detail-item>
          <md-detail-item title="费用类型">
            <span>{{feeDetailData.feeType|feeTypeFilter}}费</span>
          </md-detail-item>
          <md-detail-item v-if="feeDetailData.feeType==1" title="挂号科室" :content=feeDetailData.dept></md-detail-item>
          <md-detail-item v-else-if="feeDetailData.feeType==3||feeDetailData.feeType==4||feeDetailData.feeType==5" title="开单科室" :content=feeDetailData.dept></md-detail-item>
          <md-detail-item v-else title="就诊科室" :content=feeDetailData.dept></md-detail-item>
          <md-detail-item v-if="feeDetailData.feeType==1" title="就诊医生" :content=feeDetailData.doctor></md-detail-item>
          <md-detail-item v-else-if="feeDetailData.feeType==3||feeDetailData.feeType==4||feeDetailData.feeType==5" title="开单医生" :content=feeDetailData.dept></md-detail-item>
          <md-detail-item v-else title="就诊医生" :content=feeDetailData.doctor></md-detail-item>
          <md-detail-item title="创建时间">
            <span>{{feeDetailData.createTime|lasttime}}</span>
          </md-detail-item>
          <md-detail-item v-if="feeDetailData.feeType==1" title="就诊时间">
            <span>{{feeDetailData.fulfilTime}}</span>
          </md-detail-item>
          <md-detail-item v-else-if="feeDetailData.feeType==2" title="开方时间">
            <span>{{feeDetailData.applyTime}}</span>
          </md-detail-item>
          <md-detail-item v-else title="开单时间">
            <span>{{feeDetailData.applyTime|lasttime}}</span>
          </md-detail-item>
          <md-detail-item title="支付时间" v-if="feeDetailData.payTime">
            <span>{{feeDetailData.payTime|lasttime}}</span>
          </md-detail-item>
          <md-detail-item title="合计金额">
            <span class="mu-secondary-text-color">￥{{feeDetailData.totalMoney | keepTwoNum}}</span>
          </md-detail-item>
        </md-field>
      </div>
      <div class="cardText outpatien-card" v-if="$route.query.feeType==2||$route.query.feeType==3||$route.query.feeType==4">
        <div class="cardTextKind spanWid">
          <span style="text-align: left">类别</span>
          <span>项目名称</span>
          <span>数量</span>
          <span style="text-align: right">金额</span>
        </div>
        <div v-if="feeDetailData.bizDetail">
          <div v-for="(item,i) in feeDetailData.bizDetail.classList" :key="i">
            <p style=" line-height: 40px;">{{item.className}}</p>
            <div class="spanWid cardTextPP arrow" v-for="(item2,index) in item.list" :key="index">
              <span> </span>
              <span>{{item2.name}} </span>
              <span>{{item2.total}}{{item2.doseUnit}}</span>
              <span>￥{{item2.money|keepTwoNum}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading v-show="loadingtrue"></Loading>
    <div style="height: 50px"></div>
    <div v-show="!loadingtrue" class="md-example-child md-example-child-cashier" v-if="$route.query.payStatus==1">
      <p class="addbTN" @click="rightPay">立即缴费</p>
      <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="cashierAmount" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel" :default-index=0></md-cashier>
    </div>

    <div v-show="!loadingtrue" class="md-example-child md-example-child-cashier" v-if="!$route.query.payStatus&&feeActiveId==1">
      <p class="addbTN" @click="rightPay">立即缴费</p>
      <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="cashierAmount" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel" :default-index=0></md-cashier>
    </div>

  </div>
</template>
<script>

let fee_detail_url = "/bizPayOrder/read/detail";
let fconfirm_pay_url = "/bizCostBill/confirmPay";
let now_pay_url = "/bizPayOrder/nowPay";
import { Cashier } from 'mand-mobile'
export default {
  data() {
    return {
      active1: 0,
      normal: {
        checkbox: true,
        radio: 1,
        switch: false
      },
      time: [
        { title: '待支付' },
        { title: '预约成功' },
        { title: '预约关闭' }
      ],
      isCashierhow: false,
      isCashierCaptcha: false,
      cashierAmount: '',
      cashierChannels: [
        {
          icon: 'cashier-icon-3',
          text: '微信支付',
          value: '2',
        },

      ],
      feeTitle: null,
      feeDetailData: [],
      orderId: '',
      orderCode: '',
      feeActiveId: '',
      postTitle: '',
      loadingtrue: true,
      code: '',
      routeLoad: '',
      payStatus: '',
      feeType: 3,
    };
  },
  created() {

  },
  mounted() {
    this.feeActiveId = sessionStorage.getItem('feeActiveFun') * 1;
    this.feeDetail();

  },
  computed: {
    cashier() {
      return this.$refs.cashier
    },
  },
  methods: {
    feeDetail() {


      let aa = {};
      aa.id = this.$route.query.id;
      aa.feeType = this.$route.query.feeType;
      if (aa.feeType == 3 || aa.feeType == 4 || aa.feeType == 2) {
        aa.objId = this.$route.query.objId;
      }

      this.$axios.put(fee_detail_url, aa).then((res) => {
        if (res.data.code == '200') {
          this.loadingtrue = false;
          this.orderId = res.data.data.id;
          this.feeDetailData = res.data.data;
          this.feeType = res.data.data.feeType
          var xsd = res.data.data.totalMoney.toString().split(".");
          if (xsd.length == 1) {
            this.cashierAmount = String(res.data.data.totalMoney) + '.00';
          } else if (xsd.length == 2) {
            this.cashierAmount = String(res.data.data.totalMoney);
          }

          if (this.feeActiveId == 1) {
            this.feeTitle = "应付金额";
          } else if (this.feeActiveId == 2) {
            this.feeTitle = "实付金额";
          }
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    rightPay() {
      this.isCashierhow = !this.isCashierhow;
      // this.$axios.put(fconfirm_pay_url, { id: this.orderId }).then((res) => {
      //   if (res.data.code == '200') {
      //     this.orderCode = res.data.data.orderCode;
      //   }
      // }).catch(function (err) {
      //   console.log(err);
      // });
    },
    payment() {
      this.$router.push({
        name: 'payment',
      });
    },
    setStyle(rowIndex, row) {
      if (row.id === this.currentRow.id) {
        return 'background-color:#ddd'
      } else {
        return 'background-color:#abc'
      }
    },

    // Create a pay request & check pay result
    createPay() {
      this.cashier.next('loading')
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve()
        }, 1000)
      })
    },
    // Create a captcha sending request
    sendCaptcha() {
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve()
        }, 200)
      })
    },
    // Create a captcha checking request
    checkCaptcha(code) {
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve(!!code)
        }, 200)
      })
    },
    onCashierSelect(item) {
      console.log(`[Mand Mobile] Select ${JSON.stringify(item)}`)
    },
    onCashierPay(item) {
      let nowPayParams = {};
      nowPayParams.id = this.orderId;
      nowPayParams.payMode = Number(item.value);
      nowPayParams.objId = this.$route.query.objId ? this.$route.query.objId * 1 : null;
      nowPayParams.feeType = this.$route.query.objId ? this.feeType * 1 : null;
      this.$axios.post(now_pay_url, nowPayParams).then((res) => {
        if (res.data.code == '200') {
          this.$store.dispatch('getMessage', { update1: true });
          this.createPay().then(() => {
            this.cashier.next('success', {
              buttonText: '好的',
              handler: () => {
                this.isCashierhow = false
                this.$router.go(-1);
              },
            })
          })
          // this.payStatus = "1";
        } else {
          this.$toast.info(res.data.msg);
          this.isCashierhow = false;
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    onCashierCancel() {
      // Abort pay request or checking request
      this.timer && clearTimeout(this.timer);
      if (this.payStatus == "1") {
        this.$router.go(-1);
      }
    },



  },


};
</script>
<style lang="scss"  scoped>
@import "../../submitOrder/submitOrder.css";
.outpatientinfo .outpatien-card {
  margin: 24px;
  padding: 24px;
  background: #ffffff;
  border-radius: 15px;
  .mu-secondary-text-color {
    font-size: 36px;
  }
  &:nth-child(2) {
    padding-top: 0;
  }
}

.outpatientinfo .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 28px;
  // border-bottom: 2px solid #e9e9e9;
}
.outpatientinfo .cardText .cardTextKind {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
  font-size: 28px;
  border-bottom: 2px solid #e9e9e9;
  font-weight: 700;
}
.outpatientinfo .spanWid span {
  display: inline-block;
  word-break: normal;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  text-align: center;
}
.outpatientinfo .spanWid span:first-child {
  width: 15%;
  text-align: left;
}
.outpatientinfo .spanWid span:nth-child(2) {
  width: 40%;
  text-align: left;
}
.outpatientinfo .spanWid span:nth-child(3) {
  width: 20%;
  text-align: center;
}
.outpatientinfo .spanWid span:last-child {
  width: 25%;
  text-align: right;
}
.outpatientinfo .cardText .cardTextKindcontent {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
  font-size: 28px;
  font-weight: 700;
}
.outpatientinfo .cardText .cardTextPP:last-child {
  border: none;
}
</style>
