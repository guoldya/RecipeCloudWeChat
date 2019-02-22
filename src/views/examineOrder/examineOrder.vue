<template>
    <div class="examineOrder">
        <Header post-title="检验检查" v-show="isWeixin"></Header>
        <div :class="{'outCarint':false,'margin45':isWeixin,'margin7':!isWeixin}">
            <div class="time">
                <ul>
                    <li @click="switchTo(index,item)" v-for="(item,index) in time" :class="activetime === index ? 'timeAcitve' : '' " :key="index+'aa'">
                        <p>{{item.date}}</p>
                        <p>{{item.week}}</p>
                    </li>
                </ul>
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
    let bizExamSchedulereadlist="app/bizExamSchedule/read/list";
    export default {
        data() {
            return {
                activetime: 0,
                active: 0,
                value: '',
                isSeemore: false,
                choosedate: '',
                chooseweek: '',
                isTime: '',
                isWeixin: false,
                time: [],
                dayWeek: ["日", "一", "二", "三", "四", "五", "六"],
                timeData:[
                    {time:"7:00-8:00",reset:"1"},
                    {time:"8:00-9:00",reset:"0"},
                ],
                classId:'',
            }
        },
        mounted() {
            this.getTime();
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
            switchTo(num, item) {
                console.log(num);
                console.log(item);
                this.activetime = num;
                this.choosedate = item.date;
                this.chooseweek = item.week;
                this.isTime = item.year + '-' + item.date;
            },

            choose(value, index) {
                this.active = index;
                this.choosedate = value.year + '-' + value.month + '-' + value.date;
            },
            getData() {
                for (let i = 0; i < 15; i++) {
                    let nowTime = new Date();
                    let d = nowTime.setDate(nowTime.getDate() + i - 1);
                    let data = this.addDate(d, 1);
                    let time = {};
                    if (i == 0) {
                        time = { date: data.newData, week: '当日号', year: data.newYear }
                    } else {
                        time = { date: data.newData, week: data.newDay, year: data.newYear }
                    }
                    this.time.push(time)
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
              let dayArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
              d.setDate(d.getDate() + days);
              var y = d.getFullYear();
              var m = d.getMonth() + 1;
              var newDay = dayArr[d.getDay()];
              data.newData = m + '-' + d.getDate();
              data.newYear = y;
              data.newDay = newDay;
              return data;
            },
            makeOrder(val){

            },
            getTime(){
                this.classId=this.$route.query.classId;
                let getTimeParam={};
                getTimeParam.orgId=49;
                getTimeParam.classId=parseInt(this.classId);
                this.$axios.put(bizExamSchedulereadlist,getTimeParam).then((res) => {
                    if(res.data.code=='200'){

                    }
                }).catch(function (err) {
                    console.log(err);
                });
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
.examineOrder .timeAcitve {
    color: #ffffff !important;
    background: #1da1f3;
}
    .examineOrder .time{
        width: 100%;
        overflow-x: scroll;
        overflow-y: hidden;
        white-space: nowrap;
        /* ul中的内容不换行 */
        background: #ffffff;
        /**/

    }
.examineOrder .time ul {
     border-top: 1px solid #e9e9e9;
    border-bottom: 1px solid #e9e9e9;
}

.examineOrder .time ul li {
    display: inline-block;
    padding: 14px 0;
    width: 20%;
    text-align: center;
    color: #979797;
}
.examineOrder .time ul li p:first-child {
    font-size: 24px;
}

</style>