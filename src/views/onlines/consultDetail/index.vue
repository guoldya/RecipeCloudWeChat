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
          <p >周洋</p>
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
         <div class="doctor-way-item-money">￥20/次</div>
       </div>
       <div class="doctor-way-item">
          <div class="doctor-way-item-img"></div>
         <div class="doctor-way-item-money">￥20/次</div>
       </div>
       <div class="doctor-way-item"> 
          <div class="doctor-way-item-img"></div>
         <div class="doctor-way-item-money">暂未开通</div>
       </div>
    </div>
    <!--擅长-->
    <div class="doctor-speciality">
       <div class="b-m">擅长</div>
       <div class="b-m">儿科常见病、多发病   #先天性心脏病</div>
    </div>
    <!--简介  -->
    <div class="doctor-abstract">
      <div class="b-m">简介</div>
      <div class="b-m">
       周扬，儿科主治医师，多年来专注于儿科临床工作，具有丰富的临床经验，擅长儿科常见病、多发病诊治，尤其在先天性心脏病诊疗方面经验丰富</div>
    </div>
    <!-- 评论 -->
    <div class="doctor-comment"></div>
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
    color:#999;
  }
  .b-m {
    border-bottom:1px solid #e0e0e0;
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
    .doctor-info-content{
      flex:1;
      .gray span{
        margin-right:20px;
      }
    }
  }
  .doctor-info-bottom {
     display:flex;
     margin-top:20px;
     >div {
       flex:1;
       border-right:1px solid #e0e0e0;
       &:last-child{
         border-right:none;
       }
       p{
         text-align: center;
         font-size:24px;
       }
     }
  }
  .doctor-way {
    display: flex;
    justify-content: space-between;
    .doctor-way-item {
      display: inherit;
      flex-direction:column;
      font-size:24px;
      align-items: center;
    }
    .doctor-way-item-img{
      width:80px;
      height:80px;
      border-radius: 40px;
      background:Red;
    }
    .doctor-way-item-money{
      margin-top:20px;
      width:160px;
      border:1px solid red;
      height:46px;
      line-height: 46px;
      border-radius: 23px;
      text-align:center;
      color:red;
    }
  }
  .doctor-speciality,.doctor-abstract {
    >div{
      padding: 14px 40px;
      &:nth-last-child(1){
        padding-top:20px;
        padding-bottom:20px;
      }
    }
  }
}
</style>
