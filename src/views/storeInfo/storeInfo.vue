<template>
    <div class="storeInfo">
        <Header post-title="药店信息"  ></Header>
        <div class="outCarint margin45">
            <div class="outCarint">
                <div class="margin16">
                    <div class="cardText title">
                        <div class="store">
                            <div class="storeImg">
                                <img src="@/assets/images/example.png" alt="" style=" ">
                            </div>
                            <div class="storeName">
                                <div >和平大药房（渝北店）</div>
                            </div>
                        </div>
                        <div class="goodEva">
                            <div class=" mu-secondary-text-color">好评率98%</div>
                        </div>
                    </div>
                    <div class="cardText">
                        <span>药店电话：</span>
                        <span style="width: 75%">083-7213099</span>
                    </div>
                    <div class="cardText" style="display: flex">
                        <span>药店地址：</span>
                        <span style="width: 77%;">重庆市渝北区嘉州路88号（和平大药房）</span>
                    </div>
                    <div class="cardText">
                        <span>营业时间：</span>
                        <span style="width: 75%">09:00-21:00</span>
                    </div>
                    <div class="cardText">
                        <span>特色服务：</span>
                        <span style="width: 75%">支持医保、中医坐堂、中药有售</span>
                    </div>
                </div>
                <div class="medTable" >
                    <span v-for="(item, index) in medTableData" :key="'medTableData' + index" @click="switchTo(index)" :class="titleIndex === index ? 'appTabAcitive' : '' ">
                        <span v-if="index==0">{{item.title}}</span>
                        <span v-if="index==1">{{item.title}}({{medTableData.length}})</span>
                    </span>
                </div>
                <div v-if="titleIndex==0" class="storeCard">
                    <div>
                        <p>营业执照</p>
                        <span><img src="@/assets/images/picture1.png" alt=""></span>
                    </div>
                    <div>
                        <p>GSP认证证书</p>
                        <span><img src="@/assets/images/picture1.png" alt=""></span>
                    </div>
                    <div>
                        <p>药品经营许可证</p>
                        <span><img src="@/assets/images/picture1.png" alt=""></span>
                    </div>
                </div>
                <div v-for="(item,i) in evaData" v-if="titleIndex==1">
                    <div class="margin16" style="display: flex">
                        <div class="store">
                            <div class="storeImg">
                                <img src="@/assets/images/example.png" alt="" style=" ">
                            </div>
                        </div>
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
                    <p class="partLine" v-if="i!=evaData.length-1"></p>
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
                titleIndex:0,
                evaData:[
                    {name:"王***",date:"2018-12-12",score:3,
                        content:"好好好好好好好好好好好好好好好好好好好好好好好好"},
                    {name:"李***",date:"2018-12-12",score:4,
                        content:"真好真好真好真好真好真.好真好真好真好真好真好真好真好真好真好真好真好真好真好"}
                ],
                medTableData:[
                    {title:"药店资质"},
                    {title:`用户评价`}
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
            document.title = '药店信息';
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
            storeHistory:function(){},
            userEva:function(){},
            switchTo(num) {
                this.titleIndex = num;
            },
        },
        computed: {

        },

    };
</script>
<style   scoped>
    .storeInfo .title{
        margin-bottom: 16px;
    }
    .storeInfo .title {
        display: flex;
        justify-content: space-between;
    }
    .storeInfo .storeImg{
        border-radius: 50%;
        height:90px;
        width: 90px;
        background-color: #f0f0f0;
        overflow: hidden;
    }
    .storeInfo .storeImg img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
    .storeInfo .goodEva{
        line-height: 90px;
    }
    .storeInfo .goodEva div{
        display: inline-block;
        background-color: #f0f0f0;
        border-radius: 40px;
        padding: 0 8px;
        height: 50px;
        line-height: 50px;
    }
    .storeInfo .partLine{
        margin-bottom: 10px;
    }
    .storeInfo .storeName{
        width: 380px;
        display: table;
        height: 90px;
        margin-left: 4px;
    }
    .storeInfo .storeName div{
        font-size: 30px;
        display: table-cell;
        vertical-align:middle;
    }
    .storeInfo .store{
        display: flex;
        word-wrap: break-word;
        word-break: normal;
    }
    .storeInfo .medTable{
        display: flex;
        justify-content: space-around;
        font-size: 30px;
        cursor: pointer;
    }
    .storeInfo .storeCard div{
        margin: 36px 0px;
    }
    .storeInfo .storeCard img{
        width: 400px;
    }
    .storeInfo .storeCard p{
        padding-bottom: 12px;
    }
</style>