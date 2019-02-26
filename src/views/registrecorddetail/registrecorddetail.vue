<template>
    <div class="registrecorddetail">
        <Header post-title="挂号记录详情" v-show="isWeixin"></Header>
        <div :class="{'outCarint':true,'margin45':isWeixin,'margin7':!isWeixin}">
            <div class="card" v-for="(item,i) in cordInfoData" :key="i" v-show="!loadingtrue">
                <div class="cardText">
                    <p>科室：内科</p>
                    <p>医生：{{item.doctorName}}</p>
                    <p>姓名：{{item.patientName}}</p>
                    <p>日期：2019-01-12</p>
                    <p>时段：8:00-10:00</p>
                    <p>诊号：NO26548</p>
                    <p>金额：312.00</p>
                    <p>地点：渝北区</p>
                    <p>预约来源：华仪通</p>
                </div>
            </div>
            <Loading v-show="loadingtrue"></Loading>
            <div class="cardText warnText">
                注意事项：
                <p>1、请在半个小时内完成支付，逾期记录作废</p>
                <div class="listData">
                    <span>2、</span>
                    <span>支付成功后无需取号，请持就诊卡到护士站报道看诊</span>
                </div>
                <p>3、如需退号，请提前两天进行操作</p>
                <p>4、一个自然月内只能退三次号</p>
            </div>
            <div>
                <div class="myButton">
                    <div v-if="payType==0">
                        <span class="cancle">取消订单</span>
                        <span class="payatnow">立即支付</span>
                    </div>
                    <div v-if="payType==1">
                        <md-button type="primary" round @click="applyBack">申请退号</md-button>
                    </div>
                    <div v-if="payType==2">
                        <md-button type="default" round>已退号/已失效</md-button>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script  >
import { Dialog } from 'mand-mobile'
let cord_info_url = "/app/bizPatientRegister/read/detail";
export default {
    data() {
        return {
            active1: 0,
            isWeixin: false,
            normal: {
                checkbox: true,
                radio: 1,
                switch: false
            },
            time: [
                { title: '待支付' },
                { title: '预约成功' },
                { title: '预约关闭' }
            ],
            cordInfoId: null,
            cordInfoData: [],
            payType: '',
            loadingtrue: true,
        };
    },
    created() {

    },
    mounted() {
        this.cordInfo();
        document.title = '预约记录';
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            this.isWeixin = false;
        } else {
            this.isWeixin = true;
        };
    },
    methods: {
        cordInfo() {
            this.cordInfoId = parseInt(this.$route.query.id);
            this.payType = this.$store.state.payType;
            this.$axios.put(cord_info_url, { id: this.cordInfoId, payType: this.payType }, {
            }).then(res => {
                if (res.data.code == '200') {
                    this.loadingtrue = false;
                    this.cordInfoData.push(res.data.data);
                    console.log(this.cordInfoData)
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        switchTo(num) {
            this.active1 = num;
        },
        setStyle(rowIndex, row) {
            if (row.id === this.currentRow.id) {
                return 'background-color:#ddd'
            } else {
                return 'background-color:#abc'
            }
        },
        applyBack() {
            Dialog.confirm({
                title: '温馨提示',
                content: '是否申请退号',
                confirmText: '确定',
                onConfirm: () => console.log('[Dialog.confirm] confirm clicked'),
            })
        },
    },
    computed: {

    },
};
</script>
<style   scoped>
.titleh1 {
  font-size: 34px;
}

.card p {
  line-height: 60px;
}
.warnText {
  font-size: 24px;
  color: #afafaf;
}
.registrecorddetail .card {
  margin-bottom: 32px;
}
.registrecorddetail .myButton div {
  display: flex;
  justify-content: space-between;
  margin-top: 26px;
}
.registrecorddetail .myButton div span {
  border-radius: 60px;
  letter-spacing: 1px;
  width: 46%;
  height: 86px;
  text-align: center;
  line-height: 86px;
}
.registrecorddetail .payatnow {
  font-size: 26px;
  color: #ffffff;
  background-color: #1da1f3;
}
.registrecorddetail .cancle {
  font-size: 26px;
  color: #474747;
  background: #ffffff;
  border: 2px solid #474747;
  box-sizing: border-box;
}
.registrecorddetail .md-button.default {
  color: #fff;
  background-color: #8b8b8b;
}
.registrecorddetail .default:after {
  border: none !important;
}
</style>