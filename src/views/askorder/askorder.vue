<template>
  <div class="askorder">
    <Header post-title="问诊订单"></Header>
    <div class="margin50">
      <Apptab :tab-title="time" v-on:childByValue="childByValue"></Apptab>
      <div v-if="waitPayData.length!=0" v-show="!loadingtrue">
        <div class="flatCard outCarint cardcc" v-for="(item,i) in waitPayData" :key="i" @click="appointinfo(item.id,item.code)">
          <p class="appTitle">
            <span>{{item.createTime|lasttime}}</span>
            <span v-if="disType === 2">已付款
              <span class="mu-secondary-text-color"> ￥20.00</span>
            </span>
            <span v-if="disType === 1">待付款
              <span class="mu-secondary-text-color"> ￥20.00</span>
            </span>
          </p>
          <div class="cardText">
            <div style="width:100%;height:50px;padding-top:6px">
              <div class="headimg"><img onerror="@/assets/images/icon_more.png" :src="$conf.constant.img_base_url + item.filename" alt=" "></div>
              <p class="askorderTitle">{{item.name}}
                <span class="levle">主任医师</span>
              </p>
              <p>{{item.orgName}}</p>
            </div>
            <div v-show="disType === 1" style="height:30px;text-align: right;">
              <span class="payatnow" @click="payNow(item.id)">立即支付</span>
              <span class="cancle" @click="cancelOrder(item.id)">取消订单</span>
            </div>
          </div>
        </div>
        <p v-show="nomore" class="noMore">没有更多数据了</p>
      </div>
      <div v-show="!loadingtrue" class="nullDiv" v-else>
        <img src="@/assets/images/null1.png">
      </div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
        <span v-if="waitPayData.length!=0&&!nomore">
          <span class="mu-light-text-color">加载中</span>
          <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
        </span>
      </div>
      <Loading v-show="loadingtrue"></Loading>
      <md-cashier ref="cashier" @pay="onCashierPay" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :default-index=0 :payment-amount="cashierAmount"></md-cashier>
    </div>
  </div>
</template>
<script  >
import { Dialog, Cashier } from 'mand-mobile'
import pg_positive from '@/assets/images/user.png'
let pay_list_url = "/api/hos/bizOnlineServiceRecord/read/page";
let cancelSourceId = "/api/hos/bizOnlineServiceRecord/updateOrder";
let appbizOnlineServiceRecordnowPay = "/api/hos/bizOnlineServiceRecord/nowPay";
export default {
  data() {
    return {
      headURL: pg_positive,
      waitPayData: [],
      busy: true,
      nomore: false,
      loadingtrue: true,
      disType: 1,
      id: '',
      page: 1,
      pageSize: 10,
      time: [
        { title: '待支付', type: 1 },
        { title: '已支付', type: 2 },
      ],
      isCashierhow: false,
      cashierAmount: '20',
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
        },]
    };
  },
  computed: {
    cashier() {
      return this.$refs.cashier
    },
  },
  created() {

  },
  mounted() {
    document.title = '问诊订单';
    this.WaitPay(false);
  },
  methods: {

    createPay() {
      this.cashier.next('loading')
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve()
        }, 3000)
      })
    },
    appointinfo: function (value) {
      // this.$router.push({
      //    name: 'feeinfo',
      //    // query: argu
      // });
    },
    cancelOrder: function (value) {
      Dialog.confirm({
        title: '温馨提示',
        content: '是否取消该订单',
        confirmText: '确定',
        onConfirm: () => {
          this.$axios.post(cancelSourceId, { id: value }).then((res) => {
            if (res.data.code == '200') {
              this.$toast.info("取消成功");
              this.WaitPay(false);
            } else {
              this.$toast.info(res.data.msg);

            }
          }).catch(function (err) {
            console.log(err);
          });
        },
      })



    },
    childByValue: function (childValue) {
      this.disType = childValue.type;
      // if (childValue.type == 1) { this.disType = 0; } else { this.disType = 1; }
      this.$store.commit('feeActiveFun', childValue.type);
      this.waitPayData = [];
      this.loadingtrue = true;
      this.page = 1;
      this.WaitPay(false);

    },

    WaitPay(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      //params.patientId = parseInt(this.choseValue);
      params.status = this.disType;
      this.$axios.put(pay_list_url, params).then((res) => {
        if (res.data.rows) {
          this.loadingtrue = false;
          if (flag) {
            this.waitPayData = this.waitPayData.concat(res.data.rows);  //concat数组串联进行合并
            if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
              this.busy = false;
              this.nomore = false;
            } else {
              this.busy = true;
              this.nomore = true;
            }
          } else {
            this.waitPayData = res.data.rows;
            this.busy = true;
            if (res.data.total < 10) {
              this.busy = true;
              this.nomore = true;
            } else {
              this.busy = false;
              this.nomore = false;
            }
          }
          //2、
        } else {
          this.waitPayData = []
        }
      })
    },
    loadMore() {
      this.busy = true;  //将无限滚动给禁用
      setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
        this.page++;  //滚动之后加载第二页
        this.WaitPay(true);
      }, 500);
    },

    payNow(data) {
      this.isCashierhow = true;
      this.id = data;
    },

    onCashierPay(item) {
      let nowPayParams = {};
      nowPayParams.payType = Number(item.value);
      nowPayParams.id = this.id;
      // 状态  1--新建  2--支付 3--接诊  4--完成  5--退费  6--关闭
      nowPayParams.status = 2;
      nowPayParams.type = 1;
      nowPayParams.total = 20;
      this.$axios.post(appbizOnlineServiceRecordnowPay, nowPayParams).then((res) => {
        if (res.data.code == '200') {
          this.createPay().then(() => {
            this.cashier.next('success', {
              buttonText: '好的',
              handler: () => {
                this.isCashierhow = false
                this.WaitPay(false);
              },
            })
          })

        } else {

        }
      }).catch(function (err) {
        console.log(err);
      });
    },



  },


};
</script>
 <style   scoped>
.askorder {
  font-size: 28px;
}
.askorder .cardText .askorderTitle {
  color: var(--primary--title);
}
.askorder .appTab {
  width: 80%;
  margin-left: 10%;
}
.askorder .cardText {
  padding: 10px 0 30px;
}
.askorder .cardText p {
  line-height: 50px;
  font-size: 30px;
  color: var(--primary--content);
}
.askorder .cardcc .appTitle {
  padding: 32px 0px;
}
.askorder .appTitle {
  padding: 32px;
  border-bottom: 1px solid var(--primary--line);
  display: flex;
  justify-content: space-between;
}
.askorder .payatnow {
  font-size: 26px;
  color: #ffffff;
  float: right;
  background: var(--primary);
  border-radius: 40px;
  letter-spacing: 1px;
  padding: 14px 30px;
  text-align: center;
  margin-left: 20px;
  margin-top: 20px;
}
.askorder .cancle {
  font-size: 26px;
  color: #474747;
  float: right;
  background: #ffffff;
  border-radius: 40px;
  letter-spacing: 1px;
  text-align: center;
  margin-left: 20px;
  margin-top: 20px;
  padding: 14px 30px;
  border: 2px solid #474747;
  box-sizing: border-box;
}

.askorder .card .headimg {
  margin-right: 20px;
  top: 10px;
  position: relative;
}

.askorder .levle {
  padding: 2px 10px;
  font-size: 20px;
  color: var(--primary);
  border: 2px solid var(--primary);
  border-radius: 8px;
  position: relative;
  top: -1px;
}
.askorder .flatCard {
  padding:0 24px 20px;
  margin-top: 0;
  margin-bottom: 20px;
}
</style>