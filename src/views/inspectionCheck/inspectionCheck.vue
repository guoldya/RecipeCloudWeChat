<template>
    <div class="inspectionCheck">
        <header class="aui-navBar aui-navBar-fixed"  >
            <span href="javascript:;" class="aui-navBar-item" @click="$router.go(-1)">
                <img src="@/assets/images/icon_back.png">
            </span>
            <div class="aui-center">
                <span class="aui-center-title">慢病续方</span>
            </div>
            <!--<span class="aui-navBar-item">-->
                <!--<div>-->
                    <!--<md-field>-->
                        <!--<md-field-item :content="selectorValue" @click="showSelector" solid/>-->
                    <!--</md-field>-->
                    <!--<md-selector v-model="isSelectorShow" default-value="7" :data="optionsData[0]" max-height="320px" title="选择姓名" @choose="onSelectorChoose"></md-selector>-->
                <!--</div>-->
                <!--<span class="downImg"><img src="@/assets/images/icon_down.png"></span>-->
            <!--</span>-->
        </header>
        <div class="outCarint margin45">
            <Apptab :tab-title="departs" v-on:childByValue="childByValue"></Apptab>
            <div v-if="titleIndex === 1">
                <div class="card margin16">
                    <div class="cardHEADER headCard">
                        <span>仅看3日内续方</span>
                        <div>
                            <md-switch v-model="isActive" @change="handler('switch0', isActive, $event)"></md-switch>
                        </div>
                    </div>
                </div>
                <div class="card margin16" v-for="(item,i) in cardData" :key="i+'i'">
                    <div class="cardText ">
                        <div class="listData">
                            <span>处方日期：
                                <span class="mu-secondary-text-color">{{item.date}}</span>
                            </span>
                            <div  v-if="item.first==1" ><!--style="line-height: 35px"-->
                                <span  class="first">首诊</span>
                            </div>
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
                        <div>
                            <md-button type="primary" round v-if="isContinue==true" @click="continueApply">续方申请</md-button>
                            <md-button type="default" round v-else v-@click="continueApply">续方失效</md-button>
                        </div>
                    </div>
                </div>
            </div>
            <div  v-if="titleIndex === 2">
                <div class="card margin16">
                    <div class="cardHEADER headCard">
                        <span>仅看通过</span>
                        <div>
                            <md-switch v-model="isActive" @change="handler('switch0', isActive, $event)"></md-switch>
                        </div>
                    </div>
                </div>
                <div class="card margin16" v-for="(item,i) in applyData" :key="i">
                    <div class="cardText ">
                        <div class="listData">
                            <span>申请日期：
                                <span class="mu-secondary-text-color">{{item.applyDate}}</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>续方日期：
                                <span class="mu-secondary-text-color">{{item.continueDate}}</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>慢病诊断：
                                <span class="mu-secondary-text-color">{{item.type}}</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>处理状态：
                                <span class="mu-secondary-text-color">{{item.auditState}}</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>续方处方号：
                                <span class="mu-secondary-text-color">{{item.no}}</span>
                            </span>
                        </div>
                        <div>
                            <md-button type="primary" round v-if="isContinue==true" @click="lookDetail">查看详情</md-button>
                        </div>
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
            
            departs: [
                { title: '处方记录', type: 1 },
                { title: '申请记录', type: 2 },
            ],
            titleIndex: 1,
            cardData: [
                { date: "2019年1月30日", type: "高血压", source: "人民医院", restDate: "8日", first: "1" },
                { date: "2019年1月30日", type: "高血压", source: "人民医院", restDate: "7日", first: "2" },
                { date: "2019年1月30日", type: "高血压", source: "人民医院", restDate: "5日", first: "2" },
            ],
            applyData: [
                { applyDate: "2018年10月20日", continueDate: "2018年10月20日", type: "高血压", auditState: "审核通过", no: "5000000000" },
                { applyDate: "2018年10月20日", continueDate: "2018年10月20日", type: "高血压", auditState: "审核通过", no: "5000000000" },
                { applyDate: "2018年10月20日", continueDate: "2018年10月20日", type: "高血压", auditState: "审核通过", no: "5000000000" }
            ],
            optionsData: [[
                { text: "彭万里", value: "1" },
                { text: "高大山", value: "2" },
                { text: "马宏宇", value: "3" },
                { text: '孙寿康', value: "4" },
                { text: '孙应吉', value: "5" },
            ]],
            footer: 0,
            open: false,
            isContinue: true,
            isSelectorShow: false,
            selectorValue: '陈楚生得',
            isActive: true,
            choseValue:'',
            loadingtrue:'',
        };
    },
    created() {
    },
    mounted() {
        document.title = '慢病续方';
    },
    methods: {
        showSelector() {
            this.isSelectorShow = true
        },
        onSelectorChoose({ text ,value}) {
            this.selectorValue = text;
            this.choseValue=value;
        },
        // switchTo(num) {
        //     this.titleIndex = num;
        // },
        childByValue: function (childValue) {
            this.titleIndex = childValue.type;
            //this.noDataTitle = childValue.title;
            this.$store.commit('feeActiveFun', childValue.type);
            //this.goodsList = [];
            //this.loadingtrue = true;
            this.page = 1;
            //this.getGoodslist();
        },
        continueApply() {
            let argu = { name: this.selectorValue };
            this.$router.push({
                name: 'recipeDetail',
                query: argu
            });
        },
        lookDetail() {
            let argu = {name: this.selectorValue};
            this.$router.push({
                name: 'applyDetail',
                query: argu
            });
        },
        handler(name, active) {
            console.log(`Status of switch ${name} is ${active ? 'active' : 'inactive'}`)
        },
    }
};
</script>
<style  scoped>
@import "inspectionCheck.css";
</style>

