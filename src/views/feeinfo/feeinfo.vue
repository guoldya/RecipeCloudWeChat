<template>

  <div class="page-loadmore">
    <Header post-title="预约记录"></Header>
    <div :class="{margin45:isWeixin,outCarint:true}">
      <div class="card">
        <div class="cardText">
          <mu-row gutter class="lineheight50">
            <mu-col span="6">
              <div class="grid-cell">订单编号</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;line-height:44px">科室：</div>
            </mu-col>
          </mu-row>
          <mu-row gutter class="lineheight50">
            <mu-col span="6">
              <div class="grid-cell">开单医院</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;">科室：</div>
            </mu-col>
          </mu-row>
          <mu-row gutter class="lineheight50">
            <mu-col span="6">
              <div class="grid-cell">开单医院</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;">科室：</div>
            </mu-col>
          </mu-row>
          <mu-row gutter class="lineheight50">
            <mu-col span="6">
              <div class="grid-cell">开单医院</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;">科室：</div>
            </mu-col>
          </mu-row>
          <mu-row gutter class="lineheight50">
            <mu-col span="6">
              <div class="grid-cell">开单科室</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;">科室：</div>
            </mu-col>
          </mu-row>
          <mu-row gutter class="lineheight50">
            <mu-col span="6">
              <div class="grid-cell">开单医生</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;">科室：</div>
            </mu-col>
          </mu-row>
          <mu-row gutter class="lineheight50">
            <mu-col span="6">
              <div class="grid-cell">患者ID</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;">科室：</div>
            </mu-col>
          </mu-row>
          <mu-row gutter class="lineheight50">
            <mu-col span="6">
              <div class="grid-cell">患者姓名</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;">科室：</div>
            </mu-col>
          </mu-row>
          <mu-row gutter class="lineheight50">
            <mu-col span="6">
              <div class="grid-cell"> 开单时间</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;">科室：</div>
            </mu-col>
          </mu-row>
          <mu-row gutter class="lineheight50">
            <mu-col span="6">
              <div class="grid-cell">开单序号</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;">科室：</div>
            </mu-col>
          </mu-row>
          <mu-row gutter class="lineheight50">
            <mu-col span="6">
              <div class="grid-cell"> 实付金额:</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;">科室：</div>
            </mu-col>
          </mu-row>
          <mu-row gutter class="lineheight50">
            <mu-col span="6">
              <div class="grid-cell"> 交易编号</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;">科室：</div>
            </mu-col>
          </mu-row>
          <mu-row gutter style="  line-height:44px">
            <mu-col span="6">
              <div class="grid-cell"> 缴费时间</div>
            </mu-col>
            <mu-col span="6">
              <div class="grid-cell" style="text-align: right;">科室：</div>
            </mu-col>
          </mu-row>
        </div>
      </div>
      <div class="card">
        <div class="cardText">
          <mu-row class="lineheight50">
            <mu-col span="3">
              <div class="grid-cell">
                <span>类别</span>
              </div>
            </mu-col>
            <mu-col span="3">
              <div class="grid-cell">
                <span>项目名称</span>
              </div>
            </mu-col>
            <mu-col span="3" style="text-align: right;">
              <div class="grid-cell">
                <span>数量</span>
              </div>
            </mu-col>
            <mu-col span="3" style="text-align: right;">
              <div class="grid-cell">
                <span>金额</span>
              </div>
            </mu-col>
          </mu-row>
          <mu-row class="lineheight50" style="border-bottom:1px solid transparent">
            <mu-col span="3">
              <div class="grid-cell">
                ss
              </div>
            </mu-col>
            <mu-col span="3">
              <div class="grid-cell">

              </div>
            </mu-col>
            <mu-col span="3" style="text-align: right;">
              <div class="grid-cell">

              </div>
            </mu-col>
            <mu-col span="3" style="text-align: right;">
              <div class="grid-cell">

              </div>
            </mu-col>
          </mu-row>
        </div>

      </div>

      <mu-flex justify-content="center" align-items="center" class="margin16">
        <mu-button full-width round color="primary" @click="payment">立即缴费</mu-button>
      </mu-flex>
    </div>
  </div>
</template>
<script  >
export default {
  data() {
    return {
      isWeixin: false,
      active1: 0,
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
    };
  },
  created() {

  },
  mounted() {
    document.title = '缴费记录详情';
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
      this.active1 = num;
    },
    payment() {
      this.$router.push({
        name: 'payment',
      });
    },
    setStyle(rowIndex, row) {
      if (row.id === this.currentRow.id) {
        return 'background-color:#ddd'
      } else {
        return 'background-color:#abc'
      }
    }
  },
  computed: {

  },
};
</script>
 <style   scoped> 
.lineheight50 {
  line-height: 100px;
  border-bottom: 1px solid #f5f5f5;
} 
.grid-cell span {
  font-weight: 700;
}
.titleh1 {
  font-size: 17px;
}

.card {
  margin-top: 14px;
}
.card:first-child {
  margin-top: 64px;
}
.cardText {
  padding: 0 16px;
  font-size: 14px;
  color: #333333;
}
.card p {
  line-height: 25px;
}
.warnText {
  font-size: 12px;
  color: #afafaf;
}
.mu-raised-button {
  height: 45px;
}
</style>