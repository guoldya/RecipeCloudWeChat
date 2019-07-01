<template>
  <div class="visitinginfo">
    <Header post-title="诊疗记录详情"></Header>
    <div class="  visiting-content" v-if="feeDetailData.lentgh!=0">
      <div class="flatCard">
        <div class="flatCard_title">
          <div class="title">
            <img src="@/assets/images/geren.png" alt="">
            <span>个人信息</span>
          </div>
          <div class="right">
            <!-- <img src="@/assets/images/icon_right.png" alt=""> -->
          </div>
        </div>
        <div class="cardText alignJ">
          <div class=" parElem listData">
            <span class="sonElem">姓名</span>
            <span>{{feeDetailData.name}}</span>
          </div>
          <div class="parElem listData">
            <span class="sonElem">性别</span>
            <span>{{feeDetailData.sex|examSex}}</span>
          </div>
          <div class=" parElem listData">
            <span class="sonElem">年龄</span>
            <span>{{feeDetailData.age}}</span>
          </div>
          <div v-if="$route.query.type==1" class=" parElem listData">
            <span class="sonElem">科室</span>
            <span>{{feeDetailData.dept}} </span>
          </div>
          <div v-if="$route.query.type==2" class=" parElem listData">
            <span class="sonElem">病区</span>
            <span>{{feeDetailData.area}} </span>
          </div>
          <div v-if="$route.query.type==1" class=" cardTextBor listData parElem">
            <span class="sonElem ">就诊日期</span>
            <span>{{feeDetailData.createTime|lasttime}}</span>
          </div>
          <div class=" cardTextBor listData parElem">
            <span class="sonElem ">诊断</span>
            <span>{{feeDetailData.diag}}</span>
          </div>

        </div>
      </div>
      <div class="flatCard margin5 cardBottom1" v-if="$route.query.type==1">
        <div class="flatCard_title">
          <div class="title">
            <img src="@/assets/images/bingli.png" alt="">
            <span>门诊病历</span>
          </div>
          <div class="right">
            <!-- <img src="@/assets/images/icon_right.png" alt=""> -->
          </div>
        </div>
        <div class="cardText">
          <div class="cardTextBor listData parElem">
            <span class="sonElem">主诉</span>
            <span>{{feeDetailData.mainSuit}}</span>
          </div>
          <div class=" listData parElem">
            <span class="sonElem">病史</span>
            <span>{{feeDetailData.illHistory}}</span>
          </div>

          <div class="listData parElem">
            <span class="sonElem">个人史</span>
            <span>{{feeDetailData.personHistory}}</span>
          </div>
          <div class="listData parElem">
            <span class="sonElem">既往史</span>
            <span>{{feeDetailData.pastHistory}}</span>
          </div>
          <div class="listData cardTextBor parElem">
            <span class="sonElem">家族史</span>
            <span>{{feeDetailData.familyHistory}}</span>
          </div>
          <div class="listData cardTextBor parElem">
            <span class="sonElem">过敏史</span>
            <span>{{feeDetailData.allergyHistory}}</span>
          </div>
          <div class="listData cardTextBor parElem">
            <span class="sonElem">体格检查</span>
            <span>{{feeDetailData.exam}}</span>
          </div>
          <div class="listData cardTextBor parElem">
            <span class="sonElem">辅助检查</span>
            <span>{{feeDetailData.examAux}}</span>
          </div>
          <div class="listData cardTextBor parElem">
            <span class="sonElem">处理意见</span>
            <span>{{feeDetailData.resolution}}</span>
          </div>
        </div>
      </div>
      <div class="flatCard margin5 cardBottom" v-if="$route.query.type==2">
        <div class="flatCard_title">
          <div class="title">
            <img src="@/assets/images/bingli.png" alt="">
            <span>住院信息</span>
          </div>
           
        </div>
        <div class="cardText">
          <div class="listData cardTextBor parElem">
            <span class="sonElem">住院总费用 </span>
            <span class="parElem" v-if="totalMoney!=0" @click="visitingDetail">￥{{totalMoney|keepTwoNum}}<img src="@/assets/images/icon_right.png" alt=""></span>
            <span class="parElem" v-if="totalMoney==0">￥{{totalMoney|keepTwoNum}} </span>
          </div>
          <div class="cardTextBor listData parElem">
            <span class="sonElem">住院次数</span>
            <span> 第 {{feeDetailData.ihCount}} 次住院</span>
          </div>
          <div class=" listData parElem">
            <span class="sonElem">入院日期</span>
            <span>{{feeDetailData.inTime|lasttime}}</span>
          </div>
          <div class="listData cardTextBor parElem">
            <span class="sonElem">出院日期</span>
            <span> {{feeDetailData.outTime|lasttime}}</span>
          </div>
          <div class="listData cardTextBor parElem">
            <span class="sonElem">住院天数</span>
            <span> {{feeDetailData.recordDays}} 天</span>
          </div>
          <div class="listData cardTextBor parElem">
            <span class="sonElem">离院方式</span>
            <span>{{feeDetailData.leaveType}}</span>
          </div>
          <div class="listData cardTextBor parElem">
            <span class="sonElem">住院病历</span>
            <span>
              <span class="copyApply" @click="business(feeDetailData)">复印申请</span>
            </span>
          </div>
        </div>
      </div>
      <div class="flatCard margin5 cardBottom" v-show="$route.query.type*1==1">
        <div class="cardText">
          <section class="aui-scrollView">
            <div class="aui-list-cell">
              <a href="javascript:;" class="aui-list-item">
                <div class="aui-list-item-fl">
                  <i class="icon">
                    <img src="@/assets/images/chufang.png" alt="">
                  </i>
                  处方记录
                </div>
                <div class="aui-list-item-fr aui-list-item-arrow" @click="recipeRecord">
                  <i></i>
                  <label>
                    <span v-show="feeDetailData.recipeNum!=0" class="mu-secondary-text-color">{{feeDetailData.recipeNum}}</span>
                  </label>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
      <div class="flatCard margin5 cardBottom" v-if="$route.query.type==1">
        <div class="cardText">
          <section class="aui-scrollView">
            <div class="aui-list-cell">
              <a href="javascript:;" class="aui-list-item">
                <div class="aui-list-item-fl">
                  <i class="icon ">
                    <img src="@/assets/images/jianyan.png" alt="">
                  </i>
                  检验报告
                </div>
                <div class="aui-list-item-fr aui-list-item-arrow" @click="reportquery2">
                  <i></i>
                  <label>
                    <span v-show="feeDetailData.lisReportNum!=0" class="mu-secondary-text-color">{{feeDetailData.lisReportNum}}</span>
                  </label>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
      <div class="flatCard margin5 cardBottom" v-show="$route.query.type==1">
        <div class="cardText">
          <section class="aui-scrollView">
            <div class="aui-list-cell">
              <a href="javascript:;" class="aui-list-item">
                <div class="aui-list-item-fl">
                  <i class="icon ">
                    <img src="@/assets/images/jiancha.png" alt="">
                  </i>
                  检查报告
                </div>
                <div class="aui-list-item-fr aui-list-item-arrow" @click="reportquery1">
                  <i></i>
                  <label>
                    <span v-show="feeDetailData.pacsReportNum!=0" class="mu-secondary-text-color">{{feeDetailData.pacsReportNum}}</span>
                  </label>
                </div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script  >

let bizbizPacsReportreaddetail = '/app/bizOhRecord/read/detail';
let selectRecordDetail = "/app/bizIhRecord/read/selectRecordDetail";



export default {
  data() {
    return {
      feeDetailData: '',
      clinicNo: '',
      totalMoney: 0,
    };
  },

  created() {
    this.feeDetail()



  },
  mounted() {
    this.$toast.loading("请求中...")

  },
  methods: {
    visitingDetail() {
      this.$router.push({
        name: 'visitingDetail',
        query: { id: this.$route.query.id }
      });
    },
    // 处方记录
    recipeRecord() {
      let argu = { clinicNo: this.clinicNo }
      this.$router.push({
        name: 'recipeRecord',
        query: argu
      });
    },

    // 检查报告
    reportquery1() {
      sessionStorage.setItem('feeActiveFun', 1)
      let argu = { clinicNo: this.clinicNo }
      this.$router.push({
        name: 'reportquery',
        query: argu
      });
    },
    // 检验报告
    reportquery2() {
      sessionStorage.setItem('feeActiveFun', 2)
      let argu = { clinicNo: this.clinicNo }
      this.$router.push({
        name: 'reportquery',
        query: argu
      });

    },
    business(data) {
      let setInfo = JSON.stringify(data)
      sessionStorage.setItem('chooseInfo', setInfo)
      this.$store.commit('chooseInfoFun', data);
      let argu = {}
      this.$router.push({
        name: 'business',
        query: { id: this.$route.query.id }
      });
    },

    feeDetail() {
      let url;
      if (this.$route.query.type == 1) {
        url = "/app/bizOhRecord/read/detail"
      } else {
        url = "/app/bizIhRecord/read/detail"
      }
      this.$axios.put(url, {
        id: this.$route.query.id * 1,
        status: this.$route.query.type == 2 ? 3 : undefined,
      }).then((res) => {
        if (res.data.code == '200') {
          this.$toast.hide()
          this.feeDetailData = res.data.data;
          this.clinicNo = res.data.data.clinicNo;
          if (res.data.data.totalMoney)
            this.totalMoney = res.data.data.totalMoney
        }
      }).catch(function (err) {
        console.log(err);
      });
    },







  },


};
</script>
 <style  lang="scss"  scoped>
.visitinginfo {
  margin-top: 120px;
  .visiting-content {
    margin: 20px;
    .flatCard {
      margin-top: 20px;
      border-radius: 14px;
      .flatCard_title {
        line-height: 50px;
        border-bottom: 1px solid #dedede;
        display: flex;
        align-items: center;
        align-content: space-between;
        padding: 0 24px;
        .title {
          line-height: 90px;
          img {
            width: 50px;
            position: relative;
            top: 20px;
            margin-right: 20px;
          }
        }
        .right {
          display: flex;
          justify-content: flex-end;
          img {
            width: 13px;
            height: 26px;
            position: absolute;
            right: 24px;
            top: 30px;
          }
        }
      }
    }
  }

  .aui-list-item {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    overflow: hidden;
    background-color: #fff;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0.199);
    text-decoration: none;
    color: inherit;
  }

  .aui-list-item:active {
    background: #fff;
  }

  .aui-list-item:after {
    margin-left: 24px;
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
  }

  .aui-list-item-fl {
    color: #303030;
    font-size: 28px;
    white-space: nowrap;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .copyApply {
    border: 2px solid #1da1f3;
    padding: 4px 14px;
    color: #1da1f3;
    border-radius: 5px;
    font-size: 30px;
  }
  .aui-list-item-fr {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    min-height: 80px;
    color: #9c9c9c;
    text-align: right;
    font-size: 28px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: end;
    -webkit-justify-content: flex-end;
    -ms-flex-pack: end;
    justify-content: flex-end;
  }

  .aui-list-item-fr:after {
    margin-left: 14px;
    width: 10px;
    height: 20px;
    background-size: 10px;
    display: block;
    color: #c9c9c9;
    content: " ";
    background-image: url("~@/assets/images/icon_right.png");
    background-repeat: no-repeat;
  }

  .icon {
    width: 70px;
    height: 50px;
    background-size: 50px;
    display: block;
    background-repeat: no-repeat;
    img {
      width: 50px;
    }
  }
}

.visitinginfo .parElem .sonElem {
  min-width: 30%;
}
.visitinginfo .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  /*align-{{feeDetailDatas: center;*/
  padding: 18px 0;
}
.visitinginfo .cardText .cardTextPP:last-child,
.visitinginfo .cardText .cardTextBor {
  border: none;
}
.visitinginfo .cardText .cardTextKind {
  display: flex;
  justify-content: space-between;
  padding: 28px 0;
  font-size: 27px;
  border-bottom: 2px solid #e9e9e9;
  font-weight: 700;
  margin-bottom: 28px;
}
.visitinginfo .spanWid span {
  /*display: inline-block;*/
  /*word-break: normal;*/
  /*white-space: pre-wrap;*/
  /*word-wrap: break-word;*/
  /*overflow: hidden;*/
  text-align: center;
}
.parElem img {
  width: 13px;
  position: relative;
  top: 1px;
  margin-left: 20px;
}
.listData span {
  padding: 23px 0;
}
.visitinginfo .spanWid span:first-child {
  width: 28%;
  text-align: left;
}
.visitinginfo .spanWid span:nth-child(2) {
  width: 28%;
}
.visitinginfo .arrow span:nth-child(2) span {
  color: red;
  display: flex;
  position: relative;
  left: 140px;
  top: -32px;
}
.visitinginfo .spanWid span:nth-child(3) {
  width: 20%;
}
.visitinginfo .spanWid span:last-child {
  width: 20%;
  text-align: right;
}

.aui-list-cell {
  position: relative;
  z-index: 1;
  align-items: center;
}
</style>