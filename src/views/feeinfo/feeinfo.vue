<template>

  <div class="feeinfo">
    <Header :post-title="postTitle" v-show="isWeixin"></Header>
    <div :class="{margin45:isWeixin,outCarint:true,'margin7':!isWeixin}">
      <div class="card margin16" v-for="(item,i) in feeDetailData">
        <div class="cardText">
            <div v-if="feeActiveId==1">
              <p class="cardTextPP">
                <span>订单编号</span>
                <span>{{item.orderCode}}</span>
              </p>
              <p class="cardTextPP">
                <span>交易编号</span>
                <span>{{item.payCode}}</span>
              </p>
              <p class="cardTextPP">
                <span>缴费时间</span>
                <span>{{item.payTime}}</span>
              </p>
              <p class="test"></p>
            </div>
            <p class="cardTextPP">
              <span>开单科室</span>
              <span>{{item.dept}}</span>
            </p>
            <p class="cardTextPP">
              <span>开单医生</span>
              <span>{{item.doctor}}</span>
            </p>
            <p class="cardTextPP">
              <span>患者ID</span>
              <span>{{item.patientId}}</span>
            </p>
            <p class="cardTextPP">
              <span>患者姓名</span>
              <span>{{item.patientName}}</span>
            </p>
            <p class="cardTextPP">
              <span>开单时间</span>
              <span>{{item.createTime}}</span>
            </p>
            <p class="cardTextPP">
              <span>开单序号</span>
              <span>7hd78125415</span>
            </p>
            <p class="cardTextPP" v-if="feeActiveId==0">
              <span>处方金额</span>
              <span class="mu-secondary-text-color">{{item.total | keepTwoNum}}</span>
            </p>
            <p class="cardTextPP" v-if="feeActiveId==1">
              <span>实付金额</span>
              <span class="mu-secondary-text-color">{{item.total | keepTwoNum}}</span>
            </p>

        </div>
      </div>
      <div class="card margin16">
        <div class="cardText">
          <div class="cardTextKind spanWid">
            <span style="text-align: center">类别</span>
            <span  >项目名称</span>
            <span >数量</span>
            <span style="text-align: center">金额</span>
          </div>
          <div class="cardTextPP spanWid" v-for="(item,i) in feeButtomDetail">
            <span>{{item.type}}</span>
            <span>{{item.itemName}}</span>
            <span>{{item.num}}{{item.unit}}</span>
            <span>{{item.total | keepTwoNum}}</span>
          </div>
        </div>
      </div>
      <div class="md-example-child md-example-child-cashier" v-if="feeActiveId==0">
        <md-button class="margin16" type="primary" @click="rightPay" round>{{ isCashierhow ? '收起收银台' : '立即缴费' }}</md-button>
        <md-cashier
                ref="cashier"
                v-model="isCashierhow"
                :channels="cashierChannels"
                :channel-limit="2"
                :payment-amount="cashierAmount"
                @select="onCashierSelect"
                @pay="onCashierPay"
                @cancel="onCashierCancel"
                :default-index=0
        ></md-cashier>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>
<script>
  let fee_detail_url="wechat/bizCostBill/detail";
  let fconfirm_pay_url="wechat/bizCostBill/confirmPay";
  let now_pay_url="wechat/bizCostBill/nowPay";
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
      cashierAmount: '',
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
        feeDetailData:[],
        feeButtomDetail:[],
        feeId:'',
        orderCode:'',
        feeActiveId:'',
        postTitle:'',
    };
  },
  created() {

  },
  mounted() {
      this.feeActiveId=this.$store.state.feeActiveId;
    this.feeDetail();

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
      feeDetail(){
        this.feeId=this.$route.query.id;
          if(this.feeActiveId==0){
              this.postTitle="我的缴费-待缴费";
              document.title="我的缴费-待缴费";
          }else{
              this.postTitle="我的缴费-已缴费";
              document.title="我的缴费-已缴费";
          }
          this.$axios.put(fee_detail_url,{id:"1"},{
              headers: {
                  'TOKEN': `edd169b85704410aa5219512cb6f1f00`,
                  'UUID': `AAA`
              },
          }).then((res) => {
              if(res.data.code=='200'){
                  this.feeDetailData.push(res.data.data);
                  this.feeButtomDetail=res.data.data.details;
                  this.cashierAmount=res.data.data.total.toFixed(2);
              }
          }).catch(function (err) {
              console.log(err);
          });
      },
      rightPay(){
        this.isCashierhow=!this.isCashierhow;
          this.$axios.put(fconfirm_pay_url,{id:this.feeId},{
              headers: {
                  'TOKEN': `edd169b85704410aa5219512cb6f1f00`,
                  'UUID': `AAA`
              },
          }).then((res) => {
              if(res.data.code=='200'){
                  this.orderCode=res.data.data.orderCode;
              }
          }).catch(function (err) {
              console.log(err);
          });
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
      let nowPayParams={};
        nowPayParams.id=this.feeId;
        nowPayParams.orderCode=this.orderCode;
        nowPayParams.orderType="4";
        nowPayParams.payType=item.value;
        this.$axios.post(now_pay_url,nowPayParams,{
            headers: {
                'TOKEN': `edd169b85704410aa5219512cb6f1f00`,
                'UUID': `AAA`
            },
        }).then((res) => {
            if(res.data.code=='200'){
                this.feeDetailData.push(res.data.data);
                this.feeButtomDetail=res.data.data.details;
                this.cashierAmount=res.data.data.total.toFixed(2);
            }
        }).catch(function (err) {
            console.log(err);
        });
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
   @import "../submitOrder/submitOrder.css";
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
.feeinfo .spanWid span{
  display: inline-block;
  word-break:normal;
  white-space:pre-wrap;
  word-wrap : break-word ;
  overflow: hidden ;
  text-align: center;
}
.feeinfo .spanWid span:first-child{
  width: 20%;
}
.feeinfo .spanWid span:nth-child(2) {
  width: 40%;
}
.feeinfo .spanWid span:nth-child(3) {
  width: 20%;
  /*text-align: center;*/
}
.feeinfo .spanWid span:last-child{
  width: 20%;
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
 