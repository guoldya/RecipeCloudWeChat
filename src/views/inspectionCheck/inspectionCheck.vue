<template>
    <div class="slow-page">
        <Header post-title="慢病续方" :selectOption=value v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <!--<div>-->
            <!--<div class="md-example-child md-example-child-drop-menu md-example-child-drop-menu-0">-->
            <!--<md-drop-menu :data="optionsData" />-->
            <!--</div>-->
            <!--</div>-->
            <div class="pageContent">
                <span v-for="(item, index) in changeTitle" :key="'changeTitle' + index" @click="switchTo(index)" :class="titleIndex === index ? 'appTabAcitive' : '' ">
                    {{item.title}}
                </span>
            </div>
            <div class="outCarint" v-if="titleIndex === 0">
                <div class="card margin16">
                    <div class="cardHEADER" style="display:flex;justify-content: flex-end;">
                        <span>仅看3日内续方</span>
                    </div>
                </div>
                <div class="card margin16" v-for="(item,i) in cardData">
                    <div class="cardText ">
                        <div class="listData">
                            <span>处方日期：
                                <span class="mu-secondary-text-color">{{item.date}}</span>
                            </span>
                            <span>首诊</span>
                        </div>
                        <div class="listData">
                            <span>慢病诊断：
                                <span class="mu-secondary-text-color">{{item.type}}</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>处方来源：
                                <span class="mu-secondary-text-color">{{item.source}}</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>剩余续方日期：
                                <span class="mu-secondary-text-color">{{item.restDate}}</span>
                            </span>
                        </div>
                        <p class="footer mu-secondary-text-color" v-if="isContinue==true" @click="continueApply">续方申请</p>
                        <p v-else>续方申请</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/babel">
export default {
    data() {
        return {
            isWeixin: false,
            changeTitle: [
                { title: '处方记录' },
                { title: '申请记录' },
            ],
            titleIndex: 0,
            cardData: [
                { date: "2019年1月30日", type: "高血压", source: "人民医院", restDate: "8日" },
                { date: "2019年1月30日", type: "高血压", source: "人民医院", restDate: "8日" },
                { date: "2019年1月30日", type: "高血压", source: "人民医院", restDate: "8日" },
            ],
            optionsData: [
                {                    text: "李晨",
                    options: [
                        { text: "李晨", value: "0" },
                        { text: "范冰冰", value: "1" },
                        { text: "郑凯", value: "2" },
                        { text: "邓超", value: "3" },
                        { text: '妇孙俪', value: "4" },
                        { text: '王祖蓝', value: "5" },
                        { text: '薛之谦', value: "6" },
                        { text: '陈楚生', value: "7" },
                        { text: "张信哲", value: "8" },
                        { text: "汪涵", value: "9" },
                    ]                }
            ],
            footer: 0,
            open: false,
            isContinue: true,
            value: "当时的"
        };
    },
    created() {
    },
    mounted() {
        document.title = '慢病续方';
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.isWeixin = false;
            this.value = "rrrrrrr"
            return true;
        } else {
            this.isWeixin = true;
            this.value = "rrrrrrr"
            return false;
        }


    },
    methods: {
        switchTo(num) {
            this.titleIndex = num;
        },
        switchDE(num) {
            this.titleIndex = num;
        },
        continueApply() {
            let argu = {};
            this.$router.push({
                name: 'recipeDetail',
                query: argu
            });
        },
    },
    computed: {

    },

};
</script>
<style  scoped>
@import "inspectionCheck.css";
</style>

