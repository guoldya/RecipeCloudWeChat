<template>
  <div class="registrecorddetail">
    <Navigation type="title" title="预交款缴纳">
      <span v-show="!$route.query.isMyhospital" class="mu-secondary-text-color" @click="tijiao">预交款记录</span>
    </Navigation>
    <div class="margin55">
      <div class="flatCard outCarint " v-for="(item,i) in cordInfoData" :key="i" v-show="!loadingtrue">
        <md-field>
          <md-detail-item title="患者姓名" :content=item.name></md-detail-item>
          <md-detail-item title="住院号">
            <span>{{item.ihNo}}</span>
          </md-detail-item>
          <md-detail-item title="住院科室" :content=item.dept></md-detail-item>
          <md-detail-item title="床号">
            <span>{{item.bedNo}}床</span>
          </md-detail-item>
          <md-detail-item title="主治医师" :content=item.doctor></md-detail-item>
          <md-detail-item title="本次预交款">
            <span class="mu-secondary-text-color">￥{{defaultMoney|keepTwoNum}}元</span>
          </md-detail-item>
          <md-detail-item title="预交款余额">
            <span class="mu-secondary-text-color">￥{{item.money|keepTwoNum}}元</span>
          </md-detail-item>
        </md-field>
      </div>
      <div class="flatCard outCarint">
        <div class="outCarintcontent">
          <p>选择预交款金额</p>
          <div class="moneyflatCard">
            <!-- <div class="moneyflatActive">￥500</div> -->
            <div :class="active1 ===index ? 'moneyflatActive' : '' " v-for="(item2,index)  in money" :key="index+'s'" @click="chooseMoney(item2,index)">￥{{item2}}</div>
          </div>
          <div class="moneyflatCard">
            <input type="text" placeholder="可输入其他金额" v-model="textMoney" oninput="value = value && ((value.match(/\d+(\.(\d(\d)?)?)?/) || [])[0] || '')">
          </div>
        </div>
      </div>
      <Loading v-show="loadingtrue"></Loading>
      <p class="addbTN" @click="next">立即缴纳</p>
      <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="String(defaultMoney)" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel" :default-index=0></md-cashier>
    </div>
  </div>
</template>
<script  >
import { Dialog, Cashier } from 'mand-mobile'
let cord_info_url = "/bizIhRecord/read/selectRecordDetail";

let now_pay_url = "/bizIhPay/payment";

export default {
  data() {
    return {
      active1: 0,
      cordInfoData: [],
      loadingtrue: false,
      money: [500, 1000, 1500, 2000],
      defaultMoney: 500,
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
  components: {

  },
  watch: {
    textMoney: function (newstextMoney, oldtextMoney) {
      if (newstextMoney) {
        this.defaultMoney = newstextMoney;
      }
    }
  },
  mounted() {
    this.cordInfo();
  },

  computed: {
    cashier() {
      return this.$refs.cashier
    },
  },
  methods: {



    amount(th) {
      var regStrs = [
        ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0  
        ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点  
        ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点  
        ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上  
      ];
      for (var i = 0; i < regStrs.length; i++) {
        var reg = new RegExp(regStrs[i][0]);
        th.value = th.value.replace(reg, regStrs[i][1]);
      }
    } ,
    chooseMoney(data, index) {

      this.defaultMoney = data;
      this.active1 = index;

    },
    cordInfo() {
      this.$axios.put(cord_info_url, { id: Number(this.$route.query.id) }, {
      }).then(res => {
        if (res.data.code == '200') {
          this.loadingtrue = false;
          this.cordInfoData.push(res.data.data);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    tijiao() {
      this.$router.push({
        name: 'payfeerecord',
      });
    },
    next() {
      if (this.defaultMoney == 0) {
        this.$toast.info("请输入大于0的数");
        return
      }
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
                this.$router.go(-1);
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
  padding: 10px 24px;
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