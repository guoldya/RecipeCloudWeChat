<template>
   <div v-show="loadingTrue" class="nullDiv">
      <img src="@/assets/images/null1.png">
      <p class="nullTEXT">暂时没有数据哦</p>
   </div>
</template>

<script>
export default {
   props: ['loadingTrue'],
   
}
</script>

<style>
</style>
