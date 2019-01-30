<template>

   <div class="orderinfo">
      <Header post-title="预约详情" v-show="isWeixin"></Header>
      <div :class="{margin45:isWeixin,outCarint:true,'margin7':!isWeixin}">
         <div class="card margin16">
            <div class="cardText  ">
               <p class="cardTextPP">
                  <span>科室</span>
                  <span>演示</span>
               </p>
               <p class="cardTextPP">
                  <span>医生</span>
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
                  <span>预约时段</span>
                  <span>2019-01-01 12:01:01</span>
               </p>
               <p class="cardTextPP">
                  <span>诊断序号</span>
                  <span>7hd78125415</span>
               </p>
               <p class="cardTextPP">
                  <span>金额</span>
                  <span class="mu-secondary-text-color">7777</span>
               </p>
               <p class="cardTextPP">
                  <span>
                     地点
                  </span>
                  <span>门诊大楼三楼E区19诊室</span>
               </p>
               <p class="cardTextPP">
                  <span>
                     预约来源
                  </span>
                  <span>演示医院</span>
               </p>
            </div>
         </div>
         <md-button class="margin16" type="primary" round @click="tuihao" v-show="!istuihao&&!shixiao">申请退号</md-button>
         <md-button class="margin16" type="disabled" round v-show="istuihao">已退号</md-button>
         <md-button class="margin16" type="disabled" round v-show="shixiao">已失效</md-button>
      </div>
   </div>
</template>
<script>
import { Toast, Button, Dialog } from 'mand-mobile'
export default {
   data() {
      return {
         isWeixin: false,
         active1: 0,
         shixiao: false,
         istuihao: false,
         time: [
            { title: '待支付' },
            { title: '预约成功' },
            { title: '预约关闭' }
         ],


      };
   },

   created() {

   },
   mounted() {
      document.title = '预约详情';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
      } else {
         this.isWeixin = true;
      };
      if (this.$route.query.aa * 1 == 2) {
         this.shixiao = true;
      }
   },
   methods: {
      switchTo(num) {
         this.active1 = num;
      },
      tuihao() {
         Dialog.confirm({
            title: '确认',
            content: '请确认退号吗',
            confirmText: '确定',
            onConfirm: () => this.istuihao = true,
         })
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
.orderinfo .cardText {
  padding: 0;
}
.orderinfo .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
  font-size: 28px;
  border-bottom: 1px solid #c5c5c5;
}
.orderinfo .cardText .cardTextKind {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
  font-size: 28px;
  border-bottom: 1px solid #c5c5c5;
  font-weight: 700;
}
.orderinfo .cardText .cardTextKindcontent {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
  font-size: 28px;
  font-weight: 700;
}
.orderinfo .cardText .cardTextPP:last-child {
  border: none;
}
</style>
 