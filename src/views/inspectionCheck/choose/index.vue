<template>
   <div class="inspectionCheck">
      <Header post-title="选择邮寄方式"></Header>
      <div class="margin50">
         <div @click="askself">自取</div>
         <div @click="mail">寄送</div>
      </div>
   </div>
</template>

<script>
export default {
   data() {
      return {

      };
   },
   methods: {
      askself() {
         let argu = {};
         this.$router.push({
            name: 'confirmOrder',
            query: { titleIndex: 2 }
         });
      },
      mail() {
         let argu = {};
         this.$router.push({
            name: 'confirmOrder',
            query: { titleIndex: 1 }
         });
      },


   }
}
</script>

<style>
</style>
