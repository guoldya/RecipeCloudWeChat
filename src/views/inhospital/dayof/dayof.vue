<template>
  <div class="admission">
    <div id="scrollup" class="navigation">
      <i class="icon-iconfontjiantou" @click="$router.go(-1)">
        <img id="back" src="@/assets/images/icon_back_white.png">
      </i>
      <div class="navigation-content">
        一日清单
      </div>
      <div class="right">
      </div>
    </div>
    <div class="admissionbg">
      <div class="bigDate">
        <span class="bigDateDay">{{chooseday}}</span>
        <span class="bigDateTime">
          <span>星期{{chooseWeek|weekMode}}</span>
          <span class="week">{{chooseDate}}</span>
        </span>
      </div>
      <div class="big_date" id="container">
        <ul id="content">
          <li v-for="(item,index) in cordInfoData" :key="index" @click="choose(item,index)" :class="item.index == 0 ? 'cannot' : '' ">
            <p>{{item.week|weekMode}}</p>
            <p :class="activetime === index ? 'aa' : '' ">{{item.times.substring(8 ,10)}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="cardText alignJ flatCard">
      <p class="parElem listData">
        <span class="sonElem">预缴款总额</span>
        <span class="mu-secondary-text-color">￥{{money|keepTwoNum}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">已发生费用</span>
        <span class="mu-secondary-text-color" :class="{'red':occurredMoney <=0}">￥{{occurredMoney |keepTwoNum}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">剩余款</span>
        <span class="mu-secondary-text-color" :class="{'red':balance<=0}">￥{{balance|keepTwoNum}}</span>
      </p>
    </div>
    <div class="cardText outpatien-card ">
      <div class="cardTextKind spanWid">
        <span style="text-align: left">类别</span>
        <span>项目名称</span>
        <span>数量</span>
        <span style="text-align: right">金额</span>
      </div>
      <div>
        <div class="cardTextDiv" v-for="(item,i) in waitPayData" :key="i">
          <p class="  cardTextPP  cardTexttitle">
            <span>{{item.feeType|feeType}}</span>
            <span> </span>
            <span> </span>
            <span>￥{{item.totalPrice|keepTwoNum}} </span>
          </p>
          <div class="spanWid cardTextPP arrow" v-for="(item2,index) in item.list" :key="index">
            <span> </span>
            <span>{{item2.itemName}} </span>
            <span>{{item2.num}}</span>
            <span>￥{{item2.price|keepTwoNum}}</span>
          </div>
        </div>
      </div>
      <div class="cardTextKind" style="border-bottom:none;padding-bottom:0">
        <span style="text-align: left"> </span>
        <span> </span>
        <span> </span>
        <span style="text-align: right;line-height:0.6rem"> 合计：￥{{totalMoney|keepTwoNum}}</span>
      </div>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
      <span v-if="waitPayData.length!=0&&!nomore">
        <span class="mu-light-text-color">加载中</span>
        <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
      </span>
    </div>
    <Loading v-show="loadingtrue"></Loading>
  </div>
</template>
<script type="text/babel">

let selectIhRecordPriceList = "/api/hos/bizIhFee/read/page";
let selectTimes = "/api/hos/bizIhFee/selectTimes";
export default {
  data() {
    return {
      totalMoney: '',
      chooseday: '',
      chooseDate: '',
      chooseWeek: '',
      activetime: 0,
      balance: '',
      occurredMoney: "",
      money: '',
      busy: true,
      loadingtrue: true,
      nomore: false,
      waitPayData: '',
      page: 1,
      pageSize: 10,
      cordInfoData: '',
      feeDate: '',
    };
  },
  created() {
    this.WaitPay(false);
    this.cordInfo()
  },
 
  watch: {
    feeDate(newdoctorParams, olddoctorParams) {
      this.goodsList = [];
      this.loadingtrue = true;
      this.page = 1;
      this.WaitPay(false);
    },
  },
  methods: {
    choose(data, index) {
      if (data.index == 0) return
      this.activetime = index;
      this.chooseday = data.times.substring(8, 10);
      this.chooseDate = data.times.substring(0, 7);
      this.chooseWeek = data.week;
      this.feeDate = data.times.split(' ')[0];
    },

    cordInfo() {
      this.$axios.put(selectTimes, { recordId: parseInt(this.$route.query.id) }, {
      }).then(res => {
        if (res.data.code == '200') {
          this.loadingtrue = false;
          if (res.data.rows && res.data.rows.length != 0) {
            this.cordInfoData = res.data.rows;
            this.$nextTick(() => {
              document.getElementById('container').scrollLeft += document.getElementById('container').scrollWidth;
            })
            this.activetime = res.data.rows.length - 1;
            this.chooseday = res.data.rows[this.activetime].times.substring(8, 10);;
            this.chooseDate = res.data.rows[this.activetime].times.substring(0, 7);
            this.chooseWeek = res.data.rows[this.activetime].week;
            this.feeDate = res.data.rows[this.activetime].times.split(' ')[0];
            var today = new Date();
            if (today.getMonth() + 1 < 10) {
              var aa = '0' + (today.getMonth() + 1)
            } else {
              var aa = today.getMonth() + 1
            }

          } else {
            var today = new Date();
            var weekday = ["0", "1", "2", "3", "4", "5", "6"];
            this.chooseWeek = weekday[today.getDay()] - 1;
            this.chooseday = today.getDate() - 1;
            if (today.getMonth() + 1 < 10) {
              var aa = '0' + (today.getMonth() + 1)
            } else {
              var aa = today.getMonth() + 1
            }
            this.chooseDate = today.getFullYear() + "-" + aa;
            this.cordInfoData = [{ times: today.getFullYear() + "-" + aa + "-" + this.chooseday + " " + "00:00:00:00", week: this.chooseWeek, index: 0 }]
          }

        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    WaitPay(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = 1000;
      params.recordId = parseInt(this.$route.query.id);
      params.feeDate = this.feeDate;
      this.$axios.put(selectIhRecordPriceList, params).then((res) => {
        this.loadingtrue = false;
        if (res.data.code == 200) {
          this.money = res.data.money;
          this.balance = res.data.balance;
          this.occurredMoney = res.data.occurredMoney;
          this.totalMoney = res.data.totalMoney;
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
 

};
</script>
 <style  lang="scss"  scoped>
.admission .outpatien-card {
  margin: 24px;
  padding: 24px;
  background: #ffffff;
  border-radius: 15px;
  .mu-secondary-text-color {
    font-size: 36px;
  }
  &:nth-child(2) {
    padding-top: 0;
  }
  .cardTextDiv {
    border-bottom: 1px solid #dedede;
    padding: 20px 0;

    &:first-child {
      padding-top: 0;
    }
  }
}

.admission .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 28px;
  // border-bottom: 2px solid #e9e9e9;
}
.admission .cardText .cardTextKind {
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  font-size: 28px;
  border-bottom: 2px solid #e9e9e9;
  font-weight: 700;
}
.admission .spanWid span {
  display: inline-block;
  word-break: normal;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  text-align: center;
}
.admission .spanWid span:first-child {
  width: 15%;
  text-align: left;
}
.admission .spanWid span:nth-child(2) {
  width: 40%;
  text-align: left;
}
.admission .spanWid span:nth-child(3) {
  width: 20%;
  text-align: center;
}
.admission .spanWid span:last-child {
  width: 25%;
  text-align: right;
}
.admission .cardText .cardTextKindcontent {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
  font-size: 28px;
  font-weight: 700;
}
.admission .cardText .cardTextPP:last-child {
  border: none;
}
@import "../../submitOrder/submitOrder.css";
.admissionbg {
  background: -moz-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: -webkit-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: -o-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: -ms-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: linear-gradient(#57d0f4 20%, #42a3fb 90%);
}
.admission .navigation {
  background: #55cbf5;
  color: #ffffff;
}
.day-title {
  border-bottom: 1px solid #e9e9e9;
  line-height: 80px;
  font-weight: 800;
  color: #272727;
}
.day-title span {
  color: #272727;
}
.admission .bigDate {
  padding: 100px 44px 0;
  display: flex;
  display: -webkit-flex;
  text-align: left;
  -webkit-box-align: left;
}
.admission .bigDate .bigDateDay {
  font-size: 110px;
  color: #ffffff;
  font-weight: 600;
  /* font-family: cursive; */
}
.admission .bigDate .bigDateTime {
  font-size: 34px;
  color: #ffffff;
  margin-left: 30px;
  letter-spacing: 1px;
  height: 100px;
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.admission .big_date ul .cannot {
  color: #cccbcb;
}
.admission .big_date {
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;

  white-space: nowrap;
  background: transparent;
  margin-top: 10px;
  padding: 0 10px 20px;
}
.big_date li p:last-child {
  line-height: 70px;
  letter-spacing: 1px;
  margin-top: 20px;
}
.big_date .aa {
  display: inline-block;
  width: 70px;
  height: 70px;
  background: #ffffff;
  color: #42a3fb;
  border-radius: 100%;
  box-sizing: border-box;
}

.admission .big_date ul li {
  display: inline-block;
  width: 14.2%;
  text-align: center;
  color: #ffffff;
}

.admission .parElem .sonElem {
  width: 50%;
}
.admission .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  /*align-items: center;*/
  padding: 18px 0;
  color: var(--primary--right);
}
.admission .cardText .cardTextPP:last-child,
.admission .cardText .cardTextBor {
  border: none;
}
.admission .cardText .cardTextKind {
  display: flex;
  justify-content: space-between;

  font-size: 27px;
  border-bottom: 2px solid #e9e9e9;
  font-weight: 700;
  margin-bottom: 28px;
}
.admission .spanWid span {
  text-align: center;
  line-height: 50px;
}

.admission .spanWid span:first-child {
  width: 20%;
  text-align: left;
}
.admission .spanWid span:nth-child(2) {
  width: 32%;
  text-align: left;
}

.admission .spanWid span:nth-child(3) {
  width: 20%;
}
.admission .spanWid span:last-child {
  width: 20%;
  text-align: right;
}
.admission .cardTexttitle {
  color: #272727 !important;
}
</style>