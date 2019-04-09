<template>
    <div class="feerecord">
        <!--<header class="aui-navBar aui-navBar-fixed">-->
            <!--<a href="javascript:;" class="aui-navBar-item" @click="routeBack">-->
                <!--<img src="@/assets/images/icon_back.png">-->
            <!--</a>-->
            <!--<div class="aui-center">-->
                <!--<span class="aui-center-title">缴费记录</span>-->
            <!--</div>-->
            <!--<a href="javascript:;" class="aui-navBar-item" >-->
                <!--&lt;!&ndash;{{selectOption}} &ndash;&gt;-->
            <!--</a>-->
        <!--</header>-->
        <div class="navigation">
            <i class="icon-iconfontjiantou" @click="routeBack">
                <img src="@/assets/images/icon_back.png">
            </i>
            <div class="navigation-content">
                缴费记录
            </div>
            <div class="right">
                <slot></slot>
            </div>
        </div>
        <!--<Header post-title="缴费记录"></Header>-->
        <div class="margin50">
            <Apptab :tab-title="time" v-on:childByValue="childByValue"></Apptab>
            <div v-if="waitPayData.length!=0" v-show="!loadingtrue">
                    <div class="flatCard" v-for="(item,i) in waitPayData" :key="i" @click="appointinfo(item.id,item.code)">
                        <div class="appTitle">
                            <span>{{item.type}}费</span>
                            <span class="mu-secondary-text-color">{{item.total | keepTwoNum}}元</span>
                        </div>
                        <div class="cardText">
                            <p class="parElem listData">
                                <span class="sonElem">患者</span>
                                <span>{{item.patientName}}</span>
                            </p>
                            <p class="parElem listData">
                                <span class="sonElem">医院</span>
                                <span>{{item.hospital}}</span>
                            </p>
                            <p v-if="disType == 1" class="parElem listData">
                                <span class="sonElem">开单时间</span>
                                <span>{{item.createTime}}</span>
                            </p>
                            <p v-if="disType == 2" class="parElem listData">
                                <span class="sonElem">支付时间</span>
                                <span>{{item.payTime}}</span>
                            </p>
                            <div class="payatnow" v-if="disType == 1">
                                <span>立即支付</span>
                            </div>
                        </div>
                    </div>
                    <p v-show="nomore" class="noMore">没有更多数据了</p>
            </div>
            <div v-show="!loadingtrue" class="nullDiv"  v-else>
                <img src="@/assets/images/null1.png">
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
<script >
let pay_list_url = "/app/bizCostBill/selectCostBillList";
let bizPatientCard = "/app/bizPatientCard/read/list";
export default {
    data() {
        return {

            time: [
                { title: '待支付', type: 1 },
                { title: '已支付', type: 2 },
            ],
            waitPayData: [],
            status: 0,
            selectorValue: '',
            choseValue: '',
            isSelectorShow: false,
            optionsData: [],
            page: 1,
            pageSize: 10,
            type: 0,
            busy: true,
            nomore: false,
            loadingtrue: true,
            disType: '',
        };
    },

    created() {

    },
    mounted() {
        console.log(this.$route)
        if (this.$store.state.feeActiveId) {
            this.disType = this.$store.state.feeActiveId;
            if (this.$store.state.feeActiveId == 1) { this.type = 0; } else { this.type = 1; }
        }
        this.WaitPay(false);
        // this.personFun();
        document.title = '缴费记录';

        // this.selectorValue = this.optionsData[0][0].text;

    },
    methods: {
        routeBack(){
            this.$router.push({
                name: 'home',
            });
        },
        personFun() {
            this.$axios.put(bizPatientCard, {
            }).then(res => {
                if (res.data.code == '200') {
                    for (let i = 0; i < res.data.rows.length; i++) {
                        this.selectorValue = res.data.rows[0].patientName;
                        this.cardNo = res.data.rows[0].cardNo;
                        let neslist = {
                            text: res.data.rows[i].patientName,
                            value: res.data.rows[i].cardNo,
                            aaa: res.data.rows[i].createTime,
                        }
                        this.optionsData.push(neslist);
                    }

                } else if (res.data.code == '800') {

                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        onSelectorChoose({ text, value }) {
            this.selectorValue = text;
            this.choseValue = value;
            this.WaitPay(false);
        },
        showSelector() {
            this.isSelectorShow = true
        },
        appointinfo: function (val, code) {
            this.$router.push({
                name: 'feeinfo',
                query: { id: val, code: code }
            });
        },

        childByValue: function (childValue) {
            console.log(childValue);
            //this.type = childValue.type;
            this.disType = childValue.type;
            if (childValue.type == 1) { this.type = 0; } else { this.type = 1; }
            this.$store.commit('feeActiveFun', childValue.type);
            this.waitPayData = [];
            this.loadingtrue = true;
            this.page = 1;
            this.WaitPay();
        },
        WaitPay(flag) {
            const params = {};
            params.pageNumber = this.page;
            params.pageSize = this.pageSize;
            //params.patientId = parseInt(this.choseValue);
            params.payType = this.type;
            this.$axios.put(pay_list_url, params).then((res) => {
                if (res.data.rows) {
                    this.loadingtrue = false;
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
            })
        },
        loadMore() {
            this.busy = true;  //将无限滚动给禁用
            setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                this.page++;  //滚动之后加载第二页
                this.WaitPay(true);
            }, 500);
        },
    },
    watch: {
        "$route": function (to, from) {
            console.log(to,from);
            from.meta.keepAlive = false;
            to.meta.keepAlive = false;
        }
    },
    //beforeRouteLeave(to, from, next) {
        // from.meta.keepAlive = false;
        // console.log(next);
        // next();
        // if(to.name == "feeinfo"){
        //     if(!from.meta.keepAlive){
        //         from.meta.keepAlive=true;
        //     }
        //     next();
        // }else{
        //     from.meta.keepAlive=false;
        //     to.meta.keepAlive=false;
        //     this.$destroy();
        //     next();
        // }
    //},
    computed: {

    },

};
</script>
 <style   scoped>
.feerecord {
  font-size: 28px;
}
.feerecord .cardText p {
  font-size: 28px;
  color:  var(--primary--content);
}
.feerecord .flatCard:first-child{
    margin-top: 0;
}

.feerecord .listData span:nth-child(2) {
  color:  var(--primary--right);
}
.feerecord .alignJ{
    line-height: 26px;
}

</style>