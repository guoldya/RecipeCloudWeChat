<template>
    <div class="feeinfo">
        <Header post-title="缴费详情"></Header>
        <div class="flatCard margin55 cardText" v-for="(item,i) in feeDetailData" :key="i" v-show="!loadingtrue">
            <md-field v-if="feeActiveId==2">
                <md-detail-item title="订单编号" :content=item.orderCode></md-detail-item>
                <md-detail-item title="交易编号" :content=item.payCode></md-detail-item>
                <md-detail-item title="缴费时间" :content=item.payTime></md-detail-item>
            </md-field>
            <md-field>
                <md-detail-item title="开单医院" :content=item.hospital></md-detail-item>
                <md-detail-item title="开单科室" :content=item.dept></md-detail-item>
                <md-detail-item title="开单医生" :content=item.doctor></md-detail-item>
                <md-detail-item title="患者ID" :content=item.patientCode></md-detail-item>
                <md-detail-item title="患者姓名" :content=item.patientName></md-detail-item>
                <md-detail-item title="开单时间" :content=item.createTime></md-detail-item>
                <md-detail-item title="开单序号" :content=item.code></md-detail-item>
            </md-field>
        </div>
        <div class="flatCard margin10 cardText" v-for="(item,i) in feeDetailData" :key="'item'+i" v-show="!loadingtrue">
            <md-field>
                <md-detail-item :title=feeTitle>
                    <span class="mu-secondary-text-color" style="font-size:25px">￥{{item.total | keepTwoNum}}</span>
                </md-detail-item>
            </md-field>
        </div>
        <div v-if="feeButtomDetail.length!=0" class="flatCard" v-show="!loadingtrue">
            <div class="cardText">
                <div class="cardTextKind spanWid">
                    <span style="text-align: left">类别</span>
                    <span>项目名称</span>
                    <span>数量</span>
                    <span style="text-align: right">金额</span>
                </div>
                <div class="cardTextPP spanWid" v-for="(item,i) in feeButtomDetail" :key="i">
                    <span>{{item.type}}</span>
                    <span>{{item.itemName}}</span>
                    <span>{{item.num}}{{item.unit}}</span>
                    <span>{{item.total | keepTwoNum}}</span>
                </div>
            </div>
        </div>
        <Loading v-show="loadingtrue"></Loading>
        <div style="height: 50px"></div>
        <div v-show="!loadingtrue" class="md-example-child md-example-child-cashier" v-if="feeActiveId==1">
            <p class="addbTN" @click="rightPay">立即缴费</p>
            <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="cashierAmount" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel" :default-index=0></md-cashier>
        </div>
    </div>
</template>
<script>
let fee_detail_url = "/app/bizCostBill/detail";
let fconfirm_pay_url = "/app/bizCostBill/confirmPay";
let now_pay_url = "/app/bizCostBill/nowPay";
import { Toast, Button } from 'mand-mobile'
export default {
    data() {
        return {

            active1: 0,
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
            isCashierhow: false,
            isCashierCaptcha: false,
            cashierAmount: '',
            cashierResult: 'success',
            cashierChannels: [
                {
                    icon: 'cashier-icon-2',
                    text: '支付宝支付',
                    value: '1',
                },
                {
                    icon: 'cashier-icon-3',
                    text: '微信支付',
                    value: '2',
                },
                {
                    icon: 'cashier-icon-3',
                    text: '医保支付',
                    value: '3',
                },
            ],
            feeTitle: null,
            feeDetailData: [],
            feeButtomDetail: [],
            feeId: '',
            orderCode: '',
            feeActiveId: '',
            postTitle: '',
            loadingtrue: true,
            code: '',
            routeLoad: '',
            payStatus: '',
        };
    },
    created() {

    },
    mounted() {
        this.feeActiveId = this.$store.state.feeActiveId;
        console.log(this.feeActiveId, "详情");
        this.feeDetail();

    },
    methods: {
        feeDetail() {
            this.feeId = this.$route.query.id;
            // if (this.feeActiveId == 1) {
            //   this.postTitle = "我的缴费-待缴费";
            //   document.title = "我的缴费-待缴费";
            // } else {
            //   this.postTitle = "我的缴费-已缴费";
            //   document.title = "我的缴费-已缴费";
            // }
            document.title = "缴费详情";
            this.$axios.put(fee_detail_url, { id: this.$route.query.id, code: this.$route.query.code }).then((res) => {
                if (res.data.code == '200') {
                    this.loadingtrue = false;
                    this.feeDetailData.push(res.data.data);
                    this.feeButtomDetail = res.data.data.details;
                    this.cashierAmount = res.data.data.total.toFixed(2);
                    if (this.feeActiveId == 1) {
                        this.feeTitle = "应付金额";
                    } else if (this.feeActiveId == 2) {
                        this.feeTitle = "实付金额";
                    }
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        rightPay() {
            this.isCashierhow = !this.isCashierhow;
            this.$axios.put(fconfirm_pay_url, { id: this.feeId }).then((res) => {
                if (res.data.code == '200') {
                    this.orderCode = res.data.data.orderCode;
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
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
        doPay() {
            console.log("dopay")
            if (this.isCashierCaptcha) {
                this.cashier.next('captcha', {
                    text: 'Verification code sent to 156 **** 8965',
                    brief: 'The latest verification code is still valid',
                    autoCountdown: false,
                    countNormalText: 'Send Verification code',
                    countActiveText: 'Retransmission after {$1}s',
                    onSend: countdown => {
                        console.log('[Mand Mobile] Send Captcha')
                        this.sendCaptcha().then(() => {
                            countdown()
                        })
                    },
                    onSubmit: code => {
                        console.log(`[Mand Mobile] Send Submit ${code}`)
                        this.checkCaptcha(code).then(res => {
                            if (res) {
                                this.createPay().then(() => {
                                    this.cashier.next(this.cashierResult)
                                })
                            }
                        })
                    },
                })
            } else {
                this.createPay().then(() => {
                    this.cashier.next(this.cashierResult, {
                        buttonText: '好的',
                        handler: () => {
                            this.isCashierhow = false;
                            this.routeLoad = 1;
                            this.$router.push({
                                name: 'feerecord',
                                query: {}
                            });
                        },
                    })
                })
            }
        },
        // Create a pay request & check pay result
        createPay() {
            this.cashier.next('loading')
            return new Promise(resolve => {
                this.timer = setTimeout(() => {
                    resolve()
                }, 3000)
            })
        },
        // Create a captcha sending request
        sendCaptcha() {
            return new Promise(resolve => {
                this.timer = setTimeout(() => {
                    resolve()
                }, 200)
            })
        },
        // Create a captcha checking request
        checkCaptcha(code) {
            return new Promise(resolve => {
                this.timer = setTimeout(() => {
                    resolve(!!code)
                }, 200)
            })
        },
        onCashierSelect(item) {
            console.log(`[Mand Mobile] Select ${JSON.stringify(item)}`)
        },
        onCashierPay(item) {
            let nowPayParams = {};
            nowPayParams.id = this.feeId;
            nowPayParams.orderCode = this.orderCode;
            nowPayParams.orderType = Number(item.value);
            nowPayParams.payType = item.value;
            nowPayParams.code = this.$route.query.code;
            this.$axios.post(now_pay_url, nowPayParams).then((res) => {
                if (res.data.code == '200') {
                    // this.feeDetailData.push(res.data.data);
                    // if (res.data.data.details) {
                    //     this.feeButtomDetail = res.data.data.details;
                    // }
                    // if (res.data.data.total) {
                    //     this.cashierAmount = res.data.data.total.toFixed(2);
                    // }
                    this.$router.go(-1);
                    // this.payStatus = "1";
                    // this.doPay();
                } else {
                    this.$toast.info(res.data.msg);
                    this.isCashierhow = false;
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        onCashierCancel() {
            // Abort pay request or checking request
            this.timer && clearTimeout(this.timer);
            if (this.payStatus == "1") {
                this.$router.go(-1);
            }
        },
    },
    // watch:{
    //     "$route":function(to,from){
    //         if (to.path == "/feerecord") {
    //             to.meta.keepAlive = true;
    //             //this.$destroy();
    //         } else {
    //             to.meta.keepAlive = false;
    //             //this.$destroy();
    //         }
    //     }
    // },
    // beforeRouteLeave(to, from, next) {
    //     if (to.path == "/feerecord" && this.routeLoad != 1) {
    //         to.meta.keepAlive = true;
    //         //this.$destroy();
    //     } else {
    //         to.meta.keepAlive = false;
    //         //this.$destroy();
    //     }
    //     next();
    //   },
    // computed: {
    //     cashier() {
    //         return this.$refs.cashier
    //     },
    // },
};
</script>
<style   scoped>
@import "../submitOrder/submitOrder.css";
.feeinfo .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
  font-size: 28px;
  border-bottom: 1px solid #e9e9e9;
}
.feeinfo .cardText .cardTextKind {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
  font-size: 28px;
  border-bottom: 1px solid #e9e9e9;
  font-weight: 700;
}
.feeinfo .spanWid span {
  display: inline-block;
  word-break: normal;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow: hidden;
  text-align: center;
}
.feeinfo .spanWid span:first-child {
  width: 15%;
  text-align: left;
}
.feeinfo .spanWid span:nth-child(2) {
  width: 40%;
}
.feeinfo .spanWid span:nth-child(3) {
  width: 20%;
  /*text-align: center;*/
}
.feeinfo .spanWid span:last-child {
  width: 25%;
  text-align: right;
}
.feeinfo .cardText .cardTextKindcontent {
  display: flex;
  justify-content: space-between;
  padding: 35px 0;
  font-size: 28px;
  font-weight: 700;
}
.feeinfo .cardText .cardTextPP:last-child {
  border: none;
}
</style>
