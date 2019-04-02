<template>
    <div class="reportinfo">
        <Header :post-title="postTitle"  ></Header>
        <div v-if="reportInfoData.length!=0" class="margin55" v-for="(item,i) in reportInfoData" :key="i">
            <div v-if="feeActiveId==1"  v-show="!loadingtrue">
                <div class="flatCard">
                    <div class="cardText alignJ">
                        <div class=" parElem">
                            <span class="sonElem">姓名</span>
                            <span>{{item.name}}</span>
                        </div>
                        <div class=" parElem">
                            <span class="sonElem">性别</span>
                            <span>{{item.sex}}</span>
                        </div>
                        <div class=" parElem">
                            <span class="sonElem">检查科室</span>
                            <span>{{item.execDept}} </span>
                        </div>
                        <div class=" parElem">
                            <span class="sonElem">申请时间</span>
                            <span>{{item.applyTime}} </span>
                        </div>
                        <div class=" parElem">
                            <span class="sonElem">检查类别</span>
                            <span>{{item.type}} </span>
                        </div>
                        <div class=" parElem">
                            <span class="sonElem">检查子类</span>
                            <span>{{item.subType}} </span>
                        </div>
                        <div class=" cardTextBor parElem">
                            <span class="sonElem">检查项目</span>
                            <span>{{item.itemName}}</span>
                        </div>
                        <div class=" cardTextBor parElem">
                            <span class="sonElem">报告时间</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                    </div>
                </div>
                <div class="flatCard margin5 cardBottom">
                    <div class="cardText alignJ">
                        <div class="cardTextPP parElem">
                            <span class="sonElem">检查参数</span>
                            <span style="width: 78%">{{item.param}}</span>
                        </div>
                        <div class="cardTextPP parElem">
                            <span class="sonElem"> 检查所见</span>
                            <span style="width: 78%">{{item.findings}}</span>
                        </div>
                        <div class="cardTextPP parElem">
                            <span class="sonElem"> 印象</span>
                            <span style="width: 78%;">{{item.impression}}</span>
                        </div>
                        <div class="cardTextPP parElem">
                            <span class="sonElem"> 建议</span>
                            <span style="width: 78%;">{{item.advise}}积三分hi师傅师傅和和fish粉丝发十分十分十分十分十分火山凤凰</span>
                        </div>
                        <div class="cardTextPP parElem">
                            <span class="sonElem">备注</span>
                            <span style="width: 78%">{{item.remark}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="feeActiveId==2"  v-show="!loadingtrue">
                <div class="flatCard">
                    <div class="cardText alignJ">
                        <div class="parElem">
                            <span class="sonElem">姓名</span>
                            <span>{{item.name}}</span>
                        </div>
                        <div class="parElem">
                            <span class="sonElem">性别</span>
                            <span>{{item.sex}}</span>
                        </div>
                        <div class=" parElem">
                            <span class="sonElem">年龄</span>
                            <span>{{item.age}}岁</span>
                        </div>
                        <div class="parElem">
                            <span class="sonElem">科别</span>
                            <span>{{item.execDept}}</span>
                        </div>
                        <div class=" parElem">
                            <span class="sonElem">收样日期</span>
                            <span>{{item.applyTime}}</span>
                        </div>
                        <div class="parElem">
                            <span class="sonElem">标本类型</span>
                            <span>{{item.sampleType}}</span>
                        </div>
                        <div class="parElem">
                            <span class="sonElem">送检项目</span>
                            <span>{{item.itemName}}</span>
                        </div>
                        <div class="parElem">
                            <span class="sonElem">报告时间</span>
                            <span>{{item.reportTime}}</span>
                        </div>
                        <div class="cardTextPP parElem">
                            <span class="sonElem">临床诊断</span>
                            <span style="width: 78%">{{item.diag}}</span>
                        </div>
                    </div>
                </div>
                <div class="flatCard margin5">
                    <div class="cardText">
                        <div class="cardTextKind spanWid">
                            <span style="text-align: left">项目名称</span>
                            <span>结果值</span>
                            <span>单位</span>
                            <span style="text-align: right">参考值</span>
                        </div>
                        <div class="cardTextPP spanWid arrow" v-for="(item,i) in reportResult">
                            <span>{{item.itemName}}</span>
                            <span>{{item.itemValue}}

                                <span>{{item.contrast}}</span>
                            </span>
                            <span>{{item.unit}}</span>
                            <span>{{item.referenceValue}}</span>
                        </div>
                    </div>
                </div>
                <p class="noMore">注意：此结果仅供参考,最终结果以医院打印报告为准。</p>
            </div>
        </div>
        <Loading v-show="loadingtrue"></Loading>
        <!--<div class="cardTextPP alignJ">-->
            <!--<div class="parElem" style="display: flex;justify-content: space-between;align-items: center;flex-direction: unset">-->
                <!--<span class="sonElem">检查参数</span>-->
                <!--<span style="width:78%;">您牛牛牛牛牛牛牛牛您牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛牛您牛牛牛牛牛牛牛牛牛牛牛</span>-->
            <!--</div>-->
            <!--<div class="parElem" style="display: flex;justify-content: space-between;align-items: center;flex-direction: unset">-->
                <!--<span class="sonElem">检数</span>-->
                <!--<span style="width:78%;">牛牛牛牛牛牛牛您牛牛牛牛牛牛牛牛牛牛牛</span>-->
            <!--</div>-->
        <!--</div>-->
    </div>

</template>
<script  >
let bizbizPacsReportreaddetail = '/app/bizPacsReport/read/detail';
let bizLisReportreaddetail = '/app/bizLisReport/read/detail';
export default {
    data() {
        return {
            
            normal: {
                checkbox: true,
                radio: 1,
                switch: false
            },
            time: [
                { title: '待支付' },
                { title: '预约成功' },
                { title: '预约关闭' }
            ],
            reportInfoId: '',
            collectInfoId: '',
            reportInfoData: [],
            reportResult: [],
            pageSize: 10,
            pageNumber: 1,
            feeActiveId: '',
            postTitle: '',
            before: [],
            after: [],
            loadingtrue: true,
        };
    },

    created() {

    },
    mounted() {
        this.feeActiveId = this.$store.state.feeActiveId;
        if (this.$store.state.feeActiveId == 1) {
            this.checkReportDetail();
            this.postTitle = "检查报告详情";
            document.title = '检查报告详情';
        } else if (this.$store.state.feeActiveId == 2) {
            this.collectReportDetail();
            this.postTitle = "检验报告详情";
            document.title = '检验报告详情';
        }
          
    },
    methods: {
        payment() {
            this.$router.push({
                name: 'payment',
            });
        },
        setStyle(rowIndex, row) {
            if (row.id === this.currentRow.id) {
                return 'background-color:#ddd'
            } else {
                return 'background-color:#abc'
            }
        },
        checkReportDetail() {
            let _this = this;
            this.reportInfoId = this.$route.query.id;
            let checkParams = {};
            checkParams.id = parseInt(this.reportInfoId);
            checkParams.pageSize = this.pageSize;
            checkParams.pageNumber = this.pageNumber;
            this.$axios.put(bizbizPacsReportreaddetail, checkParams, {
            }).then((res) => {
                if (res.data.code == '200') {
                    this.loadingtrue = false;
                    this.reportInfoData.push(res.data.data);
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        collectReportDetail() {
            let _this = this;
            this.collectInfoId = this.$route.query.id;
            this.$axios.put(bizLisReportreaddetail, { id: parseInt(this.collectInfoId), pageSize: this.pageSize, pageNumber: this.pageNumber }, {
            }).then((res) => {
                if (res.data.code == '200') {
                    this.loadingtrue = false;
                    this.reportInfoData.push(res.data.data);
                    this.reportResult = res.data.data.details;
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
    },
    beforeRouteLeave(to, from, next) {
        if (to.path == "/reportquery") {
            to.meta.keepAlive = true;
            //this.$destroy();
        } else {
            to.meta.keepAlive = false;
            //this.$destroy();
        }
        next();
    },
    computed: {
    },
};
</script>
 <style   scoped>
    .reportinfo .cardText .cardTextPP {
      display: flex;
      justify-content: space-between;
      font-size: 28px;
        align-items: center;
    }
    .reportinfo .cardText .cardTextPP:last-child,
    .reportinfo .cardText .cardTextBor {
      border: none;
    }
    .reportinfo .cardText .cardTextKind {
      display: flex;
      justify-content: space-between;
      padding: 28px 0;
      font-size: 27px;
      border-bottom: 1px solid #e9e9e9;
      font-weight: 700;
        margin-bottom: 28px;
    }
    .reportinfo .spanWid span {
      display: inline-block;
      word-break: normal;
      white-space: pre-wrap;
      word-wrap: break-word;
      overflow: hidden;
      text-align: center;
    }

    .reportinfo .spanWid span:first-child {
      width: 28%;
      text-align: left;
    }
    .reportinfo .spanWid span:nth-child(2) {
      width: 28%;
    }
    .reportinfo .arrow span:nth-child(2) span{
       color: red;
        display: flex;
        position: relative;
        left: 140px;
        top: -122px;
    }
    .reportinfo .spanWid span:nth-child(3) {
      width: 20%;
    }
    .reportinfo .spanWid span:last-child {
      width: 20%;
      text-align: right;
    }
     .reportinfo .flatCard{
         border-top: none;
     }
    /*.cardBottom div{*/
        /*padding-top: 0;*/
    /*}*/
    .cardBottom .alignJ .parElem span:first-child{
        position: relative;
        /*top: 20px;*/
    }
     .reportinfo .alignJ .parElem span:nth-child(2){
        margin-left: 40px;
         color:  var(--primary--content);
     }
    .reportinfo .alignJ .parElem:first-child{
        padding-top: 0;
    }
 </style>