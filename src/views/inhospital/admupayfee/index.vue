<template>
  <div class="registrecorddetail">

    <Navigation type="title" title="预缴款缴纳">
    </Navigation>
    <div class="margin55">
      <div class="flatCard outCarint ">
        <md-field>
          <md-detail-item title="本次预交款">
            <span class="mu-secondary-text-color">￥{{defaultMoney|keepTwoNum}}元</span>
          </md-detail-item>
        </md-field>
      </div>

      <!-- // <div class="flatCard outCarint">
      //   <div class="outCarintcontent">
      //     <p>选择预交款金额</p>
      //     <div class="moneyflatCard">
      //       <div :class="active1 ===index ? 'moneyflatActive' : '' " v-for="(item2,index)  in money" :key="index+'s'" @click="chooseMoney(item2,index)">￥{{item2}}</div>
      //     </div>
      //     <div class="moneyflatCard">
      //       <input type="text" placeholder="可输入其他金额" v-model="textMoney">
      //     </div>
      //   </div>
      // </div> -->

      <p class="addbTN" @click="next">立即缴纳</p>

      <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="String(defaultMoney)" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel" :default-index=0></md-cashier>
    </div>
  </div>
</template>
<script  >
import { Cashier } from 'mand-mobile'
let now_pay_url = "/app/bizIhPay/payment";

export default {
  data() {
    return {
      active1: 0,
      defaultMoney: this.$route.query.money,
      textMoney: '',
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
    };
  },
  computed: {
    cashier() {
      return this.$refs.cashier
    },
  },
  watch: {
    textMoney: function (newstextMoney, oldtextMoney) {
      console.log(oldtextMoney);
      console.log(newstextMoney);
      if (newstextMoney) {
        this.defaultMoney = newstextMoney;
      }
    }
  },
  mounted() {


  },
  methods: {
    chooseMoney(data, index) {
      this.defaultMoney = data;
      this.active1 = index;
    },
    tijiao() {
      this.$router.push({
        name: 'payfeerecord',
      });
    },
    next() {
      this.isCashierhow = !this.isCashierhow;
    },
    onCashierSelect(item) {
      console.log(`[Mand Mobile] Select ${JSON.stringify(item)}`)
    },
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
    onCashierPay(item) {
      let nowPayParams = {};
      nowPayParams.ihRecordId = Number(this.$route.query.id);
      nowPayParams.money = this.defaultMoney;
      // 支付方式
      nowPayParams.payMode = Number(item.value);
      this.$axios.post(now_pay_url, nowPayParams).then((res) => {
        if (res.data.code == '200') {
          this.createPay().then(() => {
            this.cashier.next('success', {
              buttonText: '好的',
              handler: () => {
                this.isCashierhow = false
                this.$router.go(-3);
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

  },

};
</script>
<style   scoped>
.moneyflatCard {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.moneyflatCard div {
  /* float: left; */
  /* background: var(--primary); */
  text-align: center;
  width: 31%;
  border-radius: 10px;
  color: var(--primary);
  border: 2px solid var(--primary);
  line-height: 80px;
  display: block;
  margin-top: 20px;
}

.moneyflatCard .moneyflatActive {
  background: var(--primary);
  color: #ffffff;
}

.moneyflatCard input[type="text"] {
  margin-top: 20px;
  width: 100%;
  height: 80px;
  line-height: 40px;
  font-size: 28px;
  color: var(--primary);
  border-radius: 10px;
  border: none;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  border: 2px solid var(--primary);
}

.moneyflatCard input::-webkit-input-placeholder {
  color: var(--primary);
}
.moneyflatCard input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: var(--primary);
}
.moneyflatCard input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: var(--primary);
}
.moneyflatCard input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: var(--primary);
}
.outCarintcontent {
  padding: 28px 0;
}
.card p {
  line-height: 60px;
}
.registrecorddetail .card {
  margin-bottom: 32px;
}
.registrecorddetail .myButton div {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
.registrecorddetail .myButton div span {
  border-radius: 60px;
  letter-spacing: 1px;
  width: 46%;
  height: 86px;
  text-align: center;
}
.registrecorddetail .myButton div span:first-child {
  line-height: 86px;
}
.registrecorddetail .md-button.block {
  height: 86px;
  width: 100%;
}
.registrecorddetail .cancle {
  font-size: 26px;
  color: #5a5a5a;
  background: #ffffff;
  border: 2px solid #474747;
  box-sizing: border-box;
}
.registrecorddetail .md-button.default {
  color: #fff;
  background-color: #8b8b8b;
}
.registrecorddetail .default:after {
  border: none !important;
}
.registrecorddetail .partLine {
  margin: 16px 0px;
}
.registrecorddetail .flatCard {
  border-top: none;
}
.registrecorddetail .payatnow {
  margin-top: 0;
}
.registrecorddetail .md-button.block {
  margin: 0;
}
</style>