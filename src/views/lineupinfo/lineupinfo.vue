<template>

  <div class="lineupnow">
    <Header post-title="排队详情" v-show="isWeixin"></Header>
    <div :class="{margin45:isWeixin,outCarint:true}" v-show="!loadingtrue">
      <div  v-if="lineupinfo!=null">
        <div class="card margin16">
          <div class="cardHEADER">
            <div class="fleft lineupcard">
              <img src="@/assets/images/icon_line_up.png" alt="">
              <span>我的排队号</span>
            </div>
            <p>我的号码：
              <span class="mu-secondary-text-color size18">{{lineupinfo.currentNo}}</span>
            </p>
            <p>排队类目：{{lineupinfo.deptName}}</p>
          </div>
          <p>我的号码：
            <span class="mu-secondary-text-color size18">{{lineupinfo.currentNo}} </span>号
          </p>
          <p>排队类目：{{lineupinfo.deptName}}</p>
        </div>
        <!-- <div class="card margin16">
          <div class="cardHEADER">
            <div class="fleft lineupcard">
              <img src="@/assets/images/icon_sad.png" alt="">
              <span>您已过号！请重新排队！</span>
            </div>
            <p>当前正在受理的号是
              <span class="mu-secondary-text-color size18">{{lineupinfo.queueNo}}</span> 号</p>
          </div>
        </div> -->
        <div class="card margin16">
          <div class="cardHEADER">
            <div class="fleft lineupcard">
              <img src="@/assets/images/icon_schedule.png" alt="">
              <span>进度</span>
            </div>
            <p>当前正在受理的号是
              <span class="mu-secondary-text-color size18">{{lineupinfo.queueNo}}</span> 号</p>
            <p>您前面还有
              <span class="mu-secondary-text-color size18">{{lineupinfo.waitingNo}}</span> 位在等候，预计等待
              <span class="mu-secondary-text-color size18">{{lineupinfo.waitingTime}}</span> 分钟</p>
          </div>
        </div>
        <md-button class="margin16" type="primary" @click="getData" round>刷新</md-button>
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
      isWeixin: false,
      lineupinfo: '',
      loadingtrue: true,
    };
  },
  created() {

  },
  mounted() {
    this.getData()
    document.title = '排队详情';
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      this.isWeixin = false;

    } else {
      this.isWeixin = true;
    }

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
          let currentNo=res.data.rows[0].currentNo;
          let queueNo=res.data.rows[0].queueNo;
          if(currentNo && queueNo){
              this.lineupinfo. waitingNo= res.data.rows[0].currentNo-res.data.rows[0].queueNo;
          }
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
</style>