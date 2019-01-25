<template>
    <div class="page-loadmore">
        <Header post-title="就医评价" selectOption="" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <!--<div class="cardText md-example-child md-example-child-field md-example-child-field-0">-->
                <!--<md-field>-->
                <!--<md-field-item solid title="处方日期" content="oo" addon="次要信息" />-->
                <!--</md-field>-->
            <!--</div>-->
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
            document.title = '就医评价';
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

        },
        computed: {

        },

    };
</script>
<style   scoped>
</style>