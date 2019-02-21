<style scoped>
@import "index.css";
</style>
<template>
    <div>
        <div class="homePage">
            <div class="bindCard">
                <span class="bindCardBtn" @click="blidcard">绑定就诊卡</span>
            </div>
            <!-- 就诊卡片 -->
            <div class="homeCard margin16" v-for="(item, index) in cardlist" v-if="showindex==index" :key="'cardlist' + index">
                <div class="homeCardText">
                    <div class="homeCardTextLeft">
                        <p>{{item.patientName}}<img class="renzhen" src="@/assets/images/renzhen.png" alt=""></p>
                        <p>{{item.cardNo}}</p>
                        <p>
                            <span class="icon_switch" @click="switchCard(index+1)"> <img src="@/assets/images/icon_switch.png" alt="">切换就诊人</span>
                        </p>
                    </div>
                    <div class="towma">
                        <p><img src="@/assets/images/lili.jpg" alt=""></p>
                        <p>刷卡请出示</p>
                    </div>
                </div>
            </div>

            <ul class="home-cz home-flex">
                <li @click="choosedepart">
                    <img src="@/assets/images/icon_register1.png" alt="" class="image">
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
            <div class="home-zy home-flex">
                <img @click="inhospital" src="@/assets/images/AAAA.png" alt="" class="image float-left">
            </div>
            <ul class="home-menu">
                <li>
                    <img src="@/assets/images/1.png" alt="" class="image">
                    <p>智能导诊</p>
                </li>
                <li @click="reportquery">
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
                <li @click="reportquery">
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
        <div style="height:100px">

        </div>
        <Footer></Footer>
    </div>

</template>
<script>
let appLoginlogin = '/appLogin/login';
let wechatbizPatientCardreadpage = "wechat/bizPatientCard/read/page";
export default {
    data() {
        return {
            code: 'ss',
            cardlist: [],
            showindex: 0,
            maxindex: '',
        }
    },
    mounted() {
        // 用于测试

        document.title = '互联网医院';
        let _this = this;
        function UrlSearch() {
            let name, value;
            //  let str = location.href;
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
                storage.setItem("token1", "edd169b85704410aa5219512cb6f1f00");
            }
        });

        this.$axios.put(wechatbizPatientCardreadpage, {
        }).then(res => {
            if (res.data.code == '200') {
                this.cardlist = res.data.rows;
                this.maxindex = res.data.total;
            } else if (res.data.code == '800') {
                console.log(res.data.msg)
            }
        }).catch(function (err) {
            console.log(err)
        });;


    },
    methods: {

        choosedepart() {
            let argu = {}
            this.$router.push({
                name: 'choosedepart',
                query: argu
            });
        },

        switchCard(data) {
            if (data < this.maxindex) {
                this.showindex = data;
            } else {
                this.showindex = 0;
            }
            console.log(data, this.showindex);
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
    }

}
</script>