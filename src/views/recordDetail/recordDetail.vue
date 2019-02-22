<template>
    <div class="recordDetail">
        <Header post-title="处方详情" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div>
                <div class="card margin16">
                    <div class="cardText" v-for="(item,i) in detailData" :key="i">
                        <!--<div class="userInfo">-->
                            <!--<span>取药码：092231</span>-->
                            <!--<span>2019-01-12</span>-->
                            <!--<span class="mu-secondary-text-color">未取药</span>-->
                        <!--</div>-->
                        <!--<p class="partLine"></p>-->
                        <div class="hospital">
                            <p>{{item.add}}</p>
                        </div>
                        <div class="userInfo">
                            <div>
                                <p>姓名</p>
                                <p class="mu-light-text-color">{{item.userName}}</p>
                            </div>
                            <div>
                                <p>性别</p>
                                <p class="mu-light-text-color">男</p>
                            </div>
                            <div>
                                <p>年龄</p>
                                <p class="mu-light-text-color">22岁</p>
                            </div>
                            <div>
                                <p>科室</p>
                                <p class="mu-light-text-color">内科</p>
                            </div>
                        </div>
                        <p class="partLine"></p>
                        <div>
                            <span>临床诊断：上呼吸道感染</span>
                        </div>
                    </div>
                </div>
                <div class="card margin16">
                    <div class="cardText">
                        <div v-for="(item,i) in medicineData">
                            <div class="listData medName">
                                <span>{{item.name}}</span>
                                <span>{{item.weight}}</span>
                            </div>
                            <div class="listData userNum">
                                <div class="useAmount">
                                    <span>用法用量：</span>
                                    <span>{{item.piece}}</span>
                                    <span>{{item.way}}</span>
                                    <span>{{item.time}}</span>
                                </div>
                                <span>{{item.package}}盒</span>
                            </div>
                            <div class="listData userNum docTip">
                                <span>医生嘱托：用温开水送服</span>
                            </div>
                            <p class="partLine" v-if="i!=medicineData.length-1"></p>
                        </div>
                    </div>
                </div>
                <div class="card margin16">
                    <div class="cardText">
                        <div class="userSign">
                            <div class="listData userNum">
                                <span>医师：李四</span>
                                <span>签名：李四</span>
                            </div>
                            <p class="partLine"></p>
                            <div class="listData userNum">
                                <span>药师审方</span>
                                <span>审核通过</span>
                            </div>
                            <p class="partLine"></p>
                            <div class="listData userNum">
                                <span>审方时间</span>
                                <span>2019-01-12</span>
                            </div>
                            <p class="partLine"></p>
                            <div class="listData userNum">
                                <span>医师</span>
                                <span>李五</span>
                            </div>
                            <p class="partLine"></p>
                            <div class="listData userNum">
                                <span>注意：在服用时请注意含量</span>
                            </div>
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
                detailData:[],
                medicineData:[
                    {name:"盐酸曲美他嗪片（万爽力）",weight:"20mgx30片",piece:"20mg",way:"口服",time:"每天三次",package:"x1"},
                    {name:"盐酸曲美他嗪片（万爽力）",weight:"20mgx30片",piece:"20mg",way:"口服",time:"每天三次",package:"x1"},
                ],
            };
        },
        created() {

        },
        mounted() {
            console.log(this.detailData)
            this.detailData.push(this.$store.state.detailData);
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

        },
        computed: {

        },

    };
</script>
<style   scoped>
@import "recordDetail.css";
</style>