<template>
    <div class="slowConfirm">
        <Header post-title="申请详情"  ></Header>
        <div class="outCarint margin45">
            <div class="successImg">
                <img src="@/assets/images/icon_success.png" alt="">
                <p>申请成功</p>
            </div>
            <div class="successWord">
                <p>您已提交续方申请，现在请与在线医师完成病情评估，以便医生能够尽快审核通过您的续方申请。</p>
            </div>
            <div>
                <md-button type="primary" round @click="onlineEvaluate">点击在线评估</md-button>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
    export default {
        data() {
            return {
                
            };
        },
        created() {

        },
        mounted() {
            document.title = '申请详情';
        },
        methods: {
            onlineEvaluate(){
                // let argu = {};
                // this.$router.push({
                //     name: 'slowConfirm',
                //     query: argu
                // });
            },

        },
        computed: {

        },

    };
</script>
<style   scoped>
    .slowConfirm .successImg{
        text-align: center;
        margin-top: 180px;
    }
    .slowConfirm .successImg img{
        width: 120px;
        height: 120px;
    }
    .slowConfirm .successImg p{
        font-size: 36px;
        margin-top: 8px;
    }
    .slowConfirm .successWord p{
        margin: 44px 0;
        text-indent: 7%;
        font-size: 26px;
        word-break : normal;
        color: #979797;
        line-height: 40px;
    }
    .slowConfirm .primary{
        background-color: #1da1f3 !important;
        color:#fff !important;
        font-size: 28px;
    }
    .slowConfirm .primary:after{
        border : 1px solid #1da1f3 !important;
    }
</style>