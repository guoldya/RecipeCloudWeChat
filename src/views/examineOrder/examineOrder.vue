<template>
    <div class="examineOrder">
        <Header post-title="检验检查" v-show="isWeixin"></Header>
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
                  <span class="state_full " :class="{'state_full':true,'current': index == active}">
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
            <div  class="order">
                <div class="orderDetail" v-for="(item,i) in timeData" :key="i">
                    <div>
                        <span class="orderTime">{{item.time}}</span>
                    </div>
                    <div class="nowOrder">
                        <span>还剩余名额{{item.reset}}人</span>
                        <span class="num noNum" v-if="item.reset==0">无号</span>
                        <span class="num" v-else @click="makeOrder(i)">预约</span>
                    </div>
                    <div style="clear: both"></div>
                    <p class="partLine"></p>
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
                timeData:[
                    {time:"7:00-8:00",reset:"1"},
                    {time:"8:00-9:00",reset:"0"},
                ]
            }
        },
        mounted() {
            document.title = '检验检查';
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
            makeOrder(val){

            }


        }
    }
</script>

<style scoped>
@import "../workdoctor/workdoctor.css";
.examineOrder .nowOrder{
    font-size: 28px;
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    line-height: 60px;
}
.examineOrder .nowOrder .num{
    width: 100px;
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    color: #ffffff;
    background: #1da1f3;
    border-radius: 40px;
    letter-spacing: 1px;
    text-align: center;
}
.examineOrder .nowOrder .noNum{
    background-color: #bbbbbb;
    color: #fff;
}
.examineOrder .order .orderDetail:first-child{
    /*margin-top: ;*/
    padding-top: 20px;
}
.examineOrder .order .orderDetail{
    padding: 0px 24px;
}
.examineOrder .order .orderTime{
    font-size: 30px;
}
</style>