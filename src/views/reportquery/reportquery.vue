<template>
    <div class="reportquery" id="product-info">
        <header class="aui-navBar aui-navBar-fixed" v-show="isWeixin">
            <span href="javascript:;" class="aui-navBar-item" @click="$router.go(-1)">
                <img src="@/assets/images/icon_back.png">
            </span>
            <div class="aui-center">
                <span class="aui-center-title">报告查询</span>
            </div>
            <span class="aui-navBar-item">
                <div>
                    <md-field>
                        <md-field-item :content="selectorValue" @click="showSelector" solid/>
                    </md-field>
                    <md-selector v-model="isSelectorShow" default-value="7" :data="optionsData[0]" max-height="320px" title="选择姓名" @choose="onSelectorChoose"></md-selector>
                </div>
                <span class="downImg"><img src="@/assets/images/icon_down.png"></span>
            </span>
        </header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div class="timeTab" style="margin-top:20px">
                <span v-for="(item, index) in reportTime" :key="'reportTime' + index" @click="timeSwitchTo(index)" :class="reportactive1 === index ? 'appTabAcitive' : '' ">
                    {{item.title}}
                </span>
            </div>
            <div class="appTab">
                <span v-for="(item, index) in departs" :key="'departs' + index" @click="switchTo(index)" :class="active1 === index ? 'appTabAcitive' : '' ">
                    {{item.title}}
                </span>
            </div>
            <div class="outCarint" v-if="active1==0">
            <div class="card margin16" v-for="(item,i) in reportData" :key="i">
            <div class="cardText" @click="checkReportDetail(item.id)">
            <div class="cardTextLeft">
            <p>患者：{{item.name}}</p>
            <p>医院：{{item.hospital}}</p>
            <p>报告：{{item.itemName}}【{{item.reportTime}}】</p>
            </div>
            <div class="cardTextRight">
            <img src="@/assets/images/icon_more2@2x.png" alt="">
            </div>
            </div>
            </div>
            </div>
            <div  class="outCarint" v-if="active1==1">
            <div class="card margin16" v-for="(item,i) in collectData" :key="i">
            <div class="cardText" @click="collectReportDetail(item.id)">
            <div class="cardTextLeft">
            <p>患者：{{item.name}}</p>
            <p>报告：{{item.itemName}}【{{item.reportTime}}】</p>
            </div>
            <div class="cardTextRig">
            <img src="@/assets/images/icon_more2@2x.png" alt="">
            </div>
            </div>
            </div>
            </div>

            <!--<div class="in dex">-->
                <!--<my-scroll  ref="myScroll" :page="page" :on-refresh="onRefresh" :on-pull="onPull"  :get-scroll-top="getTop">-->
                    <!--<div slot="scrollList">-->
                        <!--<ul>-->
                            <!--<li v-for="(x,index) in list" :key="index" style="height: 50px">{{x.i}}</li>-->
                        <!--</ul>-->
                    <!--</div>-->
                <!--</my-scroll>-->
            <!--</div>-->
        </div>
    </div>
</template>
<script type="text/babel">
    import myScroll from '../../components/loadMore/loadMore'
    let bizbizPacsReportreadpage = 'app/bizPacsReport/read/page';
    let bizLisReportreadpage = 'app/bizLisReport/read/page';
    export default {
        components:{
            myScroll
        },
        data() {
            return {
                datepick: false,
                date: undefined,
                isWeixin: false,
                isDatePickerShow: false,
                active1: 0,
                reportactive1: 0,
                departs: [
                    { title: '检查报告' },
                    { title: '检验报告' },
                ],
                isSelectorShow: false,
                optionsData: [[
                    { text: "范冰冰", value: "1" },
                    { text: "郑凯", value: "2" },
                    { text: "邓超", value: "3" },
                    { text: '孙俪', value: "4" },
                    { text: '王祖蓝', value: "5" },
                    { text: '薛之谦', value: "6" },
                    { text: '陈楚生', value: "7" },
                    { text: "张信哲", value: "8" },
                    { text: "汪涵", value: "9" },
                    { text: "李晨", value: "10" },
                ]],
                selectorValue: '',
                reportTime:[
                    {title:'本周'},
                    {title:'半年'},
                    {title:'今年'},
                ],
                TOKEN: '',
                UUID: '',
                reportData:[],
                reportDetailData:[],
                collectData:[],
                collectDetailData:[],
                pageSize:10,
                checkPageNumber:1,
                collectPageNumber:1,
                choseValue:'',
                loadingtrue: true,
                pageNumber: 1,
                list:[],
                page:{
                    counter:1,
                    pageStart:1,
                    pageEnd:1,
                    total:10
                },

            };
        },
        created() {

        },
        mounted() {
            for(let i=0;i<1*50;i++){
                this.list.push({i})
            }
            console.log(this.list)
            this.checkReport();
            this.collectReport();
            this.selectorValue=this.optionsData[0][0].text;
            document.title = '报告查询';
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

            onRefresh(mun){ //刷新回调
                setTimeout(()=>{
                    this.$refs.myScroll.setState(3);
                },500)
            },
            onPull(mun){ //加载回调
                if(this.page.counter<=this.page.total){
                    setTimeout(()=>{
                        this.page.counter++
                        this.$refs.myScroll.setState(5)
                        for(let i=0;i<10;i++){
                            this.listdata.push({})
                        }
                    },500)
                }else{
                    this.$refs.myScroll.setState(7)
                }
            },
            getTop(y) {//滚动条位置

            },

            collectReport() {
                let _this = this;
                let collectParams = {};
                collectParams.patientId = parseInt(this.choseValue);
                collectParams.pageSize = this.pageSize;
                collectParams.pageNumber = this.collectPageNumber;
                this.$axios.put(bizLisReportreadpage, collectParams, {
                }).then((res) => {
                    if (res.data.code == '200') {
                        if (res.data.rows) {
                            if (this.collectPageNumber <Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                                this.collectFinished=false
                            }else{
                                this.collectFinished=true;
                            }
                            this.collectData = this.collectData.concat(res.data.rows);
                        } else {
                            this.collectData = []
                        }
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },
            checkReport() {
                let _this = this;
                let reportParams = {};
                reportParams.patientId = parseInt(this.choseValue);
                reportParams.pageSize = this.pageSize;
                reportParams.pageNumber = this.checkPageNumber;
                this.$axios.put(bizbizPacsReportreadpage, reportParams, {
                }).then((res) => {
                    if (res.data.rows) {
                        if (this.checkPageNumber <Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                            this.checkFinished=false
                        }else{
                            this.checkFinished=true;
                        }
                        this.reportData = this.reportData.concat(res.data.rows);
                    } else {
                        this.reportData = []
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },
            checkReportDetail(val) {
                this.$store.commit('activeFun', this.active1);
                this.$router.push({
                    name: 'reportinfo',
                    query: {id: val},
                });
            },
            collectReportDetail(val) {
                this.$store.commit('activeFun', this.active1);
                this.$router.push({
                    name: 'reportinfo',
                    query: {id: val},
                });
            },
            switchTo(num) {
                this.active1 = num;
                // if(num==0){
                //     this.cheactive1=num;
                //     this.collactive1=null;
                // }else if(num==1){
                //     this.collactive1=num;
                //     this.cheactive1=null;
                // }
            },
            timeSwitchTo(num) {
                this.reportactive1 = num;
            },
            datePick() {
                this.datepick = !this.datepick
            },
            showSelector() {
                this.isSelectorShow = true
            },
            onSelectorChoose({text, value}) {
                this.selectorValue = text;
                this.choseValue = value;
                this.checkReport();
                this.collectReport();
            },
            intoreportinfo() {
                let argu = {};
                this.$router.push({
                    name: 'reportinfo',
                    query: argu
                });
            },
            change() {
                console.log("sssssssss")
            },
            textRender() {
                const args = Array.prototype.slice.call(arguments)
                const typeFormat = args[0] // 类型
                // const column0Value = args[1] // 第1列选中值
                // const column1Value = args[2] // 第2列选中值
                const column2Value = args[3] // 第3列选中值
                if (typeFormat === 'dd') {
                    return `*${column2Value}日`
                }
            },
            onDatePickerChange(columnIndex, itemIndex, value) {
                console.log(
                    `[Mand Mobile] DatePicker Change\ncolumnIndex: ${columnIndex},\nitemIndex:${itemIndex},\nvalue: ${JSON.stringify(
                        value,
                    )}`,
                )
            },
            checkLoadMore() {
                this.busy = true;  //将无限滚动给禁用
                setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                    this.pageNumber++;  //滚动之后加载第二页
                    this.checkReport(true);
                }, 500);
            },
            collectLoadMore() {
                console.log("dong");
                this.collectBusy = true;  //将无限滚动给禁用
                setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                    this.pageNumber++;  //滚动之后加载第二页
                    this.collectReport(true);
                }, 500);
            },
        }
    };
</script>
<style   scoped>
    @import url("./reportquery.css");
</style>