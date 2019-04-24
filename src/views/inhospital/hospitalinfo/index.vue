<template>
    <div class="hospitalinfo">
        <Navigation type="title" title="住院费用"></Navigation>
        <div class="margin55">
            <div>
                <div class="cardText alignJ flatCard">
                    <div class="appTitle" style="padding: 0.24rem 0">
                        <span>第
                            <span class="mu-secondary-text-color">{{$route.query.time}}</span> 次住院</span>
                    </div>
                    <div>
                        <p class="parElem listData">
                            <span class="sonElem">患者姓名</span>
                            <span>{{cordInfoData.name}}</span>
                        </p>
                        <p class="parElem listData">
                            <span class="sonElem">住院号</span>
                            <span>{{cordInfoData.ihNo}}</span>
                        </p>
                        <p class="parElem listData">
                            <span class="sonElem">住院科室</span>
                            <span>{{cordInfoData.dept}}</span>
                        </p>
                        <p class="parElem listData">
                            <span class="sonElem">住院费用</span>
                            <span>{{cordInfoData.totalMonty|keepTwoNum}} 元</span>
                        </p>
                        <p class="parElem listData">
                            <span class="sonElem">入院时间</span>
                            <span>{{cordInfoData.inTime|lasttime}}</span>
                        </p>
                        <p class="parElem listData">
                            <span class="sonElem">出院时间</span>
                            <span>{{cordInfoData.outTime|lasttime}}</span>
                        </p>
                    </div>
                </div>
                <div class="cardText alignJ flatCard" v-show="waitPayData.length!=0">
                    <p style="text-align:right">合计：
                        <span class="mu-secondary-text-color" style="font-size:16px">{{totalMoney|keepTwoNum}}</span>元
                    </p>
                </div>
                <div class="margin5" v-if="waitPayData.length!=0">
                    <div class="cardText flatCard">
                        <div class="cardTextKind spanWid">
                            <span style="text-align: left">类别</span>
                            <span>项目名称</span>
                            <span>数量</span>
                            <span style="text-align: right">金额</span>
                        </div>
                        <div>
                            <div v-for="(item,i) in waitPayData" :key="i">
                                <p style="border-bottom: 1px solid #e9e9e9; line-height: 40px;">{{item.feeType|feeType}}</p>
                                <div class="spanWid cardTextPP arrow" v-for="(item2,index) in item.list" :key="index">
                                    <span> </span>
                                    <span>{{item2.itemName}} </span>
                                    <span>{{item2.num}}</span>
                                    <span>{{item2.price|keepTwoNum}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p v-show="nomore" class="noMore">没有更多数据了</p>
                </div>
                <div v-show="!loadingtrue" class="nullDiv" v-else>
                    <img src="@/assets/images/null_hosi.png" style="width:30%">
                    <p class="nullTEXT">暂时没有你的费用信息</p>
                </div>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30" class="textCenter">
                    <span v-if="waitPayData.length!=0&&!nomore">
                        <span class="mu-light-text-color">加载中</span>
                        <md-icon name="spinner" size="lg" style="-webkit-filter:invert(1)"></md-icon>
                    </span>
                </div>
                <Loading v-show="loadingtrue"></Loading>
            </div>
        </div>
    </div>

</template>
<script  >
let cord_info_url = "/app/bizIhRecord/read/detail";
let selectIhRecordPriceList = "/app/bizIhFee/read/page"
export default {
    data() {
        return {
            rows: [
                {
                    feeType: 1,
                    list: [
                        {
                            feeDate: "2019 - 04 - 22",
                            feeType: 1,
                            id: '2',
                            ihNo: '0005',
                            itemName: "感冒了",
                            num: '1',
                            price: '5600',
                            recordId: '1',
                            total: '5600'
                        },
                        {
                            feeDate: "2019 - 04 - 22",
                            feeType: '1',
                            id: '1',
                            ihNo: '0005',
                            itemName: "测试",
                            num: '2',
                            price: '5000',
                            recordId: '1',
                            total: '10000',
                        }
                    ]
                },
                {
                    feeType: 2,
                    list: [
                        {
                            feeDate: "2019 - 04 - 22",
                            feeType: 1,
                            id: '2',
                            ihNo: '0005',
                            itemName: "111",
                            num: '1',
                            price: '5600',
                            recordId: '1',
                            total: '5600'
                        },
                        {
                            feeDate: "2019 - 04 - 22",
                            feeType: 1,
                            id: '2',
                            ihNo: '0005',
                            itemName: "2222",
                            num: '1',
                            price: '5600',
                            recordId: '1',
                            total: '5600'
                        },
                        {
                            feeDate: "2019 - 04 - 22",
                            feeType: '1',
                            id: '1',
                            ihNo: '0005',
                            itemName: "333333",
                            num: '2',
                            price: '5000',
                            recordId: '1',
                            total: '10000',
                        }
                    ]
                },
            ],
            busy: true,
            loadingtrue: true,
            nomore: false,
            waitPayData: '',
            page: 1,
            pageSize: 10,
            cordInfoData: '',
            loadingtrue: true,
            totalMoney: '',
        };
    },

    created() {

    },
    mounted() {
        this.WaitPay(false);
        this.cordInfo()
    },
    methods: {
        cordInfo() {
            this.$axios.put(cord_info_url, { id: parseInt(this.$route.query.id), status: 3 }, {
            }).then(res => {
                if (res.data.code == '200') {
                    this.loadingtrue = false;
                    if (res.data.data) {
                        console.log(res.data.data)
                        this.cordInfoData = res.data.data;
                    } else {
                        this.cordInfoData = []
                    }

                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        WaitPay(flag) {
            const params = {};
            params.pageNumber = this.page;
            params.pageSize = this.pageSize;
            params.recordId = parseInt(this.$route.query.id);
            this.$axios.put(selectIhRecordPriceList, params).then((res) => {
                this.loadingtrue = false;
                if (res.data.code == 200) {
                    this.totalMoney = res.data.totalMoney;
                    if (res.data.rows) {

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
 <style   scoped>
.hospitalinfo .parElem .sonElem {
  width: 50%;
}
.hospitalinfo .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  /*align-items: center;*/
  padding: 18px 0;
  color: var(--primary--right);
}
.hospitalinfo .cardText .cardTextPP:last-child,
.hospitalinfo .cardText .cardTextBor {
  border: none;
}
.hospitalinfo .cardText .cardTextKind {
  display: flex;
  justify-content: space-between;
  padding: 28px 0;
  font-size: 27px;
  border-bottom: 1px solid #e9e9e9;
  font-weight: 700;
  margin-bottom: 28px;
}
.hospitalinfo .spanWid span {
  /*display: inline-block;*/
  /*word-break: normal;*/
  /*white-space: pre-wrap;*/
  /*word-wrap: break-word;*/
  /*overflow: hidden;*/
  text-align: center;
}

.hospitalinfo .spanWid span:first-child {
  width: 20%;
  text-align: left;
}
.hospitalinfo .spanWid span:nth-child(2) {
  width: 32%;
  text-align: left;
}
.hospitalinfo .arrow span:nth-child(2) span {
  color: red;
  display: flex;
  position: relative;
  left: 140px;
  top: -32px;
}
.hospitalinfo .spanWid span:nth-child(3) {
  width: 20%;
}
.hospitalinfo .spanWid span:last-child {
  width: 20%;
  text-align: right;
}
.hospitalinfo .flatCard {
  border-top: none;
}
.hospitalinfo .parElem {
  line-height: 46px;
}
/*.cardBottom div{*/
/*padding-top: 0;*/
/*}*/
/*.cardBottom .alignJ .parElem span:first-child{*/
/*position: relative;*/
/*!*top: 16px;*!*/
/*}*/
/*.hospitalinfo .alignJ .parElem span:nth-child(2){*/
/*margin-left: 40px;*/
/*color:  var(--primary--content);*/
/*}*/
/*.hospitalinfo .alignJ .parElem:first-child{*/
/*padding-top: 0;*/
/*}*/
</style>