<template>
    <div class="doctorschedu">
        <Header post-title="医生排班" v-show="isWeixin"></Header>
        <div :class="{'outCarint':false,'margin45':isWeixin,'margin7':!isWeixin}">
            <div class="doctor-head">
                <div class="outCarint">
                    <div class="doctor-info">
                        <div class="header"><img src="@/assets/images/3.jpg"></div>
                        <div class="doctor-right">
                            <p class="introduce">
                                <span class="doctor-name">我问问 </span>
                                <span class="doctor-tag">本办法 </span>
                            </p>
                            <p class="hospital"> 院区不管你 </p>
                            <p class="content" :class="{'nomore':!isSeemore,'yy_dateAA':isSeemore}">
                                擅长：还成都公司当你开始复苏v是个大帅哥当地给v夫斯克v你说的v非vv你死党i你舒服时代的司法所能发给你
                            </p>
                            <!--<p class="open" @click="showMaskClosable=true"> 更多</p>-->
                            <p class="open" @click="isSeemore=!isSeemore"> 更多</p>
                        </div>
                    </div>
                </div>
                <!--<md-landscape v-model="showMaskClosable" :mask-closable="true">-->
                    <!--<div class="describ">-->
                        <!--<p>擅长：医生 </p>-->
                    <!--</div>-->
                <!--</md-landscape>-->
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
            <Calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate" :sundayStart="true"></Calendar>
        </div>

    </div>
</template>
<script>
    let doctor_url="/app/bdHospitalDoctor/read/selectDoctorList";
    let doctor_query_url="/app/bdHospitalOrg/read/searchClinicListByClinicOrDoctor";
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
            }
        },
        mounted() {
            $(".wh_content_item").append("<p class='reset'>上午</p>");
            $(".reset").css({"color":"#b5b5b5",marginTop:"24px"});
            //console.log($(".reset"));
            document.title = '医生排班';
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.isWeixin = false;
            } else {
                this.isWeixin = true;
            };
        },
        methods: {
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
</style>

