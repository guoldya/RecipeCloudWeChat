<template>
    <div class="examine">
        <Header post-title="检验检查" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div class="pageContent">
                <span v-for="(item, index) in changeTitle" :key="'changeTitle' + index" @click="switchTo(index)" :class="titleIndex === index ? 'appTabAcitive' : '' ">
                    {{item.title}}
                </span>
            </div>
            <div class="outCarint" v-if="titleIndex==0">
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
                        <div class="nowOrder" @click="rightNowOrder">
                            <span>立即预约</span>
                        </div>
                        <div style="clear: both"></div>
                    </div>

                </div>
            </div>
            <div class="outCarint" v-if="titleIndex===1">
                <div class="card margin16" v-for="(item,i) in orderRecord" :key="i">
                    <div class="cardText">
                        <div class="listData">
                            <span>{{item.patientName}}（{{item.className}}）</span>
                            <span class="mu-secondary-text-color">{{item.status | statusFilter}}</span>
                        </div>
                        <p style="border-bottom: 1px solid #e9e9e9;margin: 6px 0px"></p>
                        <div class="listData">
                            <span>预约科室：
                                <span class="mu-secondary-text-color">{{item.examDept}}（{{item.hospital}}）</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>预约项目：
                                <span class="mu-secondary-text-color">{{item.className}}</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>预约日期：
                                <span class="mu-secondary-text-color">{{item.serialTime}}</span>
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    let bizExamApplyreadpage = 'app/bizExamApply/read/page';
    export default {
        data() {
            return {
                isWeixin: false,
                changeTitle: [
                    { title: '预约项目' },
                    { title: '预约记录' },
                ],
                titleIndex: 0,
                examineData:[],
                orderRecord:[],
                TOKEN: '',
                UUID: '',
                nowDate:"",
                pageSize:10,
                page:1,
                type:1,
                loadingtrue: true,
                busy: true,
                nomore: false,
            };
        },
        filters:{
            statusFilter: function (value) {
                if(value=="1"){
                    return "已预约"
                }else if(value=="2"){
                    return "已检查"
                }else if(value=="3"){
                    return "检查中"
                }
            },

        },
        created() {

        },
        mounted() {
            let _this = this;
            this.$axios.put(bizExamApplyreadpage,{status:0,pageSize:this.pageSize,pageNumber:this.page},{
                headers: {
                    'TOKEN': `edd169b85704410aa5219512cb6f1f00`,
                    'UUID': `AAA`
                },
            }).then((res) => {
                if (res.data.code == '200') {
                    this.examineData=res.data.rows;
                }
            }).catch(function (err) {
                console.log(err);
            });

            this.$axios.put(bizExamApplyreadpage,{applyRecord:'Y',pageSize:this.pageSize,pageNumber:this.page},{
                headers: {
                    'TOKEN': `edd169b85704410aa5219512cb6f1f00`,
                    'UUID': `AAA`
                },
            }).then((res) => {
                if (res.data.code == '200') {
                    this.orderRecord=res.data.rows;
                }
            }).catch(function (err) {
                console.log(err);
            });
            let myDate = new Date();
            let month=myDate.getMonth();
            let day=myDate.getDate();
            month = month <= 9 ? "0" +(month+1) : (month+1);
            day = day<= 9 ? "0" + day : day;

            this.nowDate=myDate.getFullYear()+'-'+month+'-'+day;

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
            // examineFun(){
            //         const params = {};
            //         params.pageNumber = this.page;
            //         params.pageSize = this.pageSize;
            //         params.type = this.type;
            //         this.$axios.put(bizLisReportreadpage, params).then((res) => {
            //             if (res.data.rows) {
            //                 this.loadingtrue = false;
            //                 if (flag) {
            //                     this.examineData = this.examineData.concat(res.data.rows);  //concat数组串联进行合并
            //                     if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
            //                         this.busy = false;
            //                         this.nomore = false;
            //                     } else {
            //                         this.busy = true;
            //                         this.nomore = true;
            //                     };
            //                 } else {
            //                     this.examineData = res.data.rows;
            //                     this.busy = true;
            //                     if (res.data.total < 10) {
            //                         this.busy = true;
            //                         this.nomore = true;
            //                     } else {
            //                         this.busy = false;
            //                         this.nomore = false;
            //                     }
            //                 }
            //             } else {
            //                 this.examineData = []
            //             }
            //         })
            // },
            switchTo(num) {
                this.titleIndex = num;
                // this.type = data;
                // this.examineData = [];
                // this.page = 1;
                // this.loadingtrue = true;
                // this.examineFun(false);
            },
            rightNowOrder(){
                let argu = {};
                this.$router.push({
                    name: 'examineOrder',
                    query: argu
                });
            }
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