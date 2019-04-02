<!-- 检查报告单-->
<template>
  <div class="inspection-report">
    <Header post-title="查看检查报告单"></Header>
    <div class="inspection-report-people">
      <span>张丽</span>
      <span>女</span>
      <span>30岁</span>
    </div>
    <div class="inspection-report-num">
      找到<span>3</span>份比例
    </div>
    <reportList></reportList>
    <reportList></reportList>
    <reportList></reportList>

  </div>
</template>
<script>
import reportList from '../component/reportList'
export default {
   components:{
     reportList
   }
}
</script>

<style lang="scss" scoped>
$color:var(--primary);
$border: 1px solid #f1f3f1;
 .inspection-report {
    padding-top:100px;
    .inspection-report-people {
      padding:30px 40px;
      color:$color;
      border-bottom:$border;
      span {
        margin-right:30px;
      }
    }
    .inspection-report-num {
      padding:20px 40px;
      border-bottom:$border;
      span {
        color:$color;
      }
    }
 }
</style>
