<template>
    <div class="recipeDetail">
        <Header post-title="处方详情" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div>
                <div class="card margin16" v-for="(item,i) in recipeData">
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
                            <span style="width: 50%">开方医生：
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
                        <p class="partLine"></p>
                        <div class="listBottom mu-light-text-color" v-for="item in listBottom">
                            <span>{{item.name}}</span>
                            <span v-if="isContinue==true">{{item.num}} 盒</span>
                            <span v-else>{{item.num}} 盒</span>
                        </div>
                    </div>
                </div>
                <div class="card margin16" v-for="(item,i) in recipeData" v-if="isContinue==true">
                    <div class="cardText ">
                        <div class="inputWord">
                            <span style="width: 28%">续方事由</span>
                            <textarea name="textareaWord" maxlength="36" class="textareaWord" id="" cols="30" rows="2" placeholder="选填（录入与续方申请相关的申请原因、现状情况，便于医生判断，限制在36个字符）"></textarea>
                        </div>
                    </div>
                </div>
                <div>
                    <md-button type="primary" round v-if="isContinue==true" @click="confirmApply">提交申请</md-button>
                    <md-button type="default" round v-else @click="confirmApply">续方失效</md-button>
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
            recipeData: [
                { no: "CQ11111111", date: "2018年9月9日", name: this.$route.query.name, age: "18", sex: "男", dept: "内科", doc: "杜甫李白", type: "首诊续方", result: "高血压" }
            ],
            listBottom: [
                { name: "培哚普利（100mg*7），口服（每日三次）每次100mg", num: "115" },
                { name: "培哚普利（100mg*7）, 口服（每日三次）每次100mg", num: "115" },
                { name: "培哚普利（100mg*7）, 口服（每日三次）每次100mg", num: "115" },
            ],
            isContinue: true,
            name: null,
        };
    },
    created() {

    },
    mounted() {
        this.name = this.$route.query.name;
        document.title = '处方详情';
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
        confirmApply() {
            let argu = {};
            this.$router.push({
                name: 'slowConfirm',
                query: argu
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