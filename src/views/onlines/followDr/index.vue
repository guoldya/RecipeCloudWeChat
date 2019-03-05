<!-- 关注的医生-->
<template>
  <div class="follow-dr">
    <Header post-title="关注的医生"></Header>
    <!-- 医生列表 -->
    <doctorList></doctorList>
    <doctorList></doctorList>

  </div>
</template>
<script>
import doctorList from '../component/doctorList'
export default {
  data() {
  return{

  }
  },
  components:{
    doctorList
  }
}
</script>
<style scoped>
.follow-dr {
  margin-top:1rem;
  padding:0 24px;
  overflow: hidden;
}
</style>

