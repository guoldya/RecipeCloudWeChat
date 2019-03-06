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
          ss
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
      <div class="doctor-way-item">
        <div class="doctor-way-item-img"></div>
        <div class="doctor-way-item-money ">￥20/次</div>
      </div>
      <div class="doctor-way-item">
        <div class="doctor-way-item-img"></div>
        <div class="doctor-way-item-money doctor-way-item-phone">￥20/次</div>
      </div>
      <div class="doctor-way-item">
        <div class="doctor-way-item-img"></div>
        <div class="doctor-way-item-money doctor-way-item-video">暂未开通</div>
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
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
      border-right: 1px solid #e0e0e0;
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
    }
    .doctor-way-item-img {
      width: 80px;
      height: 80px;
      border-radius: 40px;
      background: Red;
    }
    .doctor-way-item-money {
      margin-top: 20px;
      width: 160px;
      border: 1px solid red;
      height: 46px;
      line-height: 46px;
      border-radius: 23px;
      text-align: center;
      color: red;
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
}
</style>
