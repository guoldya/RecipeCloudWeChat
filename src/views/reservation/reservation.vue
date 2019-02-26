<template>
   <div class="gp-order">
      <div :class="{'outCarint':true,'margin45':isWeixin}">
         <Header post-title="预约信息" v-show="isWeixin"></Header>
         <div class="order-info">
            <div class="doctor-info g-clear">
               <img src="https://kano.guahao.cn/pYf27810846" alt="卞晶" title="卞晶" onerror="this.src='https://static.guahao.cn/img/character/doc-unknow.png';this.onerror='';">
               <span class="doctor-name">{{doctorInfo.name}}</span>
               <span>{{doctorInfo.title}}</span>
            </div>

            <ul>
               <li>
                  <label>就诊院区：</label>
                  <p>冉家坝院区</p>
               </li>
               <li>
                  <label>科室：</label>
                  <p>{{doctorInfo.hospital}} </p>
               </li>
               <li>
                  <label>看诊时间：</label>
                  <p class="mu-secondary-text-color">2019-02-22&nbsp;周五下午</p>
               </li>

               <li>
                  <label>挂号费用：</label>
                  <p class="mu-secondary-text-color">￥ 20</p>
               </li>

            </ul>

         </div>
      </div>
      <div style="height:20px; background: #f8f8f8"></div>
      <div class="order-info ">
         <ul class="g-items">
            <li class="input-line g-arrow-r J_PatientsDropDown J_AdjustWidth">
               <div>
                  <label class="nowidth">就诊人：</label>
                  <span class="input-box">
                     王小双
                  </span>
               </div>
            </li>
            <input type="hidden" class="patient_type" value="0">
            <!-- <li class="input-line g-arrow-r GJ_Dropdown J_AdjustWidth J_TimeSelect">

               <div>
                  <label class="nowidth">预约时间段：</label>
                  <span class="input-box">

                  </span>
               </div>

            </li> -->
            <!-- <li class="input-line g-arrow-r GJ_Dropdown J_AdjustWidth">

               <div>
                  <label class="nowidth">初/复诊：</label>
                  <span class="input-box">
                     初诊（初次就诊时，选择此项）
                  </span>
               </div>
            </li> -->

            <li class="input-line g-arrow-r" id="J_SelectDis" data-init="[{&quot;name&quot;:&quot;尚未确诊&quot;,&quot;uuid&quot;:&quot;0&quot;}]">
               <div>
                  <label class="nowidth">就诊卡：</label>
                  <span class="input-box">No666666
                  </span>
               </div>
            </li>
         </ul>

      </div>
      <div class="outCarint">
         <md-button type="primary" round @click="rightPay">提交</md-button>
      </div>

      <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="cashierAmount" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel" :default-index=0></md-cashier>
   </div>

</template>
<script type="text/babel">
let appbdHospitalDoctorreaddetail2 = "/app/bdHospitalDoctor/read/detail2";
let fee_detail_url = "/app/bizCostBill/detail";
let fconfirm_pay_url = "/app/bizCostBill/confirmPay";
let now_pay_url = "/app/bizCostBill/nowPay";
export default {
   data() {
      return {
         isWeixin: false,
         doctorInfo: '',
         isCashierhow: false,
         cashierResult: 'success',
         cashierAmount: '',
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
      this.$axios.put(appbdHospitalDoctorreaddetail2, {
         id: this.$route.query.doctorId * 1,
      }).then((res) => {
         if (res.data.code == '200') {
            this.doctorInfo = res.data.data.doctorInfo;
         } else {
            console.log(res.msg);
         }
      }).catch(function (err) {
         console.log(err);
      });
   },
   mounted() {
      document.title = '预约信息';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
      } else {
         this.isWeixin = true;
      }
   },
   methods: {
      onCashierPay() {
      },
      onCashierSelect(item) {
         console.log(`[Mand Mobile] Select ${JSON.stringify(item)}`)
      },
      onCashierCancel() {
         // Abort pay request or checking request
         this.timer && clearTimeout(this.timer)
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
                     this.isCashierhow = false;
                     this.$router.push({
                        name: 'feerecord',
                        query: {}
                     });
                  },
               })
            })
         }
      },
      rightPay() {
         this.isCashierhow = !this.isCashierhow;
         this.$axios.put(fconfirm_pay_url, { id: this.feeId }, {
            headers: {
               'TOKEN': `edd169b85704410aa5219512cb6f1f00`,
               'UUID': `AAA`
            },
         }).then((res) => {
            if (res.data.code == '200') {
               this.orderCode = res.data.data.orderCode;
            }
         }).catch(function (err) {
            console.log(err);
         });
      },
   },
   computed: {

   },

};
</script>
 <style scoped>
@import url("./reservation.css");
</style>