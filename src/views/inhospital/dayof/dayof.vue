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
      <div class="big_date">
        <ul>
          <li v-for="(item,index) in cordInfoData" :key="index" @click="choose(item,index)" :class="item.index == 0 ? 'cannot' : '' ">
            <p>{{item.week|weekMode}}</p>
            <p :class="activetime === index ? 'aa' : '' ">{{item.times.substring(8 ,10)}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="cardText alignJ flatCard">
      <p class="parElem listData">
        <span class="sonElem">预交款总额</span>
        <span class="mu-secondary-text-color">￥{{money|keepTwoNum}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">未结总费用</span>
        <span class="mu-secondary-text-color">￥{{balance|keepTwoNum}}</span>
      </p>
      <p class="parElem listData">
        <span class="sonElem">剩余款</span>
        <span class="mu-secondary-text-color">￥{{balance|keepTwoNum}}</span>
      </p>
    </div>
    <div class="margin5" v-if="waitPayData.length!=0">
      <div class="cardText flatCard">
        <div class="cardTextKind spanWid">
          <span style="text-align: left">类别</span>
          <span>项目名称</span>
          <span>数量</span>
          <span style="text-align: right">金额</span>
        </div>
        <div>
          <div v-for="(item,i) in waitPayData" :key="i">
            <p style="border-bottom: 1px solid #e9e9e9; line-height: 40px;">{{item.feeType|feeType}}</p>
            <div class="spanWid cardTextPP arrow" v-for="(item2,index) in item.list" :key="index">
              <span> </span>
              <span>{{item2.itemName}} </span>
              <span>{{item2.num}}</span>
              <span>￥{{item2.price|keepTwoNum}}</span>
            </div>
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
</template>
<script type="text/babel">

let selectIhRecordPriceList = "/app/bizIhFee/read/page";
let selectTimes = "/app/bizIhFee/selectTimes";
export default {
  data() {
    return {
      time: [],
      chooseday: '08',
      chooseDate: '2019.04',
      chooseWeek: '一',
      isAAA: false,
      activetime: 0,
      readyMoney: '',
      balance: '',
      money: '',
      rows: [
        {
          feeType: 1,
          list: [
            {
              feeDate: "2019 - 04 - 22",
              feeType: 1,
              id: '2',
              ihNo: '0005',
              itemName: "感冒了",
              num: '1',
              price: '5600',
              recordId: '1',
              total: '5600'
            },
            {
              feeDate: "2019 - 04 - 22",
              feeType: '1',
              id: '1',
              ihNo: '0005',
              itemName: "测试",
              num: '2',
              price: '5000',
              recordId: '1',
              total: '10000',
            }
          ]
        },
        {
          feeType: 2,
          list: [
            {
              feeDate: "2019 - 04 - 22",
              feeType: 1,
              id: '2',
              ihNo: '0005',
              itemName: "111",
              num: '1',
              price: '5600',
              recordId: '1',
              total: '5600'
            },
            {
              feeDate: "2019 - 04 - 22",
              feeType: 1,
              id: '2',
              ihNo: '0005',
              itemName: "2222",
              num: '1',
              price: '5600',
              recordId: '1',
              total: '5600'
            },
            {
              feeDate: "2019 - 04 - 22",
              feeType: '1',
              id: '1',
              ihNo: '0005',
              itemName: "333333",
              num: '2',
              price: '5000',
              recordId: '1',
              total: '10000',
            }
          ]
        },
      ],
      busy: true,
      loadingtrue: true,
      nomore: false,
      waitPayData: '',
      page: 1,
      pageSize: 10,
      loadingtrue: true,
      cordInfoData: '',
      feeDate: '',
    };
  },
  created() {
    this.WaitPay(false);
    this.cordInfo()
  },
  mounted() {
    document.title = '一日清单';
    window.onscroll = function () {
      //变量t是滚动条滚动时，距离顶部的距离
      var t = document.documentElement.scrollTop || document.body.scrollTop;
      var scrollup = document.getElementById('scrollup');
      var back = document.getElementById('back');
      var aa = document.getElementsByClassName('navigation-content');
      if (t >= 20) {
        if (aa[0]) {
          aa[0].style.color = " var(--primary--title)";
        }
        if (back) {
          back.setAttribute("src", require("@/assets/images/icon_back.png"));
        }
        if (scrollup) {
          scrollup.style.background = "#ffffff";
        }
      } else {
        //恢复正常
        if (scrollup) {
          scrollup.style.background = "transparent";
        }
        if (back) {
          back.setAttribute("src", require("@/assets/images/icon_back_white.png"));
        }
        if (aa[0]) {
          aa[0].style.color = "#ffffff";
        }

      }
    }
    this.getData()
  },
  watch: {
    feeDate(newdoctorParams, olddoctorParams) {
      console.log(newdoctorParams, olddoctorParams)

      this.goodsList = [];
      this.loadingtrue = true;
      this.page = 1;
      this.WaitPay(false);
      // this.feeDate = newFeeDate;
    },

  },
  methods: {
    choose(data, index) {
      if (data.index == 0) return
      this.activetime = index;
      this.chooseday = data.times.substring(8, 10);;
      this.chooseDate = data.times.substring(0, 7);
      this.chooseWeek = data.week;
      this.feeDate = data.times.split(' ')[0];
      console.log(this.feeDate.split(' ')[0])
    },

    getData() {
      for (let i = 0; i < 30; i++) {
        let nowTime = new Date();
        let d = nowTime.setDate(nowTime.getDate() + i - 1);
        let data = this.addDate(d, 1);
        let time = {};
        time = { date: data.newData, week: data.newDay, day: data.newYear, }
        // console.log(time)
        this.time.push(time)
      }
    },
    addDate(val, days) {
      var d = new Date(val);
      var data = {};
      let dayArr = ["日", "一", "二", "三", "四", "五", "六"];
      d.setDate(d.getDate() + days);
      var y = d.getFullYear();
      var m;
      if (d.getMonth() + 1 < 10) {
        m = '0' + d.getMonth() + 1;
      } else {
        data.newYear = d.getMonth() + 1;
      }
      var m = d.getMonth() + 1;
      var newDay = dayArr[d.getDay()];
      if (m < 10)
        m = '0' + m
      data.newData = y + '.' + m;
      if (d.getDate() < 10) {
        data.newYear = '0' + d.getDate();
      } else {
        data.newYear = d.getDate();
      }

      data.newDay = newDay;
      return data;
    },
    cordInfo() {
      this.$axios.put(selectTimes, { id: parseInt(this.$route.query.id) }, {
      }).then(res => {
        if (res.data.code == '200') {
          this.loadingtrue = false;
          if (res.data.rows) {
            console.log(res.data.rows)
            this.cordInfoData = res.data.rows;
            this.chooseday = res.data.rows[0].times.substring(8, 10);;
            this.chooseDate = res.data.rows[0].times.substring(0, 7);
            this.chooseWeek = res.data.rows[0].week;
            this.feeDate = res.data.rows[0].times.split(' ')[0];
          } else {
            this.cordInfoData = []
          }

        }
      }).catch(function (err) {
        console.log(err);
      });
    },
    WaitPay(flag) {
      const params = {};
      params.pageNumber = this.page;
      params.pageSize = this.pageSize;
      params.recordId = parseInt(this.$route.query.id);
      params.feeDate = this.feeDate;
      this.$axios.put(selectIhRecordPriceList, params).then((res) => {
        this.loadingtrue = false;
        if (res.data.code == 200) {
          this.money = res.data.money;
          this.balance = res.data.balance;

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
  computed: {

  },

};
</script>
 <style scoped>
@import "../../submitOrder/submitOrder.css";
.admissionbg {
  background: -moz-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: -webkit-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: -o-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: -ms-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: linear-gradient(#57d0f4 20%, #42a3fb 90%);
}
.admission .navigation {
  background: transparent;
  color: #ffffff;
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
  padding: 28px 0;
  font-size: 27px;
  border-bottom: 1px solid #e9e9e9;
  font-weight: 700;
  margin-bottom: 28px;
}
.admission .spanWid span {
  text-align: center;
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
</style>