<template>
    <div class="applyDetail">
        <Header post-title="申请详情" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div class="outCarint">
                <div v-for="(item,i) in recipeData">
                    <div class="card margin16" >
                        <div class="cardText ">
                            <div class="listData">
                                <span>处方号：
                                    <span class="mu-secondary-text-color">{{item.no}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>处方日期：
                                    <span class="mu-secondary-text-color">{{item.date}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>姓名：
                                    <span class="mu-secondary-text-color">{{item.name}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>年龄：
                                    <span class="mu-secondary-text-color">{{item.age}}</span>
                                </span>
                                <span style="width: 50%">性别：
                                    <span class="mu-secondary-text-color">{{item.sex}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>科室：
                                    <span class="mu-secondary-text-color">{{item.dept}}</span>
                                </span>
                                <span style="width: 50%;">开方医生：
                                    <span class="mu-secondary-text-color">{{item.doc}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>续方类型：
                                    <span class="mu-secondary-text-color">{{item.type}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>慢病诊断：
                                    <span class="mu-secondary-text-color">{{item.result}}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="card margin16" >
                        <div class="cardText ">
                            <div class="listData">
                                <span>申请日期：
                                    <span class="mu-secondary-text-color">{{item.applyDate}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>处理状态：
                                    <span class="mu-secondary-text-color">{{item.auditState}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>续方事由：</span>
                                <span class="mu-secondary-text-color longWord">{{item.recipeReason}}</span>
                            </div>
                            <div class="listData">
                                <span>续方日期：
                                    <span class="mu-secondary-text-color">{{item.recipeDate}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>续方处方号：
                                    <span class="mu-secondary-text-color">{{item.recipeNo}}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="card margin16" >
                        <div class="cardText ">
                            <div class="listData">
                                <span>审方医生：
                                    <span class="mu-secondary-text-color">{{item.auditDoc}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>审方日期：
                                    <span class="mu-secondary-text-color">{{item.auditDate}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>医生备注：</span>
                                <span class="mu-secondary-text-color longWord">{{item.docRemark}}</span>
                            </div>
                            <div class="listData">
                                <span>审方药师：
                                    <span class="mu-secondary-text-color">{{item.teacherDoc}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>审方日期：
                                    <span class="mu-secondary-text-color">{{item.teacherDate}}</span>
                                </span>
                            </div>
                            <div class="listData">
                                <span>药师备注：</span>
                                <span class="mu-secondary-text-color longWord">{{item.teacherRemark}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card margin16" >
                        <div class="cardText ">
                            <div class="listBottom mu-light-text-color" v-for="item in listBottom">
                                <span>{{item.name}}</span>
                                <span v-if="isContinue==true">{{item.num}} 盒</span>
                                <span v-else>{{item.num}} 盒</span>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <md-button type="primary" round  v-if="isContinue==true" @click="look">查看续方处方</md-button>
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
                recipeData:[
                    {no:"CQ11111111",date:"2018年11月11日", name:this.$route.query.name,age:"18",
                        sex:"男",dept:"内科",doc:"杜甫李白",type:"首诊续方", result:"高血压",
                        applyDate:"2018年11月11日",auditState:"审核未通过",
                        recipeReason:"杜甫李白首诊续方首诊续方首诊续方首诊续方首诊续方首诊续方首诊续方" +
                        "首诊续方首诊续方首诊续方首诊续方首诊续方首诊续方首诊续续方首诊续方首诊续方首诊续方首诊续方首诊续" +
                        "续方首诊续方首诊续方首诊续方首诊续方首诊续续方首诊续方首诊续方首诊续方首诊续方首诊续方首诊续方首诊续方",
                        recipeDate:"2018年11月11日",recipeNo:"内科",auditDoc:"杜甫李白",
                        auditDate:"2018年11月11日",
                        docRemark:"杜甫李白首诊续方首诊续方首诊续方首诊续方首诊续方首诊续方首诊续方杜甫李白首诊续" +
                        "方首诊续方首诊续方首诊续方首诊续方首诊续方首诊续方杜甫李白首诊续方首诊续方首诊续方首" +
                        "诊续方首诊续方首诊续方首诊续方",
                        teacherDoc:"黄药师",teacherDate:"2018年11月11日",
                        teacherRemark:"杜甫李白首诊续方首诊续方首诊续方首诊续方首诊续方首诊杜甫李白首诊续" +
                        "方首诊续方首诊续方首诊续方首诊续方首诊杜甫李白首诊续方首诊续方首诊续方首诊续方首诊续方首诊",
                    }
                ],
                listBottom:[
                    {name:"培哚普利（100mg*7），口服（每日三次）每次100mg",num:"115"},
                    {name:"培哚普利（100mg*7）, 口服（每日三次）每次100mg",num:"115"},
                    {name:"培哚普利（100mg*7）, 口服（每日三次）每次100mg",num:"115"},
                ],
                isContinue:true,
            };
        },
        created() {

        },
        mounted() {
            document.title = '申请详情';
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
            look(){

            },
        },
        computed: {

        },

    };
</script>
<style   scoped>
    @import "../recipeDetail/recipeDetail.css";
</style>