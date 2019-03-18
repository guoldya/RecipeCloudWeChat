<template>
    <div class="reportquery">
        <header class="aui-navBar aui-navBar-fixed">
            <span href="javascript:;" class="aui-navBar-item" @click="$router.go(-1)">
                <img src="@/assets/images/icon_back.png">
            </span>
            <div class="aui-center">
                <span class="aui-center-title">报告查询</span>
            </div>
            <!--<span class="aui-navBar-item">-->
            <!--<div>-->
            <!--<md-field>-->
            <!--<md-field-item :content="selectorValue" @click="showSelector" solid/>-->
            <!--</md-field>-->
            <!--<md-selector v-model="isSelectorShow" default-value="7" :data="optionsData" max-height="320px" title="选择姓名" @choose="onSelectorChoose"></md-selector>-->
            <!--</div>-->
            <!--<span class="downImg"><img src="@/assets/images/icon_down.png"></span>-->
            <!--</span>-->
        </header>
        <div class="outCarint margin45">
            <!-- <div class="appTab">
                <span v-for="(item, index) in departs" :key="'departs' + index" @click="switchTo(item,index)" :class="active1 === index ? 'appTabAcitive' : '' ">
                    {{item.title}}
                </span>
            </div> -->

            <Apptab :tab-title="departs" v-on:childByValue="childByValue"></Apptab>
            <div v-if="goodsList.length!=0" v-show="!loadingtrue">
                <div class="card margin16" v-for="(item,i) in goodsList" :key="i">
                    <div class="cardText" @click="checkReportDetail(item.id)">
                        <div class="cardTextLeft">
                            <div class="listData">
                                <span>{{item.name}}</span>
                            </div>
                            <p class="partLine"></p>
                            <p>检查科室：{{item.execDept}}</p>
                            <p>检查项目：{{item.itemName}}</p>
                            <div>
                                <p>报告日期：{{item.reportTime}}</p>
                                <div class="cardTextRight" @click="checkReportDetail(item.id)">
                                    <span>详情</span>
                                    <img class="icon_more" src="@/assets/images/icon_more.png" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <p v-show="nomore" class="noMore">没有更多数据了</p>
            </div>
            <div v-show="!loadingtrue" class="nullDiv" v-else>
                <!--<img src="@/assets/images/null1.png">-->
                <p>您近三个月没有{{noDataTitle}}记录</p>
            </div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="clearfix">
                <span v-if="goodsList.length!=0&&!nomore">
                    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                </span>
            </div>
            <Loading v-show="loadingtrue"></Loading>
        </div>
    </div>
</template>
<script type="text/babel">
let bizLisReportreadpage = '/app/bizLisReport/read/page';
let bizPatientCard = "/app/bizPatientCard/read/list";
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
            type: 1,
            date: undefined,
            isWeixin: false,
            active1: 0,
            reportactive1: 0,
            departs: [
                { title: '检查报告', type: 1 },
                { title: '检验报告', type: 2 },
            ],
            isSelectorShow: false,
            optionsData: [],
            selectorValue: '',
            reportTime: [
                { title: '本周' },
                { title: '半年' },
                { title: '今年' },
            ],
            TOKEN: '',
            UUID: '',
            choseValue: '',
            list: [],
            listInfo: [],
            noDataTitle: "检查报告",
        };
    },
    created() {
        if (this.$store.state.feeActiveId) {
            this.type = this.$store.state.feeActiveId
        }
    },
    mounted() {
        //this.personFun();

        this.getGoodslist(false);
        document.title = '报告查询';
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.isWeixin = false;
        } else {
            this.isWeixin = true;
        }

    },
    methods: {
        personFun() {
            this.$axios.put(bizPatientCard, {
            }).then(res => {
                if (res.data.code == '200') {
                    this.choseValue = res.data.rows[0].id;
                    for (let i = 0; i < res.data.rows.length; i++) {
                        for (let j = 0; j < res.data.rows[i].list.length; j++) {
                            this.selectorValue = res.data.rows[0].list[0].patientName;
                            this.cardNo = res.data.rows[0].list[0].cardNo;
                            let neslist = {
                                text: res.data.rows[i].list[j].patientName,
                                value: res.data.rows[i].list[j].cardNo,
                                id: res.data.rows[i].id,

                            };
                            this.optionsData.push(neslist);
                        }
                    }
                } else if (res.data.code == '800') {

                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        getGoodslist(flag) {
            const params = {};
            params.pageNumber = this.page;
            params.pageSize = this.pageSize;
            params.patientId = parseInt(this.choseValue);
            params.queryType = this.type;
            this.$axios.put(bizLisReportreadpage, params).then((res) => {
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
        checkReportDetail(val) {
            this.$router.push({
                name: 'reportinfo',
                query: { id: val },
            });
        },
        collectReportDetail(val) {
            this.$router.push({
                name: 'reportinfo',
                query: { id: val },
            });
        },
        // switchTo(item, num) {
        //     this.active1 = num;
        //     this.type = item.type;
        //     this.noDataTitle = item.title;
        //     this.goodsList = [];
        //     this.page = 1;
        //     this.loadingtrue = true;
        //     this.getGoodslist();
        // },

        childByValue: function (childValue) {
            this.type = childValue.type;
            this.noDataTitle = childValue.title;
            this.$store.commit('feeActiveFun', childValue.type);
            this.goodsList = [];
            this.loadingtrue = true;
            this.page = 1;
            this.getGoodslist();
        },
        showSelector() {
            this.isSelectorShow = true
        },
        onSelectorChoose({ text, value, id }) {
            this.selectorValue = text;
            this.choseValue = id;
            this.getGoodslist(false);
        },
        intoreportinfo() {
            let argu = {};
            this.$router.push({
                name: 'reportinfo',
                query: argu
            });
        },


        loadMore() {
            this.busy = true;  //将无限滚动给禁用
            setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                this.page++;  //滚动之后加载第二页
                this.getGoodslist(true);
            }, 500);
        },

    },
    
};
</script>
<style   scoped>
@import url("./reportquery.css");
</style>