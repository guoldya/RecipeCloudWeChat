
<template>
    <div class="margin45 doc_scheduling  ">
        <Header post-title="医生详情"></Header>
        <div class="doctor-head  ">
            <div class="doc_info  ">
                <div class="pic fl">
                    <img src="@/assets/images/user.png" onerror="@/assets/images/user.png" :alt="doctorInfo.name">
                </div>
                <div class="detail">
                    <p class="name">
                        <span class="name">{{doctorInfo.name}}</span>
                        <span> {{doctorInfo.title}}</span>
                    </p>
                    <p class="hos_name">{{depart}} 擅长:{{doctorInfo.skill}}</p>
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
                            <a name="a_date" class="current wx_residue_null">
                                <span>余{{order.valNum}}</span>
                            </a>
                            <label> {{depart}} {{order.regStage}}</label>
                        </span>
                        <span v-else>
                            <a name="a_date" class="current">
                                <span>余{{order.valNum}}</span>
                            </a>
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
                        <p>暂无号源</p>
                    </a>
                </div>
            </div>
            <div class="line"></div>
            <div class="yy_date_today" @click="islook=!islook">
                <span class="date_today">查看全部排班</span>
                <span class="date_today">
                    <i class="time_btn"></i>
                </span>
            </div>
            <div class="wx_dropdown_date_time" v-show="islook &&dateList.length!=0">
                <span v-for="(item,i) in dateList" :key="i">
                    <span>
                        <p> {{item.regStageVO}}
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
                    <p>暂无号源</p>
                </a>
            </div>
        </div>

        <!-- <div class="outCarint ">
            <div class="doctordetal " v-if="isHave ">
                <div class="outCarint ">
                    <ul class="available-info " v-show="!islist ">
                        <li style="border: none; ">
                            <div> {{time}} {{week}} {{afternoon}} <br/>
                                <span class="colo13 ">
                                    {{major}} {{depart}} <br/> 余
                                    <span class="mu-secondary-text-color ">{{orderinfo.valNum}}</span>&nbsp;
                                    <span class="mu-secondary-text-color ">￥{{orderinfo.money | keepTwoNum}}</span>
                                </span>
                            </div>
                            <div v-show="orderinfo.valNum!=0 " @click="todayreservation(orderinfo) " class="available-tag ">预约</div>
                            <div v-show="orderinfo.valNum==0 " class="available-tag no ">无号</div>
                        </li>
                    </ul>
                    <div v-show="!islook " class="lookmore " @click="islook=!islook ">查看全部排班</div>
                    <p v-show="islook " class="home-article-combo--slogan ">全部排班</p>
                    <ul v-show="islook " class="available-info ">
                        <li v-for="(item,i) in dateList " :key="i ">
                            <div> {{item.regDate}} 星期一 {{item.regStageVO}} <br/>
                                <span class="colo13 ">
                                    {{item.dept}} {{depart}}{{item.regDate}} <br/> 余
                                    <span class="mu-secondary-text-color ">{{item.valNum}}</span>&nbsp;
                                    <span class="mu-secondary-text-color ">￥{{item.money | keepTwoNum}}</span>
                                </span>
                            </div>
                            <div v-show="item.valNum!=0 " @click="reservation(item) " class="available-tag ">预约</div>
                            <div v-show="item.valNum==0 " class="available-tag no ">无号</div>
                        </li>
                    </ul>
                    <div v-show="islook " class="lookmore " @click="islook=!islook ">收起全部排班</div>
                </div>
            </div>
            <div class="nullDiv " v-else>
                <img src="@/assets/images/null1.png ">
            </div>
        </div> -->
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
            major: '',
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
        this.major = this.$store.state.major;

        this.doctordataFun();
        this.dateListFun();
    },
    methods: {

        todayreservation(data) {
            this.$router.push({
                name: 'reservation',
                query: { regStage: data.regStage, money: data.money, sourceId: data.regId, doctorId: this.$route.query.doctorId, time: this.$route.query.time, week: this.$route.query.week, afternoon: this.$route.query.afternoon }
            });
        },

        reservation(data) {
            this.$router.push({
                name: 'reservation',
                query: { regStage: data.regStage, sourceId: data.regId, doctorId: data.id, time: data.regDate, afternoon: data.regStageVO, dept: data.dept, money: data.money }
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