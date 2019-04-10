<template>
  <div class="registrecorddetail">
    <Header post-title="入院办理"></Header>
    <div class="margin55">
      <div class="flatCard outCarint " v-for="(item,i) in cordInfoData" :key="i" v-show="!loadingtrue">
        <md-field>
          <md-detail-item title="姓名" :content=item.name></md-detail-item>
          <md-detail-item title="性别">
            <span>{{item.sex|examSex}}</span>
          </md-detail-item>
          <md-detail-item title="身份证号" :content=item.cardNo></md-detail-item>
          <md-detail-item title="住院科室" :content=item.dept></md-detail-item>
          <md-detail-item title="主治医师" :content=item.doctor></md-detail-item>
          <md-detail-item title="入院日期">
            <span>{{item.inTime|lasttime}}</span>
          </md-detail-item>
          <md-detail-item title="预缴金额">
            <span>￥{{item.money}}</span>
          </md-detail-item>

        </md-field>
      </div>
      <Loading v-show="loadingtrue"></Loading>
      <div class="flatCard">
        <div class="warnText">
          <p>费用方式</p>
          <md-field class="radio-field">
            <md-radio-list v-model="myBank" :options="banks" icon-size="lg" />
          </md-field>
        </div>
      </div>

      <p class="addbTN" @click="next">下一步</p>
    </div>
  </div>
</template>
<script  >
import { Dialog } from 'mand-mobile'
let cord_info_url = "/app/bizIhRecord/read/detail";
import { Field, RadioList } from 'mand-mobile'

export default {
  data() {
    return {
      cordInfoData: [],
      loadingtrue: false,
      myBank: '0',
      banks: [
        {
          value: '0',
          text: '自费',
        },
        {
          value: '1',
          text: '医保',
        },

      ],

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

    next() {
      this.$router.push({
        name: 'admuoload',
        query: { type: this.myBank, id: this.$route.query.id }
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
</style>