<template>

  <div class="lineupnow">
    <Header :post-title="title"></Header>
    <div class="margin55" v-show="!loadingtrue">
      <div v-if="lineupinfo!=null">
        <div v-show="queryType==1">
          <div class="flatCard">
            <div class="cardHEADER">
              <div class="fleft lineupcard">
                <img src="@/assets/images/icon_line_up.png" alt="">
                <span>我的排队号</span>
              </div>
              <p>我的号码：
                <span class="mu-secondary-text-color size18">{{lineupinfo.queueNo}}</span>
              </p>
              <p>排队类目：{{lineupinfo.deptName}}</p>
            </div>
          </div>
          <div class="flatCard margin5" v-if="lineupinfo.waitingNo<0">
            <div class="cardHEADER">
              <div class="fleft lineupcard">
                <img src="@/assets/images/icon_sad.png" alt="">
                <span>您已过号！请重新排队！</span>
              </div>
              <p>当前正在受理的号是
                <span class="mu-secondary-text-color size18">{{lineupinfo.currentNo}}</span> 号</p>
            </div>
          </div>
          <div class="card margin16" v-else>
            <div class="cardHEADER">
              <div class="fleft lineupcard">
                <img src="@/assets/images/icon_schedule.png" alt="">
                <span>进度</span>
              </div>
              <p>当前正在受理的号是
                <span class="mu-secondary-text-color size18">{{lineupinfo.currentNo}}</span> 号</p>
              <p>您前面还有
                <span class="mu-secondary-text-color size18">{{lineupinfo.waitingNo}}</span> 位在等候，预计等待
                <span class="mu-secondary-text-color size18">{{lineupinfo.waitingTime}}</span> 分钟</p>
            </div>
          </div>
        </div>
        <div v-show="queryType==2">
          <div class="card margin16">
            <div class="cardHEADER">
              <div class="fleft lineupcard">
                <img src="@/assets/images/icon_line_up.png" alt="">
                <span>我的报告</span>
              </div>
              <p>检查科室：
                <span class="mu-secondary-text-color size18">{{lineupinfo.examDept}}</span>
              </p>
              <p>检查项目：{{lineupinfo.className}}</p>
            </div>
          </div>
          <div class="card margin16">
            <div class="cardHEADER">
              <div class="fleft lineupcard">
                <img src="@/assets/images/icon_schedule.png" alt="">
                <span>进度</span>
              </div>
              <p> 报告
                <span v-if="lineupinfo.reportId" class="mu-secondary-text-color size18">已出</span>
                <span v-else class="mu-secondary-text-color size18">未出</span>
              </p>
              <p>报告时间：
                <span class="mu-secondary-text-color">{{lineupinfo.reportTime|lasttime}}</span>
              </p>
            </div>
          </div>
        </div>
        <md-button class="margin14" type="primary" @click="getData" round>刷新</md-button>
      </div>
      <div v-show="!loadingtrue" class="nullDiv" v-else>
        <img src="@/assets/images/null1.png">
      </div>
    </div>
    <Loading v-show="loadingtrue"></Loading>
  </div>
</template>
<script   type="text/babel">

let appbizWaitingQueuereadlist = "/app/bizWaitingQueue/read/list";
export default {
  data() {
    return {
      queryType: 1,
      lineupinfo: '',
      loadingtrue: true,
      title: '排队详情'
    };
  },
  created() {

  },
  mounted() {
    this.getData()
    document.title = '排队详情';
    this.queryType = this.$route.query.queryType * 1
    if (this.queryType == 2)
      this.title = '报告详情'
  },
  methods: {
    getData() {
      this.loadingtrue = true;
      this.$axios.put(appbizWaitingQueuereadlist, {
        id: this.$route.query.id * 1,
        queryType: this.$route.query.queryType * 1,
      }).then(res => {
        if (res.data.code == '200') {
          this.loadingtrue = false;
          this.lineupinfo = res.data.rows[0];
          let currentNo = res.data.rows[0].currentNo;
          let queueNo = res.data.rows[0].queueNo;
          // if(currentNo && queueNo){
          //     this.lineupinfo.waitingNo= res.data.rows[0].currentNo-res.data.rows[0].queueNo;
          // }
        } else if (res.data.code == '800') {

        }
      }).catch(function (err) {
        console.log(err);
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
@import url("../lineupnow/lineupnow.css");
.mu-raised-button {
  height: 45px;
}
.lineupcard {
  line-height: 70px;
  width: 100%;
  border-bottom: 1px solid #ededed;
}
.cardHEADER p {
  font-size: 28px;
  line-height: 60px;
}
.cardHEADER p:first-child {
  margin-top: 20px;
}
.lineupnow .md-button-content {
  color: #ffffff !important;
}

.size18 {
  font-size: 43px;
}
.lineupnow .md-button.block {
  height: 90px;
  width: 94%;
  margin-left: 24px;
  margin-right: 24px;
}
</style>