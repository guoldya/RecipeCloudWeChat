<template>
  <div class="registrecorddetail">
    <Header post-title="预缴款详情"></Header>
    <div class="margin55">
      <div class="flatCard outCarint " v-for="(item,i) in cordInfoData" :key="i" v-show="!loadingtrue">
        <md-field>
          <div class="appTitle" style="padding: 0.24rem 0;">
            <span>患者信息</span>
          </div>
          <md-detail-item title="患者姓名" :content=item.name></md-detail-item>
          <md-detail-item title="住院号" :content=item.ihNo>
            <span>{{item.ihNo}}</span>
          </md-detail-item>
          <md-detail-item title="病区" :content=item.area></md-detail-item>
          <md-detail-item title="床号">
            <span>{{item.bedNo}}床</span>
          </md-detail-item>
        </md-field>
      </div>
      <Loading v-show="loadingtrue"></Loading>
      <div class="flatCard">
        <div class="warnText" style="padding:0 0.24rem;" v-for="(item,i) in cordInfoData" :key="i" v-show="!loadingtrue">
          <md-field>
            <div class="appTitle" style="padding: 0.24rem 0;">
              <span style="color:#272727">支付信息</span>
            </div>
            <!-- <img :src="item.status|payStatusIMG" alt="" class="icon_pay1"> -->
            <img v-show="item.status==3" src="@/assets/images/icon_closed.png" alt="" class="icon_pay1">
            <img v-show="item.status==1" src="@/assets/images/icon_tobepaid.png" alt="" class="icon_pay1">
            <img v-show="item.status==2" src="@/assets/images/icon_pay1.png" alt="" class="icon_pay1">
            <md-detail-item title="业务类型">
              <span>{{item.feeClass|feeClass}} </span>
            </md-detail-item>
            <md-detail-item title="支付时间">
              <span>{{item.payTime|lasttime}}</span>
            </md-detail-item>
            <md-detail-item title="支付单号" :content=item.payNo></md-detail-item>
            <md-detail-item title="支付金额">
              <span class="mu-secondary-text-color">￥{{item.totalMoney|keepTwoNum}}</span>
            </md-detail-item>
            <md-detail-item title="支付方式">
              <span>{{item.payMode|payMethod}} </span>
            </md-detail-item>
            <md-detail-item title="支付状态">
              <span>{{item.status|payStatus}} </span>
            </md-detail-item>
          </md-field>
        </div>
      </div>
    </div>
  </div>
</template>
<script  >
import { Dialog } from 'mand-mobile'
let cord_info_url = "/bizIhPay/read/detail";
import { Field, RadioList } from 'mand-mobile'

export default {
  data() {
    return {
      cordInfoData: [],
      loadingtrue: false,
    };
  },
  components: {
    [Field.name]: Field,
    [RadioList.name]: RadioList,
  },
  mounted() {
    this.cordInfo();
  },
  methods: {

    cordInfo() {
      this.$axios.put(cord_info_url, { id: parseInt(this.$route.query.id) }, {
      }).then(res => {
        if (res.data.code == '200') {
          this.loadingtrue = false;
          this.cordInfoData.push(res.data.data);
        }
      }).catch(function (err) {
        console.log(err);
      });
    },

 


  },

};
</script>
<style   scoped>
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
.icon_pay1 {
  position: absolute;
  width: 90px;
  right: 24px;
  top: 5px;
}
</style>