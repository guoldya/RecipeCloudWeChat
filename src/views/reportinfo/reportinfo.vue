<template>
    <div class="reportinfo">
        <Header :post-title="postTitle"></Header>
        <div v-if="reportInfoData.length!=0" class="margin55">
            <div v-if="feeActiveId==1" v-show="!loadingtrue">
                <div class="flatCard">
                    <div class="cardText alignJ">
                        <div class=" parElem listData">
                            <span class="sonElem">姓名</span>
                            <span>{{reportInfoData.name}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">性别</span>
                            <span>{{reportInfoData.sex}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">年龄</span>
                            <span>{{reportInfoData.age}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">检查科室</span>
                            <span>{{reportInfoData.applyDept}} </span>
                        </div>
                        <div class="cardTextBor listData parElem">
                            <span class="sonElem ">检查项目</span>
                            <span>{{reportInfoData.type}}</span>
                        </div>
                        <div class=" cardTextBor listData parElem">
                            <span class="sonElem ">报告时间</span>
                            <span>{{reportInfoData.reportTime|lasttime}}</span>
                        </div>

                    </div>
                </div>
                <div class="flatCard margin5 cardBottom">
                    <div class="cardText">
                        <div class="cardTextBor listData parElem">
                            <span class="sonElem">检查部位</span>
                            <span>{{reportInfoData.itemName}}</span>
                        </div>

                        <div class="findings">
                            <p> 检查所见</p>
                            <p>{{reportInfoData.findings}}</p>
                        </div>
                        <div class="findings">
                            <p class="sonElem"> 诊断意见</p>
                            <p>{{reportInfoData.impression}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="feeActiveId==2" v-show="!loadingtrue">
                <div class="flatCard">
                    <div class="cardText alignJ">
                        <div class="parElem listData">
                            <span class="sonElem">姓名</span>
                            <span>{{reportInfoData.name}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">性别</span>
                            <span>{{reportInfoData.sex}}</span>
                        </div>
                        <div class=" parElem listData">
                            <span class="sonElem">年龄</span>
                            <span>{{reportInfoData.age}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">检验科室</span>
                            <span>{{reportInfoData.applyDept}}</span>
                        </div>

                        <div class="parElem listData">
                            <span class="sonElem">送检项目</span>
                            <span>{{reportInfoData.itemName}}</span>
                        </div>
                        <div class="parElem listData">
                            <span class="sonElem">报告时间</span>
                            <span>{{reportInfoData.reportTime|lasttime}}</span>
                        </div>
                        <div class=" listData parElem">
                            <span class="sonElem">临床诊断</span>
                            <span>{{reportInfoData.diag}}</span>
                        </div>
                    </div>
                </div>
                <div class="margin5">
                    <div class="cardText Cardswitch0">
                        <span class="pingbi">仅看异常</span>
                        <md-switch v-model="isActive" @change="handler('switch0', isActive, $event)"></md-switch>
                    </div>
                </div>
                <div class="flatCard" v-for="(item,index) in  section" :key="index+'bb'">
                    <div class="cardText alignJ">
                        <p class="title">{{item.itemName}}
                            <span class="title-desc" v-if="item.unit">({{item.unit}})</span>
                        </p>
                        <div class="indicator">
                            <p class="value" :style="getleftTEXT(Number(item.beginStr),Number(item.endStr),Number(item.itemValue))">{{item.itemValue}} </p>
                            <div class="xui-process">
                                <i class="xui-icon-flag" :style="getleft(Number(item.beginStr),Number(item.endStr),Number(item.itemValue))"></i>
                                <div class="xui-process-static"></div>
                                <div class="xui-process-active"></div>
                                <div class="hight-value" :style="hightValue(Number(item.beginStr),Number(item.endStr),Number(item.itemValue))"></div>
                                <div class="low-value" :style="lowValue(Number(item.beginStr),Number(item.endStr),Number(item.itemValue))"></div>
                            </div>
                            <p>
                                <span>{{item.beginStr}} </span>
                                <span>正常</span>
                                <span> {{item.endStr}}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flatCard">
                    <div class="cardText alignJ">
                        <div class="parElem listData" v-for="(section,index) in reportInfoData.noSection" :key="index+'aa'">
                            <span class="sonElem">{{section.itemName}}</span>
                            <span>{{section.itemValue}} {{section.unit}}</span>
                        </div>
                    </div>
                </div>
                <p class="warn">温馨提示：此次检查结果，仅对本次查体，检查，检验样本负责。</p>
            </div>
        </div>
        <Loading v-show="loadingtrue"></Loading>
    </div>
</template>
<script  >
let bizbizPacsReportreaddetail = '/app/bizPacsReport/read/detail';
let bizLisReportreaddetail = '/app/bizLisReport/read/detail';
export default {
    data() {
        return {
            isActive: false,
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
            reportInfoId: '',
            collectInfoId: '',
            reportInfoData: [],
            reportResult: [],
            pageSize: 10,
            pageNumber: 1,
            feeActiveId: '',
            postTitle: '',
            before: [],
            after: [],
            loadingtrue: true,
            section: '',
        };
    },
    mounted() {
        this.feeActiveId = sessionStorage.getItem('feeActiveFun') * 1;
        if (this.$route.query.objType == 3) {
            this.feeActiveId = 1
        } else if (this.$route.query.objType == 4) {
            this.feeActiveId = 2
        }
        if (this.feeActiveId == 1) {
            this.checkReportDetail();
            this.postTitle = "检查报告详情";
            document.title = '检查报告详情';
        } else if (this.feeActiveId == 2) {
            this.collectReportDetail();
            this.postTitle = "检验报告详情";
            document.title = '检验报告详情';
        }

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
            let aa = `width: 20%; position: absolute; background:#ffafa9; top: 0.28rem; height:  0.04rem;`
            let bb = `width: 20%; position: absolute; background:#b1b1b1; top: 0.28rem; height:  0.04rem;`
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

                    if ((value - min) / (max - min) - 0.2 < 0.1) {
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
                    if ((value - min) / (max - min) - 0.2 < 0.1) {
                        var bb = (value - min) / (max - min) + 0.2
                    } else {
                        var bb = (value - min) / (max - min) - 0.2
                    }
                    return `margin-left: ${bb * 100}%;color:#1da1f3`
                }
            }

        },
        handler(name, active) {
            this.reportInfoData = [];
            this.collectReportDetail()
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
        },
        checkReportDetail() {
            let _this = this;
            this.reportInfoId = this.$route.query.id;
            let checkParams = {};
            checkParams.id = parseInt(this.reportInfoId);


            this.$axios.put(bizbizPacsReportreaddetail, checkParams, {
            }).then((res) => {
                if (res.data.code == '200') {
                    this.loadingtrue = false;
                    this.reportInfoData = res.data.data;
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        collectReportDetail() {
            let _this = this;
            this.collectInfoId = this.$route.query.id;
            this.$axios.put(bizLisReportreaddetail, { id: parseInt(this.collectInfoId), contrast: this.isActive ? 1 : undefined }, {
            }).then((res) => {
                if (res.data.code == '200') {
                    this.loadingtrue = false;
                    this.reportInfoData = res.data.data;
                    this.section = res.data.data.section;
                }
            }).catch(function (err) {
                console.log(err);
            });
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

.reportinfo .parElem .sonElem {
  width: 50%;
}
.reportinfo .cardText .cardTextPP {
  display: flex;
  justify-content: space-between;
  font-size: 28px;
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
  text-align: center;
}

.reportinfo .spanWid span:first-child {
  width: 28%;
  text-align: left;
}
.reportinfo .spanWid span:nth-child(2) {
  width: 28%;
}
.reportinfo .arrow span:nth-child(2) span {
  color: red;
  display: flex;
  position: relative;
  left: 140px;
  top: -32px;
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
</style>