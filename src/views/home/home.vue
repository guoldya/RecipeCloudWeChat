<style scoped>
@import "index.css";
</style>
<template>
    <div>
        <div class="homePage">
            <div class="bindCard" @click="blidcard">
                <span class="bindCardBtn">绑定就诊卡</span>
            </div>
            <ul class="home-cz home-flex">
                <li @click="choosedepart">
                    <img src="@/assets/images/icon_register.png" alt="" class="image">
                    <p>预约挂号</p>
                </li>
                <li @click="feerecord">
                    <img src="@/assets/images/icon_self.png" alt="" class="image">
                    <p>门诊缴费</p>
                </li>
                <li @click="feerecord">
                    <img src="@/assets/images/icon_signin.png" alt="" class="image">
                    <p>就诊签到</p>
                </li>
            </ul>
            <div class="home-zy home-flex">
                <img src="@/assets/images/AAAA.png" alt="" class="image float-left">

            </div>
            <ul class="home-menu">
                <li>
                    <img src="@/assets/images/1.png" alt="" class="image">
                    <p>智能导诊</p>
                </li>
                <li>
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
                <li>
                    <img src="@/assets/images/7.png" alt="" class="image">
                    <p>我的处方</p>
                </li>
                <li>
                    <img src="@/assets/images/8.png" alt="" class="image">
                    <p>就诊导航</p>
                </li>
            </ul>
        </div>
        <Footer></Footer>
    </div>

</template>
<script>

export default {
    data() {
        return {

        }
    },
    mounted() {
        document.title = '网上医院';
    },
    methods: {
        choosedepart() {
            let argu = {}
            this.$router.push({
                name: 'choosedepart',
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
        blidcard() {
            let argu = {}
            this.$router.push({
                name: 'blidcard',
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
        // 医生排班
        workdepart() {
            let argu = {}
            this.$router.push({
                name: 'workdepart',
                query: argu
            });
        },
    }

}
</script>