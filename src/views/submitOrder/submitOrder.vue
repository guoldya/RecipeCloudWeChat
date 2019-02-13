<template>
    <div class="submitOrder">
        <Header post-title="提交订单" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div class="outCarint">
                <div class="pageContent">
                    <span v-for="(item, index) in changeTitle" :key="'changeTitle' + index" @click="switchTo(index)" :class="titleIndex === index ? 'appTabAcitive' : '' ">
                        {{item.title}}
                    </span>
                </div>
                <div class="card margin16" v-if="titleIndex===0">
                    <div class="cardText submitUser" @click="acceptAdd">
                        <div class="iconInfo">
                            <div class="iconImg">
                                <img class="addPic" src="@/assets/images/icon_address1.png" alt="">
                            </div>
                            <div class="userInfo" v-for="(item,i) in addJumpInfo">
                                <div>
                                    <span>{{item.name}}</span>
                                    <span>{{item.tel}}</span>
                                    <span class="first" v-if="item.addDefault==1">默认</span>
                                </div>
                                <div>
                                    <span>{{item.add}}</span>
                                </div>
                            </div>
                        </div>
                        <div  class="addImg nextImg">
                            <img style="height: 18px" src="@/assets/images/icon_more2@2x.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="card margin16" v-if="titleIndex===1">
                    <div class="cardText submitUser">
                        <div class="iconInfo">
                            <div class="iconImg">
                                <img class="addPic" src="@/assets/images/icon_address1.png" alt="">
                            </div>
                            <div class="storeInfo" v-for="(item,i) in storeAdd" :key="i">
                                <div>
                                    <div class="myStore">
                                        <span >药店地址：</span>
                                        <span style="width: 73%">{{item.add}}</span>
                                    </div>
                                    <div>
                                        <span >电话：</span>
                                        <span>{{item.tel}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card margin16">
                    <div class="cardText">
                        <span class="storeName">和平大药房</span>
                        <p class="partLine"></p>
                        <div v-for="(item,i) in medData">
                            <div class="med">
                                <div class="addImg">
                                    <img  class="medImg" :src=item.img alt="" >
                                </div>
                                <div class="medRight">
                                    <div class="medInfo">
                                        <div>
                                            <span  style="padding-right: 10px">{{item.medBrand}}</span>
                                            <span>{{item.medName}}</span>
                                        </div>
                                        <span>x{{item.num}}</span>
                                    </div>
                                    <div class="listData">
                                        <span>{{item.weight}}</span>
                                        <span class="mu-secondary-text-color">￥{{item.price}}</span>
                                    </div>
                                </div>
                            </div>
                            <p class="partLine"></p>
                        </div>
                        <div class="smallTotal">
                            <span>共{{medData.length}}件药品</span>
                            <span>小计：</span>
                            <span class="mu-secondary-text-color">￥198.00</span>
                        </div>
                    </div>
                </div>
                <div class="card margin16">
                    <div class="cardText">
                        <div class="onlinePay">
                            <div>
                                <span>绑定社保卡可在线医保支付</span>
                                <span class="mu-secondary-text-color">开通医保支付</span>
                            </div>
                            <p class="partLine"></p>
                        </div>
                        <div v-for="(item,i) in priceData" class="subButtom onlinePay">
                            <div v-if="titleIndex==0">
                                <span>{{item.pei}}</span>
                                <span>￥{{item.peiPri}}</span>
                            </div>
                            <p class="partLine" v-if="i!=priceData.length-1 && titleIndex==0"></p>
                            <div v-if="titleIndex==1 && i!==0">
                                <span>{{item.pei}}</span>
                                <span>￥{{item.peiPri}}</span>
                            </div>

                            <p class="partLine" v-if="i!=priceData.length-1 && i!==0 &&titleIndex==1"></p>

                        </div>
                    </div>
                </div>

                <div class="md-example-child md-example-child-cashier">
                    <div class="bButton">
                        <div class="grayButton">
                            <span>应付金额￥198.00</span>
                        </div>
                        <div class="blueButton" @click="isCashierhow = !isCashierhow">
                            <span >{{ isCashierhow ? '' : '提交订单' }}</span>
                        </div>
                    </div>
                    <md-cashier
                            ref="cashier"
                            v-model="isCashierhow"
                            :channels="cashierChannels"
                            :channel-limit="2"
                            :payment-amount="cashierAmount"
                            @select="onCashierSelect"
                            @pay="onCashierPay"
                            @cancel="onCashierCancel"
                            :default-index=0
                    ></md-cashier>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    export default {
        data() {
            return {
                isWeixin: false,
                changeTitle: [
                    { title: '配送到家' },
                    { title: '门店自提' },
                ],
                titleIndex:0,
                medData:[
                    {img:require("@/assets/images/pic.png"),medBrand:"万爽力",medName:"盐酸曲美他嗪片",weight:"20mgx30片",num:"1",price:"66.00"},
                    {img:require("@/assets/images/pic.png"),medBrand:"万爽力",medName:"999感冒灵",weight:"20mgx30片",num:"1",price:"66.00"},
                    {img:require("@/assets/images/pic.png"),medBrand:"万爽力",medName:"肠炎宁",weight:"20mgx30片",num:"1",price:"66.00"},
                ],
                priceData:[
                    {pei:"配送费",peiPri:"0.00"},
                    {pei:"药品总金额",peiPri:"198.00"},
                    {pei:"医保可支付",peiPri:"0.00"}
                ],
                isCashierhow: false,
                isCashierCaptcha: false,
                cashierResult: 'success',
                cashierAmount: '199.00',
                cashierChannels: [
                    {
                        icon: 'cashier-icon-2',
                        text: '支付宝支付',
                        value: '002',
                    },
                    {
                        icon: 'cashier-icon-3',
                        text: '微信支付',
                        value: '003',
                    },
                ],
                addIndex:"0",
                addJumpInfo:[{name:"土木君",tel:"188****5489",add:"重庆市渝北区仙桃街道xx号",addDefault:"1"}],
                storeAdd:[{add:"重庆市渝北88号（和平大药房）",tel:"023-52242565"}]
            };
        },
        created() {

        },
        mounted() {
            if(this.$route.query.name){
                this.addIndex=this.$route.query.params;
                this.addJumpInfo.splice(0,1);
                this.addJumpInfo.push(this.$route.query);
            }
            document.title = '提交订单';
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                this.isWeixin = false;
                return true;
            } else {
                this.isWeixin = true;
                return false;
            }

        },
        methods: {
            switchTo(num) {
                this.titleIndex = num;
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
                            console.log('[Mand Mobile] Send Captcha');
                            this.sendCaptcha().then(() => {
                                countdown()
                            })
                        },
                        onSubmit: code => {
                            console.log(`[Mand Mobile] Send Submit ${code}`);
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
                                //this.$toast.info(`${this.cashierResult}点击`)
                                let argu = {};
                                this.$router.push({
                                    name: 'paySuccess',
                                    query: argu
                                });
                            },
                        })
                    })
                }
            },
            createPay() {
                this.cashier.next('loading');
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
                console.log(`[Mand Mobile] Select ${JSON.stringify(item)}`);
                this.$store.commit('payWayFun', item);
            },
            onCashierPay(item) {
                console.log(`[Mand Mobile] Pay ${JSON.stringify(item)}`);
                this.$store.commit('payWayFun', [item,this.titleIndex]);
                this.doPay()
            },
            onCashierCancel() {
                this.timer && clearTimeout(this.timer)
            },
            acceptAdd(){
                let argu = {checked:this.addIndex};
                this.$router.push({
                    name: 'acceptAdd',
                    query: argu
                });
            }
        },
        computed: {
            cashier() {
                return this.$refs.cashier
            },
        },

    };
</script>
<style   scoped>
@import "submitOrder.css";
</style>