 
<template>
    <div :class="{'margin45':isWeixin,'doctorinfo':true}">
        <Header post-title="医生详情" v-show="isWeixin"></Header>
        <div class="doctor-head">
            <div class="outCarint">
                <div class="doctor-img float-left" style="margin-top:20px">
                    <img :src="img" alt="医生图片">
                </div>
                <div class="doctor-inro float-left" style="margin-top:20px">
                    <div class="doctor-decrib">
                        <p>
                            <span class="doctor-name">{{doctorInfo.name}} </span>
                            <span class="doctor-tag">{{doctorInfo.title}} </span>
                        </p>
                        <p class="hospital">院区：{{doctorInfo.hospital}} 科室</p>
                    </div>
                    <p>擅长ssssssssssssssssss{{doctorInfo.title}} 展开</p>
                </div>
            </div>

            <div>

            </div>
        </div>

        <div class="outCarint">
            <div class="doctordetal">
                <div class="outCarint">
                    <ul class="available-info">
                        <li>
                            <div> 2019-02-22 今日 上午 <br/>
                                <span class="colo13">
                                    儿科门诊 华西院区 <br/> 余
                                    <span class="mu-secondary-text-color">0</span>&nbsp;
                                    <span class="mu-secondary-text-color">￥20</span>
                                </span>
                            </div>
                            <div @click="reservation" class="available-tag">预约</div>
                        </li>
                        <p class="colo13">全部排班</p>
                    </ul>
                    <ul class="available-info">

                        <li>
                            <div> 2019-02-22 今日 上午 <br/>
                                <span class="colo13">
                                    儿科门诊 华西院区 <br/> 余
                                    <span class="mu-secondary-text-color">0</span>&nbsp;
                                    <span class="mu-secondary-text-color">￥20</span>
                                </span>
                            </div>
                            <div @click="reservation" class="available-tag">预约</div>
                        </li>
                        <li>
                            <div> 2019-02-22 今日 上午 <br/>
                                <span class="colo13">
                                    儿科门诊 华西院区 <br/> 余
                                    <span class="mu-secondary-text-color">0</span>&nbsp;
                                    <span class="mu-secondary-text-color">￥20</span>
                                </span>
                            </div>
                            <div @click="reservation" class="available-tag">预约</div>
                        </li>
                        <li>
                            <div> 2019-02-22 今日 上午 <br/>
                                <span class="colo13">
                                    儿科门诊 华西院区 <br/> 余
                                    <span class="mu-secondary-text-color">0</span>&nbsp;
                                    <span class="mu-secondary-text-color">￥20</span>
                                </span>
                            </div>
                            <div @click="reservation" class="available-tag">预约</div>
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
        open() {

        },
        reservation(data) {
            console.log(data)
            this.$router.push({
                name: 'reservation',
                query: {}
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
@import url("./doctor.css");
</style>