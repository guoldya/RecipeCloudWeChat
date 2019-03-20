<template>
  <div class="admission">
    <header id="scrollup" class="aui-navBar aui-navBar-fixed">
      <a href="javascript:;" class="aui-navBar-item" @click="$router.go(-1)">
        <img id="back" src="@/assets/images/icon_back_white.png">
      </a>
      <div class="aui-center">
        <span class="aui-center-title">一日清单</span>
      </div>
      <a href="javascript:;" class="aui-navBar-item">
        <!--{{selectOption}} -->
      </a>
    </header>
    <div class="admissionbg">
      <div class="bigDate">
        <span class="bigDateDay">{{chooseday}}</span>
        <span class="bigDateTime">
          <span>星期{{chooseWeek}}</span>
          <span class="week">{{chooseDate}}</span>
        </span>
      </div>
      <div class="big_date">
        <ul>
          <li v-for="(item,index) in time" :key="index" @click="choose(item,index)">
            <p>{{item.week}}</p>
            <p :class="activetime === index ? 'aa' : '' ">{{item.day}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="outCarint">
      <div class="card">
        <div class="cardText">
          <p class="cardTextPP">
            预交款总额
            <span class="mu-secondary-text-color">￥2000.00</span>
          </p>
          <p class="cardTextPP">
            未结总费用
            <span class="mu-secondary-text-color">-￥2000.00</span>
          </p>
          <p class="cardTextPP">
            剩余款
            <span class="mu-secondary-text-color">￥2000.00</span>
          </p>
        </div>
      </div>
    </div>
    <div class="outCarint">
      <div class="card">
        <div class="cardText">
          <p class="cardTextPP cardTextTitle">
            <span style="width: 20%;">类别</span>
            <span style="width: 44%;">项目名</span>
            <span style="width: 18%;text-align:right">数量</span>
            <span style="width: 18%;text-align:right">金额</span>
          </p>
          <div style="border-bottom:1px solid #e9e9e9">
            <div class="cardTextPP" style="border-bottom:none">
              <span style="width: 20%;">西药费</span>
              <span style="width: 44%;">双肺纹理增多</span>
              <span style="width: 18%;text-align:right">100</span>
              <span style="width: 18%;text-align:right">1</span>
            </div>
            <div class="cardTextPP">
              <span style="width: 20%;"> </span>
              <span style="width: 44%;">心影形态大小未见明显异常</span>
              <span style="width: 18%;text-align:right">10</span>
              <span style="width: 18%;text-align:right">100</span>
            </div>
          </div>
          <div >
            <div class="cardTextPP" style="border-bottom:none">
              <span style="width: 20%;">检查费</span>
              <span style="width: 44%;">双肺纹理增多</span>
              <span style="width: 18%;text-align:right">100</span>
              <span style="width: 18%;text-align:right">1</span>
            </div>
            <div class="cardTextPP">
              <span style="width: 20%;"> </span>
              <span style="width: 44%;">心影形态大小未见明显异常</span>
              <span style="width: 18%;text-align:right">10</span>
              <span style="width: 18%;text-align:right">100</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="cardText">
          <p class="cardTextPP cardTextTitle">
            <span>类别</span>
            <span>项目名</span>
            <span>数量</span>
            <span>金额</span>
          </p>
          <p class="cardTextPP">
            <span>西药费</span>
            <span>
              <p>肺力咳合剂</p>
              <p>肺力咳合剂 </p>
            </span>
            <span>
              <p>1</p>
              <p>1</p>
            </span>
            <span>
              <p>1</p>
              <p>1</p>
            </span>
          </p>
          <p class="cardTextPP">
            <span>检查费</span>
            <span>
              <p>肺力咳合剂</p>
              <p>肺力咳合剂 </p>
            </span>
            <span>
              <p>1</p>
              <p>1</p>
            </span>
            <span>
              <p>1</p>
              <p>1</p>
            </span>
          </p>
        </div>
      </div>
      <div class="card">
        <div class="cardText">
          <p class="cardTextPP cardTextTitle">
            <span>类别</span>
            <span>项目名</span>
            <span>数量</span>
            <span>金额</span>
          </p>
          <p class="cardTextPP">
            <span>西药费</span>
            <span>
              <p>肺力咳合剂</p>
              <p>肺力咳合剂 </p>
            </span>
            <span>
              <p>1</p>
              <p>1</p>
            </span>
            <span>
              <p>1</p>
              <p>1</p>
            </span>
          </p>
          <p class="cardTextPP">
            <span>检查费</span>
            <span>
              <p>肺力咳合剂</p>
              <p>肺力咳合剂 </p>
            </span>
            <span>
              <p>1</p>
              <p>1</p>
            </span>
            <span>
              <p>1</p>
              <p>1</p>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      time: [],
      chooseday: '08',
      chooseDate: '2019.04',
      chooseWeek: '一',
      isAAA: false,
      activetime: 0,
    };
  },
  created() {
  },
  mounted() {
    document.title = '一日清单';
    window.onscroll = function () {
      //变量t是滚动条滚动时，距离顶部的距离
      var t = document.documentElement.scrollTop || document.body.scrollTop;
      var scrollup = document.getElementById('scrollup');
      var back = document.getElementById('back');
      var aa = document.getElementsByClassName('aui-center-title');
      if (t >= 20) {
        aa[0].style.color = "#333333";
        back.setAttribute("src", require("@/assets/images/icon_back.png"));
        scrollup.style.background = "#ffffff";
      } else {
        //恢复正常
        scrollup.style.background = "transparent";
        aa[0].style.color = "#ffffff";
        back.setAttribute("src", require("@/assets/images/icon_back_white.png"));
      }
    }
    this.getData()
  },
  methods: {
    choose(data, index) {
      this.activetime = index;
      this.chooseday = data.day;
      this.chooseDate = data.date;
      this.chooseWeek = data.week;

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
      data.newData = y + '.' + m;
      if (d.getDate() < 10) {
        data.newYear = '0' + d.getDate();
      } else {
        data.newYear = d.getDate();
      }

      data.newDay = newDay;
      return data;
    },

  },
  computed: {

  },

};
</script>
 <style scoped>
@import "../../submitOrder/submitOrder.css";
.admissionbg {
  /* background: #57d0f4;
  background: #42a3fb; */
  /* height: 400px; */
  background: -moz-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: -webkit-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: -o-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: -ms-linear-gradient(#57d0f4 20%, #42a3fb 90%);
  background: linear-gradient(#57d0f4 20%, #42a3fb 90%);
}
.admission header {
  background: transparent;
}
.admission header .aui-center-title {
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
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
.admission .card {
  margin-top: 30px;
}
.admission .card:last-child {
  margin-bottom: 30px;
}
.admission .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0;
  font-size: 0.28rem;
  border-bottom: 0.01rem solid #e9e9e9;
}
.admission .cardText .cardTextPP:last-child {
  border: none;
}
.admission .cardText .cardTextTitle {
  font-weight: 600;
}
</style>