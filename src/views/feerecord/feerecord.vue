<template>
    <div class="feerecord">
        <Header post-title="缴费记录"></Header>
        <div class="margin55">
            <div v-if="waitPayData.length!=0" v-show="!loadingtrue">
                <Recordcard v-for="(item,i) in waitPayData" :key="i" :content="item" :type="2"></Recordcard>
                <p v-show="nomore" class="noMore">没有更多数据了</p>
            </div>
            <Null :loading-true="!loadingtrue&&waitPayData.length==0"></Null>
            <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
                <span v-if="waitPayData.length!=0&&!nomore">
                    <span class="mu-light-text-color">加载中</span>
                    <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                </span>
            </div>
            <Loading v-show="loadingtrue"></Loading>
        </div>
    </div>
</template>
<script >
let pay_list_url = "/api/hos/bizPayOrder/read/page";
let bizPatientCard = "/api/hos/bizPatientCard/read/list";
export default {
    data() {
        return {
            waitPayData: [],
            page: 1,
            pageSize: 10,
            type: 0,
            busy: true,
            nomore: false,
            loadingtrue: true,
        };
    },
    mounted() {
        this.WaitPay(false);
    },
    methods: {
        WaitPay(flag) {
            const params = {};
            params.pageNumber = this.page;
            params.pageSize = this.pageSize;
            this.$axios.put(pay_list_url, params).then((res) => {
                if (res.data.rows) {
                    this.loadingtrue = false;
                    if (flag) {
                        this.waitPayData = this.waitPayData.concat(res.data.rows);  //concat数组串联进行合并
                        if (this.page < Math.ceil(res.data.total / 10)) {  //如果数据加载完 那么禁用滚动时间 this.busy设置为true
                            this.busy = false;
                            this.nomore = false;
                        } else {
                            this.busy = true;
                            this.nomore = true;
                        }
                    } else {
                        this.waitPayData = res.data.rows;
                        this.busy = true;
                        if (res.data.total < 10) {
                            this.busy = true;
                            this.nomore = true;
                        } else {
                            this.busy = false;
                            this.nomore = false;
                        }
                    }
                    //2、
                } else {
                    this.waitPayData = []
                }
            })
        },
        loadMore() {
            this.busy = true;  //将无限滚动给禁用
            setTimeout(() => {  //发送请求有时间间隔第一个滚动时间结束后才发送第二个请求
                this.page++;  //滚动之后加载第二页
                this.WaitPay(true);
            }, 500);
        },
    },


};
</script>
 