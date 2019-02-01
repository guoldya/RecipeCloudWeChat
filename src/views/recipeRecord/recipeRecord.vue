<template>
    <div class="recipeRecord">
        <header class="aui-navBar aui-navBar-fixed">
            <span href="javascript:;" class="aui-navBar-item" @click="$router.go(-1)">
                <img src="@/assets/images/icon_back.png">
            </span>
            <div class="aui-center">
                <span class="aui-center-title">处方记录</span>
            </div>
        </header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div class="pageContent">
                <span v-for="(item, index) in changeTitle" :key="'changeTitle' + index" @click="switchTo(index)" :class="titleIndex === index ? 'appTabAcitive' : '' ">
                    {{item.title}}
                </span>
            </div>
            <div class="outCarint" v-if="titleIndex===0 && notfound==false">
                <div class="card margin16" v-for="(item,i) in recordData">
                    <div class="cardText">
                        <div class="md-check-group md-example-child md-example-child-check md-example-child-check-1">
                            <md-check-group v-model="favorites" :check="checkedFun(favorites)">
                                <md-check :name=i.toString() />
                                <span>{{item.date}}</span>
                            </md-check-group>
                            <span>{{item.no}}</span>
                            <span class="mu-secondary-text-color">{{item.isChecked}}</span>
                        </div>
                        <p class="partLine"></p>
                        <div class="userInfo">
                            <span>{{item.add}}</span>
                            <span>{{item.userName}}</span>
                            <span>{{item.dept}}</span>
                        </div>
                        <div class="fold listData">
                            <span>上呼吸道感染</span>
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
                                    <span>{{list.num}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="selfButton">
                        <md-check-group v-model="favorites" :check="checkedFun(favorites)">
                            <md-check />
                            <span @click="allSelect()">全选</span>
                            <span class="aui-navBar-item">

                                <span>选药店</span>
                            </span>
                        </md-check-group>
                    </div>
                    <!--<md-button type="primary" round @click="selectStore()">选药店</md-button>-->
                </div>
            </div>
            <div class="outCarint" v-if="titleIndex===1 && notfound==false">
                <div class="card margin16" v-for="(item,i) in efficacyData">
                    <div class="cardText">
                        <div class="md-check-group">
                            <span style="margin-left: 0px">{{item.date}}</span>
                            <span>{{item.no}}</span>
                            <span class="mu-secondary-text-color">{{item.isChecked}}</span>
                        </div>
                        <p class="partLine"></p>
                        <div class="userInfo">
                            <span>{{item.add}}</span>
                            <span>{{item.userName}}</span>
                            <span>{{item.dept}}</span>
                        </div>
                        <div class="fold listData">
                            <span>上呼吸道感染</span>
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
                                    <span>{{list.num}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <md-button type="primary" round @click="selectStore()">选药店</md-button>
                </div>
            </div>
            <div class="outCarint" v-if="notfound==true">
                <div class="notFound">
                    <img src="@/assets/images/notfound.png" alt="">
                    <p>您目前没有处方信息</p>
                </div>
            </div>
        </div>

    </div>
</template>
<script type="text/babel">
import { Toast } from "mand-mobile"
export default {
    data() {
        return {
            isWeixin: false,
            changeTitle: [
                { title: '进行中' },
                { title: '历史记录' },
            ],
            titleIndex: 0,
            recordData: [
                {                    date: "2018-12-11", no: "S0027520", isChecked: "未选店", add: "重庆市大大大大医院",
                    userName: "张三三三", dept: "产科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                    ],                },
                {                    date: "2018-12-11", no: "S0027520", isChecked: "未选店", add: "重庆市好大大大医院",
                    userName: "李四", dept: "外科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                    ],                },
                {                    date: "2018-12-11", no: "S0027520", isChecked: "未选店", add: "重庆市真大大大医院",
                    userName: "王五五", dept: "放射科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                    ],                },
                {                    date: "2018-12-11", no: "S0027520", isChecked: "未选店", add: "重庆市真大大大医院",
                    userName: "王五五", dept: "放射科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                    ],                },
                {                    date: "2018-12-11", no: "S0027520", isChecked: "未选店", add: "重庆市真大大大医院",
                    userName: "王五五", dept: "放射科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                    ],                },
            ],
            efficacyData: [
                {                    date: "2018-12-11", no: "S0027520", isChecked: "已失效", add: "重庆市大大大大医院",
                    userName: "张三三三", dept: "产科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                    ],                },
                {                    date: "2018-12-11", no: "S0027520", isChecked: "已失效", add: "重庆市好大大大医院",
                    userName: "李四", dept: "外科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                    ],                },
                {                    date: "2018-12-11", no: "S0027520", isChecked: "已失效", add: "重庆市真大大大医院",
                    userName: "王五五", dept: "放射科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                    ],                },
                {                    date: "2018-12-11", no: "S0027520", isChecked: "已失效", add: "重庆市真大大大医院",
                    userName: "王五五", dept: "放射科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                    ],                },
                {                    date: "2018-12-11", no: "S0027520", isChecked: "已失效", add: "重庆市真大大大医院",
                    userName: "王五五", dept: "放射科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                    ],                },
            ],
            agreeConf: {
                checked: true,
                name: 'agree0',
                size: 'md',
                disabled: false,
                introduction: '选中状态',
            },
            checked: '0',
            favorites: [],
            downImg: true,
            imgIndex: null,
            selectStatus: false,
            notfound: false,
        };
    },
    created() {

    },
    mounted() {
        document.title = '处方记录';
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
        onChange(name, checked) {
            console.log(`agree name = ${name} is ${checked ? 'checked' : 'unchecked'}`)
        },
        methods: {
            onChange(name, checked) {
                console.log(`agree name = ${name} is ${checked ? 'checked' : 'unchecked'}`)
            },
            checkedFun: function (val) {
                console.log(val)
            },
            allSelect: function () {
                this.favorites = [];
                if (this.selectStatus == false) {
                    for (let i = 0; i < this.recordData.length; i++) {
                        this.favorites.push(i.toString());
                    }
                }
                if (this.favorites.length > 1) {
                    this.selectStatus = true;
                } else {
                    this.selectStatus = false;
                }


            },
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
            selectStore: function () {
                if (this.favorites.length < 1) {
                    Toast.info('请选择处方');
                    return;
                }
                let argu = {};
                this.$router.push({
                    name: 'selectStore',
                    query: argu
                });
            },
            switchTo(num) {
                this.titleIndex = num;
            },
        },
        computed: {

        },
    }
};
</script>
<style   scoped>
.recipeRecord .md-check-group,
.recipeRecord .userInfo {
  display: flex;
  justify-content: space-between;
}
.recipeRecord .md-check-group span {
  height: 66px;
  line-height: 66px;
  margin-left: 12px;
}
.recipeRecord .userInfo span {
  font-size: 28px;
  font-weight: bold;
}
.recipeRecord .fold span {
  font-size: 24px;
  color: #979797;
}
.foldImg img {
  width: 36px;
  float: right;
}
.block {
  display: block;
}
.none {
  display: none;
}
.recipeRecord .selfButton {
  margin-bottom: 40px;
}
/deep/.md-icon.icon-font.md {
  font-size: 46px !important;
}
.userNum span {
  padding-top: 0px;
}
.recipeRecord .notFound {
  text-align: center;
  padding-top: 160px;
}
.recipeRecord .notFound p {
  color: #979797;
  font-size: 32px;
  padding: 40px;
}
.selfButton {
  width: 654px;
  height: 100px;
  background-color: #1da1f3;
  border-radius: 60px;
}
.selfButton span {
  height: 100px;
  line-height: 100px;
  font-size: 28px;
  color: #fff;
}
</style>