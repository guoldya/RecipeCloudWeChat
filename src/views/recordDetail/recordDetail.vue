<template>
    <div class="recordDetail">
        <Header post-title="处方详情"  ></Header>
        <div class=" margin55">
            <div v-show="!loadingtrue">
                <div class="flatCard">
                    <div class="cardText" v-for="(item,i) in recipeData" :key="i">
                        <!--<div class="userInfo">-->
                            <!--<span>取药码：092231</span>-->
                            <!--<span>2019-01-12</span>-->
                            <!--<span class="mu-secondary-text-color">未取药</span>-->
                        <!--</div>-->
                        <!--<p class="partLine"></p>-->
                        <div class="hospital">
                            <p>{{item.orgName}}</p>
                        </div>
                        <div class="userInfo">
                            <div>
                                <p>姓名</p>
                                <p class="mu-light-text-color">{{item.patientName}}</p>
                            </div>
                            <div>
                                <p>性别</p>
                                <p class="mu-light-text-color">{{item.sex}}</p>
                            </div>
                            <div>
                                <p>年龄</p>
                                <p class="mu-light-text-color">{{item.age}}岁</p>
                            </div>
                            <div>
                                <p>科室</p>
                                <p class="mu-light-text-color">{{item.dept}}</p>
                            </div>
                        </div>
                        <p class="partLine"></p>
                        <div>
                            <span>临床诊断：{{item.diag}}</span>
                        </div>
                        <!--<div class="listData">-->
                            <!--<span>临床诊断：-->
                                <!--<span class=" ">{{item.diag}}</span>-->
                            <!--</span>-->
                        <!--</div>-->
                    </div>
                </div>
                <div class="flatCard margin5" v-if="detailData.length!=0">
                    <div class="cardText">
                        <div v-for="(item,i) in detailData">
                            <div class="listData medName">
                                <span style="font-size: 16px">{{item.name}}</span>
                                <span>{{item.spec}}</span>
                            </div>
                            <div class="listData userNum">
                                <div class="useAmount">
                                    <span>用法用量：</span>
                                    <span class="mu-secondary-text-color">{{item.eachDose}}</span>
                                    <span class="mu-secondary-text-color">{{item.usage}}</span>
                                    <span class="mu-secondary-text-color">{{item.freq}}</span>
                                </div>
                                <span class="mu-secondary-text-color">{{item.total}}盒</span>
                            </div>
                            <div class="listData userNum docTip" v-if="item.remark!=null">
                                <span>医生嘱托：<span class="mu-secondary-text-color">{{item.remark}}</span></span>
                            </div>
                            <p class="partLine" v-if="i!=detailData.length-1"></p>
                        </div>
                    </div>
                </div>
                <div class="flatCard margin5" v-for="(item,i) in recipeData" :key="i">
                    <div class="cardText">
                        <div class="userSign">
                            <div class="listData userNum">
                                <span>医师：{{item.doctorName}}</span>
                                <span>签名：<img style="position: relative;top: 5px;margin-top: -13px;" src="@/assets/images/jiaxingming.png" alt=""></span>
                            </div>
                            <p class="partLine"></p>
                            <div class="listData userNum">
                                <span>药师审方</span>
                                <span class="mu-secondary-text-color">{{item.status |drugCheck}}</span>
                            </div>
                            <p class="partLine"></p>
                            <div class="listData userNum">
                                <span>审方时间</span>
                                <span class="mu-light-text-color">{{item.authTime |time}}</span>
                            </div>
                            <p class="partLine"></p>
                            <div class="listData userNum">
                                <span>药师</span>
                                <span  class="mu-light-text-color">{{item.druggistName}}</span>
                            </div>
                            <p class="partLine" v-if="item.remark!=null"></p>
                            <div class="listData userNum" v-if="item.remark!=null">
                                <span>注意</span>
                                <span>{{item.remark}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Loading v-show="loadingtrue"></Loading>
        </div>
    </div>
</template>
<script type="text/babel">
    let recipe_getDetails_url="/app/recipe/getDetails ";
    export default {
        data() {
            return {
                
                recipeData:[],
                detailData:[],
                loadingtrue:true,
                detailInfoId:null,
            };
        },
        created() {

        },
        mounted() {
            //console.log(this.detailData);
            this.detailInfo();
            //this.detailData.push(this.$store.state.detailData);
            document.title = '处方详情';

        },
        methods: {
            detailInfo(){
                this.detailInfoId=parseInt(this.$route.query.id);
                this.payType=this.$store.state.payType;
                this.$axios.put(recipe_getDetails_url,{recipeId:this.detailInfoId}, {
                }).then(res => {
                    if (res.data.code == '200') {
                        this.loadingtrue = false;
                        this.recipeData.push(res.data.data.recipe);
                        this.detailData=res.data.data.details;
                        console.log(this.recipeData);
                        console.log(this.detailData);
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            },
        },
        computed: {

        },

    };
</script>
<style   scoped>
@import "recordDetail.css";
</style>