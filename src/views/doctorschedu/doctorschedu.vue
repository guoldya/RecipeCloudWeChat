<template>
    <div class="doctorschedu">
        <Header post-title="医生排班" v-show="isWeixin"></Header>
        <div :class="{'outCarint':false,'margin45':isWeixin,'margin7':!isWeixin}">
            <div class="doctor-head" v-show="!loadingtrue">
                <div class="outCarint">
                    <div class="doctor-info">
                        <div class="header">
                            <img src=" https://kano.guahao.cn/iqw2633790_image140.jpg" alt="医生头像">
                        </div>
                        <div class="doctor-right">
                            <p class="introduce">
                                <span class="doctor-name">{{doctorData.name}} </span>
                                <span class="doctor-tag">{{doctorData.title}} </span>
                            </p>
                            <p class="hospital"> {{depart}} </p>
                            <p v-if="doctorData.skill" class="content" :class="{'nomore':!isSeemore,'yy_dateAA':isSeemore}">
                                擅长：{{doctorData.skill}}
                            </p>
                            <p class="content" :class="{'nomore':!isSeemore,'yy_dateAA':isSeemore}">
                                介绍：{{doctorData.introduce}}
                            </p>
                            <p class="open" @click="isSeemore=!isSeemore"> 更多</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <!--<div class="yy_date_today">-->
                <!--<span class="date_today">{{choosedate}}</span>-->
                <!--</div>-->
                <!--<div class="yy_date_wrap">-->
                <!--<div class="wx_week">-->
                <!--<a v-for="(item,index) in dayWeek" :key="index+'aa'">{{item}}</a>-->
                <!--</div>-->
                <!--</div>-->
                <!--<div :class="{'yy_date':true,'yy_dateAA':!isSeemore}">-->
                <!--<div v-for="(item,index) in time" :key="index+'aa'" @click="choose(item,index)">-->
                <!--<span class="state_full" :class="{'state_full':true,'current': index == active}">-->
                <!--<span class="date">{{item.date}}</span>-->
                <!--<input type="hidden" class="getFullDate" value="2019-02-16">-->
                <!--<span>无号</span>-->
                <!--</span>-->
                <!--</div>-->
                <!--<div>-->
                <!--<span class="state_full have">-->
                <!--<span class="date">14</span>-->
                <!--<input type="hidden" class="getFullDate" value="2019-02-14">-->
                <!--<span>剩 13</span>-->
                <!--</span>-->
                <!--</div>-->
                <!--</div>-->
            </div>
            <Calendar v-show="!loadingtrue" v-on:choseDay="clickDay" v-on:changeMonth="changeDate" :sundayStart="true"></Calendar>
            <Loading v-show="loadingtrue"></Loading>

        </div>

    </div>
</template>
<script>
    let doctor_url="/app/bdHospitalDoctor/read/selectOne ";
    import Calendar from 'vue-calendar-component';
    import $ from "jquery"
    export default {
        components: {
            Calendar
        },
        data() {
            return {
                showMaskClosable: false,
                active: 0,
                value: '',
                isSeemore: false,
                choosedate: '',
                isWeixin: false,
                time: [],
                dayWeek: ["日", "一", "二", "三", "四", "五", "六"],
                docId:'',
                loadingtrue:true,
                doctorData:[],
                depart:'',
            }
        },
        mounted() {
            this.docId=this.$route.query.id;
            this.depart = this.$store.state.depart;
            this.$nextTick(()=>{
                var element=document.getElementsByClassName("wh_content")[1].children;
                for(let i=0;i<element.length;i++){
                    var para=document.createElement("div");
                    para.style.color="red";
                    para.style.marginTop="-10px";
                    var node=document.createTextNode("上午");
                    para.appendChild(node);
                    element[i].appendChild(para);
                }
            })
            document.title = '医生排班';
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.isWeixin = false;
            } else {
                this.isWeixin = true;
            };
            this.doctorscheduFun();
        },
        methods: {
            doctorscheduFun(){
                let scheduPar={};
                scheduPar.id=this.docId;
                this.$axios.put(doctor_url, scheduPar).then((res) => {
                    if (res.data.code == '200') {
                        this.loadingtrue=false;
                        this.doctorData=res.data.data;
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },
            clickDay(data) {
                console.log(data); //选中某天
            },
            changeDate(data) {
                console.log(data); //左右点击切换月份
            },
            choose(value, index) {
                this.active = index;
                this.choosedate = value.year + '-' + value.month + '-' + value.date;
            },
        }
    }
</script>

<style scoped>
  .doctorschedu  .doctor-head{
      height:auto;
  }
  /deep/.wh_content_all{
      background-color: transparent !important;
  }
  /deep/.wh_item_date, /deep/.wh_top_tag,/deep/.wh_top_changge li{
      color: #333333;
  }
  /deep/.wh_jiantou1{
      border-top: 4px solid #333333;
      border-left: 4px solid #333333;
  }
  /deep/.wh_jiantou2{
      border-top: 4px solid #333;
      border-right: 4px solid #333;
   }
  /deep/.wh_content{
      margin-left: 22px;
  }
  /deep/.wh_content_item .wh_isToday{
      background-color: #e5e5e5;
  }
  /deep/.wh_content_item .wh_chose_day{
      background-color: #e5e5e5;
  }
  .nomore{
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
  }
  .yy_dateAA {
      height: auto;
  }
    .doctorschedu .open{
        padding: 10px 14px 0;
    }
    .doctorschedu .content{
        margin: 4px 0;
    }
</style>

