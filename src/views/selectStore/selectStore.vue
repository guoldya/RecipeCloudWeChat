<template>
    <div class="selectStore">
        <Header post-title="药店选择" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div class="outCarint">
                <div class="card margin16" v-for="(item,i) in acceptJumpData">
                    <div class="cardText">
                        <div>
                            <span>{{item.date}}</span>
                            <span style="margin-left: 38px">{{item.no}}</span>
                        </div>
                        <p class="partLine"></p>
                        <div class="userInfo">
                            <span>{{item.add}}</span>
                            <span>{{item.userName}}</span>
                            <span>{{item.dept}}</span>
                        </div>
                        <div class="fold listData">
                            <span class="mu-light-text-color">上呼吸道感染</span>
                        </div>
                        <div class="foldImg" @click="foldFun(i)">
                            <div>
                                <img src="@/assets/images/icon_down@2x.png" alt="" :class="imgIndex === i ? 'block' : 'none' ">
                                <img src="@/assets/images/icon_up@2x.png" alt="" :class="imgIndex === i ? 'none' : 'block' ">
                                <div style="clear:both;"></div>
                            </div>
                            <div :class="imgIndex === i ? 'block' : 'none'" v-for="list in item.userData">
                                <div class="listData">
                                    <span>{{list.med}}</span>
                                </div>
                                <div class="listData userNum">
                                    <span>{{list.weight}}</span>
                                    <span>{{list.num}}盒</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="selectFilter">
                    <p class="title">选择药店</p>
                    <div class="selectContent">
                        <div class="pageContent" v-for="(item, index) in changeTitle">
                            <div class="updownImg" :key="'changeTitle' + index" @click="switchTo(index)" :class="titleIndex === index ? 'appTabAcitive' : '' ">
                                <span>{{item.title}}</span>
                                <div v-if="index==1" class="imgDiv">
                                    <div><img :src="upImg" alt=""></div>
                                    <div><img :src="openImg" alt=""></div>
                                </div>
                                <div v-if="index==2" class="imgDiv">
                                    <div><img :src="farUpImg" alt=""></div>
                                    <div><img :src="farOpenImg" alt=""></div>
                                </div>
                                <div v-if="index==3" class="singleImg">
                                    <img :src="filterUpImg" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="hospital" v-for="(item,i) in hosData" :class="farIndex==3? 'none' : 'block' ">
                        <div style="margin-bottom: 10px">
                            <div class="hosImg" @click="storeInfo">
                                <img src="@/assets/images/example.png" alt="" style=" ">
                            </div>
                            <div class="hosInfo" @click="submitOrder">
                                <div>
                                    <span>{{item.name}}</span>
                                    <span class="mu-secondary-text-color">{{item.type}}</span>
                                </div>
                                <div>
                                    <rater class="diy-box" :score=item.score :onlyShow=true :stars=starArray></rater>
                                    <span class="mu-secondary-text-color">{{item.score}}分</span>
                                </div>
                                <div>
                                    <span>共{{item.medNum}}种药品 {{item.fee}}元</span>
                                    <span>{{item.far}}km</span>
                                </div>
                            </div>
                        </div>
                        <p v-if="i!=hosData.length-1" class="partLine"></p>
                    </div>
                    <div class="hospital" :class="farIndex==3? 'filterOpen' : 'filterClose' ">
                        <div class="method">
                            <img src="@/assets/images/icon_delivery.png" alt="" style=" ">
                            <span class="mu-light-text-color">送货方式</span>
                        </div>
                        <div class="toHome">
                            <span v-for="(item, index) in shopMethod" :key="'shopMethod' + index" @click="shopMethodFun(index)" :class="methodIndex === index ? 'methodTabAcitive' : '' ">
                                {{item.title}}
                            </span>
                        </div>
                        <div class="methodButton">
                            <md-button type="default" round @click="reset">重置</md-button>
                            <md-button type="primary" round @click="confirm">确定</md-button>
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
            imgIndex: null,
            downImg: true,
            acceptJumpData: [],
            changeTitle: [
                { title: '综合' },
                { title: '价格' },
                { title: '距离' },
                { title: '筛选' },
            ],
            titleIndex: 0,
            methodIndex: 0,
            upImg: require("@/assets/images/icon_up2_pre@2x.png"),
            openImg: require("@/assets/images/icon_open@2x.png"),
            farUpImg: require("@/assets/images/icon_up2_pre@2x.png"),
            farOpenImg: require("@/assets/images/icon_open@2x.png"),
            filterUpImg: require("@/assets/images/icon_up2_pre@2x.png"),
            filterOpenImg: require("@/assets/images/icon_open@2x.png"),
            imgNumArr: ["0"],
            farNumArr: ["0"],
            filterNumArr: ["0"],
            starArray: [
                {
                    light: require("@/assets/images/icon_star@2x.png"),
                    gray: require("@/assets/images/icon_star_gray.png"),
                }, {
                    light: require("@/assets/images/icon_star@2x.png"),
                    gray: require("@/assets/images/icon_star_gray.png"),
                }, {
                    light: require("@/assets/images/icon_star@2x.png"),
                    gray: require("@/assets/images/icon_star_gray.png"),
                }, {
                    light: require("@/assets/images/icon_star@2x.png"),
                    gray: require("@/assets/images/icon_star_gray.png"),
                }, {
                    light: require("@/assets/images/icon_star@2x.png"),
                    gray: require("@/assets/images/icon_star_gray.png"),
                }
            ],
            hosData: [
                { name: "和平药房渝北店", type: "支持配送、自提", score: 4, medNum: "4", fee: "188", far: "1.1" },
                { name: "和平药房渝北店", type: "支持配送", score: 3, medNum: "4", fee: "177", far: "1.1" }
            ],
            farIndex: null,
            shopMethod: [
                { title: "到店自提" },
                { title: "配送到家" },
            ],
        };
    },
    created() {
    },
    mounted() {
        this.acceptJumpData=this.$store.state.jumpArr;
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
        foldFun: function (val) {
            this.imgIndex = val;
            if (this.downImg == true) {
                this.downImg = false;
                this.imgIndex = val;
            } else
                if (this.downImg == false) {
                    this.downImg = true;
                    this.imgIndex = -1;
                }
        },
        switchTo(num) {
            this.farIndex = null;
            let len = this.imgNumArr.length;
            let farLen = this.farNumArr.length;
            let filterLen = this.filterNumArr.length;
            this.titleIndex = num;
            if (num != 1) {
                this.imgNumArr = ["0"];
                this.upImg = require("@/assets/images/icon_up2_pre@2x.png");
                this.openImg = require("@/assets/images/icon_open@2x.png");
            }
            if (num != 2) {
                this.farNumArr = ["0"];
                this.farUpImg = require("@/assets/images/icon_up2_pre@2x.png");
                this.farOpenImg = require("@/assets/images/icon_open@2x.png");
            }
            if (num != 3) {
                this.filterNumArr = ["0"];
                this.filterUpImg = require("@/assets/images/icon_up2_pre@2x.png");
            }
            if (len % 2 != 0 && num == 1) {
                this.imgNumArr.push(num);
                this.upImg = require("@/assets/images/icon_up_pre@2x.png");
                this.openImg = require("@/assets/images/icon_open@2x.png");
            } else if (len % 2 == 0 && num == 1) {
                this.imgNumArr.push(num);
                this.upImg = require("@/assets/images/icon_up2_pre@2x.png");
                this.openImg = require("@/assets/images/icon_open_pre@2x.png");
            }

            if (farLen % 2 != 0 && num == 2) {
                this.farNumArr.push(num);
                this.farUpImg = require("@/assets/images/icon_up_pre@2x.png");
                this.farOpenImg = require("@/assets/images/icon_open@2x.png");
            } else if (farLen % 2 == 0 && num == 2) {
                this.farNumArr.push(num);
                this.farUpImg = require("@/assets/images/icon_up2_pre@2x.png");
                this.farOpenImg = require("@/assets/images/icon_open_pre@2x.png");
            }
            if (filterLen % 2 != 0 && num == 3) {
                this.farIndex = "3";
                this.filterNumArr.push(num);
                this.filterUpImg = require("@/assets/images/icon_open_pre@2x.png");
            } else if (filterLen % 2 == 0 && num == 3) {
                this.farIndex = "-1";
                this.filterNumArr.push(num);
                this.filterUpImg = require("@/assets/images/icon_up_pre@2x.png");
            }
        },
        reset: function () {
            this.farIndex = "-1";
        },
        confirm: function () {
            this.farIndex = "-1";
        },
        shopMethodFun: function (num) {
            this.methodIndex = num;
        },
        storeInfo: function () {
            let argu = {};
            this.$router.push({
                name: 'storeInfo',
                query: argu
            });
        },
        submitOrder: function () {
            let argu = {};
            this.$router.push({
                name: 'submitOrder',
                query: argu
            });
        },
    },
    computed: {

    },

};
</script>
<style   scoped>
.selectFilter .title {
  font-size: 32px;
  font-weight: bold;
}
/deep/.md-tab-bar-ink {
  top: 84px !important;
  height: 4px !important;
}
/deep/.md-tab-bar {
  background-color: transparent;
}
.md-example-child-tabs .content {
  padding: 12px 0;
  font-size: 28px;
  background: #fff;
  line-height: 1.5;
  box-sizing: border-box;
}
.md-tabs-content {
  min-height: 400px;
  background: #fff;
}
.selectContent {
  display: flex;
  justify-content: space-between;
  padding: 24px 52px;
}
.selectContent .pageContent span {
  width: 64px;
  line-height: 64px;
}
.selectContent .pageContent img {
  width: 24px;
}
.selectContent .pageContent {
  padding: 0px;
}
.selectContent .pageContent .imgDiv {
  line-height: 20px;
  margin-top: 8px;
}
.selectContent .pageContent .singleImg {
  line-height: 52px;
}
.selectContent .pageContent .updownImg {
  display: flex;
}
.selectStore .hospital {
  margin-top: 10px;
}
.selectStore .hospital div:first-child {
  display: flex;
}
.selectStore .hospital .hosImg {
  border-radius: 24px;
  height: 164px;
  width: 164px;
  background-color: #f0f0f0;
  overflow: hidden;
}
.selectStore .hospital .hosImg img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.selectStore .hospital .hosInfo {
  width: 492px;
  padding-left: 22px;
}
.selectStore .hospital .hosInfo div {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.selectStore .hospital .hosInfo div:nth-child(2) {
  display: inline-flex;
}
.selectStore .hospital .hosInfo div:nth-child(2) span {
  line-height: 56px;
}
.hosInfo .diy-box {
  margin-left: 0px;
}
.hospital .method {
  padding-left: 48px;
}
.hospital .method span {
  height: 60px;
  line-height: 60px;
  margin-left: 20px;
}
.hospital .toHome {
  font-size: 32px;
  display: flex;
  justify-content: space-around;
  margin: 10px 0 50px 0px;
}
.selectStore .methodButton {
  display: flex;
  justify-content: space-around;
}
.selectStore .md-button.block {
  height: 80px;
  width: 40%;
}
.selectStore .primary {
  font-size: 28px;
}
.selectStore .default {
  background-color: #f7f7f8 !important;
  color: #979797 !important;
  font-size: 28px;
}
.selectStore .default:after {
  border: 1px solid #f7f7f8 !important;
}
.filterOpen {
  position: absolute;
  left: 0px;
  /*top: 798px;*/
  width: 100%;
  z-index: 2;
  background-color: #fff;
}
.filterClose {
  display: none;
}
</style>