<template>
  <div class="registrecorddetail">

    <Navigation type="title" title="预缴款缴纳">
      <span class="mu-secondary-text-color" @click="tijiao">预缴款记录</span>
    </Navigation>

    <div class="margin55">
      <div class="flatCard outCarint " v-for="(item,i) in cordInfoData" :key="i" v-show="!loadingtrue">
        <md-field>
          <md-detail-item title="患者姓名" :content=item.name></md-detail-item>
          <md-detail-item title="住院号">
            <span>{{item.sex|examSex}}</span>
          </md-detail-item>
          <md-detail-item title="住院科室" :content=item.dept></md-detail-item>
          <md-detail-item title="主治医师" :content=item.doctor></md-detail-item>
          <md-detail-item title="本次预交款">
            <span class="mu-secondary-text-color">￥{{item.money|keepTwoNum}}元</span>
          </md-detail-item>
          <md-detail-item title="预缴款金额">
            <span class="mu-secondary-text-color">￥{{item.money|keepTwoNum}}元</span>
          </md-detail-item>
        </md-field>
      </div>

      <div class="flatCard outCarint">
        <div class="outCarintcontent">
          <p>选择预交款金额</p>

          <div class="moneyflatCard">
            <!-- <div class="moneyflatActive">￥500</div> -->
            <div v-for="item in money">￥{{item}}</div>
          </div>

          <div class="moneyflatCard">
            <input type="text" placeholder="可输入其他金额">
          </div>
        </div>

      </div>
      <Loading v-show="loadingtrue"></Loading>

      <p class="addbTN" @click="next">立即缴纳</p>
    </div>
  </div>
</template>
<script  >
import { Dialog } from 'mand-mobile'
let cord_info_url = "/app/bizIhRecord/read/detail";


export default {
  data() {
    return {
      cordInfoData: [],
      loadingtrue: false,
      myBank: '0',
      money: [500, 1000, 1500, 2000]

    };
  },
  components: {

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
    tijiao() {
      this.$router.push({
        name: 'payfeerecord',
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
.moneyflatCard {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
   justify-content : space-between;
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