<template>
    <div class="selectStore">
        <Header post-title="药店选择" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">

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
            document.title = '药店选择';
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