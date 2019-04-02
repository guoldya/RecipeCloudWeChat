<!-- 查看病例 -->
<template>
  <div class="see-case">
    <Header post-title="查看病例"></Header>
    <div class="see-case-people">
      <span>张丽</span>
      <span>女</span>
      <span>30岁</span>
    </div>
    <div class="see-case-num">
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
 .see-case {
    padding-top:100px;
    .see-case-people {
      padding:30px 40px;
      color:$color;
      border-bottom:$border;
      span {
        margin-right:30px;
      }
    }
    .see-case-num {
      padding:20px 40px;
      border-bottom:$border;
      span {
        color:$color;
      }
    }
 }
</style>
