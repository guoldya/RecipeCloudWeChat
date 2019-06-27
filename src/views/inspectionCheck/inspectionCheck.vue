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
            </div>
            <div v-if="titleIndex === 2">
                <div class="flatCard rightflatCard" style="margin-top: 0">
                    <div>
                        <ul class="hog-chart-tab">
                            <li v-for="(item2,index2) in tabTime" @click="selectStyle(item2)" :class="{ 'chart-button' : item2.value == isTime}" :key="index2+'aa'">{{item2.label}} </li>
                        </ul>
                    </div>
                    <div class="rightflatCardBtn">
                        <span>仅看通过</span>
                        <div>
                            <md-switch v-model="isActive2" @change="handler2('switch0', isActive2, $event)"></md-switch>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="goodsList.length!=0 ">
                <div v-show="!loadingtrue" class="flatCard cardText margin5" v-for="(item,i) in goodsList" :key="i+'i'">
                    <div v-if="titleIndex === 1" class="insCheck-cotent">
                        <div class="parElem listData">
                            <span class="sonElem">处方日期
                                <span class="firstdoct" v-show="item.firstDiag==1">首诊</span>
                            </span>
                            <span>
                                <span>{{item.recipeDate|lasttime}}</span>
                                <span v-if="item.first==1" style="margin-left: 14px" class="first mu-secondary-text-color">首诊</span>
                            </span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">慢病诊断</span>
                            <span>{{item.diag}}</span>
                        </div>

                        <div class="parElem listData">
                            <span class="sonElem">剩余续方日期</span>
                            <span>{{item.restDate}}日</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">续方次数</span>
                            <span class="mu-secondary-text-color">{{item.renewalMum}}次</span>
                        </div>
                        <div>
                            <md-button type="primary" round v-if="item.renewaType ==1" @click="continueApply(item)">续方申请</md-button>
                            <md-button type="default" round v-else @click="continueApply(item)">续方失效</md-button>
                        </div>
                    </div>
                    <div v-if="titleIndex === 2" class="insCheck-cotent">
                        <div class="parElem listData">
                            <span class="sonElem">姓名</span>
                            <span>{{item.name}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">申请日期</span>
                            <span>{{item.createTime|lasttime}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">慢病诊断</span>
                            <span>{{item.diag}}</span>
                        </div>
                        <!-- <div class="listData">
                            <span>续方日期</span>
                            <span class="mu-secondary-text-color">{{item.continueDate}}</span>
                        </div> -->
                        <!-- <div class="listData">
                            <span>慢病诊断</span>
                            <span class="mu-secondary-text-color">{{item.type}}</span>
                        </div> -->
                        <div class="parElem listData">
                            <span class="sonElem">处理状态</span>
                            <span>{{item.auditState|recipeTypeFilter}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">续方次数</span>
                            <span>{{item.renewalMum}}</span>
                        </div>
                        <div>
                            <md-button type="primary" round v-if="isContinue==true" @click="lookDetail(item)">查看详情</md-button>
                        </div>
                    </div>

                </div>
                <div class="cardText margin5">
                    <p v-show="nomore" class="noMore">没有更多数据了</p>
                </div>
            </div>

          <Null :loading-true="!loadingtrue "></Null>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
                <span v-if="goodsList.length!=0&&!nomore">
                    <span class="mu-light-text-color">加载中</span>
                    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                </span>
            </div>
            <Loading v-show="loadingtrue"></Loading>
        </div>
    </div>
</template>
 
<script type="text/babel">
let recipeApplyRenewRecipe = "/api/hos/bizRecipeApply/read/page";
export default {
    data() {
        return {
            isTime: 2,
            tabTime: [{
                label: '本月',
                value: 2,
            }, {
                label: '近半年',
                value: 3,
            }, {
                label: '近一年',
                value: 4,
            }],
            busy: true,
            nomore: false,
            loadingtrue: true,
            goodsList: '',
            pageNumber: 1,
            page: 1,
            pageSize: 10,
            departs: [
                { title: '申请记录', type: 1 },
                { title: '历史记录', type: 2 },
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
        selectStyle(item) {
            this.isTime = item.value;
            this.goodsList = [];
            this.loadingtrue = true;
            this.page = 1;
            this.getGoodslist();
        },
        handler(name, active) {
            this.goodsList = [];
            this.loadingtrue = true;
            this.page = 1;
            this.getGoodslist();
        },
        handler2(name, active) {
            this.goodsList = [];
            this.loadingtrue = true;
            this.page = 1;
            this.getGoodslist();
        },
        childByValue: function (childValue) {
            this.titleIndex = childValue.type;
            this.$store.commit('feeActiveFun', childValue.type);
            this.goodsList = [];
            this.loadingtrue = true;
            this.page = 1;
            this.getGoodslist();
        },
        continueApply(data) {
            let argu = { id: data.recipeId, renewaType: data.renewaType };
            this.$router.push({
                name: 'recipeDetail',
                query: argu
            });
        },
        lookDetail(data) {
            let argu = { id: data.recipeId, renewaType: data.renewaType };
            this.$router.push({
                name: 'applyDetail',
                query: argu
            });
        },

        getGoodslist(flag) {
            const params = {};
            params.pageNumber = this.page;
            params.pageSize = this.pageSize;
            // params.queryType = this.type;
            if (this.titleIndex * 1 == 2) {
                params.status = this.isActive2 ? 2 : undefined;
                params.open = this.isTime
            } else {
                params.open = this.isActive ? 1 : undefined;
            }
            this.$axios.put(recipeApplyRenewRecipe, params).then((res) => {
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
        loadMore() {
            this.busy = true;  //将无限滚动给禁用
            setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                this.page++;  //滚动之后加载第二页
                this.getGoodslist(true);
            }, 500);
        },


    }
};
</script>
<style  scoped>
@import "inspectionCheck.css";
</style>

