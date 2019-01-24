<style>
@import "payment.css";
</style>
<template>
    <div class="payment">
        <Header post-title="订单信息" v-show="isWeixin"></Header>
        <div class="payment-head">
            <span class="payment-head-text">订单信息</span>
        </div>
        <div class="payment-order">
            <ul>
                <li>交易单号：123456</li>
                <li>订单单号：123456</li>
                <li>订单时间：123456</li>
            </ul>
        </div>
        <div class="payment-head payment-margin">
            <span class="payment-head-text">商品信息</span>
        </div>
        <div class="payment-product-body">
            <ul>
                <li>
                    <p>商户名称：四川大学华西医院</p>
                    <p class="payment-margin-5">商品明细：</p>
                </li>
                <li>
                    <p>挂号费</p>
                    <div class="payment-margin-5">
                        <span class="float-left">1次</span>
                        <span class="float-right">单价：
                            <span class="price-color text-font">￥11.00</span>
                        </span>
                        <div style="clear: both"></div>
                    </div>
                </li>
                <li>
                    <p>预约费</p>
                    <div class="payment-margin-5">
                        <span class="float-left">1次</span>
                        <span class="float-right">单价：
                            <span class="price-color text-font">￥2.00</span>
                        </span>
                        <div style="clear: both"></div>
                    </div>
                </li>
                <li class="payment-margin text-right">
                    <span>总计：
                        <span class="text-font">￥13.00</span>&nbsp;&nbsp;优惠：
                        <span class="text-font">￥0.00</span>
                    </span>
                </li>
                <li class="text-right">
                    <span class="payment-head-text">实付：</span>
                    <span class="text-font text-pay">￥13.00</span>
                </li>
            </ul>
        </div>
        <div class="payment-head payment-margin">
            <span class="payment-head-text">支付方式</span>
        </div>
        <div class="select-control-group" @click="radioChange">
            <mu-flex class="select-control-row payment-border" :key="index" v-for="(item,index) in payType">
                <mu-radio :value="index" v-model="normal.radio" :label="item.name"></mu-radio>
            </mu-flex>
        </div>
        <div class="payment-head payment-margin">
            <span class="payment-head-text">快捷支付</span>
        </div>
        <div class="select-control-group" @click="radio1Change">
            <mu-flex class="select-control-row">
                <mu-radio value="快捷" v-model="normal.radio1" label="建设银行快捷支付"></mu-radio>
            </mu-flex>
        </div>
        <div class="payment-head payment-margin">
        </div>
        <div class="payment-margin payment-margin-bottom text-center">
            <span class="payment-head-text">合计：</span>
            <span class="text-font text-pay">￥13.00</span>
            <button class="margin-left payment-button">立即支付</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            isWeixin: false,
            normal: {
                radio: null,
                radio1: '快捷'
            },
            payType: [
                { name: '建设银行网上支付' },
                { name: '银联支付' },
                { name: '微信支付' },
                { name: '建设银行网上支付' }
            ]
        }
    },
    mounted() {
        document.title = '支付';
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
        radioChange() {
            if (this.normal.radio1) {
                this.normal.radio1 = null
            }
        },
        radio1Change() {
            if (this.normal.radio != null) {
                this.normal.radio = null
            }
        }
    }
}
</script>