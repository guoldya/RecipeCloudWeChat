
<template>
    <div :class="{'margin45':isWeixin,'doctorinfo':true, }">
        <Header post-title="医生详情" v-show="isWeixin"></Header>
        <div class="doctor-head">
            <div class="outCarint">
                <!-- <div class="doctor-info">
                    <div class="header"><img src="@/assets/images/3.jpg"></div>
                    <div class="doctor-right">
                        <p class="introduce">
                            <span class="doctor-name">{{doctorInfo.name}} </span>
                            <span class="doctor-tag">{{doctorInfo.title}} </span>
                        </p>
                        <p class="hospital"> {{depart}} </p>
                        <p class="content"> 擅长：{{doctorInfo.skill}} </p>
                        <p :class="{'nomore':!isSeemore,'yy_dateAA':isSeemore}">
                            jieh{{doctorInfo.introduce}}
                        </p>
                        <p class="open" @click="isSeemore=!isSeemore"> 更多</p>
                    </div>
                </div> -->

                <div class="doctor-info doctor-infoFATHER">
                    <div class="header"><img src="@/assets/images/user.png"></div>
                    <div class="doctor-right">
                        <p class="introduce">
                            <span class="doctor-name">{{doctorInfo.name}} </span>
                            <span class="doctor-tag">{{doctorInfo.title}} </span>
                        </p>
                        <p class="hospital"> {{depart}} </p>
                        <p class="content"> 擅长：{{doctorInfo.skill}} </p>
                        <p :class="{'nomore':!isSeemore,'yy_dateAA':isSeemore}">
                            介绍：{{doctorInfo.introduce}}
                        </p>
                        <p class="open" @click="isSeemore=!isSeemore" v-show="moreButton"> 更多</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="outCarint">
            <div class="doctordetal">
                <div class="outCarint">
                    <ul class="available-info" v-show="!islist">
                        <li style="border: none;">
                            <div> {{time}} {{week}} {{afternoon}} <br/>
                                <span class="colo13">
                                    {{major}} {{depart}} <br/> 余
                                    <span class="mu-secondary-text-color">{{orderinfo.valNum}}</span>&nbsp;
                                    <span class="mu-secondary-text-color">￥{{orderinfo.money}}</span>
                                </span>
                            </div>
                            <div v-show="orderinfo.valNum!=0" @click="todayreservation(orderinfo)" class="available-tag">预约</div>
                            <div v-show="orderinfo.valNum==0" class="available-tag no">无号</div>
                        </li>
                    </ul>
                    <div v-show="!islook" class="lookmore" @click="islook=!islook">查看全部排班</div>
                    <p v-show="islook" class="home-article-combo--slogan">全部排班</p>
                    <ul v-show="islook" class="available-info">
                        <li v-for="(item,i) in dateList" :key="i">
                            <div> {{item.regDate}} 星期一 {{item.regStageVO}} <br/>
                                <span class="colo13">
                                    {{item.dept}} {{depart}} <br/> 余
                                    <span class="mu-secondary-text-color">{{item.valNum}}</span>&nbsp;
                                    <span class="mu-secondary-text-color">￥{{item.money}}</span>
                                </span>
                            </div>
                            <div v-show="item.valNum!=0" @click="reservation(item)" class="available-tag">预约</div>
                            <div v-show="item.valNum==0" class="available-tag no">无号</div>
                        </li>
                    </ul>
                    <div v-show="islook" class="lookmore" @click="islook=!islook">收起全部排班</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import img from '@/assets/images/3.jpg';
import start from '@/assets/images/icon_star@2x.png'

let appbdHospitalDoctorreaddetail = "/app/bdHospitalDoctor/read/detail";
let appbdHospitalDoctorreadrankWorld = "/app/bdHospitalDoctor/read/rankWorld";
let appbizRegisterSourcereadsourceDetail = "/app/bizRegisterSource/read/sourceDetail";
export default {
    data() {
        return {
            showMaskClosable: false,
            isWeixin: false,
            img,
            start,
            collapsed: false,
            isActive: true,
            doctorInfo: '',
            dateList: '',
            week: '',
            time: '',
            afternoon: '下午',
            depart: '',
            major: '',
            islist: false,
            orderinfo: '',
            islook: false,
            isSeemore: false,
            moreButton:false,
        }
    },
    mounted() {
        document.title = '医生详情';
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.isWeixin = false;
        } else {
            this.isWeixin = true;
        };
        if (this.$route.query.afternoon * 1 == 1) {
            this.afternoon = '上午';
        }
        if (this.$route.query.islist) {
            this.islist = true;


        }
        else {
            this.$axios.put(appbizRegisterSourcereadsourceDetail, {
                id: this.$route.query.sourceId * 1,
            }).then((res) => {
                console.log(res)
                if (res.data.code == '200') {
                    this.orderinfo = res.data.data;
                } else {
                    console.log(res.msg);
                }
            }).catch(function (err) {
                console.log(err);
            });
        }

        this.week = this.$route.query.week;
        this.time = this.$route.query.time;
        this.depart = this.$store.state.depart;
        this.major = this.$store.state.major;
        this.doctordataFun();
        this.dateListFun();
    },
    methods: {

        open() {

        },

        todayreservation(data) {
            this.$router.push({
                name: 'reservation',
                query: { money: data.money, sourceId: this.$route.query.sourceId, doctorId: this.$route.query.doctorId, time: this.$route.query.time, week: this.$route.query.week, afternoon: this.$route.query.afternoon }
            });
        },

        reservation(data) {
            this.$router.push({
                name: 'reservation',
                query: { sourceId: data.regId, doctorId: data.id, time: data.regDate, afternoon: data.regStageVO, dept: data.dept, money: data.money }
            });
        },

        toggleClick() {
            this.collapsed = !this.collapsed
        },
        tabChange(val) {
            if (val == 1) {
                this.isActive = true
            } else {
                this.isActive = false
            }
        },
        doctordataFun() {
            this.$axios.put(appbdHospitalDoctorreaddetail, {
                id: this.$route.query.doctorId * 1,
                stageType: this.$route.query.afternoon * 1,
                time: this.$route.query.time,
            }).then((res) => {
                if (res.data.code == '200') {
                    this.doctorInfo = res.data.data;
                    if(this.doctorInfo.introduce.length>16){
                        this.moreButton=true;
                    }
                } else {
                    console.log(res.msg);
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        dateListFun() {
            this.$axios.put(appbdHospitalDoctorreadrankWorld, {
                id: this.$route.query.doctorId * 1,
            }).then((res) => {
                if (res.data.code == '200') {
                    for (let i = 0; i < res.data.rows.length; i++) {
                        res.data.rows[i].regDate = res.data.rows[i].regDate.split(' ')[0];
                    }
                    this.dateList = res.data.rows;
                } else {
                    console.log(res.msg);
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
    }
}
</script>
<style scoped>
@import url("./doctor.css");
</style>