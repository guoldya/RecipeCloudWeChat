<template>
  <div class="workdoctor">
    <Header post-title="医生" v-show="isWeixin"></Header>
    <div :class="{'outCarint':true,'margin45':isWeixin,'margin7':!isWeixin}">
      <div class="yy_date_today">
        <span class="date_today">2019-02-13</span>
        <a id="date_btn" class="change_date" href="javascript:void(0);">更多时间
          <span class="time_btn" style="transform: rotate(180deg);"></span>
        </a>
      </div>
      <div class="yy_date_wrap">
        <div class="wx_week">
          <a>一</a>
          <a>二</a>
          <a>三</a>
          <a>四</a>
          <a>五</a>
          <a>六</a>
          <a>日</a>
        </div>
      </div>
      <div class="yy_date">
        <div>
          <a name="a_date" tip="1" class="current" href="javascript:void(0);">
            <span class="date">13</span><input type="hidden" class="getFullDate" value="2019-02-13">
            <span>约满</span>
          </a>
        </div>
      </div>
      <div class="time">
        <ul>
          <li v-for="(item,index) in time" :key="index+'aa'">
            <p>{{item.date}}</p>
            <p>{{item.week}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      isWeixin: false,
      departData: [
        { name: "妇科门诊" },
        { name: "生殖内分泌门诊生殖内分泌" },
        { name: "儿科" },
        { name: "放射科" },
      ],
      test3: [
        { name: "冉有钱", good: "擅长：急性呼吸窘迫综合征、 呼吸衰竭的救治" },
        { name: "唐浩瀚", good: "擅长：急性呼吸窘迫综合征、重症感染及呼吸衰竭的救治" },
        { name: "安未", good: "擅长：急性呼吸窘迫综合征、重症感染及呼吸衰竭的救治" },
        { name: "吴政阳", good: "擅长：急性呼吸窘迫综合征、重症感染 " },
      ],
      time: [],
    }
  },
  mounted() {
    document.title = '医生';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;
    } else {
      this.isWeixin = true;
    };
    this.getData();
  },
  methods: {
    getData() {
      for (let i = 0; i < 15; i++) {
        let nowTime = new Date();
        let d = nowTime.setDate(nowTime.getDate() + i - 1);
        let data = this.addDate(d, 1);
        let time = {};
        if (i == 0) {
          time = { date: data.newData, week: '当日号' }
        } else {
          time = { date: data.newData, week: data.newDay }
        }
        this.time.push(time)
      }
    },
    addDate(val, days) {
      var d = new Date(val);
      var data = {};
      let dayArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      d.setDate(d.getDate() + days);
      var m = d.getMonth() + 1;
      var newDay = dayArr[d.getDay()];
      data.newData = m + '-' + d.getDate();
      data.newDay = newDay;
      return data;
    },
    intodoctordetail() {
      let argu = {}
      this.$router.push({
        name: 'doctordetail',
        query: argu
      });
    },
    workdotorinfo(title) {
      let argu = { doctorname: title }
      this.$router.push({
        name: 'workdotorinfo',
        query: argu
      });
    },
    loadMorelist(value) {
      let _this = this;
      console.log("搜索数据", value);

      clearTimeout(this.t);
      this.t = setTimeout(function () {

        _this.$axios.put(bdDrugstorereadpage, {
          status: 1, name: value, enable: 1, type: "wx",
        }).then(function (res) {
          if (res.code == '400') {
          } else {
            if (value) {
              _this.AAA = false;
            } else {
              _this.AAA = true;
            }

            _this.list = res.data.rows;
          }
        }).catch(function (err) {

        });
      }, 300);

    },


  }
}
</script>

<style scoped>
@import url("./workdoctor.css");
.yy_date_today {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding: 0 24px; */
  height: 80px;
  font-size: 14px;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  background-color: #fff;
}
.yy_date_wrap .wx_week {
  height: 72px;
  overflow: hidden;
  font-size: 0;
  border-bottom: 1px solid #e5e5e5;
}
.yy_date_wrap .wx_week a {
  display: inline-block;
  width: 14.2%;
  padding: 20px 0;
  font-size: 24px;
  text-align: center;
  color: #1c1c1c;
}
</style>

