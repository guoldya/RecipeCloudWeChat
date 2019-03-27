<template>
    <div class="feerecord">
        <header class="aui-navBar aui-navBar-fixed">
            <span href="javascript:;" class="aui-navBar-item" @click="$router.go(-1)">
                <img src="@/assets/images/icon_back.png">
            </span>
            <div class="aui-center">
                <span class="aui-center-title">缴费记录</span>
            </div>
            <span class="aui-navBar-item">
                <!-- <div>
                    <md-field>
                        <md-field-item :content="selectorValue" @click="showSelector" solid/>
                    </md-field>
                    <md-selector v-model="isSelectorShow" default-value="7" :data="optionsData" max-height="320px" title="选择姓名" @choose="onSelectorChoose"></md-selector>
                </div>
                <span class="downImg"><img src="@/assets/images/icon_down.png"></span> -->
            </span>
        </header>
        <div class="outCarint margin45">
            <Apptab :tab-title="time" v-on:childByValue="childByValue"></Apptab>
            <div v-if="waitPayData.length!=0" v-show="!loadingtrue">
                <div class="card cardcc margin16" v-for="(item,i) in waitPayData" :key="i" @click="appointinfo(item.id,item.code)">
                    <p class="appTitle">
                        <span>{{item.type}}费</span>
                        <span class="mu-secondary-text-color">{{item.total | keepTwoNum}}元</span>
                    </p>
                    <div class="cardText">
                        <p>患者：
                            <span>{{item.patientName}}</span>
                        </p>
                        <p>医院：
                            <span>{{item.hospital}}</span>
                        </p>
                        <p v-if="disType == 1">开单时间：
                            <span>{{item.createTime}}</span>
                        </p>
                        <p v-if="disType == 2">支付时间：
                            <span>{{item.payTime}}</span>
                        </p>
                        <div style="height:30px;  text-align: right;" v-if="disType == 1">
                            <span class="payatnow">立即支付</span>
                        </div>
                    </div>
                </div>
                <p v-show="nomore" class="noMore">没有更多数据了</p>
            </div>
            <div v-show="!loadingtrue" class="nullDiv" v-else>
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
            console.log(val);//8
            console.log(code);//x0003
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
                        };
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
            from.meta.keepAlive = false;
            to.meta.keepAlive = false;
        }
    },
    // beforeRouteLeave(to, from, next) {
    //     from.meta.keepAlive = false;
    //     console.log(next);
    //     next();
    //     // if(to.name == "feeinfo"){
    //     //     if(!from.meta.keepAlive){
    //     //         from.meta.keepAlive=true;
    //     //     }
    //     //     next();
    //     // }else{
    //     //     from.meta.keepAlive=false;
    //     //     to.meta.keepAlive=false;
    //     //     this.$destroy();
    //     //     next();
    //     // }
    // },
    computed: {

    },

};
</script>
 <style   scoped>
.feerecord {
  font-size: 28px;
}
.feerecord .appTab {
  width: 80%;
  margin-left: 10%;
}
.feerecord .cardText {
  padding: 10px 0 30px;
}
.feerecord .cardText p {
  line-height: 50px;
  font-size: 28px;
  color: #5c5c5c;
}
.feerecord .appTitle {
  border-bottom: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
}
.payatnow {
  font-size: 28px;
  color: #ffffff;
  float: right;
  background: #1da1f3;
  border-radius: 40px;
  letter-spacing: 1px;
  padding: 15px 40px;
  text-align: center;
}
.feerecord .demo-text .card:first-child {
  margin-top: 0px;
}
</style>