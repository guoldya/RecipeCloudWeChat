<template>
   <div class="gp-order">
      <div class="cardText flatCard margin55">
         <Header post-title="预约信息"></Header>
         <div class="order-info">
            <div class="doctor-info g-clear">
               <img src="@/assets/images/user.png" alt="卞晶" title="卞晶" onerror="this.src='https://static.guahao.cn/img/character/doc-unknow.png';this.onerror='';">
               <span class="doctor-name">{{doctorInfo.name}}</span>
               <span class="docLevel">{{doctorInfo.title}}</span>
            </div>
            <ul  class="cardText">
               <li class="dis-flex">
                  <label>就诊院区</label>
                  <p class="colon-right">{{depart}}</p>
               </li>
               <li class="dis-flex">
                  <label>科室</label>
                  <p class="colon-right">{{major}} </p>
               </li>
               <li class="dis-flex">
                  <label>看诊时间</label>
                  <p class="mu-secondary-text-color">{{time}}&nbsp;
                     <span>{{afternoon}}{{regStage}}</span>
                  </p>
               </li>
               <li class="dis-flex">
                  <label>挂号费用</label>
                  <p class="mu-secondary-text-color">￥ {{money | keepTwoNum}}</p>
               </li>
            </ul>
         </div>
      </div>
      <div class="order-info margin5 cardText">
         <ul class="g-items">
            <li class="input-line J_PatientsDropDown J_AdjustWidth">
               <div class="dis-flex">
                  <label class="nowidth">就诊人</label>
                  <span class="input-box">
                     {{cardName}}
                  </span>
               </div>
            </li>
            <input type="hidden" class="patient_type" value="0">
            <li class="input-line g-arrow-r" id="J_SelectDis" data-init="[{&quot;name&quot;:&quot;尚未确诊&quot;,&quot;uuid&quot;:&quot;0&quot;}]">
               <div class="dis-flex">
                  <label class="nowidth">就诊卡</label>
                  <span class="input-box">{{cardNo}}
                  </span>
               </div>
            </li>
         </ul>
      </div>
      <div v-show="!isSucceed">
         <md-button type="primary" round @click="rightPay">提交</md-button>
      </div>
      <div v-show="isSucceed" class="bottomback">
         <span @click="backindex()" class="cancle">返回主页</span>
         <span @click="registrecord()" class="mainBtn">预约记录</span>
      </div>
      <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="money" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel" :default-index=0></md-cashier>
   </div>
</template>
<script type="text/babel">
let doctorInfo = "/app/bdHospitalDoctor/read/selectDoctorDetail";
let fee_detail_url = "/app/bizCostBill/detail";
// 生成预约
let fconfirm_pay_url = "/app/bizPatientRegister/subscribe";
// 付钱
let now_pay_url = "/app/bizPatientRegister/nowPay";


export default {
   data() {
      return {

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
         regStage: '',
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
      document.title = '预约信息';
    //   if(this.$store.state.isCashierhowData){
    //       this.isSucceed=this.$store.state.isCashierhowData;
    //   }
      this.depart = this.$store.state.depart;
      this.major = this.$route.query.dept;
      if (this.$route.query.afternoon * 1 == 1) {
         this.afternoon = '上午';
      } else if (this.$route.query.afternoon * 1 == 2) {
         this.afternoon = '下午';
      } else {
         this.afternoon = this.$route.query.afternoon;
      }

      this.time = this.$route.query.time;

      this.cardName = this.$store.state.patientName;
      this.regStage = this.$route.query.regStage;
      this.cardNo = this.$store.state.cardNo;
      this.money = String(this.$route.query.money);
   },
   methods: {
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
                           this.isSucceed = true;
                           this.$store.commit('isCashierhowFun', this.isSucceed);
                       },
                   })
               })
           }
       },
      onCashierPay() {
         let nowPayParams = {};
         nowPayParams.sourceId = this.$route.query.sourceId * 1;
         nowPayParams.id = this.backId;
         nowPayParams.payType = 1;
         this.$axios.post(now_pay_url, nowPayParams).then((res) => {
            if (res.data.code == '200') {
                this.doPay()
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

      rightPay() {
         this.$axios.post(fconfirm_pay_url, {
            sourceId: this.$route.query.sourceId,
            cardId: this.$store.state.cardId,
         }).then((res) => {
            if (res.data.code == '200') {
               this.isCashierhow = !this.isCashierhow;
               this.backId = res.data.data;
            } else {
               this.$toast.info(res.data.msg)
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
        cashier() {
            return this.$refs.cashier
        },
    },

};
</script>
 <style scoped>
@import url("./reservation.css");
</style>