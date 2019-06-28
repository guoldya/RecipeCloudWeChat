<template>
    <div class="examine">
        <Header post-title="检验检查"></Header>
        <div class="margin55">
            <!--<div class="pageContent">-->
                <!--<span v-for="(item, index) in changeTitle" :key="'changeTitle' + index" @click="switchTo(item.type,index)" :class="titleIndex === index ? 'appTabAcitive' : '' ">-->
                    <!--{{item.title}}-->
                <!--</span>-->
            <!--</div>-->
            <div v-if="examineData.length!=0" v-show="!loadingtrue">
                <div class="flatCard" v-for="(item,i) in examineData" :key="i">
                    <div class="appTitle">
                        <span>{{item.patientName}}（{{item.className}}）</span>
                        <span>{{nowDate}}</span>
                    </div>
                    <div class="cardText alignJ">
                        <div class="parElem listData">
                            <span class="sonElem">科室</span>
                            <span class="mu-light-text-color">{{item.examDept}}（{{item.hospital}}） </span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">开单时间</span>
                            <span class="mu-secondary-text-color">{{item.createTime}}</span>
                        </div>
                        <div class="payatnow"  @click="rightNowOrder(item.classId,item.id)">
                            <span>立即预约</span>
                        </div>
                    </div>
                </div>
                <p v-show="nomore" class="noMore">没有更多数据了</p>
            </div>
           <Null :loading-true="!loadingtrue "></Null>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
                <span v-if="examineData.length!=0&&!nomore">
                    <span class="mu-light-text-color">加载中</span>
                    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                </span>
            </div>
            <Loading v-show="loadingtrue"></Loading>
        </div>
    </div>
</template>
<script type="text/babel">
    let bizExamApplyreadpage = '/api/hos/bizExamManage/selectBizExamApplyPage';
    export default {
        data() {
            return {
                
                // changeTitle: [
                //     { title: '预约项目',type: 1 },
                //     { title: '预约记录',type:2 },
                // ],
                // titleIndex: 0,
                examineData:[],
                orderRecord:[],
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
            this.examineFun(false);
            document.title = '检验检查';
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
                            let myDate = new Date();
                            let year = myDate.getFullYear();
                            let month = myDate.getMonth() + 1;
                            let day = myDate.getDate();
                            month = month <= 9 ? "0" + month : month;
                            day = day <= 9 ? "0" + day : day;
                            this.nowDate=year+"-"+month+"-"+day;
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
            rightNowOrder(val,id){
                console.log(id);
                console.log(val);
                let argu = {id:id,classId:val};
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
    .examine .flatCard{
        border-top: none;
    }
</style>