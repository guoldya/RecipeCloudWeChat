<template>
    <div class="recipeRecord">
        <Header post-title="处方记录" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div class="pageContent">
                <span v-for="(item, index) in changeTitle" :key="'changeTitle' + index" @click="switchTo(index)" :class="titleIndex === index ? 'appTabAcitive' : '' ">
                    {{item.title}}
                </span>
            </div>
            <div class="outCarint" v-if="titleIndex===0 && notfound==false">
                <div class="card margin16" v-for="(item,i) in recordData" :key="i">
                    <div class="cardText">
                        <div class="moreGroup md-check-group md-example-child md-example-child-check md-example-child-check-1">
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
                                    <span>{{list.num}}盒</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bButton">
                    <div class="grayButton" @click="allSelect()">
                        <div>
                            <md-check-group class="checkGroup" v-model="favorites" :check="checkedFun(favorites)">
                                <md-check :name="selectAll" />
                                <span>全选</span>
                            </md-check-group>
                        </div>
                    </div>
                    <div class="blueButton" @click="selectStore()">
                        <span>选药店</span>
                    </div>
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
                                    <span>{{list.num}}盒</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
import bus from "../../bus/bus"
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
                {                    date: "2018-12-09", no: "S0027520", isChecked: "已失效", add: "重庆市大大大大医院",
                    userName: "张三三三", dept: "产科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                    ],                },
                {                    date: "2018-12-08", no: "S0027520", isChecked: "已失效", add: "重庆市好大大大医院",
                    userName: "李四", dept: "外科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                    ],                },
                {                    date: "2018-12-07", no: "S0027520", isChecked: "已失效", add: "重庆市真大大大医院",
                    userName: "王五五", dept: "放射科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                    ],                },
                {                    date: "2018-12-06", no: "S0027520", isChecked: "已失效", add: "重庆市真大大大医院",
                    userName: "王五五", dept: "放射科", userData: [
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x1" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                        { med: "盐酸曲美他嗪片（万爽力）", weight: "20mgX30片", num: "x2" },
                    ],                },
                {                    date: "2018-12-05", no: "S0027520", isChecked: "已失效", add: "重庆市真大大大医院",
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
            selectAll: "",
            jumpParams: [],
            jumpArrData: [],
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
        checkedFun: function (val) {
            this.jumpParams = val;
            if (this.recordData.length === this.favorites.length) {
                this.selectAll = this.favorites[this.favorites.length - 1];
            } else {
                this.selectAll = ""
            }
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
            for (let i = 0; i < this.jumpParams.length; i++) {
                this.jumpArrData.push(this.recordData[this.jumpParams[i]])
            }
            bus.$emit('getParam', '666');
            this.$store.commit('addjumpArr', this.jumpArrData);
            if (this.favorites.length < 1) {
                Toast.info('请选择处方');
                return;
            }
            let argu = {};
            this.$router.push({
                name: 'selectStore',
                query: this.jumpParams
            });
        },
        switchTo(num) {
            this.titleIndex = num;
        },
    },
    computed: {

    },
};
</script>
<style   scoped>
@import "recipeRecord.css";
</style>