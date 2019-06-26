<template>
    <div class="examineDetail">
        <div class="navigation">
            <i class="icon-iconfontjiantou" @click="$router.go(-2)">
                <img src="@/assets/images/icon_back.png">
            </i>
            <div class="navigation-content">
                预约详情
            </div>
            <div class="right">
                <slot></slot>
            </div>
        </div>
        <div>
            <div v-if="orderData.length!=0">
                <div class="successImg">
                    <img src="@/assets/images/icon_success.png" alt="">
                    <p>预约成功</p>
                </div>
                <div class="bacCenter">
                    <div class="margin16">
                        <div>
                            <span>预约科室： </span>
                            <span class="mu-secondary-text-color">{{orderData.serialDept}}</span>
                        </div>
                        <div>
                            <span>预约项目</span>：
                            <span class="mu-secondary-text-color">{{orderData.serialClass}}</span>

                        </div>
                        <div>
                            <span>预约日期：</span>
                            <span class="mu-secondary-text-color">{{orderData.serialTime}}</span>
                        </div>
                    </div>
                    <div class="backH">
                        <md-button type="primary" round @click="homeBack">返回首页</md-button>
                    </div>
                </div>
            </div>
            <!--<div v-show="!loadingtrue" v-if="orderData.length==0">-->
                <!--<div class="successImg">-->
                    <!--<img src="@/assets/images/fail.png" alt="">-->
                    <!--<p>预约失败</p>-->
                <!--</div>-->
            <!--</div>-->
            <!--<Loading v-show="loadingtrue"></Loading>-->
        </div>

    </div>
</template>
<script type="text/babel">
    let ready_order_url="/bizExamApply/updateExamApply";
    export default {
        data() {
            return {
                
                loadingtrue:true,
                orderData:[],
            };
        },
        created() {

        },
        mounted() {
            this.readyOrderFun();
            document.title = '预约详情';
            console.log(this.$store.state.orderData);
            if(this.$store.state.orderData){
                this.orderData=this.$store.state.orderData;
            }
        },
        methods: {
            homeBack(){
                let argu = {};
                this.$router.push({
                    name: 'home',
                    query: argu
                });
            },
            readyOrderFun(){
                // let orderPar={};
                // orderPar.scheduleId=parseInt(this.$route.query.scheduleId);
                // orderPar.id=parseInt(this.$route.query.id);
                // this.$axios.post(ready_order_url,orderPar).then((res) => {
                //     if(res.data.code=='200'){
                //         this.loadingtrue = false;
                //         this.orderData.push(res.data.data)
                //     }else if(res.data.code=='800'){
                //         this.loadingtrue = false;
                //         this.orderData=[];
                //     }
                // }).catch(function (err) {
                //     console.log(err);
                // });
            },
        },
        computed: {

        },

    };
</script>
<style   scoped>
    .examineDetail .successImg{
        text-align: center;
        margin-top: 110px;
        background-color: #fff;
        padding: 80px 0;
    }
    .examineDetail .successImg img{
        width: 160px;
        height: 160px;
    }
    .examineDetail .successImg p{
        font-size: 30px;
        margin-top: 18px;
    }
    .examineDetail .successWord p{
        padding: 80px 28px;
        text-indent: 7%;
        font-size: 26px;
        word-break : normal;
    }
    .examineDetail .backH{
        margin-top: 60px;
    }
    .examineDetail .bacCenter{
        background-color: #ffffff;
        padding-bottom: 10px;
        line-height: 52px;
    }
    .examineDetail .bacCenter div div{
        width: 72%;
        margin: 0 auto;
    }
</style>