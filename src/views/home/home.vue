<style scoped>
@import "index.css";
</style>
<template>
    <div class="home">
        <div class="homeheader">
            医院
        </div>
        <div class="hometop">
            <ul class="home-cz home-flex">
                <li @click="choosedepart">
                    <img src="@/assets/images/icon_register(1).png" alt="" class="image">
                    <p>预约挂号</p>
                </li>
                <li @click="feerecord">
                    <img src="@/assets/images/icon_self.png" alt="" class="image">
                    <p>门诊缴费</p>
                </li>
                <li @click="sign">
                    <img src="@/assets/images/icon_signin.png" alt="" class="image">
                    <p>就诊签到</p>
                </li>
            </ul>
        </div>
        <div class="homePage">

            <!-- 就诊卡片  -->
            <div v-if=" _cardlist.length!=0">
                <div v-show="!cardLoading" class="homeCard marginbott16" v-for="(item, index) in  _cardlist" v-if="showindex==index" :key="'cardlist' + index">
                    <div class="homeCardText">
                        <div class="homeCardTextLeft">
                            <p class="patientName">{{item.patientName}}<img class="renzhen" src="@/assets/images/renzhen.png" alt=""></p>
                            <p>{{item.cardNo}}</p>
                            <p>
                                <span class="icon_switch" @click="switchCard( _cardlist[index+1],index+1)">
                                    <img src="@/assets/images/icon_switch.png" alt="">切换就诊人</span>
                            </p>
                        </div>
                        <div class="towma" @click="showPic=true">
                            <p><img src="@/assets/images/lili.jpg" alt=""></p>
                            <p>刷卡请出示</p>
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
            <div class="home-zy home-flex">
                <img @click="inpatient" src="@/assets/images/AAAA.png" alt="" class="image float-left">
            </div>
            <ul class="home-menu">
                <li>
                    <img src="@/assets/images/1.png" alt="" class="image">
                    <p>智能导诊</p>
                </li>
                <li @click="examine">
                    <img src="@/assets/images/2.png" alt="" class="image">
                    <p>检验检查</p>
                </li>
                <li @click="reportquery">
                    <img src="@/assets/images/3.png" alt="" class="image">
                    <p>报告查询</p>
                </li>
                <li @click="lineupnow">
                    <img src="@/assets/images/4.png" alt="" class="image">
                    <p>我的排队</p>
                </li>
                <li @click="workdepart">
                    <img src="@/assets/images/5.png" alt="" class="image">
                    <p>医生排班</p>
                </li>
                <li>
                    <img src="@/assets/images/6.png" alt="" class="image">
                    <p>病案复印</p>
                </li>
                <li @click="myinspectionCheck">
                    <img src="@/assets/images/7.png" alt="" class="image">
                    <p>我的处方</p>
                </li>
                <li>
                    <img src="@/assets/images/8.png" alt="" class="image">
                    <p>就诊导航</p>
                </li>
            </ul>
            <!-- 测试的code：{{code}} -->
        </div>
        <md-landscape v-model="showPic" :mask-closable="true">
            <img src="@/assets/images/lili.jpg" alt="">
        </md-landscape>
        <Footer></Footer>
    </div>
</template>
<script>
let appLoginlogin = '/appLogin/login';
let wechatbizPatientCardreadpage = "/app/bizPatientCard/read/list";
export default {
    data() {
        return {
            code: 'ss',
            showPic: false,
            cardlist: [],
            showindex: 0,
            maxindex: '',
            cardLoading: true,
            aliveValue: '2',
        }
    },
    created() {
        this.$store.commit('feeActiveFun', 1);
    },
    mounted() {
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
        this.$axios.put(wechatbizPatientCardreadpage, {
        }).then(res => {
            if (res.data.code == '200') {
                this.cardlist = res.data.rows;
                this.maxindex = res.data.total;
                this.cardLoading = false;
                this.$store.commit('cardListFun', res.data.rows);
                this.$store.commit('patientIdFun', res.data.rows[0].patientId);
                this.$store.commit('cardNoFun', res.data.rows[0].cardNo);
                this.$store.commit('cardNnameFun', res.data.rows[0].patientName);
                this.$store.commit('cardIdFun', res.data.rows[0].id);
            } else if (res.data.code == '800') {
                console.log(res.data.msg)
            }
        }).catch(function (err) {
            console.log(err)
        });


    },
    methods: {

        choosedepart() {
            let argu = {}
            this.$router.push({
                name: 'choosedepart',
                query: argu
            });
        },

        switchCard(data1, data) {
            if (data < this.maxindex) {
                this.showindex = data;
            } else {
                this.showindex = 0;
            }
            this.$store.commit('patientIdFun', data1.patientId);
            this.$store.commit('cardNoFun', data1.cardNo);
            this.$store.commit('cardIdFun', data1.id);
            this.$store.commit('cardNnameFun', data1.patientName);
        },

        feerecord() {
            let argu = {}
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
    computed: {
        _cardlist() {
            this.cardLoading = false;
            return this.$store.state.cardList
        },

    },

}
</script>