<template>
  <div class="recipeRecord  outpatient">
    <Header post-title="门诊缴费"></Header>
    <div class="margin100">
      <div :class="[ 'reportqueryTab', {'padding': status!=1 },]">
        <Apptab :tab-title="departs" v-on:childByValue="childByValue"></Apptab>
        <Timefilter v-on:childByTime="childByTime" type="payfeerecord" v-show="status==2" />
      </div>
      <div class="reportqueryTabDIV" v-show="status!=1"></div>
      <div class="reportqueryTabDIV2" v-show="status==1"></div>
      <div v-if="waitPayData.length!=0" v-show="!loadingtrue">
        <div class="recordcard" v-for="(item,i) in waitPayData" :key="i">
          <div v-if="status==1" class="listData" style="padding-bottom:0">
            <span class="title">
              <label :class="[{'is-checked': item.checked }, 'md-radio']" @click="selectService(i)">
                <div class="md-radio-icon">
                  <i class="md-icon icon-font md-icon-checked checked md"></i>
                </div>
              </label>
              <label> {{item.patientName}}</label>
            </span>
            <span class="titleright">
              {{item.code}}
            </span>
          </div>
          <div class="listData" v-else>
            <span class="title">
              <img :src="item.feeType|feeTypeFilterIMG"> {{item.patientName}}
            </span>
            <span class="titleright">{{item.code}}</span>
          </div>
          <div class="recordcard-content">
            <p class="parElem listData">
              <span class="sonElem">{{item.feeType|feeTypeFilter}}费</span>
              <span class="mu-secondary-text-color" :class="{warn:item.totalMoney==1}">￥{{item.totalMoney|keepTwoNum}}</span>
            </p>
            <template v-if="item.feeType==1">
              <p class="parElem listData">
                <span class="sonElem">挂号科室</span>
                <span> {{item.dept}}</span>
              </p>
              <p class="parElem listData">
                <span class="sonElem">就诊医生</span>
                <span> {{item.doctor}}</span>
              </p>
              <p class="parElem listData">
                <span class="sonElem">创建时间</span>
                <span>{{item.createTime|lasttime}}</span>
              </p>
            </template>
            <template v-if="item.feeType==2">
              <p class="parElem listData">
                <span class="sonElem">就诊科室</span>
                <span> {{item.dept}}</span>
              </p>
              <p class="parElem listData">
                <span class="sonElem">就诊医生</span>
                <span> {{item.doctor}}</span>
              </p>
              <p class="parElem listData">
                <span class="sonElem">开方时间</span>
                <span>{{item.applyTime|lasttime}}</span>
              </p>
            </template>
            <template v-if="item.feeType==3||item.feeType==4||item.feeType==5">
              <p class="parElem listData">
                <span class="sonElem">开单科室</span>
                <span> {{item.dept}}</span>
              </p>
              <p class="parElem listData">
                <span class="sonElem">开单医生</span>
                <span> {{item.doctor}}</span>
              </p>
              <p class="parElem listData">
                <span class="sonElem">开单时间</span>
                <span>{{item.applyTime|lasttime}}</span>
              </p>
            </template>
            <p class="listData" v-show="status==1">
              <span> </span>
              <span class="have" @click="rightPay(item)">缴费</span>
            </p>
          </div>
          <div class="lookmore" @click="intoDetail(item)">
            <span>查看详情</span>
            <span><img src="@/assets/images/icon_right.png" alt=""></span>
          </div>
        </div>
        <p v-show="nomore" class="noMore">没有更多数据了</p>
      </div>
      <div v-show="!loadingtrue" class="aligncenter" style="margin:86px 0" v-else>
        <img src="@/assets/images/null1.png">
        <p class="nullTEXT">您{{timeClass|timeFilter}}没有{{noDataTitle}}记录</p>
      </div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
        <span v-if="waitPayData.length!=0&&!nomore">
          <span class="mu-light-text-color">加载中</span>
          <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
        </span>
      </div>
      <Loading v-show="loadingtrue"></Loading>
    </div>
    <div v-show="status==1" style="height:50px"></div>
    <p v-show="status==1" class="outbTN">
      <span class="outbTN-left">
        <span v-show="isAll" @click="selectAll"><img src="@/assets/images/isallnot.png" alt=""> </span>
        <span v-show="!isAll" @click="clearAll"><img src="@/assets/images/isall.png" alt=""> </span>
        <span>全选</span>
        <span>合计：￥{{totalMoney|keepTwoNum}}</span>
      </span>
      <span class="outbTN-right" @click="totalPay()">立即缴费</span>
    </p>
    <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="cashierAmount" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel" :default-index=0></md-cashier>
  </div>
</template>
<script type="text/babel"> 
let bizLisReportreadpage = '/app/bizPayOrder/read/page';
let now_pay_url = "/app/bizPayOrder/nowPayByList";
export default {
  data() {
    return {
      waitPayData: '',
      totalMoney: 0,
      totalId: '',
      isAll: true,
      departs: [
        { title: '待支付', type: 1, },
        { title: '已支付', type: 2, },
      ],
      noDataTitle: "待支付",
      waitPayData: [],
      status: 0,
      timeClass: 1,

      page: 1,
      pageSize: 10,
      busy: true,
      nomore: false,
      loadingtrue: true,
      isCashierhow: false,
      isCashierCaptcha: false,
      cashierAmount: '',
      cashierChannels: [
        {
          icon: 'cashier-icon-3',
          text: '微信支付',
          value: '2',
        },
      ],
    };
  },
  computed: {
    cashier() {
      return this.$refs.cashier
    },
  },
  created() {
    if (sessionStorage.getItem('feeActiveFun')) {
      this.status = sessionStorage.getItem('feeActiveFun') * 1
    }
  },
  async mounted() {
    await this.WaitPay(false);

  },
  watch: {
    status: function (val, oldval) {
      this.page = 1;
      this.waitPayData = [];
      this.loadingtrue = true;
      this.WaitPay(false);
    },
    timeClass: function (vallevel, oldlevel) {
      this.page = 1;
      this.waitPayData = [];
      this.loadingtrue = true;
      this.WaitPay(false);
    },
  },
  methods: {

    childByValue: function (childValue) {
      this.status = childValue.type;
      this.noDataTitle = childValue.title;

      sessionStorage.setItem('feeActiveFun', childValue.type)
    },
    childByTime: function (childByTime) {
      this.timeClass = childByTime.timeClass;
    },

    async  WaitPay(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      params.timeClass = this.status == 1 ? undefined : this.timeClass;
      params.queryType = 1;
      params.status = this.status;
      this.$axios.put(bizLisReportreadpage, params).then((res) => {
        if (res.data.code == 200) {
          this.departs[0].loading = false;
          this.loadingtrue = false;
          if (res.data.rows) {
            if (flag) {
              this.waitPayData = this.waitPayData.concat(res.data.rows);  //concat数组串联进行合并
              if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                this.busy = false;
                this.nomore = false;
              } else {
                this.busy = true;
                this.nomore = true;
              }

              if (!this.isAll) {

                this.waitPayData.forEach(item => item.checked = true);
                const map1 = this.waitPayData.map(x => x.totalMoney);
                this.totalId.push = this.waitPayData.map(x => {
                  return { id: x.id, feeType: x.objId ? x.feeType : null, objId: x.objId ? x.objId : null, }
                })
                const reducer2 = (accumulator, currentValue) => accumulator + currentValue;
                this.totalMoney = map1.reduce(reducer2)

              } else {
                res.data.rows.forEach(item => item.checked = false);
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

    selectService(index) {
      this.waitPayData[index].checked = !this.waitPayData[index].checked;
      const serviceresult = this.waitPayData.filter(item => item.checked == true);
      if (!this.isAll) {
        if (!this.waitPayData[index].checked) {
          this.isAll = true;
        }

      } else {
        if (serviceresult.length == this.waitPayData.length) {
          this.isAll = false;
        } else {

          this.isAll = true;
        }

      }
      const map1 = serviceresult.map(x => x.totalMoney);
      // this.totalId = serviceresult.map(x => x.id);
      this.totalId = serviceresult.map(x => {
        return { id: x.id, feeType: x.objId ? x.feeType : null, objId: x.objId ? x.objId : null, }
      })
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      this.totalMoney = map1.reduce(reducer)


    },

    selectAll() {
      this.waitPayData.forEach(item => item.checked = true);
      const serviceresult = this.waitPayData.filter(item => item.checked == true);
      const map1 = serviceresult.map(x => x.totalMoney);
      // this.totalId = serviceresult.map(x => x.id);
      this.totalId = serviceresult.map(x => {
        return { id: x.id, feeType: x.objId ? x.feeType : null, objId: x.objId ? x.objId : null, }
      })
      const reducer2 = (accumulator, currentValue) => accumulator + currentValue;
      this.totalMoney = map1.reduce(reducer2)
      this.isAll = !this.isAll
    },
    clearAll() {
      this.waitPayData.forEach(item => item.checked = false);
      this.totalId = [];
      this.totalMoney = 0;
      this.isAll = !this.isAll;
    },




    intoDetail(val) {
      let aa = {};
      aa.id = val.id;
      aa.feeType = val.feeType;
      if (val.feeType == 3 || val.feeType == 4 || val.feeType == 2) {
        aa.objId = val.objId;
      }
      this.$router.push({
        name: 'outpatientinfo',
        query: aa,
      });
    },
    rightPay(data) {
      var xsd = data.totalMoney.toString().split(".");
      if (xsd.length == 1) {
        this.cashierAmount = String(data.totalMoney) + '.00';
      } else if (xsd.length == 2) {
        this.cashierAmount = String(data.totalMoney);
      }

      this.isCashierhow = !this.isCashierhow;
      this.totalId = [{ id: data.id, feeType: data.objId ? data.feeType : null, objId: data.objId ? data.objId : null, }]
      console.log(this.totalId.length, "sss")

    },
    totalPay() {
      var xsd = this.totalMoney.toString().split(".");
      if (xsd.length == 1) {
        this.cashierAmount = String(this.totalMoney) + '.00';
      } else if (xsd.length == 2) {
        this.cashierAmount = String(this.totalMoney);
      }

      if (!this.totalId[0].id || this.totalId.length == 0) {
        this.$toast.info("请选择你要付款的订单");
        return
      }
      this.isCashierhow = !this.isCashierhow;

    },
    onCashierPay(item) {
      let nowPayParams = {};
      nowPayParams.list = this.totalId;
      nowPayParams.payMode = Number(item.value);
      this.$axios.post(now_pay_url, nowPayParams).then((res) => {
        if (res.data.code == '200') {
          this.totalId = '';

          this.createPay().then(() => {
            this.cashier.next('success', {
              buttonText: '好的',
              handler: () => {
                this.isCashierhow = false
                this.WaitPay();
              },
            })
          })
          // this.payStatus = "1";

        } else {
          this.$toast.info(res.data.msg);
          this.isCashierhow = false;
        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    // Create a pay request & check pay result
    createPay() {
      this.cashier.next('loading')
      return new Promise(resolve => {
        this.timer = setTimeout(() => {
          resolve()
        }, 1000)
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
    onCashierCancel() {
      // this.totalId = '';
      // Abort pay request or checking request
      this.timer && clearTimeout(this.timer);
      console.log("点击取消")
    },




  },

};
</script>
<style lang="scss"  scoped>
.recordcard {
  background: #fff;
  border-radius: 17px;
  margin: 24px;
  .listData {
    padding: 24px 24px 6px;
    border-bottom: 1px solid #e5e5e5;
    .title {
      position: relative;
      top: -10px;
      img {
        width: 40px;
        margin-right: 5px;
        position: relative;
        top: 10px;
      }
    }
  }
  .recordcard-content {
    padding: 14px 0;
    .listData {
      padding: 7px 24px;
      border-bottom: none;
      span {
        padding: 0;
        max-width: 70%;
      }
      .have {
        font-size: 28px;
        color: #ffffff;
        float: right;
        background: var(--primary);
        border-radius: 40px;
        letter-spacing: 1px;
        width: 134px;
        line-height: 60px;
        text-align: center;
        margin-top: 20px;
      }
    }
  }
}
.nomore {
  text-align: center;
  color: #8d8d8d;
  color: var(--primary--content);
  font-size: 0.24rem;
  line-height: 0.7rem;
}
.recipeRecord {
  .md-radio {
    margin-top: 0;
    .is-checked .md-radio-icon {
      color: var(--primary) !important;
    }
  }
  .listData .title {
    display: flex;
    align-items: center;
    label {
      margin-right: 20px;
    }
    :first-child {
      margin-top: 2px !important;
    }
  }
}

.reportqueryTabDIV {
  height: 160px;
}
.reportqueryTabDIV2 {
  height: 60px;
}
.outbTN {
  width: 100%;
  line-height: 70px;
  bottom: 0;
  z-index: 999;
  border-top: 2px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  color: #1da1f3;
  position: fixed;
  text-align: center;
  padding: 20px 36px;
  .outbTN-left {
    // padding-left: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      margin-right: 20px;
    }
    img {
      width: 32px;
      top: 5px;
      position: relative;
    }
  }
  .outbTN-right {
    background: #1da1f3;
    color: #ffffff;
    align-items: center;
    text-align: center;
    font-size: 28px;
    width: 150px;
    height: 60px;
    line-height: 60px;
    border-radius: 60px;
  }
}

.reportqueryTab {
  z-index: 99;
  background: #f8f8f8;
  position: fixed;
  width: 100%;
}
.padding {
  padding-bottom: 20px;
}
.recipeRecord .recordcard .listData img {
  margin-right: 12px;
  top: 0;
}
</style>