<style scoped>
@import "index.css";
</style>
<template>
    <div class="home">
        <div class="homeheader">
            <p>互联网医院</p>
        </div>
        <div><img src="@/assets/images/bg.png" alt="" style="width:100%"></div>
        <div class="homePage">
            <!-- 就诊卡片 -->
            <div v-if=" _cardlist.length!=0">
                <div v-show="!cardLoading" class="homeCard marginbott16" v-for="(item, index) in  _cardlist" v-if="item.id==chooseId" :key="'cardlist' + index">
                    <div class="homeCardText">
                        <div class="homeCardTextLeft">
                            <p class="patientName">{{item.patientName}}<img class="renzhen" src="@/assets/images/renzhen.png" alt=""></p>
                            <p>{{item.cardNo}}</p>
                            <p>
                                <span class="icon_switch" @click="switchCard(index)">
                                    <img src="@/assets/images/icon_switch.png" alt="">切换就诊人</span>
                            </p>
                        </div>
                        <div class="towma" @click="showPicFun(item)">
                            <p><img src="@/assets/images/lili.jpg" alt=""></p>
                            <p>点击扫码</p>
                        </div>
                    </div>
                    <div v-show="cardLoading" class="spinner">
                        <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                    </div>
                </div>
            </div>
            <div v-else class="homeCard bindCard marginbott16">
                <div class="spinner" v-show="cardLoading">
                    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                </div>
                <span v-show="!cardLoading" class="bindCardBtn" @click="blidcard">绑定就诊卡</span>
            </div>
            <div class="cardPositon">
            </div>
            <div>
                <ul class="home-cz home-flex">
                    <li @click="choosedepart">
                        <img src="@/assets/images/icon_register1.png" alt="" class="image">
                        <p>预约挂号</p>
                    </li>
                    <li @click="feerecord">
                        <img src="@/assets/images/icon_self.png" alt="" class="image">
                        <p>门诊缴费</p>
                        <a class="signNumber" v-show="homeList.notPayCount!=0">{{homeList.notPayCount}}</a>
                    </li>
                    <li @click="sign">
                        <img src="@/assets/images/icon_signin.png" alt="" class="image">
                        <p>就诊签到</p>
                        <span class="signNumber" v-show="homeList.notSignCount!=0">{{homeList.notSignCount}}</span>
                    </li>
                </ul>
            </div>
            <div class="home-zy home-flex">
                <img @click="inpatient" src="@/assets/images/icon_Inpatient.png" alt="" class="image float-left">
            </div>
            <ul class="home-menu">
                <li @click="examine" class="examineLi">
                    <img src="@/assets/images/2.png" alt="" class="image">
                    <p>检验检查</p>
                    <span class="examineNumber" v-show="homeList.notApplyCount!=0">{{homeList.notApplyCount}}</span>
                </li>
                <li @click="reportquery" class="examineLi">
                    <img src="@/assets/images/3.png" alt="" class="image">
                    <p>报告查询</p>
                    <!-- <span class="examineNumber">1</span> -->
                </li>
                <li @click="lineupnow" class="examineLi">
                    <img src="@/assets/images/4.png" alt="" class="image">
                    <p>我的排队</p>
                    <!-- <span class="examineNumber">1</span> -->
                </li>
                <li @click="workdepart">
                    <img src="@/assets/images/5.png" alt="" class="image">
                    <p>医生排班</p>
                </li>
                <li @click="business">
                    <img src="@/assets/images/6.png" alt="" class="image">
                    <p>病案复印</p>
                </li>
                <li @click="myinspectionCheck">
                    <img src="@/assets/images/7.png" alt="" class="image">
                    <p>我的处方</p>
                </li>
            </ul>
            <!-- 测试的code：{{code}} -->
            <div class="home-zy home-flex">
                <img @click="inspectionCheck" src="@/assets/images/icon_continuation.png" alt="" class="image float-left">
            </div>
            <div class="home-Intel home-flex">
                <img src="@/assets/images/icon_Intelligent.png" alt="">
                <img src="@/assets/images/icon_navigation.png" alt="">
            </div>
            <div class="tools home-Intel" :class="{'isDownIntel':isDown}">
                <h2>医院简介</h2>
                <div class="introduce">
                    <p>互联网医院是集医疗、教学、科研、预防、保健、康复为一体，具有较强救治能力、较高科研水平和国际交流能力的二级甲等医院，先后被评为全国文明单位、全国“百佳医院、全国卫生计生系统先进集体、全国医院信息化建没先进单位、全国县级医院帮扶示范基地、中国PTC突出贡献团队奖、全国优质护理服务优秀医院、全国医院后勤管理先进集体、全国医院文化建设先进单位等荣誉称号。</p>
                </div>
            </div>
            <div class="club-new-spread" v-show="!isDown" @click="isDown=!isDown">...展开</div>
            <div class="club-new-suo" v-show="isDown" @click="isDown=!isDown">收起</div>
            <div style="height:10px"></div>
            <!-- <div class="lookupmore" :class="{'down':isDown}" @click="isDown=!isDown">
                <img src="@/assets/images/icon_up.png" alt="">
            </div> -->
        </div>
        <md-landscape v-model="showPic">
            <div class="codema">
                <p class="namecodema">{{picName}}</p>
                <img src="@/assets/images/lili.jpg" alt="">
                <p class="namecodema">就诊卡二维码</p>
                <md-button type="primary" size="small" inline round @click="showPic=false">关闭</md-button>
            </div>
        </md-landscape>
        <Footer :foot-number="homeList.notPayCount+homeList.notApplyCount+homeList.notSignCount"></Footer>
    </div>
</template>
<script>
import { mapState } from 'vuex';

let appLoginlogin = '/appLogin/login';
let wechatbizPatientCardreadpage = "/app/bizPatientCard/read/list";
let bizPatientRegisterselectCount = "/app/bizPatientRegister/selectCount";
export default {
    data() {
        return {
            code: 'ss',
            showPic: false,
            cardlist: [],
            showindex: 0,
            // maxindex: 0,
            cardLoading: true,
            aliveValue: '2',
            isDown: false,
            chooseId: '',
            picName: '',
            homeList: '',
        }
    },
    computed: {
        ...mapState({
            // _cardlist: state => state.cardList,
            _cardlist: state => state.home.cardList,
            maxindex: state => state.home.cardTotal,
        }),
    },
    created() {
        this.$store.commit('feeActiveFun', 1);

        console.log(this.$store.state.userInfo.id, "我是缓存的id")
    },
    async mounted() {
        // console.log(this.$store.state.home.cardList)
        // 用于测试
        document.title = '互联网医院';
        let _this = this;
        function UrlSearch() {
            let name, value;
            // let str = location.href;
            let str = "http://192.168.0.26:8080/?code=081qs5ZX03iwTU1YH5YX0Kv6ZX0qs5Zn"; //取得整个地址栏
            let num = str.indexOf("?");
            str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
            _this.code = str.match(/code=[^&]+/)[0].split("=")[1];
        };
        let Request = new UrlSearch(); //实例化
        this.$axios.get(appLoginlogin + '?wechatCode=' + _this.code + '&verifyType=' + 1, {
        }).then(res => {
            if (res.data.code == '200') {
                // res.data.data.value = JSON.parse(res.data.data.value);
                // var storage = window.localStorage;
                // storage.setItem("token1", res.data.data.value.token);
                // storage.setItem("id", res.data.data.value.id);
            } else if (res.data.code == '800') {
                // this.$router.push({
                //     name: 'register',
                // });
                var storage = window.localStorage;
                // storage.setItem("token7", "");
                // storage.setItem("UUID7", "");
                localStorage.removeItem('token7');
                localStorage.removeItem('UUID7');
                storage.setItem("token1", "2136a544595a4c638e8969bfafc2a1a1");
                storage.setItem("hospitalId", "49");
            }
        });
        await this.$store.dispatch('getCards'/* , { update: true } */);
        this.cardLoading = false;
        if (this.$store.state.cardId) {
            this.chooseId = this.$store.state.cardId;
        } else {
            this.chooseId = this._cardlist[0].id;
        }
        await this.homeNumber(this.chooseId);
        this.$store.commit('cardListFun', this._cardlist);
        this.$store.commit('patientIdFun', this._cardlist[0].patientId);
        this.$store.commit('cardNoFun', this._cardlist[0].cardNo);
        this.$store.commit('cardNnameFun', this._cardlist[0].patientName);
        this.$store.commit('cardIdFun', this._cardlist[0].id);
    },
    methods: {
        // async homeNumber(data) {
        //     this.$axios.put(bizPatientRegisterselectCount, {
        //         cardId: data ? data : this.$store.state.cardId
        //         // cardId:data? this.$store.state.cardId
        //     }).then(res => {
        //         if (res.data.code == '200') {
        //             this.homeList = res.data.data
        //         } else {
        //             console.log(res.data.msg)
        //         }
        //     }).catch(function (err) {
        //         console.log(err)
        //     })
        // },

        async homeNumber(data) {
            try {
                let res = await this.$axios.put(bizPatientRegisterselectCount, {
                    cardId: data ? data : this.$store.state.cardId
                });
                if (res.data.code != 200) {
                    throw Error(res.data.msg);
                }
                this.homeList = res.data.data
            } catch (error) {
                console.log(error);
            }
        },
        choosedepart() {
            let argu = {};
            this.$router.push({
                name: 'choosedepart',
                query: argu
            });
        },
        showPicFun(data) {
            this.picName = data.patientName;
            this.showPic = true;
        },
        switchCard(index) {
            let current = this._cardlist[index + 1];
            if (!current) {
                current = this._cardlist[0]
            }
            this.homeNumber(this.chooseId);
            this.chooseId = current.id;
            this.$store.commit('patientIdFun', current.patientId);
            this.$store.commit('cardNoFun', current.cardNo);
            this.$store.commit('cardIdFun', current.id);
            this.$store.commit('cardNnameFun', current.patientName);
        },
        feerecord() {
            let argu = {};
            this.$router.push({
                name: 'feerecord',
                query: argu
            });
        },
        sign() {
            let argu = {}
            this.$router.push({
                name: 'sign',
                query: argu
            });
        },
        blidcard() {
            let argu = {}
            this.$router.push({
                name: 'cardmy',
                query: argu
            });
        },
        // 报告查询
        reportquery() {
            let argu = {}
            this.$router.push({
                name: 'reportquery',
                query: argu
            });
        },
        // 我的排队
        lineupnow() {
            let argu = {}
            this.$router.push({
                name: 'lineupnow',
                query: argu
            });
        },
        // 我的住院
        inpatient() {
            let argu = {}
            this.$router.push({
                name: 'inpatient',
                query: argu
            });
        },
        // 慢病徐方
        inspectionCheck() {
            let argu = {}
            this.$router.push({
                name: 'inspectionCheck',
                query: argu
            });
        },
        //  
        examine() {
            let argu = {}
            this.$router.push({
                name: 'examine',
                query: argu
            });
        },

        // 医生排班
        workdepart() {
            let argu = {}
            this.$router.push({
                name: 'workdepart',
                query: argu
            });
        },

        // 医生排班
        business() {
            let argu = {}
            this.$router.push({
                name: 'business',
                query: argu
            });
        },
        // 我的处方
        myinspectionCheck() {
            let argu = {}
            this.$router.push({
                name: 'recipeRecord',
                query: argu
            });
        },

    },
    // beforeRouteLeave(to, from, next) {
    //       from.meta.keepAlive = true;
    //       next();
    // },


}
</script>