<style>
@import "index.css";
</style>
<template>
    <div class="homePage">
        <div class="bindCard" @click="blidcard">
            <span>绑定就诊卡+</span>
        </div>
        <ul class="home-cz home-flex">
            <li @click="choosedepart">
                <img src="@/assets/images/111.png" alt="" class="image">
                <p>挂号</p>
            </li>
            <li @click="blidcard">
                <img src="@/assets/images/222.png" alt="" class="image">
                <p>办卡绑卡</p>
            </li>
            <li @click="feerecord">
                <img src="@/assets/images/333.png" alt="" class="image">
                <p>缴费取号</p>
            </li>
        </ul>
        <div class="home-zy home-flex">
            <div class="home-flex">
                <img src="@/assets/images/444.png" alt="" class="image float-left">
                <div class="zy-text">
                    <p class="font-16">住院服务</p>
                    <p class="font-12">相关住院功能</p>
                </div>
            </div>
            <div>
                <img src="@/assets/images/icon_more2@2x.png" alt="" class="more">
            </div>
        </div>
        <ul class="home-menu">
            <li>
                <img src="@/assets/images/img_kkkk.png" alt="" class="image">
                <p>推荐医生</p>
            </li>
            <li>
                <img src="@/assets/images/IMG_k5127.png" alt="" class="image">
                <p>检验检查</p>
            </li>
            <li @click="reportquery">
                <img src="@/assets/images/IMG_k5127.png" alt="" class="image">
                <p>报告查询</p>
            </li>
            <li>
                <img src="@/assets/images/IMG_k5127.png" alt="" class="image">
                <p>便民服务</p>
            </li>
            <li>
                <img src="@/assets/images/IMG_k5127.png" alt="" class="image">
                <p>医生排班</p>
            </li>

        </ul>
        <!-- <ul class="home-footer home-flex">
            <li>
                <img :src="zone" alt="" class="image">
                <p>预约挂号</p>
            </li>
            <li>
                <img :src="zone" alt="" class="image">
                <p>预约挂号</p>
            </li>
            <li>
                <img :src="zone" alt="" class="image">
                <p>预约挂号</p>
            </li>
        </ul> -->
    </div>
</template>
<script>

export default {
    data() {
        return {

        }
    },
    mounted() {
        document.title = '首页'
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
    }

}
</script>