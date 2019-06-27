<template>
    <div class="reportquery outCarint">
        <Header post-title="报告查询"></Header>
        <div class="margin100">
            <div class="reportqueryTab">
                <Apptab :tab-title="departs" v-on:childByValue="childByValue"></Apptab>
                <Timefilter v-on:childByTime="childByTime" type="payfeerecord" v-show="!$route.query.clinicNo" />
            </div>
            <div class="reportqueryTabDIV" v-show="!$route.query.clinicNo"></div>
            <div style="height:1.4rem" v-show="$route.query.clinicNo"></div>
            <div v-if="waitPayData.length!=0" v-show="!loadingtrue">
                <div class="reportqueryList" v-for="(item,i) in waitPayData" :key="i" @click="checkReportDetail(item.id)">
                    <div class="reportqueryName">
                        <p>{{item.name}}</p>
                    </div>
                    <div class="reportqueryContent">
                        <div class="reportqueryContentRight">
                            <p>
                                <span class="sonTitle">{{noDataTitle}}科室：</span>
                                <span class="sonContent">{{item.execDept}}</span>
                            </p>
                            <p>
                                <span class="sonTitle">{{noDataTitle}}项目：</span>
                                <span class="sonContent" v-if="queryType ==2">{{item.itemName}}</span>
                                <span class="sonContent" v-if="queryType == 1">{{item.type}}</span>
                            </p>
                            <p>
                                <span class="sonTitle">报告日期：</span>
                                <span class="sonContent">{{item.reportTime|lasttime}}</span>
                            </p>
                        </div>
                        <div class="ContentNumber">
                            <span class="RightNumber" v-show="item.readFlag==0"></span>
                            <img src="@/assets/images/icon_more.png" alt="">
                        </div>
                    </div>
                </div>
                <p v-show="nomore" class="noMore">没有更多数据了</p>
            </div>
            <div v-show="!loadingtrue" class="aligncenter" style="margin:76px 0" v-else>
                <img src="@/assets/images/null_hosi.png" >
                <p class="nullTEXT">您{{timeClass|timeFilter}}没有{{noDataTitle}}记录</p>
            </div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
                <span v-if="waitPayData.length!=0&&!nomore">
                    <span class="mu-light-text-color">加载中</span>
                    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                </span>
            </div>
            <Loading v-show="loadingtrue"></Loading>
        </div>
    </div>
</template>
<script type="text/babel">
let bizLisReportreadpage = '/api/hos/bizLisReport/read/page';
let bizPatientCard = "/api/hos/bizPatientCard/read/list";
let selectUnReadTotal = "/api/hos/bizLisReport/selectUnReadTotal";
export default {
    data() {
        return {
            departs: [
                { title: '检查报告', type: 1, unReadTotal: 0, loading: true },
                { title: '检验报告', type: 2, unReadTotal: 0, loading: true },
            ],
            noDataTitle: "检查",
            waitPayData: [],
            timeClass: 1,
            queryType: 1,
            page: 1,
            pageSize: 10,
            busy: true,
            nomore: false,
            loadingtrue: true,
        };
    },
    created() {
        if (sessionStorage.getItem('feeActiveFun')) {
            this.queryType = sessionStorage.getItem('feeActiveFun') * 1;
            if (sessionStorage.getItem('feeActiveFun') * 1 == 1) {
                this.noDataTitle = "检查"
            } else {
                this.noDataTitle = "检验"

            }
        }
    },
    async mounted() {
        await this.WaitPay(false);
        if (!this.$route.query.clinicNo) {
            this.getUnReadTotal();
        }

    },
    watch: {
        queryType: function (val, oldval) {
            this.page = 1;
            this.waitPayData = [];
            this.loadingtrue = true;
            this.departs[0].loading = true;
            this.WaitPay(false);
        },
        timeClass: function (vallevel, oldlevel) {
            this.page = 1;
            this.waitPayData = [];
            this.loadingtrue = true;
            this.departs[0].loading = true;
            this.WaitPay(false);
            this.getUnReadTotal();
        },

    },
    methods: {
        childByValue: function (childValue) {
            this.queryType = childValue.type;
            this.noDataTitle = childValue.title.substring(0, 2);
            sessionStorage.setItem('feeActiveFun', childValue.type)
        },
        childByTime: function (childByTime) {
            this.timeClass = childByTime.timeClass;
            console.log(childByTime, "我是父组件")
        },

        async  getUnReadTotal() {
            const params = {};
             params.timeClass = this.$route.query.clinicNo? undefined : this.timeClass;
            params.queryType = this.queryType;
            try {
                let res = await this.$axios.put(selectUnReadTotal, params);
                if (res.data.code != 200) {
                    throw Error(res.data.msg);
                }
                if (res.data.data) {
                    this.departs[0].unReadTotal = res.data.data.pacsReportCount;
                    this.departs[1].unReadTotal = res.data.data.lisReportCount;
                }

            } catch (error) {
                console.log(error.message);
            }
        },
        async  WaitPay(flag) {
            const params = {};
            params.pageNumber = this.page;
            params.pageSize = this.pageSize;
            params.queryType = this.queryType;
            params.clinicNo = this.$route.query.clinicNo ? this.$route.query.clinicNo : undefined;
            params.timeClass = this.$route.query.clinicNo? undefined : this.timeClass;
            this.$axios.put(bizLisReportreadpage, params).then((res) => {
                if (res.data.code == 200) {
                    this.departs[0].loading = false;
                    this.loadingtrue = false;
                    if (res.data.rows) {
                        if (flag) {
                            this.waitPayData = this.waitPayData.concat(res.data.rows);  //concat数组串联进行合并
                            if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                                this.busy = false;
                                this.nomore = false;
                            } else {
                                this.busy = true;
                                this.nomore = true;
                            }
                        } else {
                            this.waitPayData = res.data.rows;
                            this.busy = true;
                            if (res.data.total < 10) {
                                this.busy = true;
                                this.nomore = true;
                            } else {
                                this.busy = false;
                                this.nomore = false;
                            }
                        }
                        //2、
                    } else {
                        this.waitPayData = []
                    }
                }

            })
        },

        loadMore() {
            this.busy = true;  //将无限滚动给禁用
            setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                this.page++;  //滚动之后加载第二页
                this.WaitPay(true);
            }, 500);
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
        intoreportinfo() {
            let argu = {};
            this.$router.push({
                name: 'reportinfo',
                query: argu
            });
        },

    },

};
</script>
<style   scoped>
@import url("./reportquery.css");
.reportqueryTab {
  z-index: 99;
  background: #f8f8f8;
  position: fixed;
  width: 100%;
  padding: 20px 0;
}
.reportqueryTabDIV {
  height: 188px;
}
</style>