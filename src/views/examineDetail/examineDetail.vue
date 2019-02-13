<template>
    <div class="examineDetail">
        <Header post-title="预约详情" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div class="successImg">
                <img src="@/assets/images/icon_success.png" alt="">
                <p>预约成功</p>
            </div>
            <div class="outCarint">
                <div class="margin16">
                    <div class="cardText">
                        <div class="listData">
                            <span>开单时间：
                                <span class="mu-secondary-text-color">检验科</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>预约项目：
                                <span class="mu-secondary-text-color">采血预约</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>预约日期：
                                <span class="mu-secondary-text-color">2019年1月20日  07:00—08:00</span>
                            </span>
                        </div>
                        <div class="backH">
                            <md-button type="primary" round @click="homeBack">返回首页</md-button>
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
                isWeixin: false,
            };
        },
        created() {

        },
        mounted() {
            document.title = '预约详情';
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
            homeBack(){
                let argu = {};
                this.$router.push({
                    name: 'home',
                    query: argu
                });
            }
        },
        computed: {

        },

    };
</script>
<style   scoped>
    .examineDetail .successImg{
        text-align: center;
        margin-top: 180px;
    }
    .examineDetail .successImg img{
        width: 120px;
        height: 120px;
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
</style>