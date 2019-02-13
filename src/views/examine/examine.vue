<template>
    <div class="examine">
        <Header post-title="检验检查" v-show="isWeixin"></Header>
        <div :class="{margin45:isWeixin,outCarint:true}">
            <div class="pageContent">
                <span v-for="(item, index) in changeTitle" :key="'changeTitle' + index" @click="switchTo(index)" :class="titleIndex === index ? 'appTabAcitive' : '' ">
                    {{item.title}}
                </span>
            </div>
            <div class="outCarint" v-if="titleIndex===0">
                <div class="card margin16" v-for="(item,i) in examineData" :key="i">
                    <div class="cardText">
                        <div class="listData">
                            <span>{{item.name}}（{{item.thing}}）</span>
                            <span>{{item.date}}</span>
                        </div>
                        <p style="border-bottom: 1px solid #e9e9e9;margin: 6px 0px"></p>
                        <div class="listData">
                            <span>开单时间：
                                <span class="mu-secondary-text-color">{{item.name}}</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>科室：
                                <span class="mu-secondary-text-color">{{item.dept}}</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>开单时间：
                                <span class="mu-secondary-text-color">{{item.name}}</span>
                            </span>
                        </div>
                        <div class="nowOrder">
                            <span>立即预约</span>
                        </div>
                        <div style="clear: both"></div>
                    </div>

                </div>
            </div>
            <div class="outCarint" v-if="titleIndex===1">
                <div class="card margin16" v-for="(item,i) in orderRecord" :key="i">
                    <div class="cardText">
                        <div class="listData">
                            <span>{{item.name}}（{{item.item}}）</span>
                            <span class="mu-secondary-text-color">{{item.status}}</span>
                        </div>
                        <p style="border-bottom: 1px solid #e9e9e9;margin: 6px 0px"></p>
                        <div class="listData">
                            <span>预约科室：
                                <span class="mu-secondary-text-color">{{item.dept}}</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>预约项目：
                                <span class="mu-secondary-text-color">{{item.thing}}</span>
                            </span>
                        </div>
                        <div class="listData">
                            <span>预约日期：
                                <span class="mu-secondary-text-color">{{item.date}}</span>
                            </span>
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
                changeTitle: [
                    { title: '预约项目' },
                    { title: '预约记录' },
                ],
                titleIndex: 0,
                examineData:[
                    {name:"张三",thing:"B超预约",date:"2019-01-11",orderTime:"2019-01-09",dept:"彩超室（礼嘉院区）"},
                    {name:"张三",thing:"采血预约",date:"2019-01-11",orderTime:"2019-01-09",dept:"检验科（礼嘉院区）"}
                ],
                orderRecord:[
                    {name:"张三",date:"2019年1月20日 07:00—08:00",thing:"静脉采血",status:"检查中",item:"采血预约",dept:"彩超室（礼嘉院区）"},
                    {name:"张三",date:"2019年1月20日 07:00—08:00",thing:"腹部B超",status:"预约成功",item:"B超预约",dept:"检验科（礼嘉院区）"}
                ],
            };
        },
        created() {

        },
        mounted() {
            document.title = '检验检查';
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
            switchTo(num) {
                this.titleIndex = num;
            },
        },
        computed: {

        },

    };
</script>
<style   scoped>
    .examine .nowOrder{
        float: right;
        font-size: 28px;
        display: flex;
    }
    .examine .nowOrder span{
        font-size: 24px;
        color: #ffffff;
        background: #1da1f3;
        border-radius: 40px;
        letter-spacing: 1px;
        padding: 15px 40px;
        text-align: center;
    }
    .examine .listData span{
        padding: 8px 0px;
    }
</style>