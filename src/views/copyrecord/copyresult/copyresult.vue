<template>
  <div class=" copyresult  margin55 ">
    <Header post-title="确认支付"></Header>
    <md-field>
      <div class="outCarint addr" v-show="$route.query.mail==1">
        <!--<md-detail-item title="收件人：众但是安" content="1345648648" bold />-->
        <!--&lt;!&ndash;<md-detail-item class="addr" title="重庆市渝北区大龙山202" />&ndash;&gt;-->
        <!--<p style="padding-bottom: 6px">重庆市渝北区大龙山202</p>-->
        <md-detail-item title="收件人" :content="_recipients.receiveBy" />
        <md-detail-item title="手机号码" :content="_recipients.tel" />
        <md-detail-item title="联系地址" :content="_recipients.adressname" />
      </div>
      <div style="height:5px;background:#f8f8f8"> </div>
      <div class="outCarint">
        <md-detail-item title="申请信息" bold/>
        <p class="partLine" style="margin-top: 9px"></p>
        <md-detail-item title="申请编号" :content="$route.query.code" />
        <md-detail-item title="住院号" :content="_cardlist.ihNo" />
        <md-detail-item title="患者姓名" :content="$route.query.name" />
        <md-detail-item title="入院时间">
          <span>{{_cardlist.inTime|lasttime}}</span>
        </md-detail-item>
        <md-detail-item title="出院时间">
          <span>{{_cardlist.outTime|lasttime}}</span>
        </md-detail-item>
      </div>
      <div style="height:5px;background:#f8f8f8">
      </div>
      <div class="outCarint">
        <md-detail-item title="复印用途" bold/>
        <p class="partLine" style="margin-top: 9px"></p>
        <md-detail-item title="保险报销">
          <span>{{$route.query.num}}份</span>
        </md-detail-item>
      </div>
      <div style="height:5px;background:#f8f8f8">
      </div>
      <div class="outCarint">
        <md-detail-item title="费用信息" bold/>
        <p class="partLine" style="margin-top: 9px"></p>
        <md-detail-item title="复印费(1.00元/页)">
          <span style="color:var(--primary)">50.00元</span>
        </md-detail-item>
        <md-detail-item title="快递费">
          <span style="color:var(--primary)">22.00元</span>
        </md-detail-item>
      </div>
      <div style="height:5px;background:#f8f8f8">
      </div>
      <div class="outCarint">
        <md-detail-item title="需支付费用" class="payFee">
          <span style="color:var(--primary);font-size:17px; ">72.00元</span>
        </md-detail-item>
      </div>
    </md-field>
    <div style="height:60px">
    </div>
    <p class="addbTN" @click="rightPay">支付</p>
    <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="cashierAmount" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel" :default-index=0></md-cashier>
  </div>
</template>
<script>
import { mapState } from 'vuex';
let appbizCopyApplypayment = "/app/bizPayOrder/nowPay"


import { Cashier } from 'mand-mobile'
export default {
  name: 'detail-item-demo',
  data() {
    return {
      isCashierhow: false,
      isCashierCaptcha: false,
      cashierAmount: '72',
      cashierResult: 'success',
      cashierChannels: [
        {
          icon: 'cashier-icon-2',
          text: '支付宝支付',
          value: '1',
        },
        {
          icon: 'cashier-icon-3',
          text: '微信支付',
          value: '2',
        },
        {
          icon: 'cashier-icon-3',
          text: '医保支付',
          value: '3',
        },
      ],

    };
  },
  created() {

  },

  computed: {
    ...mapState({
      _cardlist: state => state.chooseInfo,
      _recipients: state => state.recipients,
    }),
    cashier() {
      return this.$refs.cashier
    },
  },
  methods: {
    onCashierCancel() {
      // Abort pay request or checking request
      this.timer && clearTimeout(this.timer);
      if (this.payStatus == "1") {
        this.$router.go(-1);
      }
    },
    createPay() {
      this.cashier.next('loading')
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve()
        }, 3000)
      })
    },
    rightPay() {
      this.isCashierhow = !this.isCashierhow;

    },
    onCashierSelect(item) {
      console.log(`[Mand Mobile] Select ${JSON.stringify(item)}`)
    },
    onCashierPay(item) {
      let nowPayParams = {};
      // nowPayParams.id = Number(this.$route.query.feeid);
      nowPayParams.orderId = Number(this.$route.query.feeid);
      nowPayParams.id = Number(this.$route.query.copyId);
      nowPayParams.ihRecordId = Number(this.$route.query.ihRecordId);
      nowPayParams.orderCode = this.orderCode;
      nowPayParams.receiveMode = Number(this.$route.query.mail);
      nowPayParams.orderType = Number(item.value);
      nowPayParams.totalMoney = 72;
      nowPayParams.payType = Number(item.value);
      // nowPayParams.code = this.$route.query.code;
      this.$axios.post(appbizCopyApplypayment, nowPayParams).then((res) => {
        if (res.data.code == '200') {
          this.createPay().then(() => {
            this.cashier.next('success', {
              buttonText: '好的',
              handler: () => {
                this.isCashierhow = false
                this.$router.go(-4);
              },
            })
          })
        } else {
          this.$toast.info(res.data.msg);
          this.isCashierhow = false;
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
