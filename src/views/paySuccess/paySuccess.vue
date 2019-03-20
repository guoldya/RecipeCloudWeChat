<template>
    <div class="paySuccess">
        <Header post-title="支付成功"  ></Header>
        <div class="outCarint margin45">
            <div class="outCarint">
                <div class="card margin16">
                    <div class="cardText">
                        <div class="payStatus">
                            支付成功
                        </div>
                        <div class="payResult">
                            <div v-for="(item,i) in payWay">
                                <span>支付方式</span>
                                <span>{{item.text}}</span>
                            </div>
                            <p class="partLine"></p>
                            <div>
                                <span>支付金额</span>
                                <span>￥198.00</span>
                            </div>
                            <p v-if="acceptIndex==1" class="partLine"></p>
                            <div v-if="acceptIndex==1">
                                <span>自提地址</span>
                                <span style="width: 70%">重庆市渝北区加州路88号（和平大药房）</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    export default {
        data() {
            return {
                
                payWay:[],
                acceptIndex:null,
            };
        },
        created() {

        },
        mounted() {
            this.payWay.push(this.$store.state.payWay[0]);
            this.acceptIndex=this.$store.state.payWay[1];
            document.title = '支付成功';
        },
        methods: {

        },
        computed: {

        },

    };
</script>
<style   scoped>
    .paySuccess .payStatus{
        text-align: center;
        font-weight: bold;
        font-size: 40px;
        padding: 44px 0;
    }
    .paySuccess .payResult div{
        display: flex;
        justify-content: space-between;
    }
</style>