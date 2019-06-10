<template>
  <div class="reportinfo medicaldetail">
    <Navigation type="title" title="检查详情"></Navigation>
    <div v-if="goodsList.length!=0" class="margin55">
      <div v-show="!isloading">
        <div class="flatCard">
          <div class="cardText alignJ">
            <div class="list-cell">
              <div class="list-item-fl">
                <img :src="$route.query.itemType*1|payStatusIMG" alt="">
                <span> {{$route.query.itemType*1|payStatusText}}</span>
              </div>
              <div class="list-item-fr">
                <label v-show="$route.query.abnormalNum!=0">
                  <span class="point-text-color">{{$route.query.abnormalNum}} </span> 项需要关注</label>
              </div>
            </div>
            <div class="adivice">
              <p>
                初步建议：{{goodsList.advise}}
              </p>
            </div>
          </div>
        </div>
        <div class="margin5">
          <div class="cardText Cardswitch0">
            <span class="pingbi">仅看异常</span>
            <md-switch v-model="isActive" @change="handler('switch0', isActive, $event)"></md-switch>
          </div>
        </div>
        <div class="flatCard" v-for="(item,index) in  goodsList.section" :key="index+'bb'">
          <div class="cardText alignJ">
            <p class="title">{{item.name}}
              <span class="title-desc" v-if="item.unit">({{item.unit}})</span>
            </p>
            <div class="indicator">
              <p class="value" :style="getleftTEXT(Number(item.rangeStart),Number(item.rangeEnd),Number(item.resultValue))">{{item.resultValue}} </p>
              <div class="xui-process">
                <i class="xui-icon-flag" :style="getleft(Number(item.rangeStart),Number(item.rangeEnd),Number(item.resultValue))"></i>
                <div class="xui-process-static"></div>
                <div class="xui-process-active"></div>
                <div class="hight-value" :style="hightValue(Number(item.rangeStart),Number(item.rangeEnd),Number(item.resultValue))"></div>
                <div class="low-value" :style="lowValue(Number(item.rangeStart),Number(item.rangeEnd),Number(item.resultValue))"></div>
              </div>
              <p>
                <span>{{item.rangeStart}} </span>
                <span>正常</span>
                <span> {{item.rangeEnd}}</span>
              </p>
            </div>
          </div>
        </div>

        <div class="flatCard">
          <div class="cardText alignJ">
            <div class="parElem listData" v-for="(section,index) in goodsList.noSection" :key="index+'aa'">
              <span class="sonElem">{{section.name}}</span>
              <span>{{section.resultValue}}</span>
            </div>
          </div>
        </div>
        <p class="warn">温馨提示：此次检查结果，仅对本次查体，检查，检验样本负责。</p>
      </div>
    </div>
    <Loading v-show="isloading"></Loading>
  </div>
</template>
<script  >
let bizbizPacsReportreaddetail = '/app/bizExamItemDetails/selectItemDetailList';

export default {
  data() {
    return {
      isActive: false,
      goodsList: '',
      isloading: true, // 是否正在请求
      doctorParams: {
        itemId: this.$route.query.id * 1
      },
    };
  },

  created() {

  },
  async mounted() {
    await this.getGoodslist();
    this.isloading = false;
  },
  methods: {
    hightValue(min, max, value) {
      let aa = `width: 20%; position: absolute; background:#ffafa9; top: 0.28rem; height: 0.04rem;`
      let bb = `width: 20%; position: absolute; background:#b1b1b1; top: 0.28rem; height: 0.04rem;`
      if (value < min) {
        return bb + `right: 0`

      } else if (value > max) {
        return aa + `right:0`
      } else {
        if (value == min) {
          return bb + `right: 0`
        } else if (value == max) {
          return bb + `right: 0`
        } else {
          return bb + `right: 0`
        }
      }
    },
    lowValue(min, max, value) {
      let aa = `width: 20%; position: absolute; background:#ffafa9; top: 0.28rem; height: 0.04rem;`
      let bb = `width: 20%; position: absolute; background:#b1b1b1; top: 0.28rem; height: 0.04rem;`
      if (value < min) {
        return aa + `left: 0`

      } else if (value > max) {
        return bb + `left: 0`
      } else {
        if (value == min) {
          return bb + `left: 0`
        } else if (value == max) {
          return bb + `left: 0`
        } else {
          return bb + `left: 0`
        }
      }
    },
    getleft(min, max, value) {

      if (value < min) {
        return ` left: 10%;background: #ff584b;`

      } else if (value > max) {
        return `right: 10%;background: #ff584b;`
      } else {
        if (value == min) {
          return `left: 20%;background: #1da1f3;`
        } else if (value == max) {
          return `right: 20%;background: #1da1f3;`
        } else {
          if ((value - min) / (max - min) - 0.2 < 0.16) {
            var aa = (value - min) / (max - min) + 0.2
          } else {
            var aa = (value - min) / (max - min) - 0.2

          }
          return `left: ${aa * 100}%;color:#1da1f3`
        }
      }




    },
    getleftTEXT(min, max, value) {
      if (value < min) {
        return `margin-left: 10%;color:#ff584b ,`

      } else if (value > max) {
        return `margin-left: 90%;color:#ff584b , `
      } else {
        if (value == min) {
          return `margin-left: 20%;color: #1da1f3;`
        } else if (value == max) {
          return `margin-right: 20%;color: #1da1f3;`
        } else {
          if ((value - min) / (max - min) - 0.2 < 0.16) {
            var bb = (value - min) / (max - min) + 0.2
          } else {
            var bb = (value - min) / (max - min) - 0.2
          }
          return `margin-left: ${bb * 100}%;color:#1da1f3`
        }
      }

    },
    handler(name, active) {
      this.goodsList = [];
      this.getGoodslist()
    },
    async  getGoodslist() {
      this.isloading = true;
      this.doctorParams.abnormal = this.isActive ? 1 : undefined
      try {
        let res = await this.$axios.put(bizbizPacsReportreaddetail, this.doctorParams);
        if (res.data.code != 200) {
          throw Error(res.data.msg);
        }

        if (res.data.data) {
          this.goodsList = res.data.data
        }

        // this.$toast.hide()
        this.isloading = false;


      } catch (error) {
        console.log(error.message);
      }
    },

  },


};
</script>
 <style  lang="scss"  scoped>
.title {
  line-height: 100px;
}
.title-desc {
  color: var(--primary--KNline);
  font-size: 26px;
}
.findings {
  padding: 40px 0;
  border-top: 2px solid #dedede;
  line-height: 40px;
  :nth-child(2) {
    color: var(--primary--content);
    margin-top: 10px;
  }
}
.indicator {
  background: #ffffff;
  // padding: 20px;

  .xui-process {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    padding: 28px 0 12px;
    width: 100%;
  }
  .xui-process .xui-icon-flag {
    position: absolute;
    top: 17px;
    width: 25px;
    height: 25px;
    background: var(--primary);
    border-radius: 50%;
    z-index: 9;
  }
  .xui-process .xui-process-static {
    width: 100%;
    height: 4px;
    background: var(--primary--KNline);
  }
  .xui-process .xui-process-active {
    position: absolute;
    top: 28px;
    left: 20%;
    width: 0;
    height: 4px;
    background: var(--primary);
    border-radius: 10px;
    width: 60%;
  }

  p {
    color: var(--primary--red);
    font-size: 32px;
    line-height: 80px;
    :nth-child(1) {
      margin-left: 19%;
    }
    :nth-child(2) {
      margin-left: 20%;
    }
    :nth-child(3) {
      margin-left: 20%;
    }
    span {
      font-size: 28px;
      color: var(--primary--KNline);
    }
  }
}

.medicaldetail .parElem .sonElem {
  min-width: 20%;
}
.reportinfo .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
  /*align-goodsLists: center;*/
  padding: 18px 0;
}
.reportinfo .cardText .cardTextPP:last-child,
.reportinfo .cardText .cardTextBor {
  border: none;
}
.reportinfo .cardText .cardTextKind {
  display: flex;
  justify-content: space-between;
  padding: 28px 0;
  font-size: 27px;
  border-bottom: 2px solid #e9e9e9;
  font-weight: 700;
  margin-bottom: 28px;
}
.reportinfo .spanWid span {
  /*display: inline-block;*/
  /*word-break: normal;*/
  /*white-space: pre-wrap;*/
  /*word-wrap: break-word;*/
  /*overflow: hidden;*/
  text-align: center;
}

.reportinfo .spanWid span:nth-child(3) {
  width: 20%;
}
.reportinfo .spanWid span:last-child {
  width: 20%;
  text-align: right;
}

.Cardswitch0 {
  display: flex;
  justify-content: space-between;
}
.reportinfo .md-switch {
  box-sizing: border-box;
  position: relative;
  width: 70px;
  height: 34px;
  border-radius: 48px;
  background-color: #e2e4ea;
}
.reportinfo .md-switch:before {
  width: 0.7rem;
  height: 0.34rem;
  border-radius: 0.24rem;
}
.reportinfo .md-switch:after {
  top: 3px;
  left: 0.04rem;
  width: 0.29rem;
  height: 0.29rem;
  background-color: #fff;
  border-radius: 50%;
}
.reportinfo .flatCard {
  border-top: none;
  margin-bottom: 20px;
}
.reportinfo .parElem {
  line-height: 46px;
}
.reportinfo .warn {
  font-size: 24px;
  color: #8d8d8d;
  margin: 24px;
}

.list-cell {
  display: flex;
  -webkit-justify-content: flex-end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  justify-content: space-between;
  align-items: center;
  .list-item-fl {
    align-items: center;
    img {
      vertical-align: middle;
      width: 57px;
      margin-right: 20px;
    }
  }

  .list-item-fr {
    color: #8d8d8d;
    .point-text-color {
      color: #ff5b60;
    }
  }
}
.adivice {
  background: #fbf7f7;
  padding: 24px;
  margin-top: 24px;
  line-height: 34px;
  border-radius: 7px;
  p {
    color: #ff5b60;
    font-size: 26px;
  }
}
</style>