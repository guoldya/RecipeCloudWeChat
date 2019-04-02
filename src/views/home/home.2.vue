 

<style  scoped>
@import "index.css";
</style>
<template>
    <div class="home">
        <div class="homeheader">
            南川人民医院
        </div>
        <div class="hometop">
            <ul class="home-cz home-flex">
                <li @click="choosedepart">
                    <img src="@/assets/images/NN2.png" alt="" class="image">
                    <p>今日挂号</p>
                </li>
                <li @click="feerecord">
                    <img src="@/assets/images/NN3.png" alt="" class="image">
                    <p>预约挂号</p>
                </li>
                <li @click="sign">
                    <img src="@/assets/images/NN1.png" alt="" class="image">
                    <p>就诊签到</p>
                </li>
            </ul>
        </div>
        <!-- 就诊卡片  -->
        <div v-if="cardlist.length!=0">
            <div v-show="!cardLoading" class="homeCard marginbott10" v-for="(item, index) in cardlist" v-if="showindex==index" :key="'cardlist' + index">
                <div class="homeCardText">
                    <div class="homeCardTextLeft">
                        <p>{{item.patientName}}<img class="renzhen" src="@/assets/images/renzhen.png" alt=""></p>
                        <p>{{item.cardNo}}</p>
                        <p>
                            <span class="icon_switch" @click="switchCard(cardlist[index+1],index+1)"> <img src="@/assets/images/icon_switch.png" alt="">切换就诊人</span>
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
        <!-- 轮播警告 -->
        <div class="homePage swiperWarn marginbott10">
            <div class="swiperWarnImg">
                <p><img src="@/assets/images/icon_notice.png" alt=""></p>
            </div>

            <div class="swiperWarnContent">
                <p>
                    <span>（北京西单中心徐高峰医生接诊了...</span>
                    <span>1分钟前</span>
                </p>
                <p>
                    <span>（北京西单中心徐高峰医生接诊了...</span>
                    <span>1分钟前</span>
                </p>
                <div class="md-example-child md-example-child-swiper md-example-child-swiper-1">
                    <!-- <md-swiper @before-change="beforeChange" :has-dots="false" @after-change="afterChange" :default-index="1" :dragable="false" :autoplay="2000" transition="slideY">
                        <md-swiper-item :key="$index" v-for="(item, $index) in simple">
                            <p>
                                <span>（北京西单）中心 徐高峰医生接诊了董**患者</span>
                                <span>1分钟前</span>
                            </p>
                            <p>
                                <span>（北京西单）中心 徐高峰医生接诊了董**患者</span>
                                <span>1分钟前</span>
                            </p>
                        </md-swiper-item>
                    </md-swiper> -->

                </div>

            </div>
            <div class="swiperWarnRight">
                <span class="swiperWarnContentNumber"></span>
                <img src="@/assets/images/icon_more.png" alt="">
            </div>
        </div>

        <!-- 菜单按钮 -->
        <div class="homePage marginbott10">
            <ul class="home-menu">
                <li @click="lineupnow">
                    <img src="@/assets/images/4.png" alt="" class="image">
                    <p>我的排队</p>
                </li>
                <li @click="reportquery">
                    <img src="@/assets/images/3.png" alt="" class="image">
                    <p>报告查询</p>
                </li>
                <li @click="myinspectionCheck">
                    <img src="@/assets/images/7.png" alt="" class="image">
                    <p>我的处方</p>
                </li>
                <li @click="examine">
                    <img src="@/assets/images/9.png" alt="" class="image">
                    <p>住院预缴</p>
                </li>

                <li @click="workdepart">
                    <img src="@/assets/images/10.png" alt="" class="image">
                    <p>住院清单</p>
                </li>
                <li>
                    <img src="@/assets/images/11.png" alt="" class="image">
                    <p>办理住院</p>
                </li>
                <li @click="business">
                    <img src="@/assets/images/6.png" alt="" class="image">
                    <p>病案复印</p>
                </li>
            </ul>
        </div>
        <div class="homePage marginbott10">
            <div class="home-zy home-flex">
                <img @click="inhospital" src="@/assets/images/AAAA.png" alt="" class="image float-left">
            </div>
            <p class="needkown">【入院须知】住院你不可不知道的事</p>
        </div>
        <md-landscape v-model="showPic" :mask-closable="true">
            <img src="@/assets/images/lili.jpg" alt="">
        </md-landscape>
        <Footer></Footer>
    </div>
</template>
<script>
import { Swiper, SwiperItem } from 'mand-mobile'
import simple from 'mand-mobile/components/swiper/demo/data/simple'
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
            simple,
        }
    },
    components: {
        [Swiper.name]: Swiper,
        [SwiperItem.name]: SwiperItem,
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
                storage.setItem("token1", "edd169b85704410aa5219512cb6f1f00");
                storage.setItem("hospitalId", "49");
            }
        });

        this.$axios.put(wechatbizPatientCardreadpage, {
        }).then(res => {
            if (res.data.code == '200') {
                this.cardlist = res.data.rows;
                this.maxindex = res.data.total;
                this.cardLoading = false;
                this.$store.commit('patientIdFun', res.data.rows[0].patientId);
                this.$store.commit('cardNoFun', res.data.rows[0].cardNo);
                this.$store.commit('cardNnameFun', res.data.rows[0].patientName);
                this.$store.commit('cardIdFun', res.data.rows[0].id);
            } else if (res.data.code == '800') {
                console.log(res.data.msg)
            }
        }).catch(function (err) {
            console.log(err)
        });;


    },
    methods: {
        setValue(id, value) {
            document.querySelector(id) && (document.querySelector(id).innerHTML = value)
        },
        beforeChange(from, to) {
            this.setValue('#valueSwiper5', from)
            this.setValue('#valueSwiper6', to)
        },
        afterChange(from, to) {
            this.setValue('#valueSwiper7', from)
            this.setValue('#valueSwiper8', to)
        },
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
        business() {
            let argu = {}
            this.$router.push({
                name: 'business',
                query: argu
            });
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
        inhospital() {
            let argu = {}
            this.$router.push({
                name: 'inhospital',
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


    computed: {
        _cardlist() {
            return this.cardlist.filter((item, index) => this.showindex == index)
        }
    },

}
</script>