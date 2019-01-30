<template>

  <div class="feeinfo">
    <Header post-title="我的缴费-待缴费" v-show="isWeixin"></Header>
    <div :class="{margin45:isWeixin,outCarint:true,'margin7':!isWeixin}">
      <div class="card margin16">
        <div class="cardText  ">
          <p class="cardTextPP">
            <span>开单医院</span>
            <span>演示医院</span>
          </p>
          <p class="cardTextPP">
            <span>开单医生</span>
            <span>唐皓寒</span>
          </p>
          <p class="cardTextPP">
            <span>患者ID</span>
            <span>10-77</span>
          </p>
          <p class="cardTextPP">
            <span>患者姓名</span>
            <span>唐皓寒</span>
          </p>
          <p class="cardTextPP">
            <span>开单时间</span>
            <span>2019-01-01 12:01:01</span>
          </p>
          <p class="cardTextPP">
            <span>开单序号</span>
            <span>7hd78125415</span>
          </p>
          <p class="cardTextPP">
            <span>处方金额</span>
            <span class="mu-secondary-text-color">7777</span>
          </p>
        </div>
      </div>
      <div class="card margin16">
        <div class="cardText">
          <p class="cardTextKind">
            <span>类别</span>
            <span>项目名称</span>
            <span>数量</span>
            <span>金额</span>
          </p>
          <p class="cardTextKindcontent">
            <span>类别</span>
            <span>项目名称</span>
            <span>数量</span>
            <span>金额</span>
          </p>
        </div>
      </div>
      <md-button class="margin16" type="primary" @click="isCashierhow = !isCashierhow" round>{{ isCashierhow ? '收起收银台' : '立即缴费' }}</md-button>
      <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="cashierAmount" payment-describe="关于支付金额的特殊说明" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel"></md-cashier>
    </div>
  </div>
</template>
<script>
import { Toast, Button } from 'mand-mobile'
export default {
  data() {
    return {
      isWeixin: false,
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
      cashierAmount: '100.00',
      cashierResult: 'success',
      cashierResults: [
        {
          text: '支付成功',
          value: 'success',
        },
        {
          text: '支付失败',
          value: 'fail',
        },
      ],
      cashierChannels: [
        {
          icon: 'cashier-icon-1',
          text: '招商银行(0056)',
          value: '001',
        },
        {
          icon: 'cashier-icon-2',
          text: '支付宝支付',
          value: '002',
        },
        {
          icon: 'cashier-icon-3',
          text: '微信支付',
          value: '003',
        },
        {
          icon: 'cashier-icon-4',
          text: 'QQ钱包支付',
          value: '004',
        },
        {
          icon: 'cashier-icon-5',
          text: '一网通支付',
          value: '005',
        },
      ],
    };
  },

  created() {

  },
  mounted() {
    document.title = '我的缴费-待缴费';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
      return true;
    } else {
      this.isWeixin = true;
      return false;
    }
  },
  methods: {
    switchTo(num) {
      this.active1 = num;
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
    doPay() {
      if (this.isCashierCaptcha) {
        this.cashier.next('captcha', {
          text: 'Verification code sent to 156 **** 8965',
          brief: 'The latest verification code is still valid',
          autoCountdown: false,
          countNormalText: 'Send Verification code',
          countActiveText: 'Retransmission after {$1}s',
          onSend: countdown => {
            console.log('[Mand Mobile] Send Captcha')
            this.sendCaptcha().then(() => {
              countdown()
            })
          },
          onSubmit: code => {
            console.log(`[Mand Mobile] Send Submit ${code}`)
            this.checkCaptcha(code).then(res => {
              if (res) {
                this.createPay().then(() => {
                  this.cashier.next(this.cashierResult)
                })
              }
            })
          },
        })
      } else {
        this.createPay().then(() => {
          this.cashier.next(this.cashierResult, {
            buttonText: '好的',
            handler: () => {
              this.isCashierhow = false
              Toast.info('支付成功')
              //  Toast.info(`${this.cashierResult}点击`)
            },
          })
        })
      }
    },
    // Create a pay request & check pay result
    createPay() {
      this.cashier.next('loading')
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve()
        }, 3000)
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
      console.log(`[Mand Mobile] Pay ${JSON.stringify(item)}`)
      this.doPay()
    },
    onCashierCancel() {
      // Abort pay request or checking request
      this.timer && clearTimeout(this.timer)
    },
  },
  computed: {
    cashier() {
      return this.$refs.cashier
    },
  },
};
</script>
 <style   scoped>
.feeinfo .cardText {
  padding: 0;
}
.feeinfo .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
  font-size: 28px;
  border-bottom: 1px solid #e9e9e9;
}
.feeinfo .cardText .cardTextKind {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
  font-size: 28px;
  border-bottom: 1px solid #e9e9e9;
  font-weight: 700;
}
.feeinfo .cardText .cardTextKindcontent {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
  font-size: 28px;
  font-weight: 700;
}
.feeinfo .cardText .cardTextPP:last-child {
  border: none;
}
</style>
 