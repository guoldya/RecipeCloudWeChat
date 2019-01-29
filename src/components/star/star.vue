<!--<template>-->
    <!--<div class="star-phone" @click.stop="clickRating">-->
        <!--<div-->
                <!--v-for="(item, index) in starNum"-->
                <!--:key="index"-->
                <!--:class="isRating(index)"-->
                <!--:data-index="index"-->
        <!--/>-->
    <!--</div>-->
<!--</template>-->

<!--<script type="text/ecmascript-6">-->
    <!--export default {-->
        <!--props: {-->
            <!--starNum: {-->
                <!--// 星星的个数-->
                <!--type: Number,-->
                <!--default: 5,-->
            <!--},-->
            <!--defaultRating: {-->
                <!--// 默认点亮的个数-->
                <!--type: Number,-->
                <!--default: 5,-->
            <!--},-->
            <!--outIndex: {-->
                <!--// 外界传进来的一个标识-->
                <!--type: Number,-->
                <!--default: 0,-->
            <!--},-->
            <!--readOnly: {-->
                <!--// 是否是只读，默认不是，拥有点击功能-->
                <!--type: Boolean,-->
                <!--default: false,-->
            <!--},-->
        <!--},-->
        <!--data () {-->
            <!--return {-->
                <!--rating: this.defaultRating, // 用于控制点亮星星的个数-->
            <!--}-->
        <!--},-->
        <!--methods: {-->
            <!--isRating (index) {-->
                <!--++index-->
                <!--return index <= this.rating ? 'star-item star-active' : 'star-item'-->
            <!--},-->
            <!--clickRating (ev) {-->
                <!--if (this.readOnly) {-->
                    <!--return-->
                <!--}-->

                <!--let mark = parseInt(ev.target.dataset.index) + 1-->
                <!--this.rating = mark-->
                <!--this.$emit('starMarkChange', mark, this.outIndex)-->
            <!--},-->
        <!--},-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->
    <!--.star-phone {-->
        <!--position: relative;-->
        <!--display: inline-block;-->
        <!--line-height: 26px;-->
         <!-- -webkit-tap-highlight-color:transparent;-->
    <!--}-->
    <!--.star-item {-->
        <!--display: inline-block;-->
        <!--width: 36px;-->
        <!--height: 26px;-->
        <!--background-image: url('../../assets/images/icon_star@2x.png'); /* 换成图片真实路劲，图片在下面给出 */-->
        <!--background-clip: content-box;-->
        <!--background-position: center 0;-->
        <!--background-repeat: repeat-y;-->
        <!--cursor: pointer;-->
        <!--vertical-align: bottom;-->
        <!--white-space: nowrap;-->
    <!--}-->
    <!--.star-item:last-child {-->
        <!--padding-right: 0;-->
    <!--}-->
    <!--.star-active {-->
        <!--background-position: center 26px;-->
    <!--}-->
<!--</style>-->

<template>
    <div>
        <div class="star mb-10" :class="starType">
            <span class="star-item" v-for = "itemClass in itemClassess" :class="itemClass" track-by="$index"></span>
        </div>
    </div>
</template>

<script>
    const LENGTH = 5;//星星个数
    const CLS_ON = "on";//满星状态
    const CLS_HALF = "half";//半星状态
    const CLS_OFF = "off";//无星状态

    export default {
        props: {
            size: {
                type : Number//参数：尺寸
            },
            score: {
                type : Number//参数：评分
            }
        },
        computed: {
            starType(){//设置星星尺寸
                return "star-" + this.size;
            },
            itemClassess(){
                console.log(11222)
                let result = [];//记录状态的数组
                let score = Math.floor(this.score * 2) / 2;
                let hasDecimal = score % 1 !==0;
                let integer = Math.floor(score);//向下取整
                //全星
                for(let i = 0; i < integer; i++){
                    result.push(CLS_ON);
                }
                //半星
                // if(hasDecimal){
                //     result.push(CLS_HALF);
                // }
                //无星
                if(result.length < LENGTH){
                    result.push(CLS_OFF);
                }
                return result;
            }
        }
    }
</script>

<style>
    .star {
        display: flex;
        width: 100%;
    }
    .star-48 .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-repeat: no-repeat;
        background-size: 20px 20px;
    }
    .star-48 .star-item:last-child {
        margin-right: 0px;
    }
    .star-48 .star-item.on {
        background-image: url("../../assets/images/icon_star@2x.png");
    }
    .star-48 .star-item.half {
        background-image: url("../../assets/images/icon_star_gray.png");
    }
    .star-48 .star-item.off {
        background-image: url("../../assets/images/1.png");
    }

    .star-36 .star-item {
        width: 15px;
        height: 15px;
        margin-right: 6px;
        background-repeat: no-repeat;
        background-size: 15px 15px;
    }
    .star-36 .star-item:last-child {
        margin-right: 0px;
    }
    .star-36 .star-item:last-child {
        margin-right: 0px;
    }
    .star-36 .star-item.on {
        background-image: url("../../assets/images/icon_star@2x.png");
    }
    .star-36 .star-item.half {
        background-image: url("../../assets/images/icon_star_gray.png");
    }
    .star-36 .star-item.off {
        background-image: url("../../assets/images/icon_star_gray.png");
    }
</style>




