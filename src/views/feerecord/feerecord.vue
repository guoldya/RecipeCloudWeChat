<template>
  <div class="feerecord">
    <Header post-title="缴费记录" v-show="isWeixin"></Header>
    <div :class="{'outCarint':true,'margin45':isWeixin}">
      <div class="appTab">
        <span v-for="(item, index) in time" :key="'time' + index" @click="switchTo(index)" :class="active1 === index ? 'appTabAcitive' : '' ">
          {{item.title}}
        </span>
      </div>
      <div class="demo-text" v-if="active1==0">
        <div class="card cardcc margin16" v-for="(item,i) in waitPayData" :key="i" @click="appointinfo(item.id)">
          <p class="appTitle">
            <span>{{item.type}}费</span>
            <span class="mu-secondary-text-color">{{item.total | keepTwoNum}}元</span>
          </p>
          <div class="cardText">
            <p>患者：{{item.patientName}}</p>
            <p>医院：{{item.hospital}}</p>
            <p>开单时间：{{item.createTime}}</p>
            <div style="height:30px;  text-align: right;"  v-if="active1 === 0">
              <span class="payatnow">立即支付</span>
            </div>
          </div>
        </div>
      </div>
      <div class="demo-text" v-if="active1==1">
        <div class="card cardcc margin16" v-for="(item,i) in waitPayData" :key="i" @click="alreadyPay(item.id)">
          <p class="appTitle">
            <span>{{item.type}}费</span>
            <span class="mu-secondary-text-color">{{item.total | keepTwoNum}}元</span>
          </p>
          <div class="cardText">
            <p>患者：{{item.patientName}}</p>
            <p>医院：{{item.hospital}}</p>
            <p>开单时间：{{item.createTime}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script  >
    let pay_list_url="wechat/bizCostBill/selectCostBillList";
export default {
  data() {
    return {
      active1: 0,
      isWeixin: false,
      time: [
        { title: '待支付' },
        { title: '已支付' },
      ],
        waitPayData:[],
        status:0,
    };
  },

  created() {

  },
  mounted() {
      this.WaitPay();
    document.title = '缴费记录';
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
    appointinfo: function (value) {
        this.$store.commit('feeActiveFun', this.active1);
      this.$router.push({
        name: 'feeinfo',
         query: {id:value}
      });
    },
      alreadyPay: function (value) {
          this.$store.commit('feeActiveFun', this.active1);
          this.$router.push({
              name: 'feeinfo',
              query: {id:value}
          });
      },
    switchTo(num) {
      this.active1 = num;
      if(num==0){
          this.status=0;
          this.WaitPay();
      }else if(num==1){
          this.status=1;
          this.WaitPay();
      }
    },
    WaitPay(){
        this.$axios.put(pay_list_url,{status:this.status},{
            headers: {
                'TOKEN': `edd169b85704410aa5219512cb6f1f00`,
                'UUID': `AAA`
            },
        }).then((res) => {
            if(res.data.code=='200'){
              this.waitPayData=res.data.rows;
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
 <style   scoped>
.feerecord {
  font-size: 28px;
}
.feerecord .appTab {
  width: 80%;
  margin-left: 10%;
}
.feerecord .cardText {
  padding: 10px 0 30px;
}
.feerecord .cardText p {
  line-height: 50px;
  font-size: 28px;
  color: #5c5c5c;
}
.feerecord .cardcc .appTitle {
  padding: 32px 0px;
}
.feerecord .appTitle {
  padding: 32px;
  border-bottom: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
}
.payatnow {
  font-size: 28px;
  color: #ffffff;
  float: right;
  background: #1da1f3;
  border-radius: 40px;
  letter-spacing: 1px;
  padding: 15px 40px;
  text-align: center;
}
  .feerecord .demo-text .card:first-child{
     margin-top: 0px;
   }
</style>