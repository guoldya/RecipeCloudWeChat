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
            <div class="successButton">
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
        font-size: 30px;
        margin-top: 18px;
    }
    .slowConfirm .successWord p{
        padding: 80px 28px;
        text-indent: 7%;
        font-size: 26px;
        word-break : normal;

    }
    .slowConfirm .successButton{
        padding: 0px 28px;
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