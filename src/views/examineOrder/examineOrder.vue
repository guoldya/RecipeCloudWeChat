<template>
    <div class="examineOrder">
        <Header post-title="检验检查"  ></Header>
        <div class=" margin55">
            <div class="time">
                <ul>
                    <li @click="switchTo(index,item)" v-for="(item,index) in time" :class="activetime === index ? 'timeAcitve' : '' " :key="index+'aa'">
                        <p>{{item.date}}</p>
                        <p>{{item.week}}</p>
                    </li>
                </ul>
            </div>
            <div class="order" v-show="!loadingtrue" v-if="timeData.length!=0">
                <div class="orderDetail" v-for="(item,i) in timeData" :key="i">
                    <div>
                        <span class="orderTime">{{item.stage}}</span>
                        <p>
                            <span>还剩余名额</span>
                            <span class="bigFont">{{item.remaindNum}}</span>
                            <span>人</span>
                        </p>
                    </div>
                    <div class="nowOrder">
                        <span class="num noNum" v-if="item.remaindNum==0">无号</span>
                        <span class="num" v-else @click="makeOrder(item.id)">预约</span>
                    </div>
                    <!--<p class="partLine" v-if="i!=timeData.length-1"></p>-->
                </div>
            </div>
            <div style="margin:186px 0" class="aligncenter" v-show="!loadingtrue" v-else>暂无号源</div>
            <Loading v-show="loadingtrue"></Loading>
        </div>
    </div>
</template>

<script>
    let bizExamSchedulereadlist="/app/bizExamSchedule/daySchedule";
    let ready_order_url="/app/bizExamApply/updateExamApply";
    export default {
        data() {
            return {
                activetime: 0,
                isTime: '',
                
                time: [],
                dayWeek: ["日", "一", "二", "三", "四", "五", "六"],
                timeData:[],
                classId:'',
                loadingtrue:true,
            }
        },
        mounted() {
            this.classId=this.$route.query.classId;
            this.getTime();
            document.title = '检验检查';
            this.getData();
            this.addWeek()
        },
        methods: {
            switchTo(num, item) {
                this.activetime = num;
                this.isTime = item.year + '-' + item.date;
                this.getTime();
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
              let dayArr = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
              d.setDate(d.getDate() + days);
              var y = d.getFullYear();
              var m = d.getMonth() + 1;
              m = m <= 9 ? "0" + m : m;
              var newDay = dayArr[d.getDay()];
              var newDate=d.getDate();
              newDate = newDate <= 9 ? "0" + newDate : newDate;
              data.newData = m + '-' + newDate;
              data.newYear = y;
              data.newDay = newDay;
              return data;
            },
            makeOrder(val){
                 let argu = {id:this.$route.query.id,scheduleId:val};
                this.$axios.post(ready_order_url,argu).then((res) => {
                    if(res.data.code=='800'){
                       this.$toast.info("预约失败")
                    }else if(res.data.code=='200'){
                        this.$store.commit('orderFun', res.data.data);
                        this.$router.push({
                            name: 'examineDetail',
                            query: argu
                        });
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },
            getTime(){
                if (!this.isTime) {
                    var today = new Date();
                    var m=today.getMonth()+1;
                    m = m <= 9 ? "0" + m : m;
                    var d=today.getDate();
                    d = d <= 9 ? "0" + d : d;
                    this.isTime = today.getFullYear() + "-" + (m) + "-" + d;
                }
                let getTimeParam={};
                getTimeParam.orgId=49;
                getTimeParam.classId=parseInt(this.classId);
                getTimeParam.day=this.isTime;
                this.$axios.put(bizExamSchedulereadlist,getTimeParam).then((res) => {
                    if(res.data.code=='200'){
                        this.loadingtrue = false;
                        this.timeData=res.data.rows;
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
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.examineOrder .nowOrder .num{
    width: 134px;
    height: 62px;
    line-height: 62px;
    font-size: 24px;
    color: #ffffff;
    background: var(--primary);
    border-radius: 40px;
    letter-spacing: 1px;
    text-align: center;
}
.examineOrder .nowOrder .noNum{
    background-color: #bbbbbb;
    color: #fff;
}
.examineOrder .order .orderDetail:first-child{
    padding-top: 20px;
}
.examineOrder .order .orderDetail{
    padding: 20px 24px;
    display: flex;
    justify-content: space-between;
    border-bottom: 2px solid #e9e9e9;
    background-color: #ffffff;
}
.examineOrder .order .orderTime{
    font-size: 32px;
}
.examineOrder .timeAcitve {
    color: #ffffff !important;
    background: var(--primary);
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
    color:  var(--primary--content);
}
.examineOrder .time ul li p:first-child {
    font-size: 24px;
}

</style>