<template>
    <div class="applyDetail">
        <Header post-title="申请详情"  ></Header>
        <div class="margin55">
            <div v-for="(item,i) in recipeData" class="detail-content" :key="i">
                <div class="flatCard cardText" v-for="(item,i) in recipeData">
                    <div class="listData">
                        <span>处方号</span>
                        <span class="mu-light-text-color">{{item.no}}</span>
                    </div>
                    <div class="listData">
                        <span>处方日期</span>
                        <span class="mu-light-text-color">{{item.date}}</span>
                    </div>
                    <div class="listData">
                        <span>姓名</span>
                        <span class="mu-light-text-color">{{item.name}}</span>
                    </div>
                    <div class="listData">
                        <span>年龄</span>
                        <span class="mu-light-text-color">{{item.age}}</span>
                    </div>
                    <div class="listData">
                        <span>性别</span>
                        <span class="mu-light-text-color">{{item.sex}}</span>
                    </div>
                    <div class="listData">
                        <span>科室</span>
                        <span class="mu-light-text-color">{{item.dept}}</span>
                    </div>
                    <div class="listData">
                        <span>开方医生</span>
                        <span class="mu-light-text-color">{{item.doc}}</span>
                    </div>
                    <div class="listData">
                        <span>续方类型</span>
                        <span class="mu-secondary-text-color">{{item.type}}</span>
                    </div>
                    <div class="listData">
                        <span>慢病诊断</span>
                        <span class="mu-secondary-text-color">{{item.result}}</span>
                    </div>
                </div>
                <div class="flatCard outCarint margin5" >
                    <div class="listData">
                        <span>申请日期</span>
                        <span class="mu-light-text-color">{{item.applyDate}}</span>

                    </div>
                    <div class="listData">
                        <span>处理状态</span>
                        <span class="mu-secondary-text-color">{{item.auditState}}</span>
                    </div>
                    <div class="listData parElem">
                        <span class="sonElem">续方事由</span>
                        <span>{{item.recipeReason}}</span>
                    </div>
                    <div class="listData">
                        <span>续方日期</span>
                        <span class="mu-light-text-color">{{item.recipeDate}}</span>
                    </div>
                    <div class="listData">
                        <span>续方处方号</span>
                        <span class="mu-light-text-color">{{item.recipeNo}}</span>
                    </div>
                </div>
                <div class="flatCard outCarint margin5" >
                    <div class="listData">
                        <span>审方医生</span>
                        <span class="mu-light-text-color">{{item.auditDoc}}</span>
                    </div>
                    <div class="listData">
                        <span>审方日期</span>
                        <span class="mu-light-text-color">{{item.auditDate}}</span>
                    </div>
                    <div class="listData parElem">
                        <span class="sonElem">医生备注</span>
                        <span>{{item.docRemark}}</span>
                    </div>
                    <div class="listData">
                        <span>审方药师</span>
                        <span class="mu-light-text-color">{{item.teacherDoc}}</span>
                    </div>
                    <div class="listData">
                        <span>审方日期</span>
                        <span class="mu-light-text-color">{{item.teacherDate}}</span>
                    </div>
                    <div class="listData parElem">
                        <span class="sonElem">药师备注</span>
                        <span>{{item.teacherRemark}}</span>
                    </div>
                </div>
                <div class="flatCard outCarint margin16" >
                    <div>
                        <div class="listBottom mu-light-text-color" v-for="item in listBottom">
                            <span>{{item.name}}</span>
                            <span v-if="isContinue==true">{{item.num}} 盒</span>
                            <span v-else>{{item.num}} 盒</span>
                        </div>
                    </div>
                </div>
            </div>
            <div style="height: 50px"></div>
            <p class="addbTN" v-if="isContinue==true" @click="look">查看续方处方</p>
        </div>
    </div>
</template>
<script type="text/babel">
    export default {
        data() {
            return {
                
                recipeData:[
                    {no:"CQ11111111",date:"2018年11月11日", name:this.$route.query.name,age:"18",
                        sex:"男",dept:"内科",doc:"杜甫李白",type:"首诊续方", result:"高血压",
                        applyDate:"2018年11月11日",auditState:"审核未通过",
                        recipeReason:"首诊续方首诊续方首诊续方",
                        recipeDate:"2018年11月11日",recipeNo:"内科",auditDoc:"杜甫李白",
                        auditDate:"2018年11月11日",
                        docRemark:"首诊续方首诊续方首诊续方",
                        teacherDoc:"黄药师",teacherDate:"2018年11月11日",
                        teacherRemark:"首诊续方首诊续方首诊续方首诊续方首诊续方首诊",
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