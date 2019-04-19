<template>
    <div class="recipeDetail">
        <Header post-title="处方详情"></Header>
        <div class="margin55">
            <div class="detail-content">
                <div class="flatCard">
                    <div class="cardText">
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
                            <span>续方次数</span>
                            <span class="mu-secondary-text-color">{{recipeData.renewalMum}}次</span>
                        </div>
                        <div class="listData">
                            <span>慢病诊断</span>
                            <span class="mu-secondary-text-color">{{recipeData.diag}}</span>
                        </div>
                        <p class="partLine"></p>
                        <div :class="{'zhankai':iszhankai,'shouqirecipeDetail':!iszhankai,} ">
                            <div v-for="(item,index) in listBottom" :key="index">
                                <div class="listBottom mu-light-text-color">
                                    <span>{{item.name}}[{{item.spec}}],{{item.usage}},[{{item.freq}}]每次{{item.eachDose}}{{item.doseUnit}}</span>
                                    <span>{{item.total}} 盒</span>
                                </div>
                            </div>
                        </div>

                        <p @click="iszhankai=!iszhankai" style="text-align: right;">更多信息</p>

                    </div>
                </div>
                <div class="flatCard margin5" v-if="isContinue==true">
                    <div class="cardText ">
                        <div class="inputWord">
                            <span style="width: 28%">续方事由</span>
                            <textarea v-model="applyCause" name="textareaWord" maxlength="36" class="textareaWord" id="" cols="40" rows="2" placeholder="选填（录入与续方申请相关的申请原因、现状情况，便于医生判断，限制在36个字符）"></textarea>
                        </div>
                    </div>
                </div>
                <div style="height: 70px"></div>
                <div>
                    <p class="addbTN" v-if="isContinue" @click="confirmApply">提交申请</p>
                    <p class="addbTN" v-if="!isContinue" style="background-color:#979797">续方失效</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/babel">
let apprecipegetDetails = "/app/recipe/getDetails";
let recipeApplyRenewRecipe = "/app/bizRecipeApply/createNoPayRecipeApply"
export default {
    data() {
        return {
            applyCause: '',
            iszhankai: false,
            recipeData: [
                { no: "CQ11111111", date: "2018年9月9日", name: this.$route.query.name, age: "18", sex: "男", dept: "内科", doc: "杜甫李白", type: "首诊续方", result: "高血压" }
            ],
            listBottom: [
                { name: "培哚普利（100mg*7），口服（每日三次）每次100mg", num: "115" },
                { name: "培哚普利（100mg*7）, 口服（每日三次）每次100mg", num: "115" },
                { name: "培哚普利（100mg*7）, 口服（每日三次）每次100mg", num: "115" },
            ],
            orgId: '',
            isContinue: true,
        };
    },
    created() {

    },
    mounted() {
        if (this.$route.query.renewaType == 0) {
            this.isContinue = false;
        } else {
            this.isContinue = true;
        }
        document.title = '处方详情';
        this.look();
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
                    this.orgId = res.data.data.recipe.orgId;
                } else {
                    console.log(res.msg);
                }
            }).catch(function (err) {
                console.log(err);
            });
        },

        confirmApply() {
            this.$axios.post(recipeApplyRenewRecipe, {
                recipeId: this.$route.query.id * 1,
                applyCause: this.applyCause,
            }).then((res) => {
                if (res.data.code == '200') {
                    this.$router.push({
                        name: 'choose',
                        query: { recipeId: this.$route.query.id * 1, orderId: res.data.data.orderId, id: res.data.data.id, orgId: this.orgId }
                    });
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
@import "recipeDetail.css";
</style>