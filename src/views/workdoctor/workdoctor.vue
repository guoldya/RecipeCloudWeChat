<template>
  <div class="workdoctor">
    <Header post-title="医生排班" v-show="isWeixin"></Header>
    <div :class="{'outCarint':false,'margin45':isWeixin,'margin7':!isWeixin}">
      <div class="yy_date_today">
        <span class="date_today">{{choosedate}}</span>
        <a @click="isSeemore=!isSeemore" id="date_btn" class="change_date" href="javascript:void(0);">更多时间
          <span :class="{'time_btn':true,'tinmdown':!isSeemore,'tinmup':isSeemore}"  ></span>
        </a>
      </div>
      <div class="yy_date_wrap">
        <div class="wx_week">
          <a v-for="(item,index) in dayWeek" :key="index+'aa'">{{item}}</a>
        </div>
      </div>
      <div :class="{'yy_date':true,'yy_dateAA':isSeemore}">
        <div v-for="(item,index) in time" :key="index+'aa'" @click="choose(item,index)">
          <span class="state_full" :class="{'state_full':true,'current': index == active}">
            <span class="date">{{item.date}}</span>
            <input type="hidden" class="getFullDate" value="2019-02-16">
            <span>无号</span>
          </span>
        </div>
        <div>
          <span class="state_full have">
            <span class="date">14</span>
            <input type="hidden" class="getFullDate" value="2019-02-14">
            <span>剩 13</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                active: 0,
                value: '',
                isSeemore: false,
                choosedate: '',
                isWeixin: false,
                time: [],
                dayWeek: ["日", "一", "二", "三", "四", "五", "六"],
            }
        },
        mounted() {
            document.title = '医生排班';
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.isWeixin = false;
            } else {
                this.isWeixin = true;
            };
            var today = new Date();
            this.choosedate = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
            this.getData();
            this.addWeek()
        },
        methods: {
            choose(value, index) {
                this.active = index;
                this.choosedate = value.year + '-' + value.month + '-' + value.date;
            },
            getData() {
                for (let i = 0; i < 30; i++) {
                    let nowTime = new Date();
                    let d = nowTime.setDate(nowTime.getDate() + i - 1);
                    let data = this.addDate(d, 1);
                    let time = {};
                    time = { date: data.newData, month: data.newMonth, year: data.newYear }
                    this.time.push(time);
                }
            },
            addWeek() {
                var today = new Date();
                var dayWeeka = this.dayWeek.slice(0, today.getDay());
                var dayWeekb = this.dayWeek.slice(today.getDay(), 7);
                this.dayWeek = dayWeekb.concat(dayWeeka);
            },
            addDate(val, days) {
                var d = new Date(val);
                var data = {};
                let dayArr = ["日", "一", "二", "三", "四", "五", "六"];
                d.setDate(d.getDate() + days);
                var m = d.getMonth() + 1;
                var y = d.getFullYear();
                var newDay = dayArr.slice(0, d.getDay());
                data.newData = d.getDate();
                data.newDay = newDay;
                data.newMonth = d.getMonth() + 1;
                data.newYear = d.getFullYear();
                return data;
            },
            intodoctordetail() {
                let argu = {}
                this.$router.push({
                    name: 'doctordetail',
                    query: argu
                });
            },



        }
    }
</script>

<style scoped>

  .yy_date {
    width: 100%;
    height: 98px;
    overflow: hidden;
    font-size: 0;
    border-bottom: 1px solid #ececec;
    background-color: #fff;
  }
  .yy_dateAA {
    height: auto;
  }
  .yy_date_today {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 80px;
    font-size: 14px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
  }
  .yy_date_today a {
    font-size: 12px;
    color: #24a5f1;
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
  .yy_date > div {
    display: inline-block;
    width: 14.2%;
    height: 96px;
    padding: 10px 0;
    font-size: 0;
    text-align: center;
  }

  .yy_date .state_full {
    display: inline-block;
    width: 80px;
    height: 80px;
    padding: 4px 0 0;
    text-align: center;
    font-size: 24px;
    color: #8b8b8b;
    border-radius: 100%;
    box-sizing: border-box;
  }
  /*没号 、已满*/

  .yy_date .have {
    color: #24a5f1;
  }
  .yy_date .state_full span {
    display: block;
  }

  .yy_date .state_full span .date {
    font-size: 28px;
  }

  /*选中、可预约*/

  .yy_date .current,
  .yy_date .state_kyy {
    color: #fff;
    background-color: #24a5f1;
  }
  .yy_date_today .time_btn {
    display: inline-block;
    width: 28px;
    height: 28px;
    margin-left: 0.05rem;
    background: url(../../assets/images/icon5.png) no-repeat;
    background-size: 100% auto;
    vertical-align: text-bottom;
  }
  .tinmup {
    transform: rotate(180deg);
  }
  .tinmdown {
    transform: rotate(0deg);
  }
  /*今天*/

  .yy_date .state_full.state_today {
    color: #fff;
    background-color: #f6a120;
  }
</style>

