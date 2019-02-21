 
<template>
    <div class="workdotorinfo">
        <Header post-title="医生详情" v-show="isWeixin"></Header>
        <div :class="{ 'margin45':isWeixin,  }">
            <div class="doctor-head">
                <div class="outCarint">
                    <div class="doctor-img float-left">
                        <img :src="img" alt="医生图片">
                    </div>
                    <div class="doctor-inro float-left">
                        <div class="doctor-decrib">
                            <p>
                                <span class="doctor-name">{{doctorInfo.name}} </span>
                                <!-- <span class="doctor-tag">{{doctorInfo.title}} </span> -->
                            </p>
                            <p class="school">{{doctorInfo.hospital}}</p>
                            <p class="school">{{doctorInfo.title}}</p>
                        </div>
                    </div>
                    <div class="heart float-right">
                        <span class="deta">预约</span>
                    </div>
                </div>
            </div>
            <div class="source-tab-line"></div>
            <div class="source-tab">
                <div class="available float-left" :class="isActive?'active-tab':''" @click="tabChange(1)">
                    <span>门诊排班</span>
                </div>
                <div class="all-source float-right" :class="isActive?'':'active-tab'" @click="tabChange(2)">
                    <span>医生简介</span>
                </div>
            </div>
            <div v-if="isActive">
                <div class="outCarint">
                    <ul class="available-info">
                        <li>
                            <div>上午14:30 - 15:00 华西院区<br/>医疗主治：肾脏内科</div>
                            <div class="available-tag">已满</div>
                        </li>
                        <li>
                            <div>上午14:30 - 15:00 华西院区<br/>医疗主治：肾脏内科</div>
                            <div class="available-tag">已满</div>
                        </li>
                        <li>
                            <div>上午14:30 - 15:00 华西院区<br/>医疗主治：肾脏内科</div>
                            <div class="available-tag">已满</div>
                        </li>
                        <li>
                            <div>上午14:30 - 15:00 华西院区<br/>医疗主治：肾脏内科</div>
                            <div class="available-tag">已满</div>
                        </li>
                        <li>
                            <div>上午14:30 - 15:00 华西院区<br/>医疗主治：肾脏内科</div>
                            <div class="available-tag available-have">余12</div>
                        </li>
                        <li>
                            <div>上午14:30 - 15:00 华西院区<br/>医疗主治：肾脏内科</div>
                            <div class="available-tag">已满</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-else>
                <div class="outCarint">
                    <div class="doctor-skill">
                        <div class="skill-head">
                            <span class="skill-head-title">专业擅长</span>
                        </div>
                    </div>
                    <div>
                        <div class="doctor-info">
                            <p>
                                {{doctorInfo.introduce}}</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import img from '@/assets/images/3.jpg';
import start from '@/assets/images/icon_star@2x.png'
let appbdHospitalDoctorreaddetail2 = "/app/bdHospitalDoctor/read/detail2";
export default {
    data() {
        return {
            isWeixin: false,
            img,
            start,
            collapsed: false,
            isActive: true,
            doctorInfo: '',
            dateList: [],
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

        this.doctordataFun();
    },
    methods: {
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
            this.$axios.put(appbdHospitalDoctorreaddetail2, {
                id: this.$route.query.doctorId * 1,
            }).then((res) => {
                if (res.data.code == '200') {
                    this.doctorInfo = res.data.data.doctorInfo;
                    this.dateList = res.data.data.dateList;
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
@import url("../workdotorinfo/workdotorinfo.css");
</style>