<template>
  <div class="medicalinfo margin55  ">
    <Navigation type="title" title="报告详情"></Navigation>
    <div class="outCarint">
      <div class="medicalinfo-box1" @click="isShow=!isShow">
        <div class="box1-left">
          <div class="headimg">
            <img src="@/assets/images/medica1 (12).png" alt="医生头像">
          </div>
        </div>
        <div class="box1-center">
          <h2>
            总检建议
          </h2>
          <p>综合报告内检项给出的建议与指导</p>
        </div>
        <div class="box1-right">
          <img src="@/assets/images/medica1 (3).png" alt="" :class="isShow ? 'isDwom' : '' ">
        </div>
      </div>

      <div class="medical-details" v-show="isShow">
        <p>{{goodsList.advise}}</p>
        <p> <img src="@/assets/images/yishi.png" alt="">评审医师：{{goodsList.doctor}}</p>
      </div>
    </div>
    <div class="medicalinfo-box1 medicalinfo-box2" @click="isShowPint=!isShowPint">
      <div>
        需重点关注项目
      </div>
      <div class="box1-right">
        <img src="@/assets/images/icon_open@2x.png" alt="" :class="isShowPint ? 'isDwom' : '' ">
      </div>

    </div>
    <div v-show="isShowPint">
      <div v-if="goodsList.importantItems!=0" class="pointCell" v-for="(item,i) in goodsList.importantItems" :key="i">
        <div class="medical-left">
          {{item.name}}
        </div>
        <div class="medical-right">
          {{item.resultValue}}
        </div>
      </div>

    </div>
    <section class="aui-scrollView">
      <div class="aui-tab"> 健康检查结果 </div>
      <div class="aui-list-cell" v-if="goodsList.itemVOList!=0" v-for="(item1,i) in goodsList.itemVOList" :key="i+'1'">
        <a href="javascript:;" class="aui-list-item" @click="intoMedicaldetail(item1)">
          <div class="aui-list-item-fl">
            <i class="icon ">
              <img :src="item1.itemType|payStatusIMG" alt="">
            </i>
            {{item1.itemType|payStatusText}}
          </div>
          <div class="aui-list-item-fr aui-list-item-arrow">
            <i></i>
            <label v-show="item1.abnormalNum!=0">
              <span class="mu-secondary-text-color">{{item1.abnormalNum}}</span> 项检查需要关注</label>
          </div>
        </a>
      </div>

    </section>
    <p class="warn">报告时间：{{$route.query.reportDate|time}} </p>
  </div>
</template>
  
<script>
let bizExamReportselectReportDetailList = "/api/hos/bizExamReport/selectReportDetailList"
export default {

  data() {
    return {
      active: 1,
      isShow: false,
      goodsList: '',
      isShowPint: false,
      isloading: true, // 是否正在请求
      doctorParams: {
        reportId: this.$route.query.id * 1
      },
    };
  },
  async mounted() {
    await this.getGoodslist();
    this.isloading = false;
  },
  methods: {
    async  getGoodslist() {
      this.isloading = true;
      try {
        let res = await this.$axios.put(bizExamReportselectReportDetailList, this.doctorParams);
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
    intoMedicaldetail(data) {
      this.$router.push({
        name: 'medicaldetail',
        query: { id: data.itemId, itemType: data.itemType, abnormalNum: data.abnormalNum }
      });
    },


  }
}
</script>

 <style lang="scss"  scoped>
.medicalinfo {
  margin-top: 120px;
  .medicalinfo-box1 {
    margin-bottom: 14px;
    display: flex;
    padding: 40px;
    padding-right: 24px;
    background: -webkit-linear-gradient(left, #4eabfe 40%, #177fff);
    /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #4eabfe 40%, #177fff);
    /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #4eabfe 40%, #177fff);
    /* Firefox 3.6 - 40 */
    background: linear-gradient(to right, #4eabfe 40%, #177fff);
    box-shadow: 0 10px 10px rgba(48, 147, 255, 0.2);
    /* 标准的语法 */
    background-size: 100%;
    background-repeat: no-repeat;
    margin-bottom: 20px;
    border-radius: 14px;
    align-items: center;
    color: #fff;
    justify-content: space-between;
    .box1-left {
      img {
        border-radius: 0;
      }
    }
    .box1-center {
      flex: 0 0 450px;
      h2 {
        font-weight: 500;
        line-height: 60px;
        font-size: 34px;
      }
      p {
        line-height: 50px;
      }
      span {
        color: #8d8d8d;
      }
    }
    .box1-right {
      .isDwom {
        transition: transform 0.2s;
        transform: rotate(180deg);
      }
      margin-top: 0;
      img {
        width: 20px;
      }
    }
  }
  .medicalinfo-box2 {
    background: #ffffff;
    color: #272727;
    box-shadow: none;
    border-radius: 0;
    padding: 30px 52px 30px 24px;
    font-size: 30px;
  }
  .medical-details {
    :first-child {
      color: #8d8d8d;
      line-height: 60px;
      border-bottom: 1px solid #e5e5e5;
    }
    img {
      width: 30px;
      top: 10px;
      position: relative;
      margin-right: 14px;
    }
    p {
      line-height: 100px;
    }
  }
  .pointCell {
    &:last-child {
      border: none;
    }
    display: flex;
    align-items: center;

    justify-content: space-between;
    padding: 24px;
    padding-right: 44px;
    border-bottom: 1px solid #dedede;
    .medical-right {
      color: #ff584b;
      flex: 0 0 340px;
      text-align: right;
    }
  }

  .aui-scrollView {
    background: #fff;
    margin-bottom: 50px;
    .aui-tab {
      padding: 30px 24px;
      border-bottom: 1px solid #e5e5e5;
      font-size: 30px;
    }
  }
  .aui-list-cell {
    position: relative;
    z-index: 1;
    align-items: center;
  }

  .aui-list-item {
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    position: relative;
    padding-left: 24px;
    padding-right: 40px;
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
    border-bottom: 2px solid #e5e5e5;
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

  .aui-list-item-fr {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
    width: 100%;
    min-height: 100px;
    color: #9c9c9c;
    text-align: right;
    font-size: 26px;
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

  .divHeight {
    width: 100%;
    height: 20px;
    background: #f8f8f8;
  }

  .aui-list-item-fr:after {
    margin-left: 40px;
    width: 14px;
    height: 24px;
    background-size: 14px;
    display: block;
    color: #c9c9c9;
    content: " ";
    background-image: url("~@/assets/images/icon_more.png");
    background-repeat: no-repeat;
  }

  .icon {
    width: 90px;
    height: 60px;
    background-size: 60px;
    display: block;
    background-repeat: no-repeat;
    img {
      width: 63px;
    }
  }
  .icon-item01 {
    background-image: url("~@/assets/images/medica1 (1).png");
  }

  .icon-item02 {
    background-image: url("~@/assets/images/medica1 (2).png");
  }
}
.warn {
  font-size: 24px;
  color: #8d8d8d;
  margin: 24px;
}
</style>
