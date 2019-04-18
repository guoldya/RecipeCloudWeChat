<template>
    <div class="applyDetail">
        <Header post-title="申请详情"></Header>
        <div class="margin55">
            <div class="detail-content">
                <div class="flatCard cardText">
                    <div class="listData">
                        <span>处方号</span>
                        <span class="mu-light-text-color">{{recipeData.code}}</span>
                    </div>
                    <div class="listData">
                        <span>处方日期</span>
                        <span class="mu-light-text-color">{{recipeData.recipeDate|lasttime}}</span>
                    </div>
                    <div class="listData">
                        <span>姓名</span>
                        <span class="mu-light-text-color">{{recipeData.patientName}}</span>
                    </div>
                    <div class="listData">
                        <span>年龄</span>
                        <span class="mu-light-text-color">{{recipeData.age}}</span>
                    </div>
                    <div class="listData">
                        <span>性别</span>
                        <span class="mu-light-text-color">{{recipeData.sex}}</span>
                    </div>
                    <div class="listData">
                        <span>科室</span>
                        <span class="mu-light-text-color">{{recipeData.dept}}</span>
                    </div>
                    <div class="listData">
                        <span>开方医生</span>
                        <span class="mu-light-text-color">{{recipeData.doctorName}}</span>
                    </div>
                    <div class="listData">
                        <span>续方类型</span>
                        <span class="mu-secondary-text-color">{{recipeData.type}}</span>
                    </div>
                    <div class="listData">
                        <span>慢病诊断</span>
                        <span class="mu-secondary-text-color">{{recipeData.diag}}</span>
                    </div>
                </div>
                <div class="flatCard outCarint margin5">
                    <div class="listData">
                        <span>申请日期</span>
                        <span class="mu-light-text-color">{{recipeData.createTime|lasttime}}</span>

                    </div>
                    <div class="listData">
                        <span>处理状态</span>
                        <span class="mu-secondary-text-color">{{recipeData.status|recipeTypeFilter}}</span>
                    </div>
                    <div class="listData parElem">
                        <span class="sonElem">续方事由</span>
                        <span>{{recipeData.applyCause}}</span>
                    </div>
                    <div class="listData">
                        <span>续方日期</span>
                        <span class="mu-light-text-color">{{recipeData.recipeDate}}</span>
                    </div>
                    <div class="listData">
                        <span>续方处方号</span>
                        <span class="mu-light-text-color">{{recipeData.recipeNo}}</span>
                    </div>
                </div>
                <div class="flatCard outCarint margin5">
                    <div class="listData">
                        <span>审方医生</span>
                        <span class="mu-light-text-color">{{recipeData.author}}</span>
                    </div>
                    <div class="listData">
                        <span>审方日期</span>
                        <span class="mu-light-text-color">{{recipeData.authTime}}</span>
                    </div>
                    <div class="listData parElem">
                        <span class="sonElem">医生备注</span>
                        <span>{{recipeData.remark}}</span>
                    </div>
                    <div class="listData">
                        <span>审方药师</span>
                        <span class="mu-light-text-color">{{recipeData.druggistName}}</span>
                    </div>
                    <div class="listData">
                        <span>审方日期</span>
                        <span class="mu-light-text-color">{{recipeData.authTime}}</span>
                    </div>

                </div>
                <div class="flatCard outCarint margin16" :class="{'zhankai':iszhankai,'shouqi':!iszhankai,} ">
                    <div v-for="(item,index) in listBottom" :key="index">
                        <div class="listData parElem">
                            <span class="sonElem">药师备注</span>
                            <span>{{item.remark}}</span>
                        </div>
                        <div class="listBottom mu-light-text-color">
                            <span>{{item.name}}[{{item.spec}}],{{item.usage}},[{{item.freq}}]每次{{item.eachDose}}{{item.doseUnit}}</span>
                            <span>{{item.total}} 盒</span>
                        </div>
                    </div>
                </div>
                <p @click="iszhankai=!iszhankai" style="text-align: right;">展开</p>
                <div class="flatCard outCarint margin5" v-show="isContinue">
                    <div class="listData">
                        <span>支付状态</span>
                        <span class="mu-light-text-color">{{recipeData.authTime}}</span>
                    </div>

                    <div class="listData parElem">
                        <span class="sonElem">取药方式</span>
                        <span>{{recipeData.deliveryMode|deliveryMode}}</span>
                    </div>
                    <div class="listData">
                        <span>物流公司</span>
                        <span class="mu-light-text-color"> {{recipeData.authTime}}</span>
                    </div>
                    <div class="listData">
                        <span>运单号</span>
                        <span class="mu-light-text-color">{{recipeData.deliveryNo}}</span>
                    </div>

                </div>
            </div>
            <div style="height: 50px"></div>
            <p class="mu-secondary-text-color" @click="isContinue=!isContinue">查看缴费详情</p>
        </div>
    </div>
</template>
<script type="text/babel">
let apprecipegetDetails = "/app/recipe/getDetails";
export default {
    data() {
        return {
            iszhankai: false,
            recipeData: [
                {                    no: "CQ11111111", date: "2018年11月11日", name: this.$route.query.name, age: "18",
                    sex: "男", dept: "内科", doc: "杜甫李白", type: "首诊续方", result: "高血压",
                    applyDate: "2018年11月11日", auditState: "审核未通过",
                    recipeReason: "首诊续方首诊续方首诊续方",
                    recipeDate: "2018年11月11日", recipeNo: "内科", auditDoc: "杜甫李白",
                    auditDate: "2018年11月11日",
                    docRemark: "首诊续方首诊续方首诊续方",
                    teacherDoc: "黄药师", teacherDate: "2018年11月11日",
                    teacherRemark: "首诊续方首诊续方首诊续方首诊续方首诊续方首诊",
                }
            ],
            listBottom: [
                { name: "培哚普利（100mg*7），口服（每日三次）每次100mg", num: "115" },
                { name: "培哚普利（100mg*7）, 口服（每日三次）每次100mg", num: "115" },
                { name: "培哚普利（100mg*7）, 口服（每日三次）每次100mg", num: "115" },
                { name: "培哚普利（100mg*7）, 口服（每日三次）每次100mg", num: "115" },
                { name: "培哚普利（100mg*7）, 口服（每日三次）每次100mg", num: "115" },
            ],
            isContinue: false,
        };
    },
    created() {

    },
    mounted() {
        document.title = '申请详情';
        this.look()
    },
    methods: {

        look() {
            this.$axios.put(apprecipegetDetails, {
                recipeId: this.$route.query.id * 1,
            }).then((res) => {
                console.log(res)
                if (res.data.code == '200') {
                    console.log(res.data.data, " res.data.data")
                    this.recipeData = res.data.data.recipe;
                    this.listBottom = res.data.data.details;
                } else {
                    console.log(res.msg);
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
@import "../recipeDetail/recipeDetail.css";
</style>