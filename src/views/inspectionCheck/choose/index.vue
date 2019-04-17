<template>
   <div class="inspectionCheck">
      <Header post-title="选择邮寄方式"></Header>

      <div style="margin-top:150px;text-align:center;">
         <img src="@/assets/images/icon_selftaking1.png" alt="" width="94%" @click="askself">
         <img src="@/assets/images/icon_send1.png" alt="" width="94%" @click="mail" style="margin-top:15px;">
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
