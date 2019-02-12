<template>
    <div class="evaContent">
        <Header post-title="就医评价" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div class="outCarint">
                <div class="card margin16" v-for="item in evaData">
                    <div class="cardText">
                        <div class="listData">
                            <span class="contentName">{{item.name}}</span>
                            <rater class="diy-box" :score=item.score :onlyShow=true :stars=starArray></rater>
                        </div>
                        <div class="listData">
                            <span style="font-size: 12px;">{{item.date}}</span>
                        </div>
                        <div class="listData">
                            <span>{{item.content}}</span>
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
                evaData:[
                    {name:"王***",date:"2018年12月12日",score:3,
                        content:"好好好好好好好好好好好好好好好好好好好好好好好好"},
                    {name:"李***",date:"2018年12月12日",score:4,
                        content:"真好真好真好真好真好真.好真好真好真好真好真好真好真好真好真好真好真好真好真好"}
                ],
                starArray:[
                    {
                        light:require("@/assets/images/icon_star@2x.png"),
                        gray:require("@/assets/images/icon_star_gray.png"),
                    },{
                        light:require("@/assets/images/icon_star@2x.png"),
                        gray:require("@/assets/images/icon_star_gray.png"),
                    },{
                        light:require("@/assets/images/icon_star@2x.png"),
                        gray:require("@/assets/images/icon_star_gray.png"),
                    },{
                        light:require("@/assets/images/icon_star@2x.png"),
                        gray:require("@/assets/images/icon_star_gray.png"),
                    },{
                        light:require("@/assets/images/icon_star@2x.png"),
                        gray:require("@/assets/images/icon_star_gray.png"),
                    }
                ],
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
<style  scoped>
.evaContent .contentName {
  font-weight: bold;
}
</style>