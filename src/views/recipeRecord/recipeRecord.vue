<template>
    <div class="recipeRecord">
        <Header post-title="处方记录" v-on:switchToValue="switchToValue">
            <span  :class="selectAll==''? '' : 'mu-secondary-text-color' ">全选</span>
        </Header>
        <div class="margin55">
            <!--<div class="pageContent">-->
                <!--<span v-for="(item, index) in changeTitle" :key="'changeTitle' + index" @click="switchTo(index)" :class="titleIndex === index ? 'appTabAcitive' : '' ">-->
                    <!--{{item.title}}-->
                <!--</span>-->
            <!--</div>-->
            <!--<div v-if="titleIndex===0 && notfound==false">-->
                <!--<div class="card margin16" v-for="(item,i) in recordData" :key="i">-->
                    <!--<div class="cardText leftPart">-->
                        <!--<div class="moreGroup md-check-group md-example-child md-example-child-check md-example-child-check-1" @click="getJumpId(item.id)">-->
                            <!--<md-check-group v-model="favorites" :check="checkedFun(favorites)">-->
                                <!--<md-check :name=i.toString() />-->
                                <!--<span>{{item.date}}</span>-->
                            <!--</md-check-group>-->
                            <!--<span>{{item.no}}</span>-->
                            <!--<span class="mu-secondary-text-color">{{item.isChecked}}</span>-->
                        <!--</div>-->
                        <!--<p class="partLine"></p>-->
                        <!--<div @click="recordDetail(i,item.id)">-->
                            <!--<div class="userInfo">-->
                                <!--<span>{{item.add}}</span>-->
                                <!--<span>{{item.userName}}</span>-->
                                <!--<span>{{item.dept}}</span>-->
                            <!--</div>-->
                            <!--<div class="fold listData">-->
                                <!--<span>上呼吸道感染</span>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="foldImg" @click="foldFun(i)">-->
                            <!--<div>-->
                                <!--<img src="@/assets/images/icon_down@2x.png" alt="" :class="imgIndex === i ? 'block' : 'none' ">-->
                                <!--<img src="@/assets/images/icon_up@2x.png" alt="" :class="imgIndex === i ? 'none' : 'block' ">-->
                                <!--<div style="clear:both;"></div>-->
                            <!--</div>-->
                            <!--<div :class="imgIndex === i ? 'block' : 'none'" v-for="list in item.userData">-->
                                <!--<div class="listData">-->
                                    <!--<span>{{list.med}}</span>-->
                                <!--</div>-->
                                <!--<div class="listData userNum">-->
                                    <!--<span>{{list.weight}}</span>-->
                                    <!--<span>{{list.num}}盒</span>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="bButton">-->
                    <!--<div class="grayButton" @click="allSelect()">-->
                        <!--<div>-->
                            <!--<md-check-group class="checkGroup" v-model="favorites" :check="checkedFun(favorites)">-->
                                <!--<md-check :name="selectAll" />-->
                                <!--<span>全选</span>-->
                            <!--</md-check-group>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="blueButton" @click="selectStore()">-->
                        <!--<span>选药店</span>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->

            <div v-if="recordData.length!=0" v-show="!loadingtrue">
                <div class="flatCard cardText margin5" v-for="(item,i) in recordData" :key="i">
                    <div v-if="i==0">
                        <div>
                            <div class="listData mu-secondary-text-color" @click="getJumpId(item.id)"><!--class="md-check-group"-->
                                <md-check-group v-model="favorites" :check="checkedFun(favorites)">
                                    <md-check :name=i.toString()  class="lg"/>
                                    <span style="margin-left: 4px">{{item.recipeDate | time}}</span>
                                </md-check-group>
                                <span>{{item.code}}</span>
                            </div>
                            <p class="partLine"></p>
                            <div  @click="recordDetail(i,item.id)">
                                <div class="listData blod">
                                    <span>{{item.orgName}}</span>
                                    <span>{{item.patientName}}</span>
                                    <span>{{item.dept}}</span>
                                </div>
                                <div class="fold listData">
                                    <span>{{item.diag}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="foldImg" @click="foldFun(i)">
                            <p :class="firImgIndex === i ? 'block' : 'none'" v-if="item.bizRecipeDetails.length!=0" class="partLine"></p>
                            <div :class="firImgIndex === i ? 'block' : 'none'" v-for="list in item.bizRecipeDetails">
                                <div class="listData">
                                    <span>{{list.name}}</span>
                                </div>
                                <div class="listData userNum mu-light-text-color" >
                                    <span>{{list.spec}}</span>
                                    <span>{{list.total}} {{list.packUnit}}</span>
                                </div>
                            </div>
                            <div>
                                <img src="@/assets/images/icon_up@2x.png" alt="" :class="firImgIndex === i ? 'block' : 'none' ">
                                <img src="@/assets/images/icon_down@2x.png" alt="" :class="firImgIndex === i ? 'none' : 'block' ">
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div>
                            <div class="listData mu-secondary-text-color" @click="getJumpId(item.id)"><!--class="md-check-group"-->
                                <md-check-group v-model="favorites" :check="checkedFun(favorites)">
                                    <md-check :name=i.toString() />
                                    <span style="margin-left: 4px">{{item.recipeDate | time}}</span>
                                </md-check-group>
                                <span>{{item.code}}</span>
                                <!--<span class="mu-secondary-text-color">{{item.isChecked}}</span>-->
                            </div>
                            <p class="partLine"></p>
                            <div  @click="recordDetail(i,item.id)">
                                <div class="listData blod">
                                    <span>{{item.orgName}}</span>
                                    <span>{{item.patientName}}</span>
                                    <span>{{item.dept}}</span>
                                </div>
                                <div class="fold listData">
                                    <span>{{item.diag}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="foldImg" @click="foldFun(i)">
                            <p :class="imgIndex === i ? 'block' : 'none'" v-if="item.bizRecipeDetails.length!=0" class="partLine"></p>
                            <div :class="imgIndex === i ? 'block' : 'none'" v-for="list in item.bizRecipeDetails">
                                <div class="listData">
                                    <span>{{list.name}}</span>
                                </div>
                                <div class="listData userNum mu-light-text-color" >
                                    <span>{{list.spec}}</span>
                                    <span>{{list.total}} {{list.packUnit}}</span>
                                </div>
                            </div>
                            <div>
                                <img src="@/assets/images/icon_up@2x.png" alt="" :class="imgIndex === i ? 'block' : 'none' ">
                                <img src="@/assets/images/icon_down@2x.png" alt="" :class="imgIndex === i ? 'none' : 'block' ">
                            </div>
                        </div>
                    </div>
                </div>
                <p v-show="nomore" class="noMore">没有更多数据了</p>
                <div style="height: 27px"></div>
                <p class="addbTN" @click="selectStore()">去下单</p>
            </div>
            <div v-show="!loadingtrue" class="nullDiv" v-else>
                <img src="@/assets/images/null1.png">
            </div>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
                <span v-if="recordData.length!=0&&!nomore">
                    <span class="mu-light-text-color">加载中</span>
                    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                </span>
            </div>
            <Loading v-show="loadingtrue"></Loading>
            <!--<div class="outCarint" v-if="notfound==true">-->
                <!--<div class="notFound">-->
                    <!--<img src="@/assets/images/notfound.png" alt="">-->
                    <!--<p>您目前没有处方信息</p>-->
                <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>
<script type="text/babel">
import { Toast } from "mand-mobile"
let recipe_getList_url="/recipe/getList ";
export default {

    data() {
        return {

            changeTitle: [
                { title: '进行中' },
                { title: '历史记录' },
            ],
            titleIndex: 0,
            recordData: [],
            efficacyData: [],
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
            firImgIndex: 0,
            selectStatus: false,
            notfound: false,
            selectAll: "",
            jumpParams: [],
            jumpArrData: [],
            jumpId:[],
            busy: true,
            nomore: false,
            loadingtrue: true,
            page: 1,
            pageSize:10,
        };
    },
    created() {
    },
    mounted() {
        this.recipeFun(false);
        document.title = '处方记录';
    },
    methods: {
        recipeFun(flag) {
            const params = {};
            params.pageNumber = this.page;
            params.pageSize = this.pageSize;
            //params.queryType = this.type;
            this.$axios.put(recipe_getList_url, params).then((res) => {
                if (res.data.rows) {
                    this.loadingtrue = false;
                    if (flag) {
                        this.recordData = this.recordData.concat(res.data.rows);  //concat数组串联进行合并
                        if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                            this.busy = false;
                            this.nomore = false;
                        } else {
                            this.busy = true;
                            this.nomore = true;
                        };
                    } else {
                        this.recordData = res.data.rows;
                        this.busy = true;
                        if (res.data.total < 10) {
                            this.busy = true;
                            this.nomore = true;
                        } else {
                            this.busy = false;
                            this.nomore = false;
                        }
                    }
                } else {
                    this.recordData = []
                }
            })
        },
        onChange(name, checked) {
            console.log(`agree name = ${name} is ${checked ? 'checked' : 'unchecked'}`)
        },
        checkedFun: function (val) {
            this.jumpParams = val;
            if (this.recordData.length === this.favorites.length) {
                this.selectAll = this.favorites[this.favorites.length - 1];
                //this.$store.commit('activeFun', this.favorites);
            } else {
                this.selectAll = ""
            }
            this.$store.commit('activeFun', this.favorites);
        },
        getJumpId(val) {
            this.jumpId.push(val);
        },
        switchToValue: function () {
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
            this.jumpId=[];
            for (let i = 0; i < this.jumpParams.length; i++) {
                this.jumpId.push(this.recordData[this.jumpParams[i]].id);
            }
            console.log(this.jumpId);
        },
        foldFun: function (val) {
             if (this.downImg == true) {
                 if(val==0 && this.firImgIndex==0){
                     this.firImgIndex = -1;
                 }else{
                     this.imgIndex = val;
                     this.firImgIndex = -1;
                 }
                 if(this.imgIndex!=0){
                     this.imgIndex=-1
                 }
                 this.downImg = false;
            } else if (this.downImg == false) {
                 if(val==0 && this.firImgIndex==-1){
                     this.firImgIndex = 0;
                 }else{
                     this.firImgIndex = -1;
                 }
                 this.imgIndex = val;
                 this.downImg = true;
            }
        },
        recordDetail(val, par) {
            let argu = {id:par};
            this.$router.push({
                name: 'recordDetail',
                query: argu
            });
        },
        selectStore: function () {
            if (this.favorites.length < 1) {
                Toast.info('请选择处方');
                return;
            }

            // for (let i = 0; i < this.jumpParams.length; i++) {
            //     this.jumpArrData.push(this.recordData[this.jumpParams[i]])
            // }
            // this.$store.commit('addjumpArr', this.jumpArrData);
            // let argu = {};
            this.$router.push({
                name: 'submitOrder',
                query: { id: this.jumpId }
            });
        },
        switchTo(num) {
            this.titleIndex = num;
        },
        loadMore() {
            this.busy = true;  //将无限滚动给禁用
            setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                this.page++;  //滚动之后加载第二页
                this.recipeFun(true);
            }, 500);
        },
    },
    watch: {
        "$route": function (to, from) {
            console.log(to,from);
            from.meta.keepAlive = false;
            to.meta.keepAlive = false;
        }
    },
    computed: {

    },
};
</script>
<style   scoped>
@import "recipeRecord.css";
</style>