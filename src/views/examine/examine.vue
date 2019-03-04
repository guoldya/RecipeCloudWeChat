<template>
    <div class="examine">
        <Header post-title="检验检查" v-show="isWeixin"></Header>
        <div :class="{'outCarint':true,'margin45':isWeixin,'margin7':!isWeixin}">
            <!--<div class="pageContent">-->
                <!--<span v-for="(item, index) in changeTitle" :key="'changeTitle' + index" @click="switchTo(item.type,index)" :class="titleIndex === index ? 'appTabAcitive' : '' ">-->
                    <!--{{item.title}}-->
                <!--</span>-->
            <!--</div>-->
            <div v-if="examineData.length!=0" v-show="!loadingtrue">
                <div class="card margin16" v-for="(item,i) in examineData" :key="i">
                    <div class="cardText">
                        <div class="listData">
                            <span>{{item.patientName}}（{{item.className}}）</span>
                            <span>{{nowDate}}</span>
                        </div>
                        <p style="border-bottom: 1px solid #e9e9e9;margin: 6px 0px"></p>
                        <div class="listData">
                            <span>开单时间：
                                <span class="mu-secondary-text-color">{{item.createTime}}</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>科室：
                                <span class="mu-secondary-text-color">{{item.examDept}}（{{item.hospital}}）</span>
                            </span>
                        </div>
                        <div class="nowOrder" @click="rightNowOrder(item.id)">
                            <span>立即预约</span>
                        </div>
                        <div style="clear: both"></div>
                    </div>

                </div>
                <p v-show="nomore" class="noMore">没有更多数据了</p>
            </div>
            <div v-show="!loadingtrue" class="nullDiv" v-else>
                <img src="@/assets/images/null1.png">
            </div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="clearfix">
                <span v-if="examineData.length!=0&&!nomore">
                    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                </span>
            </div>
            <Loading v-show="loadingtrue"></Loading>
        </div>
    </div>
</template>
<script type="text/babel">
    let bizExamApplyreadpage = '/app/bizExamApply/read/page';
    export default {
        data() {
            return {
                isWeixin: false,
                // changeTitle: [
                //     { title: '预约项目',type: 1 },
                //     { title: '预约记录',type:2 },
                // ],
                // titleIndex: 0,
                examineData:[],
                orderRecord:[],
                TOKEN: '',
                UUID: '',
                nowDate:"",
                pageSize:10,
                page:1,
                loadingtrue: true,
                busy: true,
                nomore: false,
                status:0,
                isTime:"",
            };
        },
        created() {

        },
        mounted() {
            let _this = this;
            this.examineFun(false);
            document.title = '检验检查';
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.isWeixin = false;
                return true;
            } else {
                this.isWeixin = true;
                return false;
            }
            let Request = new UrlSearch(); //实例化
            this.TOKEN = Request.TOKEN;
            this.UUID = Request.UUID;


        },
        methods: {
            examineFun(flag){
                    const params = {};
                    params.pageNumber = this.page;
                    params.pageSize = this.pageSize;
                    params.status=this.status;
                    this.$axios.put(bizExamApplyreadpage, params).then((res) => {
                        if (res.data.rows) {
                            this.loadingtrue = false;
                            if (flag) {
                                this.examineData = this.examineData.concat(res.data.rows);  //concat数组串联进行合并
                                if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                                    this.busy = false;
                                    this.nomore = false;
                                } else {
                                    this.busy = true;
                                    this.nomore = true;
                                };
                            } else {
                                this.examineData = res.data.rows;
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
                            this.examineData = []
                        }
                    })
            },
            switchTo(data,num) {
                this.examineData = [];
                this.page = 1;
                this.loadingtrue = true;
                this.examineFun();
            },
            rightNowOrder(val){
                let argu = {classId:val};
                this.$router.push({
                    name: 'examineOrder',
                    query: argu
                });
            },
            loadMore() {
                this.busy = true;  //将无限滚动给禁用
                setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                    this.page++;  //滚动之后加载第二页
                    this.examineFun(true);
                }, 500);
            },
        },
        computed: {

        },

    };
</script>
<style   scoped>
    .examine .nowOrder{
        float: right;
        font-size: 28px;
        display: flex;
    }
    .examine .nowOrder span{
        font-size: 24px;
        color: #ffffff;
        background: #1da1f3;
        border-radius: 40px;
        letter-spacing: 1px;
        padding: 15px 40px;
        text-align: center;
    }
    .examine .listData span{
        padding: 8px 0px;
    }
</style>