<template>
    <div class="inspectionCheck">
        <Header post-title="慢病续方"></Header>
        <div class="margin50">
            <Apptab :tab-title="departs" v-on:childByValue="childByValue"></Apptab>
            <div v-if="titleIndex === 1">
                <div class="flatCard" style="margin-top: 0">
                    <div class="cardHEADER headCard">
                        <span>仅看3日内续方</span>
                        <div>
                            <md-switch v-model="isActive" @change="handler('switch0', isActive, $event)"></md-switch>
                        </div>
                    </div>
                </div>
                <div class="flatCard cardText margin5" v-for="(item,i) in goodsList" :key="i+'i'">
                    <div class="insCheck-cotent">
                        <div class="parElem listData">
                            <span class="sonElem">处方日期</span>
                            <span>
                                <span>{{item.date}}</span>
                                <span v-if="item.first==1" style="margin-left: 14px" class="first mu-secondary-text-color">首诊</span>
                            </span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">慢病诊断</span>
                            <span>{{item.type}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">处方来源</span>
                            <span>{{item.source}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">剩余续方日期</span>
                            <span>{{item.restDate}}</span>
                        </div>
                        <div>
                            <md-button type="primary" round v-if="isContinue==true" @click="continueApply">续方申请</md-button>
                            <md-button type="default" round v-else v-@click="continueApply">续方失效</md-button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="titleIndex === 2">
                <div class="flatCard" style="margin-top: 0">
                    <div class="cardHEADER headCard">
                        <span>仅看通过</span>
                        <div>
                            <md-switch v-model="isActive2" @change="handler('switch0', isActive2, $event)"></md-switch>
                        </div>
                    </div>
                </div>
                <div class="flatCard cardText" v-for="(item,i) in applyData" :key="i">
                    <div class="insCheck-cotent">
                        <div class="parElem listData">
                            <span class="sonElem">申请日期</span>
                            <span>{{item.applyDate}}</span>
                        </div>
                        <div class="listData">
                            <span>续方日期</span>
                            <span class="mu-secondary-text-color">{{item.continueDate}}</span>
                        </div>
                        <div class="listData">
                            <span>慢病诊断</span>
                            <span class="mu-secondary-text-color">{{item.type}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">处理状态</span>
                            <span>{{item.auditState}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">续方处方号</span>
                            <span>{{item.no}}</span>
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
let recipeApplyRenewRecipe = "/app/bizRecipeApply/recipeApplyRenewRecipe";
export default {
    data() {
        return {
            busy: true,
            nomore: false,
            loadingtrue: true,
            goodsList: '',
            pageNumber: 1,
            page: 1,
            pageSize: 10,
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
            isActive: false,
            isActive2: false,
            loadingtrue: '',
        };
    },
    created() {
    },
    mounted() {
        if (this.$store.state.feeActiveId) {
            this.type = this.$store.state.feeActiveId
        }
        this.getGoodslist(false);
        document.title = '慢病续方';
    },
    methods: {

        childByValue: function (childValue) {
            this.titleIndex = childValue.type;
            this.$store.commit('feeActiveFun', childValue.type);
            this.goodsList = [];
            this.loadingtrue = true;
            this.page = 1;
            this.getGoodslist();
        },
        continueApply() {
            let argu = {};
            this.$router.push({
                name: 'recipeDetail',
                query: argu
            });
        },
        lookDetail() {
            let argu = {};
            this.$router.push({
                name: 'applyDetail',
                query: argu
            });
        },
        handler(name, active) {
            console.log(`Status of switch ${name} is ${active ? 'active' : 'inactive'}`)
        },
        getGoodslist(flag) {
            const params = {};
            params.pageNumber = this.page;
            params.pageSize = this.pageSize;
            params.queryType = this.type;
            if (this.queryType * 1 == 2) {
                params.isUsable = this.isActive2 ? 1 : undefined;
            } else {
                params.isShield = this.isActive ? 1 : undefined;
            }
            this.$axios.post(recipeApplyRenewRecipe, params).then((res) => {
                if (res.data.rows) {
                    this.loadingtrue = false;
                    if (flag) {
                        this.goodsList = this.goodsList.concat(res.data.rows);  //concat数组串联进行合并
                        if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                            this.busy = false;
                            this.nomore = false;
                        } else {
                            this.busy = true;
                            this.nomore = true;
                        };
                    } else {
                        this.goodsList = res.data.rows;
                        this.busy = true;
                        if (res.data.total < 10) {
                            this.busy = true;
                            this.nomore = true;
                        } else {
                            this.busy = false;
                            this.nomore = false;
                        }
                    }
                } else {
                    this.goodsList = []
                }
            })
        },



    }
};
</script>
<style  scoped>
@import "inspectionCheck.css";
</style>

