<template>
    <div class="registrecorddetail">
        <Header post-title="挂号记录详情"  ></Header>
        <div class="outCarint margin45">
            <div class="card" v-for="(item,i) in cordInfoData" :key="i" v-show="!loadingtrue">
                <div class="cardText">
                    <div class="listData">
                        <span>科室</span>
                        <span>{{item.orgName}}</span>
                    </div>
                    <p class="partLine"></p>
                    <div class="listData">
                        <span>医生</span>
                        <span>{{item.doctorName}}</span>
                    </div>
                    <p class="partLine"></p>
                    <div class="listData">
                        <span>患者姓名</span>
                        <span>{{item.patientName}}</span>
                    </div>
                    <p class="partLine"></p>
                    <div class="listData">
                        <span>日期</span>
                        <span>{{item.regDate}}</span>
                    </div>
                    <p class="partLine"></p>
                    <div class="listData">
                        <span>时段</span>
                        <span>{{item.regStage}}</span>
                    </div>
                    <p class="partLine"></p>
                    <div class="listData">
                        <span>诊号</span>
                        <span>{{item.sourceId}}</span>
                    </div>
                    <p class="partLine"></p>
                    <div class="listData">
                        <span>金额</span>
                        <span>{{item.money}}</span>
                    </div>
                    <p class="partLine"></p>
                    <div class="listData">
                        <span>地点</span>
                        <span>{{item.address}}</span>
                    </div>
                </div>
            </div>
            <Loading v-show="loadingtrue"></Loading>
            <div class="cardText warnText">
                注意事项：
                <p>1、请在半个小时内完成支付，逾期记录作废</p>
                <div class="listData">
                    <span>2、</span>
                    <span>支付成功后无需取号，请持就诊卡到护士站报道看诊</span>
                </div>
                <p>3、如需退号，请提前两天进行操作</p>
                <p>4、一个自然月内只能退三次号</p>
            </div>
            <div style="margin-bottom:30px;">
                <div class="myButton">
                    <div v-if="payType==0">
                        <span class="cancle" @click="orderCancle">取消订单</span>
                        <span class="payatnow">
                            <md-button class=" " type="primary" @click="rightPay" round>立即支付</md-button>
                        <md-cashier ref="cashier" v-model="isCashierhow" :channels="cashierChannels" :channel-limit="2" :payment-amount="cashierAmount" @select="onCashierSelect" @pay="onCashierPay" @cancel="onCashierCancel" :default-index=0></md-cashier>
                        </span>

                    </div>
                    <div v-if="payType==1">
                        <md-button type="primary" round @click="applyBack">申请退号</md-button>
                    </div>
                    <div v-if="payType==2">
                        <md-button type="default" round>已退号/已失效</md-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script  >
import { Dialog } from 'mand-mobile'
let cord_info_url = "/app/bizPatientRegister/read/detail";
let fconfirm_pay_url = "/app/bizCostBill/confirmPay";
let now_pay_url = "/app/bizPatientRegister/nowPay";
let order_cancle_url="/app/bizPatientRegister/outSourceId";
export default {
    data() {
        return {
            isWeixin: false,
            cordInfoId: null,
            cordInfoData: [],
            payType: '',
            loadingtrue: true,
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
            sourceId:null,
            okParams:[],
            feeId:'',
        };
    },
    created() {

    },
    mounted() {
        this.feeId=parseInt(this.$route.query.id);
        this.sourceId=parseInt(this.$route.query.sourceId);
        this.cordInfo();
        document.title = '预约记录';
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.isWeixin = false;
        } else {
            this.isWeixin = true;
        };
    },
    methods: {
        cordInfo() {
            this.cordInfoId = parseInt(this.$route.query.id);
            this.payType = this.$store.state.payType;
            this.$axios.put(cord_info_url, { id: this.cordInfoId, payType: this.payType }, {
            }).then(res => {
                if (res.data.code == '200') {
                    this.loadingtrue = false;
                    this.cordInfoData.push(res.data.data);
                    console.log(this.cordInfoData)
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        rightPay(){
            this.isCashierhow = !this.isCashierhow;
            this.$axios.put(fconfirm_pay_url, { id: this.feeId }).then((res) => {
                if (res.data.code == '200') {
                    //this.orderCode = res.data.data.orderCode;
                    if (res.data.data.total) {
                        this.cashierAmount = res.data.data.total.toFixed(2);
                    }
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        orderCancle(){

        },
        doPay() {
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
                            this.$router.push({
                                name: 'feesucces',
                                query: this.okParams
                            });
                        },
                    })
                })
            }
        },
        createPay() {
            this.cashier.next('loading')
            return new Promise(resolve => {
                this.timer = setTimeout(() => {
                    resolve()
                }, 3000)
            })
        },
        sendCaptcha() {
            return new Promise(resolve => {
                this.timer = setTimeout(() => {
                    resolve()
                }, 200)
            })
        },
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
            nowPayParams.sourceId = this.sourceId;
            nowPayParams.payType = item.value;
            if(this.cashierAmount){
                this.$axios.post(now_pay_url, nowPayParams).then((res) => {
                    if (res.data.code == '200') {
                        this.okParams=res.data.data;
                        this.doPay();
                    } else {
                        this.$toast.info(res.data.msg);
                        this.isCashierhow = false;
                        // setTimeout(() => {
                        //     this.$router.push({
                        //         name: 'registrecord',
                        //         query: {}
                        //     });
                        // }, 3000)
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            }
        },
        onCashierCancel() {
            // Abort pay request or checking request
            this.timer && clearTimeout(this.timer)
        },
        setStyle(rowIndex, row) {
            if (row.id === this.currentRow.id) {
                return 'background-color:#ddd'
            } else {
                return 'background-color:#abc'
            }
        },
        applyBack() {
            Dialog.confirm({
                title: '温馨提示',
                content: '是否申请退号',
                confirmText: '确定',
                onConfirm: () => {
                    this.$axios.post(order_cancle_url, { id: this.feeId }).then((res) => {
                        if (res.data.code == '200') {
                            this.$toast.info("订单已取消");
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'registrecord',
                                    query: {}
                                });
                            }, 3000)
                        }
                    }).catch(function (err) {
                        console.log(err);
                    });
                },
            })
        },
    },
    computed: {
        cashier() {
            return this.$refs.cashier
        },
    },
};
</script>
<style   scoped>
.card p {
  line-height: 60px;
}
.warnText {
  font-size: 24px;
  color: #afafaf;
}
.registrecorddetail .card {
  margin-bottom: 32px;
}
.registrecorddetail .myButton div {
  display: flex;
  justify-content: space-between;
  margin-top: 26px;
}
.registrecorddetail .myButton div span{
  border-radius: 60px;
  letter-spacing: 1px;
  width: 46%;
  height: 86px;
  text-align: center;
}
.registrecorddetail .myButton div span:first-child{
    line-height: 86px;
}
.registrecorddetail .md-button.block {
    height: 86px;
}
.registrecorddetail .cancle {
  font-size: 26px;
  color: #474747;
  background: #ffffff;
  border: 2px solid #474747;
  box-sizing: border-box;
}
.registrecorddetail .md-button.default {
  color: #fff;
  background-color: #8b8b8b;
}
.registrecorddetail .default:after {
  border: none !important;
}
.registrecorddetail .partLine{
    margin: 16px 0px;
}
</style>