<!-- 问诊记录-->
<template>
  <div class="inquiry-record">
    <Header post-title="专家问诊"></Header>
    <!-- 列表 -->
     <div class="inquiry-list">
      <div class="inquiry-list-head"><img src="@/assets/images/3.jpg" /><span>1</span></div>
      <div class="inquiry-list-info">
         <div class="inquiry-list-title">
            <span class="name">周洋</span>
            <span>主治医生</span>
            <span>内科</span>
            <span class="inquiry-list-title-date">07:55</span>
         </div>
         <div class="inquiry-list-content">
           的设计嗲放hi撒谎覅哦啊h的设计嗲放hi撒谎覅哦啊hi发的撒旦撒旦i发的撒旦撒旦
         </div>
       </div>
     </div>
  </div>
</template>
<script>
export default {
  data(){
  return{}
  }
}
</script>
<style lang="less" scoped>
.inquiry-record {
  box-sizing: border-box;
  padding-top:1rem;
}
 .inquiry-list {
   display:flex;
    padding:20px 24px;
    border-bottom:1px solid #e0e0e0;
    .inquiry-list-head {
      position: relative;
       height:100px;
          margin-right:20px;
      img{
       width:100px;
       height:100px;
       border-radius: 50px;
      }
      span{
        position:absolute;
        top:-4px;
        right:-6px;
        display:inline-block;
        width:32px;
        height:32px;
        border-radius: 16px;
        background: red;
        text-align: center;
        line-height: 32px;
        font-size: 24px;
        color:#fff;
      }
    }
    .inquiry-list-info {
      flex:1;
      display:flex;
      flex-direction:column;
      justify-content: space-around;
      overflow: hidden;
      .inquiry-list-title{
        color:#999;
        .name{
          color:#000;
        }
        span {
          margin-right:20px;
        }
      }
      .inquiry-list-title-date {
         float:right;
          color:#000;
      }
      .inquiry-list-content{
        overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      width:55%;
      }
    }
  }
</style>

