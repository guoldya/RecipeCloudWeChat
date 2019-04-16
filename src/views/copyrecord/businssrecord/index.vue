<template>
  <div class="feerecord">
    <Header post-title="复印记录"></Header>
    <div class="margin50">
      <Apptab :tab-title="time" v-on:childByValue="childByValue"></Apptab>
      <div v-if="waitPayData.length!=0" v-show="!loadingtrue">
        <div class="flatCard" v-for="(item,i) in waitPayData" :key="i" @click="appointinfo(item.id,item.code)">
          <div class="appTitle">
            <span>申请编号：{{item.type}}</span>
            <span class="mu-secondary-text-color">{{item.total | keepTwoNum}}元</span>
          </div>
          <div class="cardText">
            <p class="parElem listData">
              <span class="sonElem">
                {{item.name}}
              </span>
              <span class="sonElem">
                住院病历邮寄
              </span>
              <span class="sonElem">
                {{item.hospital}}
              </span>

            </p>
             
            <p class="parElem listData">
              <span class="sonElem">入院时间</span>
              <span>{{item.createTime|lasttime}}</span>
            </p>
            <p class="parElem listData">
              <span class="sonElem">出院时间</span>
              <span>{{item.createTime|lasttime}}</span>
            </p>

            <div class="payatnow">
              <span class="cancle" @click="cancelOrder(item.id)">取消订单</span>
              <span class="payatnow" @click="payNow(item.id)">立即支付</span>
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
    </div>

  </div>
</template>
<script >
let pay_list_url = "/app/bizCopyApply/read/page";
let bizPatientCard = "/app/bizPatientCard/read/list";
export default {
  data() {
    return {
      time: [
        { title: '待支付', type: 1 },
        { title: '已支付', type: 2 },
      ],

      waitPayData: [],
      status: 0,
      selectorValue: '',
      choseValue: '',
      isSelectorShow: false,
      optionsData: [],
      page: 1,
      pageSize: 10,
      type: 0,
      busy: true,
      nomore: false,
      loadingtrue: true,
      disType: '',
      routePar: '',
    };
  },

  created() {

  },
  mounted() {
    // this.routePar=this.$store.state.jumpArr;
    if (this.$store.state.feeActiveId) {
      this.disType = this.$store.state.feeActiveId;
      if (this.$store.state.feeActiveId == 1) { this.type = 0; } else { this.type = 1; }
    }
    this.WaitPay(false);
    // this.personFun();
    document.title = '缴费记录';
    // this.selectorValue = this.optionsData[0][0].text;
  },
  methods: {

    personFun() {
      this.$axios.put(bizPatientCard, {
      }).then(res => {
        if (res.data.code == '200') {
          for (let i = 0; i < res.data.rows.length; i++) {
            this.selectorValue = res.data.rows[0].patientName;
            this.cardNo = res.data.rows[0].cardNo;
            let neslist = {
              text: res.data.rows[i].patientName,
              value: res.data.rows[i].cardNo,
              aaa: res.data.rows[i].createTime,
            }
            this.optionsData.push(neslist);
          }

        } else if (res.data.code == '800') {

        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    onSelectorChoose({ text, value }) {
      this.selectorValue = text;
      this.choseValue = value;
      this.WaitPay(false);
    },
    showSelector() {
      this.isSelectorShow = true
    },
    appointinfo: function (val, code) {
      this.$router.push({
        name: 'feeinfo',
        query: { id: val, code: code }
      });
    },

    childByValue: function (childValue) {
      //this.type = childValue.type;
      this.disType = childValue.type;
      if (childValue.type == 1) { this.type = 0; } else { this.type = 1; }
      this.$store.commit('feeActiveFun', childValue.type);
      this.waitPayData = [];
      this.loadingtrue = true;
      this.page = 1;
      this.WaitPay();
    },
    WaitPay(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      //params.patientId = parseInt(this.choseValue);
      params.payType = this.type;
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
  },
  watch: {
    // "$route": function (to, from) {
    //     from.meta.keepAlive = false;
    //     to.meta.keepAlive = false;
    // },
  },

  // beforeRouteEnter(to, from, next) {
  //     next((vm) => {
  //         vm.routePar = from.name;
  //         vm.$store.commit('addjumpArr', from.name);
  //     });
  // },



};
</script>
 <style   scoped>
.feerecord {
  font-size: 28px;
}
.feerecord .cardText p {
  font-size: 28px;
  color: var(--primary--content);
}
.feerecord .flatCard:first-child {
  margin-top: 0;
}

.feerecord .listData span:nth-child(2) {
  color: var(--primary--right);
}
.feerecord .alignJ {
  line-height: 26px;
}

.feerecord .cancle {
  color: #474747;
  background: #ffffff;
  margin-right: 20px;
  border: 2px solid #474747;
  box-sizing: border-box;
}
</style>