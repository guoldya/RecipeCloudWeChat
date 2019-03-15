<template>
   <div class="gp-order">
      <div :class="{'outCarint':true,'margin45':isWeixin}">
         <Header post-title="预约信息" v-show="isWeixin"></Header>
         <div class="order-info">
            <div class="doctor-info g-clear">
               <img src="@/assets/images/user.png" alt="卞晶" title="卞晶" onerror="this.src='https://static.guahao.cn/img/character/doc-unknow.png';this.onerror='';">
               <span class="doctor-name">{{doctorInfo.name}}</span>
               <span>{{doctorInfo.title}}</span>
            </div>
            <ul>
               <li>
                  <label>就诊院区：</label>
                  <p>{{depart}}</p>
               </li>
               <li>
                  <label>科室：</label>
                  <p>{{major}} </p>
               </li>
               <li>
                  <label>看诊时间：</label>
                  <p class="mu-secondary-text-color">{{time}}&nbsp;周五 {{afternoon}}</p>
               </li>
               <li>
                  <label>挂号费用：</label>
                  <p class="mu-secondary-text-color">￥ {{money}}</p>
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
                     {{cardName}}
                  </span>
               </div>
            </li>
            <input type="hidden" class="patient_type" value="0">
            <li class="input-line g-arrow-r" id="J_SelectDis" data-init="[{&quot;name&quot;:&quot;尚未确诊&quot;,&quot;uuid&quot;:&quot;0&quot;}]">
               <div>
                  <label class="nowidth">就诊卡：</label>
                  <span class="input-box">{{cardNo}}
                  </span>
               </div>
            </li>
         </ul>
      </div>
      <div class="outCarint" v-show="!isSucceed">
         <md-button type="primary" round @click="rightPay">提交</md-button>
      </div>

      <div v-show="isSucceed" class="bottomback">
         <span class="payatnow" @click="backindex()">返回主页</span>
         <span class="cancle" @click="registrecord()">预约记录</span>
      </div>
      <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="money" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel" :default-index=0></md-cashier>
   </div>

</template>
<script type="text/babel">
let doctorInfo = "/app/bdHospitalDoctor/read/detail";
let fee_detail_url = "/app/bizCostBill/detail";
// 生成预约
let fconfirm_pay_url = "/app/bizPatientRegister/subscribe";
// 付钱
let now_pay_url = "/app/bizPatientRegister/nowPay";


export default {
   data() {
      return {
         isWeixin: false,
         depart: '',
         major: '',
         time: '',
         afternoon: '',
         doctorInfo: '',
         cardNo: '',
         cardName: '',
         isSucceed: false,
         isCashierhow: false,
         money: '',
         cashierResult: 'success',
         backId: '',
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

      this.$axios.put(doctorInfo, {
         id: this.$route.query.doctorId * 1,
      }).then((res) => {
         if (res.data.code == '200') {
            this.doctorInfo = res.data.data;
         } else {
            console.log(res.msg);
         }
      }).catch(function (err) {
         console.log(err);
      });

   },
   mounted() {
      console.log(this.$store.state.cardId)
      document.title = '预约信息';
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
         this.isWeixin = false;
      } else {
         this.isWeixin = true;
      }

      this.depart = this.$store.state.depart;
      this.major = this.$store.state.major;
      if (this.$route.query.afternoon * 1 == 1) {
         this.afternoon = '上午';
      } else if (this.$route.query.afternoon * 1 == 2) {
         this.afternoon = '下午';
      } else {
         this.afternoon = this.$route.query.afternoon;
      }

      this.time = this.$route.query.time;


      this.cardName = this.$store.state.patientName;
      this.cardNo = this.$store.state.cardNo;
      this.money = String(this.$route.query.money);
   },
   methods: {
      onCashierPay() {
         let nowPayParams = {};
         nowPayParams.sourceId = this.$route.query.sourceId * 1;
         nowPayParams.id = this.backId;
         nowPayParams.payType = 1;
         this.$axios.post(now_pay_url, nowPayParams).then((res) => {
            if (res.data.code == '200') {
               this.isCashierhow = false;
               this.isSucceed = true;
               // this.doPay()
            } else {
               this.$toast.info(res.data.msg);
               this.isCashierhow = false;
            }
         }).catch(function (err) {
            console.log(err);
         });
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
            console.log()
            this.createPay().then(() => {
               this.cashier.next(this.cashierResult, {
                  buttonText: '好的',
                  handler: () => {
                     this.isCashierhow = false;
                     this.isSucceed = true;
                  },
               })
            })
         }
      },
      rightPay() {
         this.$axios.post(fconfirm_pay_url, {
            sourceId: this.$route.query.sourceId,
            cardId: this.$store.state.cardId,
         }).then((res) => {
            if (res.data.code == '200') {
               this.isCashierhow = !this.isCashierhow;
               this.backId = res.data.data;
            } else {
               this.$toast.info("提交失败")
            }
         }).catch(function (err) {
            console.log(err);
         });
      },
      createPay() {
         this.cashier.next('loading')
         return new Promise(resolve => {
            this.timer = setTimeout(() => {
               resolve()
            }, 3000)
         })
      },

      backindex() {
         this.$router.push({
            name: 'home',
         });
      },

      registrecord() {
         this.$router.replace({
            name: 'registrecord',
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