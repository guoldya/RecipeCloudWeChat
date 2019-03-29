
<template>
    <div class="margin55 doc_scheduling  ">
        <Header post-title="医生详情"></Header>
        <div class="doctor-head  ">
            <div class="doc_info  ">
                <div class="pic fl">
                    <img src="@/assets/images/user.png" onerror="@/assets/images/user.png" :alt="doctorInfo.name">
                </div>
                <div class="detail">
                    <div class="headname">
                        <span class="name">{{doctorInfo.name}}</span>
                        <span class="levle"> {{doctorInfo.title}}</span>
                        <p style="font-size: 14px">{{depart}} 擅长:{{doctorInfo.skill}}</p>
                    </div>

                </div>
                <div class="doc_code">
                    <!-- <img  alt="{{doctorInfo.name}}">
                        <p>收藏</p> -->
                </div>
            </div>
            <div class="doc_introduce">
                <div class="title">
                    <i class="icon i_info"></i>
                    <span class="doc_info_txt">医生介绍</span>
                    <div class="doc_open_btn">
                        <span id="open" @click="isSeemore=!isSeemore">展开
                            <i class="icon i_open" :class="{'nomore':isSeemore,}"></i>
                        </span>
                    </div>
                </div>
            </div>
            <div class="doc_detail" v-show="isSeemore">
                <div id="doc_detail">{{doctorInfo.introduce}}</div>
            </div>
            <div class="line"></div>
            <div class="yy_date_today" v-show="islist">
                <span class="date_today">{{time}}</span>
                <span class="date_today">{{week}} {{afternoon}}</span>
            </div>
            <div class="yy_date_today" v-show="!islist">
                <span class="date_today">当日号源</span>
            </div>
            <div class="date_yy">
                <div class="wx_yy_date_time" v-show="orderinfo.length!=0">
                    <a class="wx_yy_date_time_item" v-for="(order,index) in orderinfo" :key="index">
                        <span v-if="order.valNum==0">
                            <span class="current wx_residue_null">余{{order.valNum}}</span>
                            <label> {{depart}} {{order.regStage}}</label>
                        </span>
                        <span v-else>
                            <span class="current ">余{{order.valNum}}</span>
                            <label> {{depart}} {{order.regStage}}</label>
                        </span>
                        <div class="wx_residue_num" v-if="order.valNum==0">
                            <span class="keyy">{{order.money | keepTwoNum}}元</span>
                            <i class="time_btn"></i>
                        </div>
                        <div class="wx_residue_num" v-else @click="todayreservation(order)">
                            <span class="keyy">{{order.money | keepTwoNum}}元</span>
                            <i class="time_btn"></i>
                        </div>
                    </a>
                </div>
                <div class="wx_yy_date_time" v-show="orderinfo.length==0">
                    <a class="wx_yy_date_time_item">
                        <p class="aligncenter">暂无号源</p>
                    </a>
                </div>
            </div>
            <div class="line"></div>
            <div class="yy_date_today" @click="islook=!islook">
                <span class="date_today">查看全部排班</span>
                <span class="date_today">
                    <i class="time_btn" :class="{'time_btn_up':!islook}"></i>
                </span>
            </div>
            <div class="wx_dropdown_date_time" v-show="islook &&dateList.length!=0">
                <span v-for="(item,i) in dateList" :key="i">
                    <span>
                        <p style="font-size: 15px"> {{item.regStageVO}}
                            <span class="mu-secondary-text-color"> {{item.regStage}}</span> {{item.dept}} {{depart}} </p>
                        <p> {{item.regDate}}
                            <!-- <span class="mu-secondary-text-color">{{item.money | keepTwoNum}}元</span> -->
                            {{item.money | keepTwoNum}}元
                        </p>
                    </span>
                    <div class="wx_list_null" v-show="item.valNum==0">
                        <span>约满</span>
                    </div>
                    <div class="wx_list_num" v-show="item.valNum!=0" @click="reservation(item)">
                        <span class="keyy">剩 {{item.valNum}}</span>
                    </div>
                </span>

            </div>

            <div class="wx_yy_date_time" v-show="islook && dateList.length==0 ">
                <a class="wx_yy_date_time_item ">
                    <p class="aligncenter">暂无号源</p>
                </a>
            </div>
        </div>

    </div>
</template>
<script>
import img from '@/assets/images/3.jpg';
import start from '@/assets/images/icon_star@2x.png'
let appbdHospitalDoctorreaddetail = "/app/bdHospitalDoctor/read/selectOne";
let appbizRegisterSourcereadsourceDetail = "/app/bdHospitalDoctor/read/rankWorld";
let appbdHospitalDoctorreadrankWorld = "/app/bdHospitalDoctor/read/selectDoctorByTime";

export default {
    data() {
        return {
            showMaskClosable: false,
            img,
            start,
            collapsed: false,
            isActive: true,
            doctorInfo: '',
            isHave: false,
            dateList: '',
            week: '',
            time: '',
            afternoon: '下午',
            depart: '',
            islist: true,
            orderinfo: '',
            islook: true,
            isSeemore: false,
            moreButton: false,
        }
    },
    mounted() {
        document.title = '医生详情';

        if (this.$route.query.afternoon * 1 == 1) {
            this.afternoon = '上午';
        }

        if (this.$route.query.islist) {
            this.islist = false;
        } else {
            this.islist = true;
        }
        this.$axios.put(appbizRegisterSourcereadsourceDetail, {
            id: this.$route.query.doctorId * 1,
            stageType: this.islist ? this.$route.query.afternoon * 1 : undefined,
            time: this.islist ? this.$route.query.time : undefined,
        }).then((res) => {
            console.log(res)
            if (res.data.code == '200') {
                this.orderinfo = res.data.rows;
            } else {
                console.log(res.msg);
            }
        }).catch(function (err) {
            console.log(err);
        });


        this.week = this.$route.query.week;
        this.time = this.$route.query.time;
        this.depart = this.$store.state.depart;


        this.doctordataFun();
        this.dateListFun();
    },
    methods: {

        todayreservation(data) {
            this.$router.push({
                name: 'reservation',
                query: {  regStage: data.regStage, money: data.money, sourceId: data.regId, doctorId: this.$route.query.doctorId, time: this.$route.query.time, dept: data.dept, week: this.$route.query.week, afternoon: this.$route.query.afternoon }
            });
        },

        reservation(data) {
            this.$router.push({
                name: 'reservation',
                query: {  regStage: data.regStage, sourceId: data.regId, doctorId: data.id, time: data.regDate, afternoon: data.regStageVO, dept: data.major, money: data.money }
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
                stageType: this.$route.query.afternoon ? this.$route.query.afternoon * 1 : undefined,
                time: this.$route.query.time ? this.$route.query.time : undefined,
            }).then((res) => {
                if (res.data.code == '200') {
                    this.doctorInfo = res.data.data;
                    if (this.doctorInfo.introduce.length > 16) {
                        this.moreButton = true;
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
                doctorId: this.$route.query.doctorId * 1,
            }).then((res) => {
                if (res.data.code == '200') {
                    if (res.data.rows.length != 0) {
                        this.isHave = true;
                        for (let i = 0; i < res.data.rows.length; i++) {
                            res.data.rows[i].regDate = res.data.rows[i].regDate.split(' ')[0];
                        }
                        this.dateList = res.data.rows;
                    } else {
                        this.isHave = false;
                    }

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