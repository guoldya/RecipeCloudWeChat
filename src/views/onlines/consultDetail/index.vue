<!-- 医生咨询详情-->
<template>
  <div class="doctor-detail">
    <!-- 医生信息 -->
    <div class="doctor-info doctor-item b-m">
      <div class="doctor-info-top">
        <div class="doctor-info-header">
          <img src="@/assets/images/3.jpg" alt="" />
        </div>
        <div class="doctor-info-content">
          <p>周洋</p>
          <p class="gray"><span>主治医生</span><span>儿科</span></p>
        </div>
        <div class="doctor-info-follow">
          <img src="../images/shoucang1.png" alt="">
          <img v-if="false" src="../images/shoucang2.png" alt="">

        </div>
      </div>
      <div class="doctor-info-bottom">
        <div>
          <p class="gray">问诊量</p>
          <p>6555</p>
        </div>
        <div>
          <p class="gray">评论率</p>
          <p>80%</p>
        </div>
        <div>
          <p class="gray">关注</p>
          <p>3625</p>
        </div>
      </div>
    </div>
    <!-- 沟通方式 -->
    <div class="doctor-way doctor-item b-m">
      <div class="doctor-way-item" @click="consult('img')">
        <div class="doctor-way-item-img"><img src="../images/image.png" alt="" /></div>
        <div class="doctor-way-item-money doctor-way-item-image">￥20/次</div>
      </div>
      <div class="doctor-way-item" @click="consult('phone')">
        <div class="doctor-way-item-img"><img src="../images/phone.png" alt="" /></div>
        <div class="doctor-way-item-money doctor-way-item-phone">￥20/次</div>
      </div>
      <div class="doctor-way-item video">
        <div class="doctor-way-item-img"><img src="../images/video.png" alt="" /></div>
        <div
          class="doctor-way-item-money doctor-way-item-video doctor-way-item-disabled"
        >
          暂未开通
        </div>
      </div>
    </div>
    <!--擅长-->
    <div class="doctor-speciality b-m">
      <div class="b-m">擅长</div>
      <div>儿科常见病、多发病 #先天性心脏病</div>
    </div>
    <!--简介  -->
    <div class="doctor-abstract b-m">
      <div class="b-m">简介</div>
      <div>
        周扬，儿科主治医师，多年来专注于儿科临床工作，具有丰富的临床经验，擅长儿科常见病、多发病诊治，尤其在先天性心脏病诊疗方面经验丰富
      </div>
    </div>
    <!-- 评论 -->
    <div class="doctor-comment b-m">
      <div class="b-m">评论</div>
    </div>
    <!-- 评论详情 -->
    <div class="doctor-comment-item b-m">
      <div class="b-m doctor-comment-item-header">
        <span>15444**8444</span>
        <span class="assess">满意</span>
        <span>8月14日</span>
      </div>
      <div class="doctor-comment-item-content">
        <div class="ellipsis">
          非常感谢周大夫，从宝宝出生到现在有任何问题都是咨询她，z每次都z每次都z每次都z每次都很及时心的回复，谢谢！
        </div>
        <div class="describe ">
          <div class="ellipsis">
            问题描述：周大夫您好，我家宝宝发烧三天半了还不好，化验血说病毒感染，刚38.宝宝发烧三天半了还不好，化验血说病毒感染，刚38.5喝了诺泰林不.
          </div>
        </div>
      </div>
    </div>
    <!-- 咨询弹窗 -->
    <md-dialog
      :title="basicDialog.title"
      :closable="true"
      v-model="basicDialog.open"
      :btns="basicDialog.btns"
    >
      <p class="money">$20.0/次</p>
      <p>咨询师-周扬</p>
      <p class="ways">通过文字,图片进行咨询</p>
      <md-agree v-model="basicDialog.checked" :disabled="false" size="sm">
        同意<a>《重庆市妇幼保健院在线问诊用户协议》</a>
      </md-agree>
    </md-dialog>
  </div>
</template>
<script>
import { Dialog, Agree, Toast } from "mand-mobile";
export default {
  data() {
    return {
      // 咨询弹窗
      basicDialog: {
        open: false,
        checked: true,
        title: "",
        type: null, // 咨询弹窗类型 type 1 图文 2 电话 3视频
        btns: [
          {
            text: "取消申请",
            handler: this.onBasicCancel
          },
          {
            text: "申请咨询",
            handler: this.onConfirm
          }
        ]
      }
    };
  },
  methods: {
    // 取消按钮
    onCancel() {
      this.basicDialog.open = false;
    },
    // 点击申请咨询按钮
    onConfirm() {
      if (!this.basicDialog.checked) {
        Toast.info("请同意用户协议");
        return false;
      }
      this.basicDialog.open = false;
      Dialog.confirm({
        title: "温馨提示",
        content: `
        <div class="info">1、咨询服务可提供相关建议。</div>
        <div class="info">2、仅为复诊患者提供诊疗服务。</div>
        <div class="info">3、为保证医疗安全，特殊药品如精神类药物，强心类药物等需要门诊就诊后开具。</div>`,
        confirmText: "确定",
        onConfirm: () => {
          this.$router.push({path:'/buyService'})
        }
      });
    },
    // 咨询
    consult(val) {
      this.basicDialog.open = true;
      if (val === "img") {
        this.basicDialog.title = "图文咨询";
      } else if (val === "phone") {
        this.basicDialog.title = "电话咨询";
      }
    }
  },
  components: {
    Dialog
  }
};
</script>
<style lang="less" scoped>
.doctor-detail {
  .gray {
    color: #999;
  }
  .b-m {
    border-bottom: 1px solid #f1f3f1;
  }
  .doctor-item {
    padding: 24px 40px;
  }
  .doctor-info-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .doctor-info-header {
      margin-right: 20px;
      img {
        width: 100px;
        height: 100px;
        border-radius: 50px;
      }
    }
    .doctor-info-content {
      flex: 1;
      .gray span {
        margin-right: 20px;
      }
    }
  }
  .doctor-info-bottom {
    display: flex;
    margin-top: 20px;
    > div {
      flex: 1;
      border-right: 1px solid #f1f3f1;
      &:last-child {
        border-right: none;
      }
      p {
        text-align: center;
        font-size: 24px;
      }
    }
  }
  .doctor-way {
    display: flex;
    justify-content: space-between;
    .doctor-way-item {
      display: inherit;
      flex-direction: column;
      font-size: 24px;
      align-items: center;
      &.video .doctor-way-item-img {
        background: #e3e3e3;
      }
    }
    .doctor-way-item-img {
      width: 90px;
      height: 90px;
      border-radius: 45px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .doctor-way-item-money {
      margin-top: 20px;
      width: 160px;
      height: 46px;
      line-height: 46px;
      border-radius: 23px;
      text-align: center;
    }
    .doctor-way-item-image {
      border: 1px solid #4ad962;
      color: #4ad962;
    }
    .doctor-way-item-phone {
      border: 1px solid #57a8ee;
      color: #57a8ee;
    }
    .doctor-way-item-disabled {
      border: 1px solid #e3e3e3;
      color: #999;
    }
  }
  .doctor-speciality,
  .doctor-abstract,
  .doctor-comment,
  .doctor-comment-item {
    > div {
      padding: 14px 40px;
    }
    .b-m {
      padding-top: 20px;
      padding-bottom: 20px;
    }
  }
  .doctor-comment-item-header {
    span {
      margin-right: 20px;
      &:nth-last-child(1) {
        margin-right: 0;
        float: right;
      }
    }
    .assess {
      color: #ff9b00;
    }
  }
  .doctor-comment-item-content {
    padding-top: 20px !important;
    padding-bottom: 20px !important;
    .ellipsis {
      overflow: hidden;
      display: -webkit-box;
      /* autoprefixer: off */
      -webkit-box-orient: vertical;
      /* autoprefixer: on */
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
    }
    .describe {
      background: #f1f3f1;
      padding: 16px 20px;
      margin-top: 20px;
      box-sizing: content-box;
    }
  }
  .doctor-info-follow {
    img {
      width:40px;
      height:40px;
    }
  }
}
.md-dialog {
  /deep/ .md-dialog-body {
    padding: 0.52rem 30px 0.2rem;
    p {
      text-align: center;
      color: #000;
      line-height: 50px;
    }
    .money {
      color: #ff9b00;
    }
    .ways {
      color: #999;
    }
    .md-agree {
      /deep/ .md-agree-content {
        color: #999;
        font-size: 24px;
      }
    }
    
  }
}

</style>
<style lang="less">
.md-dialog {
    .md-dialog-text {
      flex-wrap:wrap;
      .info{
        width:100%;
      }
    }
}
</style>


