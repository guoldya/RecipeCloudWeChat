 
<template>
    <div :class="{'margin45':isWeixin,'doctorinfo':true}">
        <Header post-title="医生详情" v-show="isWeixin"></Header>
        <div class="doctor-head">
            <div class="outCarint">
                <div class="doctor-info">
                    <div class="header"><img src="@/assets/images/3.jpg"></div>
                    <div class="doctor-right">
                        <p class="introduce">
                            <span class="doctor-name">{{doctorInfo.name}} </span>
                            <span class="doctor-tag">{{doctorInfo.title}} </span>
                        </p>
                        <p class="hospital"> 院区{{doctorInfo.hospital}} </p>
                        <p class="content"> 擅长：{{doctorInfo.introduce}} </p>
                        <p class="open" @click="showMaskClosable=true"> 更多</p>
                    </div>
                </div>
            </div>
            <md-landscape v-model="showMaskClosable" :mask-closable="true">
                <div class="describ">
                    <p>擅长：{{doctorInfo.introduce}} </p>
                </div>
            </md-landscape>
        </div>

        <div class="outCarint">
            <div class="doctordetal">
                <div class="outCarint">
                    <ul class="available-info">
                        <li style="border: none;">
                            <div> {{time}} {{week}} {{afternoon}} <br/>
                                <span class="colo13">
                                    儿科门诊 华西院区 <br/> 余
                                    <span class="mu-secondary-text-color">0</span>&nbsp;
                                    <span class="mu-secondary-text-color">￥20</span>
                                </span>
                            </div>
                            <div @click="todayreservation()" class="available-tag">预约</div>
                        </li>
                        <p class="colo13">全部排班</p>
                    </ul>
                    <ul class="available-info">
                        <li v-for="(item,i) in dateList" :key="i">
                            <div> {{item.regDate|time}} 星期一 {{item.regStageVO}} <br/>
                                <span class="colo13">
                                    {{item.dept}} 华西院区 <br/> 余
                                    <span class="mu-secondary-text-color">{{item.valNum}}</span>&nbsp;
                                    <span class="mu-secondary-text-color">￥{{item.money}}</span>
                                </span>
                            </div>
                            <div @click="reservation(item)" class="available-tag">预约</div>
                        </li>
                    </ul>
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
            dateList: [],
            week: '',
            time: '',
            afternoon: '下午',
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
        this.week = this.$route.query.week;
        this.time = this.$route.query.time;
        this.doctordataFun();
        this.dateListFun();
    },
    methods: {

        open() {

        },

        todayreservation() {
            this.$router.push({
                name: 'reservation',
                query: { doctorId: this.$route.query.doctorId, }
            });
        },

        reservation(data) {
            this.$router.push({
                name: 'reservation',
                query: { doctorId: this.$route.query.doctorId, time: data.regDate.split(' ')[0] }
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
                id: 2,
                stageType: this.$route.query.afternoon * 1,
                time: this.$route.query.time,
            }).then((res) => {
                if (res.data.code == '200') {
                    this.doctorInfo = res.data.data;
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